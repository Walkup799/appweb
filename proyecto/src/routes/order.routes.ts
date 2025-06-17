import { Router } from "express";
import { createOrder, updateOrderStatus, cancelOrder } from "../controllers/order.controller";

const router = Router();

router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);

export default router;
