import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js"; 
import products from "./data/product.js";
import sampleOrders from "./data/order.js"; 

dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB connection failed:", err));

const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany(); // 

    // create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const user = createdUser._id;

    // assign created user's ID to products
    const sampleProducts = products.map((product) => ({
      ...product,
      user,
    }));

    // insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);

    // assign productId references to sample orders
    const mappedOrders = sampleOrders.map((order) => ({
      ...order,
      user, // use admin as the order's user (or replace with different users later)
      orderItems: order.orderItems.map((item) => {
        const matchedProduct = createdProducts.find(
          (p) => p.name === item.name
        );
        return {
          ...item,
          productId: matchedProduct ? matchedProduct._id : null,
        };
      }),
    }));

    // insert sample orders
    await Order.insertMany(mappedOrders);

    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(" Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
