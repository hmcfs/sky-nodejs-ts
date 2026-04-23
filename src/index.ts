import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import './models/associations';
import router from './router/index';
import { responseMiddleware } from './middleware/response.middleware';
import { winstonMiddleware } from './middleware/winston';

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/t', (req, res) => {
  res.send('hello world');
});

app.use(winstonMiddleware);
app.use(responseMiddleware);
app.use(router);
app.use((req: Request, res: Response, next: NextFunction) => res.status(404).send('Not Found'));
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  res.status(500).send('Server Error')
);
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`端口 ${port} 被占用，尝试 ${port + 1}`);
    app.listen(port + 1);
  }
});
