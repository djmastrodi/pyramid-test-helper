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
    let httpHeadersNew: any[] = [];

    httpHeaders.forEach((item) => {
      httpHeadersNew.push({ [item.Key]: item.value });
    });

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

    API.post(path, body)
      .then((response) => {
        console.log({
          status: response["status"],
          statusText: response["statusText"],
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}
