import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import initProductRouter from "./routes/init.js";
import featuredItemsRouter from "./routes/featuredItems.js";
import productsRouter from "./routes/product.js";
import basketRouter from "./routes/basket.js";
import CategoryRouter from "./routes/category.js";
const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;
// app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(cors({
  origin:"http://13.233.115.17/"
}));
app.use(express.json());
// routes

// app.use("/init", initProductRouter);
// app.use("/featuredItems", featuredItemsRouter);
app.use("/products", productsRouter);
app.use("/Category", CategoryRouter);
app.use("/user", userRouter);
// app.use("/order", orderRouter);
// app.use("/basket", basketRouter);
// app.use('/uploads', express.static('uploads'));

// Connect to MongoDB Atlas database
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas database");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas database:", error);
  });

// connect to the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
