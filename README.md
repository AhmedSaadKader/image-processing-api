# image-processing-api

# Step-by-step guide

## initialize project

- create git project and clone
- get images folder
- npm init -y
- npm i express jasmine
- npm i devdependency typescript eslint prettier
- npm i --save-dev @types{the above dependencies where required}

## configure dependencies and add scripts

### configure typescript

- script build: npx tsc
- install typescript config file npx tsc --init
- tsconfig :

  ```javascript
  {
  "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "lib": ["ES2018", "DOM"], // commented
      "outDir": "./build", //commented
      "strict": true,
      "noImplicitAny": true, //commented
  },
  "exclude": ["node_modules", "tests"] // add this one
  }
  ```

### configure eslint and prettier

- npm i --save-dev eslint-config-prettier
- npm i --save-dev eslint-plugin-prettier
- scripts:
  "lint": "eslint 'index.ts'",
  "prettier": "prettier --config .prettierrc \*.ts --write"
- create .prettierrc
  ```json
  {
    "semi": true,
    "trailingComma": "none",
    "singleQuote": true,
    "printWidth": 80
  }
  ```
- create .eslintrc
  ```json
  {
    "root": true,
    "plugins": ["prettier"],
    "extends": ["eslint:recommended", "prettier"],
    "rules": {
      "prettier/prettier": 2,
      "no-use-before-define": ["error", { "functions": true, "classes": true }],
      "no-var": "error",
      "prefer-const": "error"
    },
    "parserOptions": {
      "ecmaVersion": 2017
    },
    "env": {
      "node": true,
      "es6": true
    }
  }
  ```

### configure jamine

- npm i jasmine-spec-reporter
- in root : <spec> => <support> => jasmine.json for configuration
- <src> => <tests> => indexSpec.ts
- <tests> => <helpers> => reporter.ts
- reporter.ts:

  ```javascript
  import {DisplayProcessor, SpecReporter, StacktraceOption} from "jasmine-spec-reporter";
  import SuiteInfo = jasmine.SuiteInfo;

  class CustomProcessor extends DisplayProcessor {
      public displayJasmineStarted(info: SuiteInfo, log: string): string {
          return `${log}`;
      }
  }

  jasmine.getEnv().clearReporters();
  jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
          displayStacktrace: StacktraceOption.NONE
      },
      customProcessors: [CustomProcessor],
  }));
  ```

- jasmine.json:

  ```json
  {
    "spec_dir": "dist/tests",
    "spec_files": ["**/*[sS]pec.js"],
    "helpers": ["helpers/**/*.js"],
    "stopSpecOnExpectationFailure": false,
    "random": false
  }
  ```

- tsconfig.json file: add "spec" to "exclude"
- add script for both building and testing: "test": "npm run build && npm run jasmine"
