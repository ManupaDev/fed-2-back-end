import express from "express";
import {
  createCheckoutSession,
  retrieveSessionStatus
} from "../application/payment";

export const paymentsRouter = express.Router();

paymentsRouter.route("/create-checkout-session").post(createCheckoutSession);
paymentsRouter.route("/session-status").get(retrieveSessionStatus);
