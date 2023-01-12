import express, { urlencoded } from 'express';
import convertRouter from './routes/convertRoutes';

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hi')
})

app.use('/resize', convertRouter);

app.listen(port, () => console.log(`server started at localhost: ${port}`));

export default app;
