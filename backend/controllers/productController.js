const { Product, Category } = require('../models'); // ✅ import from index.js

// GET all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // number of products per page
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      include: [{ model: Category, as: 'category' }],
      limit,
      offset
    });

    res.json({
      total: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page,
      data: products.rows
    });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET products by category with pagination
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: { categoryId },
      include: [{ model: Category, as: 'category' }],
      limit,
      offset
    });

    res.json({
      total: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: page,
      data: products.rows
    });
  } catch (err) {
    console.error("❌ Error fetching products by category:", err);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};
