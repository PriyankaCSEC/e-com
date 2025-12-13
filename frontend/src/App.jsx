import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Product from "./components/Product";
import Login from "./components/Login";
import Register from "./components/Register";
// import Allproduct from "./components/Allproduct";

export default function App() {
  return (
    <Router>
      
      <Routes>
      
        
        <Route path="/category" element={<Category />} />
        <Route path="/category/:id" element={<Product />} />
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}
