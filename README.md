# Image-Processing-API

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
      "typeRoots": ["./types"] // commented
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
      "ecmaVersion": 2020,
      "sourceType": "module"
    },
    "env": {
      "node": true,
      "es6": true
    }
  }
  ```

### configure jasmine

- npm i jasmine-spec-
- npm i --save-dev @types/prettier
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

### Configure express and initialize app

- npm i express
- npm i --save-dev @types/express
- npm i --save-dev nodemon
- npm i --save-dev ts-node
- script "start": "nodemon src/index.ts"
- initialize app and endpoint
- create first test for this endpoint
- npm i supertest --save-dev
- npm i --save-dev @types/supertest
- first test: /indexSpec.ts:
  ```typescript
  import request from 'supertest';
  import app from '../index';
  describe("GET API '/'", () => {
    it('should return Hello, world!', async () => {
      const res = await request(app).get('/').send('Hello, world!');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Hello, world!');
    });
  });
  ```

## Setup Project Structure

- create in root <routes>, <controllers>, <middleware>
- transfer route to <routes>
- transfer function route to <controllers>

## install Sharp and configure endpoint

- npm i sharp
- import sharp in controller
- use fs createReadStream('image') to get image
- stream.pipe(res) to view image in browser
