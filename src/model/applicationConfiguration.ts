import { TestConfig } from "./testConfig";
import { FieldsDefault } from "./fieldsDefault";
import { HttpHeaders } from "./httpHeaders";

 
export interface ApplicationConfiguration {
    testConfig: TestConfig[];
    fieldsDefault: FieldsDefault[];
    urlApi: string;
    headers: HttpHeaders[];
  }