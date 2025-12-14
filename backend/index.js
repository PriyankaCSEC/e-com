const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const cors = require('cors');
const app = express(); // ✅ must come before app.use()


//Enable CORS in backend/index.js

// app.use(cors({ origin: 'http://localhost:5173' })); //allow only this origin
app.use(cors()); //allow any origin


dotenv.config();
// const app = express();

app.use(express.json());

// routes
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const authRoutes = require("./routes/authRoutes");


app.use("/api/auth", authRoutes);//user
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
//  Use the category routes
// app.use("/api/categories", categoryRoutes);

// DB connection
sequelize.sync({ alter: false })
  .then(() => console.log('✅ Models synced!'))
  .catch(err => console.error('❌ DB Sync Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        