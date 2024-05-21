import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    //validation using zod
    const zodValidatedData = productValidationSchema.parse(product);

    //will call service
    const result = await productServices.createProductIntoDB(zodValidatedData);

    //will send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
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

// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await productServices.getAllProductsFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'Products retrieved successfully',
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  console.log('query', searchTerm);

  try {
    let result;
    if (searchTerm) {
      result = await productServices.searchProductsInDB(searchTerm);
      if (result && result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `No product found matching search term '${searchTerm}'`,
          data: result,
        });
      }
    } else {
      result = await productServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'All products fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching products',
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body.product;
    console.log('upddated', updateData);
    const result = await productServices.updateProductInDB(
      productId,
      updateData,
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// const searchProducts = async (req: Request, res: Response) => {
//   const searchTerm = req.query.searchTerm as string;

//   try {
//     const result = await productServices.searchProductsInDB(searchTerm);
//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while searching for products',
//       error: error,
//     });
//   }
// };

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
