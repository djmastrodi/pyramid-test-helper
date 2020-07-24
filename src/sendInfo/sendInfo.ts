import { httpInstance } from "../http/index";
import { HttpHeaders } from "model/index";

export class SendInfo {
  constructor() {}

  private getBodyformUrlEncoded(object: any) {
    let body = "";
    for (var propt in object) {
      body += `${propt}=${object[propt]}&`;
    }
    console.log(body);
    return body;
  }

  public sendInformation(
    object: any,
    httpHeaders: HttpHeaders[],
    baseUrl: string,
    path: string = ""
  ): void {
    console.log(`iniciando processo de envio de informações`);
    let httpHeadersNew: any[] = [];

    console.log(`Validando Headers`);
    httpHeaders.forEach((item) => {
      httpHeadersNew.push({ [item.Key]: item.value });
    });

    console.log(`Criando instancia http`);
    const API = httpInstance(baseUrl, httpHeadersNew);

    let body;
    let contentType = httpHeaders.find((item) => item.Key === "content-type");
    if (
      contentType !== null &&
      contentType.value === "application/x-www-form-urlencoded"
    ) {
      body = this.getBodyformUrlEncoded(object);
    } else {
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
