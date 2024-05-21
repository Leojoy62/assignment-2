import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export default OrderValidationSchema;
