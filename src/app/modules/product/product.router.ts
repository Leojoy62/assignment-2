import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getSingleProduct);
router.delete('/:productId', productController.deleteProduct);
router.put('/:productId', productController.updateProduct);

export const ProductRoutes = router;
