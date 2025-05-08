const Product = require("../models/Product");
const Purchase = require("../models/Purchase");

exports.buyProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // comes from auth middleware

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const purchase = new Purchase({
      user: userId,
      product: productId,
      price: product.price,
      name: product.name
    });

    await purchase.save();

    res.status(201).json({ message: "Purchase successful" });
  } catch (error) {
    console.error("Error purchasing product:", error);
    res.status(500).json({ message: "Error purchasing product" });
  }
};

exports.getUserPurchases = async (req, res) => {
  try {
    const userId = req.user.id;

    const purchases = await Purchase.find({ user: userId }).populate("product");
    const formatted = purchases.map(p => ({
      _id: p._id,
      name: p.name,
      price: p.price
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching user purchases:", error);
    res.status(500).json({ message: "Error fetching purchases" });
  }
};
