import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Product from "./Product";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.mainLayout}>
        {/* Left Sidebar - Categories */}
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Categories</h2>
          <ul style={styles.categoryList}>
            {categories.map((cat) => (
              <li
                key={cat.id ?? cat._id}
                onClick={() => setSelectedCategory(cat.id ?? cat._id)}
                style={{
                  ...styles.categoryItem,
                  ...(selectedCategory === (cat.id ?? cat._id) ? styles.categoryItemActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== (cat.id ?? cat._id)) {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== (cat.id ?? cat._id)) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Side - Products (delegated to Product component) */}
        <div style={{ flex: 1 }}>
          <Product categoryId={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: " #7b2bdcff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  mainLayout: {
    display: "flex",
    padding: "24px",
    gap: "24px",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#ffffffff",
    borderRadius: "12px",
    boxShadow: " rgba(0, 0, 0, 1)",
    padding: "16px",
    height: "fit-content",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#000000ff",
    marginTop: 0,
  },
  categoryList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  categoryItem: {
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "8px",
    marginBottom: "8px",
    color: "#000000ff",
    transition: "all 0.2s",
  },
  categoryItemActive: {
    backgroundColor: " #7b2bdcff",
    color: " #ffffffff",
  },
};                                         