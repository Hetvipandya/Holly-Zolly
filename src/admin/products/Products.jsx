import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import productsdata from "../../data/products"
import { Link, useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState(productsdata);

  const navigate = useNavigate();


  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
    toast.error("Product deleted");
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
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-primary/70">
            <tr className="text-light">
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">SKU</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Stock Qty</th>
              <th className="text-left p-3">Rating</th>
              <th className="text-left p-3">Flags</th>
              <th className="text-left p-3">Status</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                {/* PRODUCT NAME */}
                <td className="p-3 font-semibold">
                  {product.name}
                </td>

                {/* SKU */}
                <td className="p-3 text-gray-600">
                  {product.sku}
                </td>

                {/* CATEGORY */}
                <td className="p-3 capitalize">
                  {product.category}
                </td>

                {/* PRICE */}
                <td className="p-3">
                  <span className="font-semibold text-primary">
                    ₹{product.price}
                  </span>
                  <br />
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                </td>

                {/* STOCK QTY */}
                <td className="p-3">
                  {product.stockQty}
                </td>

                {/* RATING */}
                <td className="p-3">
                  ⭐ {product.rating}
                </td>

                {/* FLAGS */}
                <td className="p-3 space-x-2">
                  {product.isSale && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                      Sale
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      Bestseller
                    </span>
                  )}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${product.stock && product.stockQty > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {product.stock && product.stockQty > 0
                      ? "Active"
                      : "Out of Stock"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                    className="text-blue-600 mr-2"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
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
