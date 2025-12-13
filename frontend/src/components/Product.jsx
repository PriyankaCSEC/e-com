import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function Product({ categoryId: propCategoryId }) {
  const params = useParams();
  const categoryId = propCategoryId ?? params.id;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Ensure quantity changes are handled for each product
  const changeQty = (productId, delta) => {
    setQuantities((prev) => {
      const cur = prev[productId] ?? 1;
      const next = Math.max(1, Math.min(99, cur + delta));
      return { ...prev, [productId]: next };
    });
  };

  useEffect(() => {
    if (!categoryId) {
      setProducts([]);
      setTotalPages(1);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    api
      .get(`/products/category/${categoryId}?page=${page}`)
      .then((res) => {
        if (!mounted) return;
        const data = res?.data?.data ?? res?.data ?? [];
        const tp = res?.data?.totalPages ?? 1;
        setProducts(Array.isArray(data) ? data : []);
        setTotalPages(Number.isFinite(tp) ? tp : 1);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        if (!mounted) return;
        setError("Failed to load products");
        setProducts([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [categoryId, page]);

  const safeKey = (p) => p.id ?? p._id ?? p.name ?? Math.random();

  if (!categoryId) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Select a category to see products.</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {loading && <div className="text-center py-6">Loading products…</div>}
      {error && <div className="text-center text-red-400 py-6">{error}</div>}
      {!loading && products.length === 0 && !error && (
        <div className="text-center py-6">No products found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {products.map((p) => (
          <div key={safeKey(p)} className=" flex flex-row-1 bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
            { (
              <img
                src="/src/assets/react.svg"
                alt={p.name}
                className="w-full h-60 object-cover rounded mb-3"
              />
            )}
            <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{p.description}</p>
            {/* <div className="mt-auto flex "> */}
              <div>
                <p className="font-bold text-lg">₹{Number(p.price||0).toFixed(1)}</p>
              </div>

              <div className="flex flex-col-4 gap-4 items-center mt-5">
                <div className="flex items-center border rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => changeQty(p.id ?? p._id, -1)}
                    className="px-3 py-1 bg-gray-200 text-gray-800"
                  >
                    -
                  </button>
                  <div className="px-4 py-1 bg-white text-gray-900">
                    {quantities[p.id ?? p._id] || 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => changeQty(p.id ?? p._id, 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="product-btn px-2 py-2 rounded text-white font-medium"
                >
                  Add to cart
                </button>
              </div>
            {/* </div> */}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3 items-center">
        <button
          onClick={() => setPage((cur) => Math.max(1, cur - 1))}
          disabled={page <= 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((cur) => Math.min(totalPages, cur + 1))}
          disabled={page >= totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <style>{`
        .product-btn {
          background-color: #7b2bdcff !important;
        }
        .product-btn:hover { filter: brightness(0.95); }
      `}</style>
    </div>
  );
}