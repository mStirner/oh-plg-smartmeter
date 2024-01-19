const WebSocket = require("ws");
const states = require("./states.js");

module.exports = (info, logger, init) => {
    return init([
        "devices",
        "endpoints"
    ], async (scope, [
        C_DEVICES,
        C_ENDPOINTS
    ]) => {


        // add/find device
        const device = await new Promise((resolve) => {
            C_DEVICES.found({
                labels: [
                    "modbus=true",
                    "device=smartmeter"
                ]
            }, (device) => {

                // feedback
                logger.debug("SmartMeter found", device);

                resolve(device);

            }, (filter) => {

                // feedback
                logger.debug("SmartMeter not found, add one");

                C_DEVICES.add({
                    name: "SmartMeter",
                    icon: "fa-solid fa-gauge-high",
                    interfaces: [{
                        type: "ETHERNET",
                        description: "WebSocket API",
                        settings: {
                            host: "smart-meter.lan",
                            port: 8080
                        }
                    }, {
                        type: "ETHERNET",
                        description: "ModBus API",
                        settings: {
                            host: "smart-meter.lan",
                            port: 502
                        }
                    }],
                    ...filter
                });

            });
        });


        // add/find endpoint
        const endpoint = await new Promise((resolve) => {
            C_ENDPOINTS.found({
                labels: [
                    "modbus=true",
                    "device=smartmeter"
                ]
            }, (endpoint) => {

                // feedback
                logger.debug("Endpoint found", endpoint);

                resolve(endpoint);

            }, (filter) => {

                logger.debug("Endpoint not found, add one");

                C_ENDPOINTS.add({
                    name: "SmartMeter",
                    device: device._id,
                    icon: "fa-solid fa-gauge-high",
                    states,
                    ...filter
                });

            });
        });


        // wait for device/endpoint setup
        Promise.all([device, endpoint]).then(() => {

            // interfaces:
            // 0 = websocket
            // 1 = modbus
            let iface = device.interfaces[0];
            let { host, port } = iface.settings;
            let agent = iface.httpAgent();

            iface.on("attached", () => {

                logger.debug("Connector attached");


                let ws = new WebSocket(`ws://${host}:${port}`, {
                    agent
                });

                ws.once("close", () => {
                    logger.debug("Connection closed", ws.url)
                });

                ws.once("error", (err) => {
                    logger.error(err, ws.url);
                })

                ws.once("open", () => {
                    logger.debug("Connected to", ws.url);
                });

                ws.on("message", (data) => {
                    try {

                        data = JSON.parse(data);

                        logger.trace("Got message", data);

                        data.forEach(({ key, value }) => {

                            let state = endpoint.states.find((state) => {
                                return state.alias === key;
                            });

                            if (!state) {
                                logger.warn(`Cant set state for key=${key}`);
                                return;
                            }

                            state.value = value;

                        });

                    } catch (err) {

                        console.error(err);

                    }
                });

            });

        }).catch((err) => {

            logger.error(err, "something went wrong");

        });


    });
};