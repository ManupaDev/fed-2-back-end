import Product from "../infrastructure/db/entities/product.js";

const getAllProducts = async (req, res) => {
  const categoryId = req.query.categoryId;
  if (categoryId) {
    const products = await Product.find({ categoryId });
    res.json(products);
  } else {
    const products = await Product.find();
    res.json(products);
  }
};

const createProduct = async (req, res) => {
  const newProduct = req.body;
  await Product.create(newProduct);
  res.status(201).json(newProduct);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

const updateProductById = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully" });
};

export {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
};
