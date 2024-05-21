import { Schema, model, connect } from 'mongoose';

export type OrderInterface = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};
