# Stripe Payment Integration Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Payment Workflow](#payment-workflow)
6. [Security Considerations](#security-considerations)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

## Overview

This guide provides a comprehensive implementation of Stripe payment integration for an e-commerce application. The implementation uses Stripe's Embedded Checkout for a seamless payment experience and includes webhook handling for payment confirmation.

## Prerequisites

### 1. Setting Up Stripe Account

#### Step 1: Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Click "Start now" to create a new account
3. Fill in your business information:
   - Business name
   - Email address
   - Password
   - Country/region
4. **Skip Business Verification**: 
   - When prompted for business verification, click "Skip for now" or "Continue in test mode"
   - This allows you to use Stripe in test mode without completing business verification
   - You can always complete verification later when ready for live payments

#### Step 2: Navigate to Dashboard
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. You'll be redirected to the main dashboard overview
3. **Verify Test Mode**: Ensure the toggle in the top-right shows "Test mode"

### 2. Finding API Keys

#### Step 1: Access API Keys
1. In the Stripe Dashboard, click on **"Developers"** in the left sidebar
2. Click on **"API keys"** in the submenu
3. You'll see two sections: "Standard keys" and "Restricted keys"

#### Step 2: Copy API Keys
1. **Publishable Key**: 
   - In the "Standard keys" section, copy the "Publishable key" (starts with `pk_test_` for test mode)
   - This is safe to expose in frontend code
   
2. **Secret Key**:
   - In the "Standard keys" section, click "Reveal test key" to see the secret key (starts with `sk_test_`)
   - **⚠️ Never share or commit this key to version control**
   - Copy this key for backend environment variables

#### Step 3: Switch Between Test and Live Modes
1. Use the toggle in the top-right corner of the dashboard (shows "Test mode" or "Live mode")
2. **Test Mode**: Use for development (keys start with `pk_test_` and `sk_test_`)
3. **Live Mode**: Use for production (keys start with `pk_live_` and `sk_live_`)


### 3. Setting Up Webhooks

#### Step 1: Access Webhooks
1. In the Stripe Dashboard, go to **"Developers"** → **"Webhooks"**
2. Click **"Add endpoint"** or **"Create endpoint"**

#### Step 2: Configure Webhook Endpoint
1. **Endpoint URL**: Enter your webhook URL
   - Development: `http://localhost:8000/api/stripe/webhook`
   - Production: `https://yourdomain.com/api/stripe/webhook`

2. **Events to send**: Select the following events:
- Select all checkout events

3. **Version**: Select the latest webhook version (currently v2024-06-20)
4. Click **"Add endpoint"** or **"Create endpoint"**

#### Step 3: Get Webhook Secret
1. After creating the webhook, click on the endpoint URL in the list
2. In the webhook details page, find the **"Signing secret"** section
3. Click **"Reveal"** to see the webhook secret (starts with `whsec_`)
4. Copy this secret for your backend environment variables

#### Step 4: Test Webhook
1. In the webhook details page, click **"Send test webhook"** or **"Test endpoint"**
2. Select an event type (e.g., `checkout.session.completed`)
3. Click **"Send test webhook"**
4. Check your server logs to verify the webhook is received

#### Step 5: Monitor Webhook Delivery
1. In the webhook details page, you can see:
   - **Recent deliveries**: List of recent webhook attempts
   - **Delivery status**: Success/failure indicators
   - **Response codes**: HTTP status codes from your server
2. Click on any delivery to see the full request/response details

### 4. Environment Variables Setup

#### Backend (.env)
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Copy from Stripe Dashboard → Developers → API Keys
STRIPE_WEBHOOK_SECRET=whsec_... # Copy from Stripe Dashboard → Developers → Webhooks

# Application Configuration
FRONTEND_URL=http://localhost:5173
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your-database
```

#### Frontend (.env)
```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # Copy from Stripe Dashboard → Developers → API Keys

# Application Configuration
VITE_BASE_URL=http://localhost:8000
```

### 5. Stripe CLI Setup

#### Install Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (using Chocolatey)
choco install stripe-cli

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

#### Login to Stripe CLI
```bash
stripe login
```

#### Forward Webhooks to Local Development
```bash
stripe listen --forward-to localhost:8000/api/stripe/webhook
```

This will provide a webhook signing secret for local development.

### 6. Test Mode Setup

#### Important Notes for Test Mode:
1. **No Real Money**: Test mode uses fake payment methods and no real charges
2. **Test Cards**: Use Stripe's test card numbers for testing:
   - Success: `4242424242424242`
   - Decline: `4000000000000002`
   - 3D Secure: `4000002500003155`
3. **Test Data**: All data in test mode is separate from live mode
4. **No Business Verification Required**: You can use all features without business verification

### 7. Dashboard Navigation Reference

#### Key Dashboard Sections:
- **Overview**: Main dashboard with revenue metrics and analytics
- **Payments**: View and manage payments, disputes, and refunds
- **Customers**: Manage customer information and payment methods
- **Products**: Create and manage products, prices, and inventory
- **Developers**: 
  - **API Keys**: Find your publishable and secret keys
  - **Webhooks**: Configure webhook endpoints and monitor delivery
  - **Logs**: View API request logs and performance metrics
  - **Events**: Monitor webhook events and event history
  - **Documentation**: Access API documentation and guides

#### Important Dashboard URLs:
- Main Dashboard: https://dashboard.stripe.com
- API Keys: https://dashboard.stripe.com/apikeys
- Webhooks: https://dashboard.stripe.com/webhooks
- Test Data: https://dashboard.stripe.com/test/data
- Events: https://dashboard.stripe.com/events
- Logs: https://dashboard.stripe.com/logs

## Backend Implementation

### 1. Dependencies Installation

```bash
npm install stripe @types/stripe express mongoose cors dotenv
```

### 2. Stripe Configuration

**File: `src/infrastructure/stripe.ts`**
```typescript
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(stripeSecretKey);

export default stripe;
```

### 3. Database Models

**File: `src/infrastructure/db/entities/Product.ts`**
```typescript
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stripePriceId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review",
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
```

**File: `src/infrastructure/db/entities/Order.ts`**
```typescript
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: {
    type: [ItemSchema],
    required: true,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["PENDING", "SHIPPED", "FULFILLED", "CANCELLED"],
    default: "PENDING",
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "CREDIT_CARD"],
    default: "CREDIT_CARD",
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "REFUNDED"],
    default: "PENDING",
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
```

### 4. Payment Application Logic

**File: `src/application/payment.ts`**
```typescript
import { Request, Response } from "express";
import util from "util";
import Order from "../infrastructure/db/entities/Order";
import stripe from "../infrastructure/stripe";
import Product from "../infrastructure/db/entities/Product";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

interface Product {
  _id: string;
  stock: number;
  stripePriceId: string;
  name: string;
}

async function fulfillCheckout(sessionId: string) {
  console.log("Fulfilling Checkout Session " + sessionId);

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
  console.log(
    util.inspect(checkoutSession, false, null, true /* enable colors */)
  );

  const order = await Order.findById(
    checkoutSession.metadata?.orderId
  ).populate<{
    items: { productId: Product; quantity: number }[];
  }>("items.productId");
  
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.paymentStatus !== "PENDING") {
    throw new Error("Payment is not pending");
  }

  if (order.orderStatus !== "PENDING") {
    throw new Error("Order is not pending");
  }

  // Check the Checkout Session's payment_status property
  if (checkoutSession.payment_status !== "unpaid") {
    // Perform fulfillment of the line items
    order.items.forEach(async (item) => {
      const product = item.productId;
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity },
      });
    });

    await Order.findByIdAndUpdate(order._id, {
      paymentStatus: "PAID",
      orderStatus: "CONFIRMED",
    });
  }
}

export const handleWebhook = async (req: Request, res: Response) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await fulfillCheckout(event.data.object.id);
      res.status(200).send();
      return;
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  const orderId = req.body.orderId;
  console.log("body", req.body);
  const order = await Order.findById(orderId).populate<{
    items: { productId: Product; quantity: number }[];
  }>("items.productId");

  if (!order) {
    throw new Error("Order not found");
  }
  
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: order.items.map((item) => ({
      price: item.productId.stripePriceId,
      quantity: item.quantity,
    })),
    mode: "payment",
    return_url: `${FRONTEND_URL}/shop/complete?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      orderId: req.body.orderId,
    },
  });

  res.send({ clientSecret: session.client_secret });
};

export const retrieveSessionStatus = async (req: Request, res: Response) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );

  const order = await Order.findById(checkoutSession.metadata?.orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  res.status(200).json({
    orderId: order._id,
    status: checkoutSession.status,
    customer_email: checkoutSession.customer_details?.email,
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
  });
};
```

### 5. Payment API Routes

**File: `src/api/payment.ts`**
```typescript
import express from "express";
import {
  createCheckoutSession,
  retrieveSessionStatus
} from "../application/payment";

export const paymentsRouter = express.Router();

paymentsRouter.route("/create-checkout-session").post(createCheckoutSession);
paymentsRouter.route("/session-status").get(retrieveSessionStatus);
```

### 6. Server Configuration

**File: `src/index.ts`**
```typescript
import "dotenv/config";
import express from "express";
import { paymentsRouter } from "./api/payment";
import { handleWebhook } from "./application/payment";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));

// Webhook endpoint must be raw body
app.post(
  "/api/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/payments", paymentsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Frontend Implementation

### 1. Dependencies Installation

```bash
npm install @stripe/react-stripe-js @stripe/stripe-js @reduxjs/toolkit react-redux
```

### 2. Stripe Configuration

**File: `src/components/PaymentForm.jsx`**
```jsx
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PaymentForm = ({ orderId }) => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentForm;
```

### 3. Payment Page

**File: `src/pages/payment.page.jsx`**
```jsx
import CartItem from "@/components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useSearchParams } from "react-router";
import PaymentForm from "@/components/PaymentForm";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-8">
      <h2 className="text-4xl font-bold">Review Your Order</h2>
      <div className="mt-4 grid grid-cols-4 gap-x-4">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div className="mt-4">
        <p>
          Total Price: $
          {cart.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )}
        </p>
      </div>

      <div className="mt-4">
        <PaymentForm orderId={orderId} />
      </div>
    </main>
  );
}

export default PaymentPage;
```

### 4. API Integration

**File: `src/lib/api.js`**
```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
      });
    },
  }),
  endpoints: (build) => ({
    // ... other endpoints
    getCheckoutSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),
  }),
});

export const {
  useGetCheckoutSessionStatusQuery,
  // ... other hooks
} = Api;
```

### 5. Payment Completion Page

**File: `src/pages/complete.page.jsx`**
```jsx
import { Button } from "@/components/ui/button";
import { useGetCheckoutSessionStatusQuery } from "@/lib/api";
import { Link, useSearchParams, Navigate } from "react-router";

function CompletePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useGetCheckoutSessionStatusQuery(sessionId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (data?.status === "complete") {
    return (
      <section id="success" className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Order Completed Successfully!</h2>
        <p className="mb-4">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-semibold">{data.customer_email}</span>.
        </p>
        
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Order Details:</h3>
          <p className="mb-2">Order ID: <span className="font-medium">{data.orderId}</span></p>
          <p className="mb-2">Order Status: <span className="font-medium">{data.orderStatus}</span></p>
          <p className="mb-2">Payment Status: <span className="font-medium">{data.paymentStatus}</span></p>
        </div>
        
        <div className="mt-6">
          <p>
            If you have any questions, please email{" "}
            <a href="mailto:orders@example.com" className="text-blue-600 hover:underline">
              orders@example.com
            </a>.
          </p>
        </div>
        
        <Button asChild className="mt-6">
          <Link to="/">Return to Home</Link>
        </Button>
      </section>
    );
  }

  return null;
}

export default CompletePage;
```

## Payment Workflow

### 1. Order Creation Flow
1. User adds items to cart
2. User proceeds to checkout
3. User fills shipping address
4. Order is created in database with status "PENDING"
5. User is redirected to payment page with orderId

### 2. Payment Processing Flow
1. Payment page loads with orderId
2. PaymentForm component fetches client secret from backend
3. Stripe Embedded Checkout is initialized
4. User completes payment in embedded checkout
5. Stripe sends webhook to backend
6. Backend processes webhook and updates order status
7. User is redirected to completion page

### 3. Webhook Processing Flow
1. Stripe sends webhook event to `/api/stripe/webhook`
2. Backend verifies webhook signature
3. If event is `checkout.session.completed`:
   - Retrieve order from database
   - Update product stock
   - Update order status to "CONFIRMED"
   - Update payment status to "PAID"

### 4. Completion Flow
1. User is redirected to completion page with session_id
2. Frontend fetches session status from backend
3. Display success message with order details
4. Provide option to return to home page

## Security Considerations

### 1. Environment Variables
- Never commit API keys to version control
- Use different keys for test and production environments
- Rotate keys regularly

### 2. Webhook Security
- Always verify webhook signatures
- Use HTTPS in production
- Implement idempotency to prevent duplicate processing

### 3. Data Validation
- Validate all input data
- Sanitize user inputs
- Implement proper error handling

### 4. CORS Configuration
```typescript
app.use(cors({ 
  origin: process.env.FRONTEND_URL,
  credentials: true 
}));
```

## Testing

### 1. Test Cards
Use Stripe's test cards for development:
- Success: `4242424242424242`
- Decline: `4000000000000002`
- 3D Secure: `4000002500003155`
- International: `4000001240000000`
- Insufficient funds: `4000000000009995`

### 2. (Optional) Webhook Testing
Use Stripe CLI to test webhooks locally:
```bash
stripe listen --forward-to localhost:8000/api/stripe/webhook
```

### 3. Test Mode Verification
1. Ensure your dashboard shows "Test mode" in the top-right corner
2. All API keys should start with `pk_test_` and `sk_test_`
3. Webhook endpoints should use test mode URLs
4. No real charges will be made in test mode

### 4. Error Handling
Test various error scenarios:
- Invalid order ID
- Insufficient stock
- Network failures
- Invalid payment methods
- Declined payments
- 3D Secure authentication failures

## Troubleshooting

### Common Issues

1. **Webhook not received**
   - Check webhook endpoint URL
   - Verify webhook secret
   - Ensure endpoint is accessible

2. **Payment not processing**
   - Check Stripe keys
   - Verify product stripePriceId
   - Check order status

3. **Embedded Checkout not loading**
   - Verify publishable key
   - Check network connectivity
   - Ensure proper CORS configuration

### Debug Steps

1. Check server logs for errors
2. Verify environment variables
3. Test webhook endpoint
4. Check Stripe dashboard for events
5. Verify database connections

### Monitoring

1. Monitor webhook delivery
2. Track payment success rates
3. Monitor order fulfillment
4. Set up error alerts

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Embedded Checkout](https://stripe.com/docs/payments/embedded-checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

This guide provides a complete implementation of Stripe payment integration with proper error handling, security measures, and testing procedures. The implementation follows Stripe's best practices and includes both frontend and backend components for a seamless payment experience. 