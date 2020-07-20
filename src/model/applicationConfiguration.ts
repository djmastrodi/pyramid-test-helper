import { TestConfig } from "./TestConfig";
import { FieldsDefault } from "./fieldsDefault";
import { HttpHeaders } from "./httpHeaders";


export interface ApplicationConfiguration {
    testConfig: TestConfig[];
    fieldsDefault: FieldsDefault[];
    urlApi: string;
    headers: HttpHeaders[];
  }