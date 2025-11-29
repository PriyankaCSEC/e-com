import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function Product() {
  const { id } = useParams(); // category ID
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.get(`/products/category/${id}?page=${page}`)
      .then(res => {
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, [id, page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="font-bold mt-2">₹{p.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
