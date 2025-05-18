const express = require('express');
const { products, categories } = require('./data');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST new product
app.post('/api/products', (req, res) => {
  const newId = (products.length + 1).toString();
  const newProduct = {
    _id: newId,
    ...req.body,
    __v: 0
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products[index] = {
    ...products[index],
    ...req.body,
    _id: req.params.id
  };
  
  res.json(products[index]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const deletedProduct = products[index];
  products.splice(index, 1);
  res.json(deletedProduct);
});

// GET all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// GET single category by ID
app.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c._id === req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

// POST new category
app.post('/api/categories', (req, res) => {
  const newId = (categories.length + 1).toString();
  const newCategory = {
    _id: newId,
    ...req.body,
    __v: 0
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PUT update category
app.put('/api/categories/:id', (req, res) => {
  const index = categories.findIndex(c => c._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  categories[index] = {
    ...categories[index],
    ...req.body,
    _id: req.params.id
  };
  
  res.json(categories[index]);
});

// DELETE category
app.delete('/api/categories/:id', (req, res) => {
  const index = categories.findIndex(c => c._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  const deletedCategory = categories[index];
  categories.splice(index, 1);
  res.json(deletedCategory);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
