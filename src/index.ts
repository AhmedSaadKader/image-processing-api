import express from 'express';
import convertRouter from './routes/convertRoutes';

const app = express();
const port = 3000;

app.use('/resize', convertRouter);

app.listen(port, () => console.log(`server started at localhost: ${port}`));

export default app;
