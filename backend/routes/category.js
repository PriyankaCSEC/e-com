const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { Category, Product } = require("../models"); // import your models



router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);


// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get all products for a given category
router.get("/:categoryId/products", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { categoryId },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
