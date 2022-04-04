import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  collectCoverageFrom: ["<rootDir>/lib/**/*"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "(/lib/.*(test|spec))\\.(js|ts)$",
};

export default config;
