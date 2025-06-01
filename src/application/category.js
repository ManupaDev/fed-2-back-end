import Category from "../infrastructure/db/entities/category.js";

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const createCategory = async (req, res) => {
  const newCategory = req.body;
  await Category.create(newCategory);
  res.status(201).json(newCategory);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

const updateCategoryById = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
};

const deleteCategoryById = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
};

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
