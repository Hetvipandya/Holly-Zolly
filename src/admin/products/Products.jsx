import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const backendUrl = "https://holly-zolly-cvjd.onrender.com";

  // 🔥 FETCH FROM YOUR API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/product/all`
        );
        const data = await res.json();

        console.log("API DATA:", data); // 👈 DEBUG

        setProducts(data.products || data); // support both formats
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  // ❌ DELETE (frontend only)
  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p._id !== id));
      toast.error("Product deleted");
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary">
          Products
        </h2>

        <Link
          to="/admin/products/add"
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="bg-primary/70">
            <tr className="text-light">
              <th className="p-3">Image</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">

                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={
                      product.image
                        ? product.image.startsWith("http")
                          ? product.image
                          : `${backendUrl}/uploads/${product.image}`
                        : "https://via.placeholder.com/60"
                    }
                    alt={product.productName || product.title || "Product image"}
                    className="w-14 h-14 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/60?text=No+Image";
                    }}
                  />
                </td>

                {/* PRODUCT NAME */}
                <td className="p-3 font-semibold">
                  {product.productName}
                </td>

                {/* CATEGORY */}
                <td className="p-3 capitalize">
                  {product.categoryId?.name ||
                    (typeof product.category === "object"
                      ? product.category?.title
                      : product.category) ||
                    "No Category"}
                </td>

                {/* PRICE */}
                <td className="p-3 font-semibold text-primary">
                  ₹{product.price}
                </td>

                {/* DESCRIPTION */}
                <td className="p-3 text-gray-500 text-xs max-w-[250px] truncate">
                  {product.description}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/edit/${product._id}`)
                    }
                    className="text-blue-600 mr-2"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}