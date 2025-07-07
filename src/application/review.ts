import Review from "../infrastructure/db/entities/Review";
import Product from "../infrastructure/db/entities/Product";

import { Request, Response, NextFunction } from "express";

const createReview = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body;
    const review = await Review.create({
      review: data.review,
      rating: data.rating,
    });

    const product = await Product.findById(data.productId);
    product.reviews.push(review._id);
    await product.save();

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export { createReview };
