# Introduction
This is a hacky plugin to read values from my SmartMeter.

# Installation
1) Create a new plugin over the OpenHaus backend HTTP API
2) Mount the plugin source code folder into the backend
3) run `npm install`

# Development
Add plugin item via HTTP API:<br />
[PUT] `http://{{HOST}}:{{PORT}}/api/plugins/`
```json
{
   "name":"SmartMeter",
   "version":1,
   "intents":[
      "devices",
      "endpoints"
   ],
   "uuid": "5749b256-0f90-4a3f-bfeb-1a698f1c408b"
}
```
Mount the source code into the backend plugins folder
```sh
sudo mount --bind ~/projects/OpenHaus/plugins/oh-plg-smartmeter/ ~/projects/OpenHaus/backend/plugins/5749b256-0f90-4a3f-bfeb-1a698f1c408b/
```
