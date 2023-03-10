# Image-Processing-API

## Overview

- This image-processing API serves two purposes:

  - As a simple placeholder API, where it allows you to place images into your frontend with the size set via URL parameters
  - Used as a library to store images with the proper sizes to serve properly scaled versions of the images to reduce page load size

- Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

## Tutorial

- To use the API:

  - install all dependencies

  ```javascript
  npm i
  ```

  - add images you want to resize to ./images/full directory
  - use following script to compile typescript files to dist folder

  ```javascript
  npm run build
  ```

  - run api in localhost port 3000

  ```javascript
  node ./dist/src/.
  ```

  - open in browser `http://localhost:3000/resize/${image name}?width=200&height=200` and replace image name with the proper name in the images folder and include the width and height in the url query

- To test the API:
  - run
  ```javascript
  npm run test
  ```

# Creating the project Step-by-step

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
- transfer query and params error handling to function in <middleware>
- create imageDetails file for images to get images paths from it

## install Sharp and configure endpoint

- npm i sharp
- import sharp in controller
- sharp().resize().tofile() to resize and save file in local
- use fs createReadStream('image') to get image
- stream.pipe(res) to view image in browser
- handle all errors in error middleware
- add caching middleware to check if file exists before creating new one

## tests

- super tests
- test errors
- test right responses
