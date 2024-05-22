import ProductModel from '../product/product.model';
import { OrderInterface } from './order.interface';
import OrderModel from './order.model';

// const createOrderIntoDB = async (order: OrderInterface) => {
//   const productId = order.productId;
//   console.log('productid', productId);
//   const isProductExists = await ProductModel.exists({ _id: productId });
//   if (isProductExists) {
//     const result = await OrderModel.create(order);
//     return result;
//   } else {
//     throw new Error('Product id did not match');
//   }
// };
const createOrderIntoDB = async (order: OrderInterface) => {
  const { productId, quantity } = order;

  // Check if the product exists and retrieve its inventory
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new Error('Product id did not match');
  }

  // Check if the order quantity is greater than the available quantity
  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient product quantity');
  }

  // Deduct the ordered quantity from the product's inventory
  product.inventory.quantity -= quantity;

  // Update the inStock status based on the new quantity
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }

  // Save the updated product inventory
  await product.save();

  // Create the order
  const result = await OrderModel.create(order);
  return result;
};

const getOrdersFromDB = async (email?: string) => {
  if (email) {
    const regex = new RegExp(email, 'i');
    const result = await OrderModel.find({
      email: { $regex: regex },
    });
    return result;
  } else {
    const result = await OrderModel.find();
    return result;
  }
};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
