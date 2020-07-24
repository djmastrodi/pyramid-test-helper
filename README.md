# pyramid-test-helper

Projeto desenvolvido para scanear o repositorios e localizar testes automatizados a fim de mapear e criar piramide de testes. Utilizando json como arquivo de configuração e regex para identificar os testes. Após encontrar os testes o mesmo se integra a Api's atraves de metodo Post.

## Installation

npm i pyramid-test-helper

## Usage

node ./node_modules/pyramid-test-helper/lib/app.js ConfigFile.json

## Example configuration file

{
   "fieldsDefault":[
     {
      "Key":"Label",
      "value":"Value"
    }
  ],
  "urlApi":"http://urlToPost",
  "headers":[
    {
      "Key":"content-type",
      "value":"application/x-www-form-urlencoded"
    }
  ],
  "testConfig":[
    {
      "name": "Unit",
      "fileNameRegex": ".*/*Tests?\\.cs$",
      "path": "pathToRepository",
      "fieldCount":"NameFieldToCountTestToRegex",
      "testRules": {
        "testCountRegex": "\\[Fact*]",
        "optionsTestCountRegex":"gm",
        "testExclusionRegex": "^\\[Fact\\(Skip=\"(.+?)\"\\)\\]+$",
        "optionsTestExcluisonRegex":"gm"
      }
    },
    {
      "name": "Contract",
      "fileNameRegex": ".*spec\\.js$",
      "path": "pathToRepository",
      "fieldCount":"NameFieldToCountTestToRegex",
      "testRules": {
        "testCountRegex": ".*it.*\\('(.+?)",
        "optionsTestCountRegex":"gm",
        "testExclusionRegex": ".*it\\.skip",
        "optionsTestExcluisonRegex":"gm"
      }
    },
    {
      "name": "Integration",
      "fileNameRegex": ".*spec\\.js$",
      "path": "pathToRepository",
      "fieldCount":"NameFieldToCountTestToRegex",
      "testRules": {
        "testCountRegex": ".*it.*\\('(.+?)",
        "optionsTestCountRegex":"gm",
        "testExclusionRegex": ".*it\\.skip",
        "optionsTestExcluisonRegex":"gm"
      }
    }
  ]
}
