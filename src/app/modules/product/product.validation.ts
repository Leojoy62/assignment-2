import { z } from 'zod';

// Define the Zod schema for Variant
const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the Zod schema for Inventory
const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Define the Zod schema for Product
const productValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Must be 10 or more characters long' }),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
