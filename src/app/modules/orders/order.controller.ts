import { Request, Response } from 'express';
import OrderValidationSchema from './order.validation';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;

    const zodValidatedData = OrderValidationSchema.parse(order);
    //will call service
    const result = await orderServices.createOrderIntoDB(zodValidatedData);
    //will send response
    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;

  try {
    let result;
    if (email) {
      result = await orderServices.searchOrderInDB(email);
      if (result && result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Order matching search term '${email}' fetched successfully!`,
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `No order found matching search term '${email}'`,
          data: result,
        });
      }
    } else {
      result = await orderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'All orders fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching orders',
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
