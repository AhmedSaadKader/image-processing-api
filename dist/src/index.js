"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const convertRoutes_1 = __importDefault(require("./routes/convertRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send(`- To use the API:
  - install all dependencies
    npm i
  - add images you want to resize to ./images/full directory
  - use following script to compile typescript files to dist folder
    npm run build
  - run api in localhost port 3000 
  node ./dist/src/.
  - open in browser`);
});
app.use('/resize', convertRoutes_1.default);
app.listen(port, () => console.log(`server started at localhost: ${port}`));
exports.default = app;
