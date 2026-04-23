// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import productsData from "../../data/products"; // 👈 adjust path if needed

// export default function ProductEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // FIND PRODUCT (TEMP: FROM DATA FILE)
//   const product = productsData.find(
//     (p) => p.id === Number(id)
//   );

//   const [form, setForm] = useState(null);

//   // LOAD PRODUCT INTO FORM
//   useEffect(() => {
//     if (product) {
//       setForm({
//         name: product.name,
//         sku: product.sku,
//         price: product.price,
//         originalPrice: product.originalPrice,
//         stockQty: product.stockQty,
//         rating: product.rating,
//         category: product.category,
//         sizes: product.sizes.join(", "),
//         isBestSeller: product.isBestSeller,
//         isSale: product.isSale,
//       });
//     }
//   }, [product]);

//   if (!form) {
//     return <div className="p-6">Loading...</div>;
//   }

//   // HANDLE CHANGE
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // SUBMIT
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedProduct = {
//       ...product,
//       ...form,
//       price: Number(form.price),
//       originalPrice: Number(form.originalPrice),
//       stockQty: Number(form.stockQty),
//       rating: Number(form.rating),
//       sizes: form.sizes.split(",").map((s) => s.trim()),
//       stock: form.stockQty > 0,
//     };

//     console.log("UPDATED PRODUCT:", updatedProduct);

//     // 🔜 later: API PUT request
//     navigate("/admin/products");
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="bg-white w-full p-6 rounded shadow">

//         <h3 className="text-xl font-heading font-bold mb-6 text-primary">
//           Edit Product
//         </h3>

//         <form className="space-y-6" onSubmit={handleSubmit}>

//           {/* NAME */}
//           <div>
//             <span className="font-bold">Name</span>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//               required
//             />
//           </div>

//           {/* SKU */}
//           <div>
//             <span className="font-bold">SKU</span>
//             <input
//               name="sku"
//               value={form.sku}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//               required
//             />
//           </div>

//           {/* PRICE */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <span className="font-bold">Price</span>
//               <input
//                 name="price"
//                 type="number"
//                 value={form.price}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <span className="font-bold">Original Price</span>
//               <input
//                 name="originalPrice"
//                 type="number"
//                 value={form.originalPrice}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//                 required
//               />
//             </div>
//           </div>

//           {/* STOCK + RATING */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <span className="font-bold">Stock Qty</span>
//               <input
//                 name="stockQty"
//                 type="number"
//                 value={form.stockQty}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <span className="font-bold">Rating</span>
//               <input
//                 name="rating"
//                 type="number"
//                 step="0.1"
//                 value={form.rating}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//                 required
//               />
//             </div>
//           </div>

//           {/* CATEGORY */}
//           <div>
//             <span className="font-bold">Category</span>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//               required
//             >
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Footwear">Footwear</option>
//               <option value="Accessories">Accessories</option>
//             </select>
//           </div>

//           {/* SIZES */}
//           <div>
//             <span className="font-bold">Sizes</span>
//             <input
//               name="sizes"
//               value={form.sizes}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//               required
//             />
//           </div>

//           {/* CHECKBOXES */}
//           <div className="flex gap-6">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isBestSeller"
//                 checked={form.isBestSeller}
//                 onChange={handleChange}
//               />
//               Best Seller
//             </label>

//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isSale"
//                 checked={form.isSale}
//                 onChange={handleChange}
//               />
//               On Sale
//             </label>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => navigate("/admin/products")}
//               className="px-4 py-2 border rounded"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-primary text-white rounded"
//             >
//               Update
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../data/products"; // ✅ FIX

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(null);

  // 🔥 LOAD PRODUCTS FROM SANITY
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);

      const foundProduct = data.find((p) => p.id === id);
      if (foundProduct) {
        setForm({
          name: foundProduct.name,
          sku: foundProduct.sku,
          price: foundProduct.price,
          originalPrice: foundProduct.originalPrice,
          stockQty: foundProduct.stockQty,
          rating: foundProduct.rating,
          category: foundProduct.category,
          sizes: (foundProduct.sizes || ["Standard"]).join(", "),
          isBestSeller: foundProduct.isBestSeller,
          isSale: foundProduct.isSale,
        });
      }
    };

    fetchData();
  }, [id]);

  if (!form) {
    return <div className="p-6">Loading...</div>;
  }

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      stockQty: Number(form.stockQty),
      rating: Number(form.rating),
      sizes: form.sizes.split(",").map((s) => s.trim()),
      stock: form.stockQty > 0,
    };

    console.log("UPDATED PRODUCT:", updatedProduct);

    // 🔥 NEXT STEP → SANITY UPDATE API
    navigate("/admin/products");
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white w-full p-6 rounded shadow">

        <h3 className="text-xl font-heading font-bold mb-6 text-primary">
          Edit Product
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <span className="font-bold">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <span className="font-bold">SKU</span>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

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

          <div>
            <span className="font-bold">Category</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <span className="font-bold">Sizes</span>
            <input
              name="sizes"
              value={form.sizes}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div className="flex gap-6">
            <label>
              <input
                type="checkbox"
                name="isBestSeller"
                checked={form.isBestSeller}
                onChange={handleChange}
              /> Best Seller
            </label>

            <label>
              <input
                type="checkbox"
                name="isSale"
                checked={form.isSale}
                onChange={handleChange}
              /> On Sale
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button className="px-4 py-2 bg-primary text-white rounded">
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}