# Angular_FE_Wemos_D1
Angular frontend for monitoring and controlling a Wemos D1 mini

The C_WebServer_WemosD1_Mini repository contains the latest frontend files.

If you change something in FE, here is a short guide for uploading it to the Wemos D1 mini:

Requirements:
- NodeJS ( https://nodejs.org/en/ )

Run "npm i" from the projects main directory to install the required node modules!

After that, run "ng serve" to use it with the mock server (localhost:4200),
or run "npm run build" to generate frontend files into the subfolders of the "dist" folder.

Copy "dist/gzipped" folders content into "C_WebServer_WemosD1_Mini"-s "WebServer/data" folder,
then upload it to Wemos D1 mini.

Uploading the data (frontend files) to Wemos D1 mini:
- https://www.instructables.com/id/Using-ESP8266-SPIFFS/

Don't forget to upload the "C_WebServer_WemosD1_Mini/WebServer.ino" script (Arduino C++ file)
with e.g. Arduino IDE to your Wemos D1 mini to transform it into a webserver
with the required REST endpoints.

(See C_WebServer_WemosD1_Mini README.md.)