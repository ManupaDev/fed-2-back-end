import "dotenv/config";
import { connectDB } from "./index";
import Category from "./entities/Category";
import Product from "./entities/Product";

const CATEGORY_NAMES = ["Socks", "Pants", "T-shirts", "Shoes", "Shorts"];

const ADJECTIVES = [
  "Classic", "Sporty", "Elegant", "Comfy", "Trendy", "Cool", "Premium", "Casual", "Bold", "Vivid",
  "Soft", "Durable", "Lightweight", "Cozy", "Modern", "Vintage", "Chic", "Sleek", "Eco", "Urban"
];
const NOUNS = [
  "Runner", "Style", "Fit", "Wear", "Edition", "Line", "Collection", "Piece", "Design", "Model",
  "Comfort", "Edge", "Wave", "Touch", "Look", "Trend", "Vibe", "Aura", "Motion", "Essence"
];

function getRandomName(categoryName: string) {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${categoryName} ${noun}`;
}

const createProductsForCategory = async (categoryId: any, categoryName: string) => {
  const products = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      categoryId,
      name: getRandomName(categoryName),
      price: Math.floor(Math.random() * 100) + 10,
      image: `https://via.placeholder.com/150?text=${encodeURIComponent(categoryName)}`,
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