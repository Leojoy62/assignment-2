import { Schema, model, connect } from 'mongoose';

export type ProductInterface = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
};

type Variant = {
  type: string;
  value: string;
};

type Inventory = {
  quantity: number;
  inStock: boolean;
};
