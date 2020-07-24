"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendInfo = void 0;
const index_1 = require("../http/index");
class SendInfo {
    constructor() { }
    getBodyformUrlEncoded(object) {
        let body = "";
        for (var propt in object) {
            body += `${propt}=${object[propt]}&`;
        }
        console.log(body);
        return body;
    }
    sendInformation(object, httpHeaders, baseUrl, path = "") {
        console.log(`iniciando processo de envio de informações`);
        let httpHeadersNew = [];
        console.log(`Validando Headers`);
        httpHeaders.forEach((item) => {
            httpHeadersNew.push({ [item.Key]: item.value });
        });
        console.log(`Criando instancia http`);
        const API = index_1.httpInstance(baseUrl, httpHeadersNew);
        let body;
        let contentType = httpHeaders.find((item) => item.Key === "content-type");
        if (contentType !== null &&
            contentType.value === "application/x-www-form-urlencoded") {
            body = this.getBodyformUrlEncoded(object);
        }
        else {
            body = object;
        }
        console.log(`body:${JSON.stringify(body)}`);
        console.log(`enviando post`);
        API.post(path, body)
            .then((response) => {
            console.log({
                status: response["status"],
                statusText: response["statusText"],
            });
        })
            .catch((error) => {
            console.log("Erro ao processar envio...");
            console.log(`${JSON.stringify(error)}`);
            console.log(error.response);
        });
    }
}
exports.SendInfo = SendInfo;
//# sourceMappingURL=sendInfo.js.map