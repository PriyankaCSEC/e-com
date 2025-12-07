import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Product from "./components/Product";
import Login from "./components/Login";
// import Allproduct from "./components/Allproduct";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        
        <Route path="/" element={<Category />} />
        <Route path="/category/:id" element={<Product />} />
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/all-products" element={<Allproduct />} /> */}
      </Routes>
    </Router>
  );
}
