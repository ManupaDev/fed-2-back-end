import { products } from "../data.js";

const getAllProducts = (req, res) => {
  res.json(products);
};

const createProduct = (req, res) => {
  const newId = (products.length + 1).toString();

  const newProduct = {
    _id: newId,
    ...req.body,
    __v: 0,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

const getProductById = (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

const updateProductById = (req, res) => {
  const index = products.findIndex((p) => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products[index] = {
    ...products[index],
    ...req.body,
    _id: req.params.id,
  };

  res.json(products[index]);
};

const deleteProductById = (req, res) => {
  const index = products.findIndex((p) => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products[index];
  products.splice(index, 1);
  res.status(200).send();
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
