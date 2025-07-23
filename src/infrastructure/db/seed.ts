import "dotenv/config";
import { connectDB } from "./index";
import Category from "./entities/Category";
import Product from "./entities/Product";

const CATEGORY_NAMES = ["Socks", "Pants", "T-shirts", "Shoes", "Shorts"];

const createProductsForCategory = async (categoryId: any, categoryName: string) => {
  const products = [];
  for (let i = 1; i <= 10; i++) {
    products.push({
      categoryId,
      name: `${categoryName} Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: `https://via.placeholder.com/150?text=${encodeURIComponent(categoryName + ' ' + i)}`,
      stock: Math.floor(Math.random() * 50) + 1,
      reviews: [],
    });
  }
  await Product.insertMany(products);
};

const seed = async () => {
  await connectDB();
  await Category.deleteMany({});
  await Product.deleteMany({});

  for (const name of CATEGORY_NAMES) {
    const category = await Category.create({ name });
    await createProductsForCategory(category._id, name);
    console.log(`Seeded category: ${name}`);
  }

  console.log("Seeding complete.");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
}); 