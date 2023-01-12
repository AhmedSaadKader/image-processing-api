import express, { urlencoded } from 'express';
import convertRouter from './routes/convertRoutes';

const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req, res) => {
    res.send(`- To use the API:
  - install all dependencies
    npm i
  - add images you want to resize to ./images/full directory
  - use following script to compile typescript files to dist folder
    npm run build
  - run api in localhost port 3000 
  node ./dist/src/.
  - open in browser`)
})

app.use('/resize', convertRouter);

app.listen(port, () => console.log(`server started at localhost: ${port}`));

export default app;
