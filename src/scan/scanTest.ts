//const path = require('path');

//const jestRegex = /it\('/g;
//const jestContractRegex = /it\("/g;
//const e2eRegex = /Scenario/g;

const fs = require("fs");

export class ScanTest {
  constructor() {}

  private readFileContent(
    filepath: string,
    regex: RegExp,
    regexExclude: RegExp
  ): number {
    const contents = fs.readFileSync(filepath, "utf8");
    let countOk = contents.match(regex) || [];
    let countNok = contents.match(regexExclude) || [];

    return countOk.length - countNok.length < 0 ? 0 : countOk.length - countNok.length;
  }

  public scanFileTest(
    directory: string,
    fileNameRegex: RegExp,
    regexCount: RegExp,
    regexExclude: RegExp
  ): number {
    let count = 0;

    fs.readdirSync(directory).forEach((file) => {
      const stat = fs.statSync(`${directory}/${file}`);
      if (stat.isDirectory()) {
        count += this.scanFileTest(
          `${directory}/${file}`,
          fileNameRegex,
          regexCount,
          regexExclude
        );
      } else if (file.match(fileNameRegex)) {
        const filepath = `${directory}/${file}`;
        count += this.readFileContent(filepath, regexCount, regexExclude);
      }
    });

    return count;
  }
}

// const unitTestCount = readTsFiles('./src', 'unit.test', jestRegex);
// const componentTestCount = readTsFiles('./src', 'comp.test', jestRegex);
// const integrationTestCount = readTsFiles('./src', 'int.test', jestRegex);
// //const contractTestCount = readTsFiles('tests/contract', 'contract', jestContractRegex);
// const e2eTestCount = readTsFiles('tests/e2e/cypress', '.feature', e2eRegex);

// const tests = {
//   u: unitTestCount,
//   cp: componentTestCount,
//   i: integrationTestCount,
//   //ct: contractTestCount,
//   e: e2eTestCount,
// };

// const data = JSON.stringify(tests);
// fs.writeFileSync('tasks/pyramid/testPyramid.json', data);
