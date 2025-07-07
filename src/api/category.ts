import express from "express";
import {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from "../application/category";
import isAuthenticated from "./middleware/authentication-middleware";

const categoryRouter = express.Router();

categoryRouter.route("/").get(getAllCategories).post(isAuthenticated, createCategory);

categoryRouter
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById);

export default categoryRouter;
