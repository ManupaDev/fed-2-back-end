import Product from "../infrastructure/db/entities/Product";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";

import { Request, Response, NextFunction } from "express";
import { CreateProductDTO } from "../domain/dto/product";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.query.categoryId;
    if (categoryId) {
      const products = await Product.find({ categoryId });
      res.json(products);
    } else {
      const products = await Product.find();
      res.json(products);
    }
  } catch (error) {
    next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = CreateProductDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    await Product.create(result.data);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews");
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
};
