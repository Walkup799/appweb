import { Router } from "express";
import { createProduct, updateProduct, deleteProduct, getAllProducts } from "../controllers/product.controller";

const router = Router();

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.patch('/:id', deleteProduct);
router.get('/', getAllProducts);

export default router;
