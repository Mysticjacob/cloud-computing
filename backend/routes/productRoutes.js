const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const product = new Product({ name, price, imageUrl });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch {
    res.status(500).json({ message: "Error adding product" });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
