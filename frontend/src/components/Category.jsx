import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Fetch products when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/categories/${selectedCategory}/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Filter products by search term
  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      
     

      {/* Layout container */}
      <div style={styles.mainLayout}>
        {/* Left Sidebar - Categories */}
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Categories</h2>
          <ul style={styles.categoryList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  ...styles.categoryItem,
                  ...(selectedCategory === cat.id ? styles.categoryItemActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat.id) {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Side - Products */}
        <main style={styles.mainContent}>
          <h2 style={styles.contentTitle}>
            {selectedCategory
              ? `Products in ${categories.find((c) => c.id === selectedCategory)?.name}`
              : "Select a category"}
          </h2>

          {selectedCategory && (
            <div style={styles.productGrid}>
              {filteredProducts.length === 0 ? (
                <p style={styles.noProducts}>No products found.</p>
              ) : (
                filteredProducts.map((prod) => (
                  <div 
                    key={prod.id} 
                    style={styles.productCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                    }}
                  >
                    <img
                      src={prod.image || "https://via.placeholder.com/200"}
                      alt={prod.name}
                      style={styles.productImage}
                    />
                    <div style={styles.productInfo}>
                      <h3 style={styles.productName}>{prod.name}</h3>
                      <p style={styles.productDescription}>
                        {prod.description || "No description"}
                      </p>
                      <p style={styles.productPrice}>₹{prod.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  navbar: {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  searchContainer: {
    position: "relative",
    width: "33%",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    fontSize: "14px",
  },
  searchInput: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "9999px",
    padding: "8px 16px 8px 36px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  mainLayout: {
    display: "flex",
    padding: "24px",
    gap: "24px",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    padding: "16px",
    height: "fit-content",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#1f2937",
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
    color: "#374151",
    transition: "all 0.2s",
  },
  categoryItemActive: {
    backgroundColor: "#ec4899",
    color: "#ffffff",
  },
  mainContent: {
    flex: 1,
  },
  contentTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    marginTop: 0,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "24px",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "box-shadow 0.3s",
    cursor: "pointer",
  },
  productImage: {
    width: "100%",
    height: "192px",
    objectFit: "cover",
  },
  productInfo: {
    padding: "16px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    color: "#1f2937",
  },
  productDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 8px 0",
  },
  productPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ec4899",
    margin: 0,
  },
  noProducts: {
    color: "#6b7280",
    fontSize: "14px",
  },
};