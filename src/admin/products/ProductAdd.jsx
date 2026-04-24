import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    originalPrice: "",
    stockQty: "",
    rating: "",
    category: "",
    sizes: "",
    isBestSeller: false,
    isSale: false,
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      stockQty: Number(form.stockQty),
      rating: Number(form.rating),
      sizes: form.sizes.split(",").map((s) => s.trim()),
      createdAt: new Date().toISOString().split("T")[0],
      stock: form.stockQty > 0,
    };

    console.log("NEW PRODUCT:", newProduct);

    // 🔜 later: API call / state update
    navigate("/admin/products");
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white w-full  p-6 rounded shadow">

        <h3 className="text-xl font-heading font-bold mb-6 text-primary">
          Add Product
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <div>
            <span className="font-bold">Name</span>
            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* SKU */}
          <div>
            <span className="font-bold">SKU</span>
            <input
              name="sku"
              placeholder="MEN-TS-001"
              value={form.sku}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* PRICE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold">Price</span>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div>
              <span className="font-bold">Original Price</span>
              <input
                name="originalPrice"
                type="number"
                value={form.originalPrice}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
          </div>

          {/* STOCK + RATING */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold">Stock Qty</span>
              <input
                name="stockQty"
                type="number"
                value={form.stockQty}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div>
              <span className="font-bold">Rating</span>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <span className="font-bold">Category</span>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* SIZES */}
          <div>
            <span className="font-bold">Sizes</span>
            <input
              name="sizes"
              placeholder="S, M, L, XL"
              value={form.sizes}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* CHECKBOXES */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={form.isBestSeller}
                onChange={handleChange}
              />
              Best Seller
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isSale"
                checked={form.isSale}
                onChange={handleChange}
              />
              On Sale
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
