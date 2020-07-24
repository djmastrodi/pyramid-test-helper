"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scan_1 = require("./scan");
const sendInfo_1 = require("./sendInfo");
const path = require("path");
const fs = require("fs");
exports.default = new (class App {
    constructor() {
        this.scanTest = new scan_1.ScanTest();
        this.sendInfo = new sendInfo_1.SendInfo();
        this.start();
    }
    start() {
        const args = process.argv.slice(2);
        console.log("myArgs: ", args);
        let jsonFile = args[0];
        console.log;
        this.execProcess(this.getJson(jsonFile));
    }
    getJson(jsonFile) {
        let rawdata = fs.readFileSync(jsonFile, "utf8");
        let jsonConfig = JSON.parse(rawdata);
        return jsonConfig;
    }
    execProcess(applicationConfig) {
        let objectPost = {};
        console.log(`objectConfig: ${JSON.stringify(applicationConfig)}`);
        console.log("Iniciando Processo...");
        applicationConfig.fieldsDefault.forEach((item) => {
            objectPost[item.key] = item.value;
        });
        applicationConfig.testConfig.forEach((item) => {
            console.log(item);
            let countTest = this.scanTest.scanFileTest(item.path, new RegExp(item.fileNameRegex), new RegExp(item.testRules.testCountRegex, item.testRules.optionsTestCountRegex), new RegExp(item.testRules.testExclusionRegex, item.testRules.optionsTestExcluisonRegex));
            console.log(`Quantidate de test ${item.name}: ${countTest}`);
            objectPost[item.fieldCount] = countTest;
            console.log(objectPost);
        });
        this.sendInfo.sendInformation(objectPost, applicationConfig.headers, applicationConfig.urlApi);
    }
})();
//# sourceMappingURL=app.js.map