module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    timestamps: true,
  });
  return Product;
};
//sequelize converts js objects into SQL table
