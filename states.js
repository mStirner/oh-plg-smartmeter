module.exports = [

    // VOLTAGE
    {
        name: "L1 Voltage",
        alias: "VOLTAGE_L1",
        type: "number",
        max: 250
    }, {
        name: "L2 Voltage",
        alias: "VOLTAGE_L2",
        type: "number",
        max: 250
    }, {
        name: "L3 Voltage",
        alias: "VOLTAGE_L3",
        type: "number",
        max: 250
    },

    // AMPERE
    {
        name: "L1 Ampere",
        alias: "CURRENT_L1",
        type: "number",
        max: 16
    }, {
        name: "L2 Ampere",
        alias: "CURRENT_L2",
        type: "number",
        max: 16
    }, {
        name: "L3 Ampere",
        alias: "CURRENT_L3",
        type: "number",
        max: 16
    },

    // WATT
    {
        name: "L1 Power",
        alias: "POWER_L1",
        type: "number",
        max: 3680,
        invert: true
    }, {
        name: "L2 Power",
        alias: "POWER_L2",
        type: "number",
        max: 3680,
        invert: true
    }, {
        name: "L3 Power",
        alias: "POWER_L3",
        type: "number",
        max: 3680,
        invert: true
    },

    // MISC
    {
        name: "Sum of L1/L2/L3 currents",
        alias: "CURRENT_SUM",
        type: "number",
        max: Number.MAX_SAFE_INTEGER
    }, {
        name: "Total system power",
        alias: "POWER_TOTAL",
        type: "number",
        max: Number.MAX_SAFE_INTEGER,
        invert: true
    }, {
        name: "Frequency",
        alias: "FREQUENZ",
        type: "number",
        max: 60
    }, {
        name: "Total active Energy",
        alias: "ENERGY_TOTAL",
        type: "number",
        max: Number.MAX_SAFE_INTEGER
    }

];