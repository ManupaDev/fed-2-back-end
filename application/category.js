import { categories } from "../data.js";

const getAllCategories = (req, res) => {
  res.json(categories);
};

const createCategory = (req, res) => {
  const newId = (categories.length + 1).toString();
  const newCategory = {
    _id: newId,
    ...req.body,
    __v: 0,
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
};

const getCategoryById = (req, res) => {
  const category = categories.find((c) => c._id === req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

const deleteCategoryById = (req, res) => {
  const index = categories.findIndex((c) => c._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  const deletedCategory = categories[index];
  categories.splice(index, 1);
  res.json(deletedCategory);
};

const updateCategoryById = (req, res) => {
  const index = categories.findIndex((c) => c._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  categories[index] = {
    ...categories[index],
    ...req.body,
    _id: req.params.id,
  };

  res.json(categories[index]);
};

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
