import { Request, Response } from "express";
import { Product } from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, descri, qty, price, status } = req.body;
        const newProduct = new Product({ name, descri, qty, price, status });
        const product = await newProduct.save();
        return res.status(201).json({ message: "Producto creado", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear producto" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, descri, qty, price, status } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        if (name) product.name = name;
        if (descri) product.descri = descri;
        if (qty !== undefined) product.qty = qty;
        if (price !== undefined) product.price = price;
        if (typeof status === 'boolean') product.status = status;

        await product.save();
        return res.json({ message: "Producto actualizado", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar producto" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        product.status = false;
        await product.save();
        return res.json({ message: "Producto desactivado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al desactivar producto" });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    return res.json({ products });
};
