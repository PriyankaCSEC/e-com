const { Category, Product } = require('../models');

// GET all categories (with their products)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: 'products' }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
