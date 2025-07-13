import express from "express";
import { createOrder, getOrder } from "./../application/order";
import isAuthenticated from "./middleware/authentication-middleware";

export const orderRouter = express.Router();

orderRouter.route("/").post(isAuthenticated, createOrder);
orderRouter.route("/:id").get(getOrder);

//getUserOrders
