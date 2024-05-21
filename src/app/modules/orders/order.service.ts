import { OrderInterface } from './order.interface';
import OrderModel from './order.model';

const createOrderIntoDB = async (order: OrderInterface) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const searchOrderInDB = async (email: string) => {
  const regex = new RegExp(email, 'i');
  const result = await OrderModel.find({
    email: { $regex: regex },
  });
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  searchOrderInDB,
};
