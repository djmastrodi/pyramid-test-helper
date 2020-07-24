import { ScanTest } from "./scan";
import { ApplicationConfiguration } from "./model";
import { SendInfo } from "./sendInfo";
const path = require("path");
const fs = require("fs");


export default new (class App {
  private scanTest: ScanTest;

  private sendInfo: SendInfo;

  constructor() {
    this.scanTest = new ScanTest();

    this.sendInfo = new SendInfo();

    this.start();
  }

  public start(): void {
    const args = process.argv.slice(2);

    console.log("myArgs: ", args);

    let jsonFile = args[0];
    console.log;
    this.execProcess(this.getJson(jsonFile));
  }

  private getJson(jsonFile: string): ApplicationConfiguration {
    let rawdata = fs.readFileSync(jsonFile, "utf8");
    let jsonConfig: ApplicationConfiguration = JSON.parse(rawdata);
    return jsonConfig;
  }

  public execProcess(applicationConfig: ApplicationConfiguration): void {
    let objectPost = {};
    console.log(`objectConfig: ${JSON.stringify(applicationConfig)}`);

    console.log("Iniciando Processo...")
    applicationConfig.fieldsDefault.forEach((item) => {
      objectPost[item.key] = item.value;
    });

    applicationConfig.testConfig.forEach((item) => {
      console.log(item);

      let countTest = this.scanTest.scanFileTest(
        item.path,
        new RegExp(item.fileNameRegex),
        new RegExp(
          item.testRules.testCountRegex,
          item.testRules.optionsTestCountRegex
        ),
        new RegExp(
          item.testRules.testExclusionRegex,
          item.testRules.optionsTestExcluisonRegex
        )
      );

      console.log(`Quantidate de test ${item.name}: ${countTest}`);

      objectPost[item.fieldCount] = countTest;

      console.log(objectPost);
    });

    this.sendInfo.sendInformation(
      objectPost,
      applicationConfig.headers,
      applicationConfig.urlApi
    );
  }
})();
