import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../application/product.js";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export default productRouter;
