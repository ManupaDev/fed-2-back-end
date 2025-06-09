import Review from "../infrastructure/db/entities/review.js";
import Product from "../infrastructure/db/entities/product.js";

const createReview = async (req, res) => {
  try {
    const data = req.body;
    const review = await Review.create({
      review: data.review,
      rating: data.rating,
    });

    //! Implement the correct syntax for this => Updating the product reviews array with the new reviews _id
    //   const product = await Product.findById(data.productId);
    //   product.reviews.push(review._id);
    //   await product.save();

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export { createReview };
