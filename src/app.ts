import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.router';
import { OrderRoutes } from './app/modules/orders/order.router';

const app: Application = express();

app.use(express.json());
app.use(cors());

//routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '404: NOT_FOUND',
  });
});

export default app;
