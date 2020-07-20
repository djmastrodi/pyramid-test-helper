import { TestRules } from "./testRules";

export interface TestConfig {
  name: string;
  fileNameRegex: string;
  path: string;
  fieldCount: number;
  testRules: TestRules;
}
