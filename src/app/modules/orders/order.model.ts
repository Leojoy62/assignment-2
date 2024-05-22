import { Schema, model } from 'mongoose';
import { OrderInterface } from './order.interface';

const orderSchema = new Schema<OrderInterface>({
  email: { type: String, required: true, trim: true },
  productId: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = model<OrderInterface>('Order', orderSchema);

export default OrderModel;
