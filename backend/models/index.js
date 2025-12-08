// to set up association between category and product

const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require("./User")(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Export all models
module.exports = { sequelize, Product, Category, User };
// module.exports = { sequelize, Product, Category };
