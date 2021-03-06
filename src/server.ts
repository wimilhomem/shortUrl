
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT);