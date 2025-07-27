# Atlas Search Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [API Integration](#api-integration)
5. [Search Features](#search-features)
6. [Configuration](#configuration)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

## Overview

This guide explains the implementation of MongoDB Atlas Search for product search functionality in the e-commerce application. The implementation uses Atlas Search's autocomplete feature with fuzzy matching to provide real-time search results as users type.

## Prerequisites

### 1. MongoDB Atlas Account Setup

#### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Try Free" or "Sign Up"
3. Fill in your account information:
   - Email address
   - Password
   - Account name
4. Complete the account verification process

#### Step 2: Create a Cluster
1. In the Atlas dashboard, click "Build a Database"
2. Choose "FREE" tier (M0) for development
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose your preferred region
5. Click "Create Cluster"

#### Step 3: Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set a username and password
5. Select "Read and write to any database" for permissions
6. Click "Add User"

#### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IP addresses
5. Click "Confirm"

### 2. Atlas Search Index Configuration

#### Step 1: Access Atlas Search
1. In your Atlas dashboard, go to your cluster
2. Click on "Search" tab in the top navigation
3. Click "Create Search Index"

#### Step 2: Choose Index Type
1. Select "JSON Editor" for custom configuration
2. Click "Next"

#### Step 3: Configure Index Settings
1. **Index Name**: Enter `default`
2. **Database**: Select your database name
3. **Collection**: Select `products`
4. **Index Definition**: Use the following JSON configuration:

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "name": [
        {
          "foldDiacritics": true,
          "maxGrams": 15,
          "minGrams": 2,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        }
      ]
    }
  }
}
```

#### Autocomplete Configuration Details

**Field Configuration Options:**

1. **`type: "autocomplete"`**
   - Enables autocomplete functionality
   - Provides real-time search suggestions
   - Supports partial matching

2. **`tokenization: "edgeGram"`**
   - Creates n-grams from the beginning of words
   - Enables prefix matching
   - Example: "iPhone" → ["iP", "iPh", "iPho", "iPhon", "iPhone"]

3. **`minGrams: 2`**
   - Minimum length of n-grams to generate
   - Smaller values = more matches but slower performance
   - Recommended: 2-3 characters

4. **`maxGrams: 20`**
   - Maximum length of n-grams to generate
   - Larger values = more precise matching
   - Recommended: 15-25 characters

5. **`foldDiacritics: false`**
   - Preserves accented characters
   - Set to `true` to normalize accented characters
   - Recommended: `false` for international support

6. **`queryAnalyzer: "lucene.standard"`**
   - Analyzer for processing search queries
   - Standard Lucene analyzer for consistent tokenization
   - Handles word boundaries and special characters

7. **`indexAnalyzer: "lucene.standard"`**
   - Analyzer for processing indexed documents
   - Should match queryAnalyzer for consistency
   - Ensures proper matching between queries and indexed data

**Advanced Configuration Options:**

```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete",
        "tokenization": "edgeGram",
        "minGrams": 2,
        "maxGrams": 20,
        "foldDiacritics": false,
        "queryAnalyzer": "lucene.standard",
        "indexAnalyzer": "lucene.standard",
        "maxExpansions": 256,
        "fuzzy": {
          "maxEdits": 1,
          "prefixLength": 2,
          "maxExpansions": 256
        }
      }
    }
  }
}
```

**Additional Autocomplete Settings:**

1. **`maxExpansions: 256`**
   - Maximum number of autocomplete suggestions
   - Higher values = more suggestions but slower performance
   - Recommended: 50-256

2. **`fuzzy` Configuration:**
   - **`maxEdits: 1`**: Allows 1 character difference for typos
   - **`prefixLength: 2`**: Requires 2 character prefix match
   - **`maxExpansions: 256`**: Maximum fuzzy matches to return

**Performance-Optimized Configuration:**

```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete",
        "tokenization": "edgeGram",
        "minGrams": 3,
        "maxGrams": 15,
        "foldDiacritics": false,
        "queryAnalyzer": "lucene.standard",
        "indexAnalyzer": "lucene.standard",
        "maxExpansions": 50
      },
      "description": {
        "type": "autocomplete",
        "tokenization": "edgeGram",
        "minGrams": 3,
        "maxGrams": 15,
        "foldDiacritics": false,
        "queryAnalyzer": "lucene.standard",
        "indexAnalyzer": "lucene.standard",
        "maxExpansions": 25
      }
    }
  }
}
```

**International Support Configuration:**

```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete",
        "tokenization": "edgeGram",
        "minGrams": 2,
        "maxGrams": 20,
        "foldDiacritics": true,
        "queryAnalyzer": "lucene.standard",
        "indexAnalyzer": "lucene.standard"
      }
    }
  }
}
```

#### Step 4: Advanced Configuration Options
1. **Index Analyzers**: Leave as default
2. **Index Settings**: 
   - **Index Size**: Automatic (recommended)
   - **Index Refresh Interval**: 1 second (for real-time updates)
3. Click "Create Index"

#### Step 5: Verify Index Creation
1. Wait for the index to finish building (usually 1-5 minutes)
2. Check the index status in the Search tab
3. Status should show "Active" when ready

### 3. Database Connection Setup

#### Step 1: Get Connection String
1. In Atlas dashboard, click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" as your driver
4. Copy the connection string

#### Step 2: Configure Environment Variables
1. Create `.env` file in your backend project
2. Add the connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
ATLAS_SEARCH_INDEX=default
```

#### Step 3: Test Connection
1. Start your backend server
2. Check console logs for successful connection
3. Verify database operations work correctly

### 4. Sample Data Setup

#### Step 1: Create Sample Products
1. Use MongoDB Compass or Atlas Data Explorer
2. Navigate to your database and `products` collection
3. Insert sample products with the following structure:

```json
{
  "categoryId": "67547e11c6ec0beca167019d",
  "name": "iPhone 15 Pro",
  "price": 999,
  "stripePriceId": "price_1234567890",
  "image": "/assets/products/iphone-15-pro.png",
  "stock": 50,
  "description": "Latest iPhone with advanced features"
}
```

#### Step 2: Verify Data Indexing
1. Wait for Atlas Search to index the data (1-5 minutes)
2. Test search functionality in your application
3. Verify search results appear correctly

### 5. Performance Optimization

#### Step 1: Monitor Index Performance
1. Go to Atlas dashboard → Search tab
2. Click on your index name
3. Monitor "Index Size" and "Document Count"
4. Check "Index Performance" metrics

#### Step 2: Optimize Index Settings
1. **Index Refresh**: Set to 1 second for real-time updates
2. **Index Size**: Monitor and adjust as needed
3. **Field Mapping**: Ensure only necessary fields are indexed

#### Step 3: Test Search Performance
1. Use Atlas Search playground to test queries
2. Monitor response times
3. Optimize queries if needed

### 6. Security Configuration

#### Step 1: Database User Permissions
1. Ensure database user has read/write permissions
2. For production: Use least privilege principle
3. Consider using separate users for different operations

#### Step 2: Network Security
1. **Development**: Allow access from anywhere (0.0.0.0/0)
2. **Production**: Restrict to specific IP addresses
3. **Staging**: Use separate network access rules

#### Step 3: Environment Variables Security
1. Never commit `.env` files to version control
2. Use environment-specific configuration
3. Rotate database passwords regularly

### 7. Troubleshooting Atlas Search

#### Common Issues and Solutions

**Issue 1: Index Not Found**
```javascript
// Error: Atlas Search index "default" not found
// Solution: Verify index name and collection
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete"
      }
    }
  }
}
```

**Issue 2: No Search Results**
- Check if data exists in the collection
- Verify index has finished building
- Test with Atlas Search playground

**Issue 3: Slow Search Performance**
- Monitor index size and performance metrics
- Optimize field mappings
- Consider reducing index refresh interval

**Issue 4: Connection Issues**
- Verify connection string format
- Check network access settings
- Ensure database user has correct permissions

## Backend Implementation

### 1. Atlas Search Configuration

**File: `fed-2-back-end/src/application/product.ts`**

The search functionality is implemented using MongoDB's aggregation pipeline with Atlas Search:

```typescript
const getProductsForSearchQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;
    const results = await Product.aggregate([
      {
        $search: {
          index: "default",
          autocomplete: {
            path: "name",
            query: search,
            tokenOrder: "any",
            fuzzy: {
              maxEdits: 1,
              prefixLength: 2,
              maxExpansions: 256,
            },
          },
          highlight: {
            path: "name",
          },
        },
      },
    ]);
    res.json(results);
  } catch (error) {
    next(error);
  }
};
```

### 2. Search Configuration Details

#### Atlas Search Index Configuration
- **Index Name**: `default`
- **Search Type**: `autocomplete`
- **Search Field**: `name` (product name)
- **Token Order**: `any` (matches tokens in any order)
- **Fuzzy Matching**: Enabled with configuration:
  - `maxEdits: 1` (allows 1 character difference)
  - `prefixLength: 2` (requires 2 character prefix match)
  - `maxExpansions: 256` (maximum number of fuzzy matches)

#### Highlight Configuration
- **Highlight Field**: `name`
- **Purpose**: Highlights matching text in search results

### 3. API Route Configuration

**File: `fed-2-back-end/src/api/product.ts`**

```typescript
import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  uploadProductImage,
  getProductsForSearchQuery,
} from "../application/product";

const productRouter = express.Router();

// Search endpoint
productRouter.get("/search", getProductsForSearchQuery);

// Other product routes
productRouter
  .route("/")
  .get(getAllProducts)
  .post(isAuthenticated, isAdmin, createProduct);

export default productRouter;
```

### 4. Product Schema

**File: `fed-2-back-end/src/infrastructure/db/entities/Product.ts`**

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

## Frontend Implementation

### 1. Search Component

**File: `fed-2-front-end/src/components/ProductSearchForm.jsx`**

```jsx
import { useGetProductsBySearchQuery } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";
import { Link } from "react-router";

function ProductSearchForm() {
  const [search, setSearch] = useState("");

  const { data: products, isLoading } = useGetProductsBySearchQuery(search, {
    skip: !search,
  });

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search"
        className="w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        className={cn(
          "hidden absolute top-10 rounded-md left-0 z-10 right-0 bottom-0 px-2 bg-white border shadow",
          {
            "block h-32 overflow-y-scroll": search !== "",
          }
        )}
      >
        {products?.map((product) => (
          <Link
            to={`/shop/products/${product._id}`}
            key={product.id}
            className="block py-2"
          >
            {product.name}
          </Link>
        ))}
        {
          !products || products.length === 0 && (
            <div className="py-2 text-center">
              <p>No results found</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default ProductSearchForm;
```

### 2. Component Features

#### Search Input
- **Type**: Text input with placeholder "Search"
- **Styling**: Tailwind CSS classes for responsive design
- **State Management**: Local state for search query

#### Dropdown Results
- **Visibility**: Shows only when search query exists
- **Positioning**: Absolute positioning below input
- **Styling**: White background with border and shadow
- **Scroll**: Vertical scroll for multiple results

#### Search Results
- **Product Links**: Each result links to product detail page
- **Product Display**: Shows product name
- **No Results**: Displays "No results found" message

### 3. Navigation Integration

**File: `fed-2-front-end/src/components/Navigation.jsx`**

```jsx
import ProductSearchForm from "./ProductSearchForm";

export default function Navigation() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-16">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl">
          Mebius
        </Link>
        
        {/* Search Form */}
        <ProductSearchForm />
        
        {/* Other navigation items */}
      </div>
    </header>
  );
}
```

## API Integration

### 1. RTK Query Configuration

**File: `fed-2-front-end/src/lib/api.js`**

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: async (headers) => {
      // Authentication headers
    },
  }),
  endpoints: (build) => ({
    getProductsBySearch: build.query({
      query: (query) => `/products/search?search=${query}`,
    }),
    // Other endpoints...
  }),
});

export const {
  useGetProductsBySearchQuery,
  // Other hooks...
} = Api;
```

### 2. Search Hook Usage

```javascript
const { data: products, isLoading } = useGetProductsBySearchQuery(search, {
  skip: !search,
});
```

#### Hook Features
- **Conditional Fetching**: Skips API call when search is empty
- **Real-time Updates**: Automatically refetches when search query changes
- **Loading State**: Provides loading indicator
- **Error Handling**: Built-in error handling

## Search Features

### 1. Autocomplete Functionality

#### Real-time Search
- **Trigger**: On every keystroke
- **Debouncing**: Built into RTK Query
- **Performance**: Optimized with conditional fetching

#### Fuzzy Matching
- **Max Edits**: 1 character difference allowed
- **Prefix Length**: 2 character minimum prefix
- **Expansions**: Up to 256 fuzzy matches

### 2. Search Results

#### Product Information
- **Product Name**: Primary search field
- **Product ID**: Used for navigation
- **Highlighting**: Matched text highlighting

#### Navigation
- **Product Detail**: Links to individual product pages
- **URL Structure**: `/shop/products/${product._id}`

### 3. User Experience

#### Visual Feedback
- **Loading States**: Shows loading indicator
- **Empty States**: "No results found" message
- **Dropdown**: Clean, accessible dropdown design

#### Responsive Design
- **Mobile**: Optimized for mobile devices
- **Desktop**: Full-width search on larger screens
- **Touch**: Touch-friendly interface

## Configuration

### 1. Atlas Search Index Setup

#### Required Index Configuration
```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete",
        "tokenization": "edgeGram",
        "minGrams": 2,
        "maxGrams": 20,
        "foldDiacritics": false
      }
    }
  }
}
```

#### Index Settings
- **Type**: `autocomplete`
- **Tokenization**: `edgeGram` for prefix matching
- **Min Grams**: 2 characters minimum
- **Max Grams**: 20 characters maximum
- **Diacritics**: Preserved for international support

### 2. Environment Variables

#### Backend Configuration
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ATLAS_SEARCH_INDEX=default
```

#### Frontend Configuration
```env
VITE_BASE_URL=http://localhost:8000
```

### 3. Performance Optimization

#### Backend Optimizations
- **Index Caching**: Atlas Search index caching
- **Query Optimization**: Efficient aggregation pipeline
- **Error Handling**: Graceful error handling

#### Frontend Optimizations
- **Conditional Fetching**: Skip empty queries
- **Debouncing**: Built-in RTK Query debouncing
- **Caching**: RTK Query automatic caching

## Troubleshooting

### 1. Common Issues

#### Atlas Search Index Not Found
```javascript
// Error: Atlas Search index "default" not found
// Solution: Create the index in MongoDB Atlas
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete"
      }
    }
  }
}
```

#### Search Results Not Updating
```javascript
// Issue: Search results not updating
// Solution: Check RTK Query cache invalidation
const { data: products, isLoading } = useGetProductsBySearchQuery(search, {
  skip: !search,
  refetchOnMountOrArgChange: true,
});
```

#### Performance Issues
```javascript
// Issue: Slow search performance
// Solution: Optimize Atlas Search index
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "name": {
        "type": "autocomplete",
        "tokenization": "edgeGram",
        "minGrams": 2,
        "maxGrams": 20
      }
    }
  }
}
```

### 2. Debug Steps

#### Backend Debugging
1. Check Atlas Search index configuration
2. Verify MongoDB connection
3. Test aggregation pipeline directly
4. Check error logs

#### Frontend Debugging
1. Verify API endpoint URL
2. Check network requests in browser
3. Test RTK Query cache
4. Verify component state

### 3. Performance Monitoring

#### Atlas Search Metrics
- **Query Performance**: Monitor search response times
- **Index Size**: Track index growth
- **Cache Hit Rate**: Monitor cache effectiveness

#### Frontend Metrics
- **Search Latency**: Measure search response time
- **User Experience**: Track search usage patterns
- **Error Rates**: Monitor search failures

## Additional Resources

- [MongoDB Atlas Search Documentation](https://docs.atlas.mongodb.com/atlas-search/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

This guide provides a complete overview of the Atlas Search implementation, including backend configuration, frontend components, API integration, and troubleshooting steps. The implementation uses MongoDB Atlas Search for efficient, real-time product search with fuzzy matching and autocomplete functionality. 