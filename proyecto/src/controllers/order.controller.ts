import { Request, Response } from "express";
import { Order } from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
    const payload = req.body;
    const newOrder = new Order();

    Object.assign(newOrder, payload);
    
    newOrder.subtotal = newOrder.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    newOrder.total = newOrder.subtotal;

    await newOrder.save();
    return res.status(201).json({ message: "Orden creada", newOrder });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada" });

        order.status = status; 
        await order.save();
        return res.json({ message: "Estado de la orden actualizado", order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar estado de la orden" });
    }
};

export const cancelOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Orden no encontrada" });

        order.status = "Cancelado"; 
        await order.save();
        return res.json({ message: "Orden cancelada correctamente", order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cancelar la orden" });
    }
};
