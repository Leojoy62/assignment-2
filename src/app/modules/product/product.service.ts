import { ProductInterface } from './product.interface';
import ProductModel from './product.model';

const createProductIntoDB = async (product: ProductInterface | null) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

const updateProductInDB = async (
  id: string,
  updateData: Partial<ProductInterface>,
) => {
  const result = await ProductModel.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

const searchProductsInDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
  searchProductsInDB,
};
