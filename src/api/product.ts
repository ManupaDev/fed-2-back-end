import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  uploadProductImage
} from "../application/product";
import isAuthenticated from "./middleware/authentication-middleware";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

productRouter.route("/images").post(uploadProductImage);
export default productRouter;
