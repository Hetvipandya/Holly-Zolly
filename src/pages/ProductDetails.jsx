// import { Link, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaHeart, FaStar } from "react-icons/fa";
// import { FiArrowLeft } from "react-icons/fi";

// export default function ProductDetails() {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const backendUrl = "http://localhost:5001";

//   // ---------------- FETCH SINGLE PRODUCT ----------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(
//           `${backendUrl}/api/product/${id}`
//         );

//         const data = await res.json();

//         setProduct(data.data || data);

//       } catch (err) {
//         console.log(err.message);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   // ---------------- FETCH ALL PRODUCTS (RELATED) ----------------
//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const res = await fetch(
//           `${backendUrl}/api/product/all`
//         );

//         const data = await res.json();

//         setProducts(data.data || data || []);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };

//     fetchAllProducts();
//   }, []);

//   if (loading)
//     return <div className="p-10 text-center font-bold">Loading...</div>;

//   if (!product)
//     return (
//       <div className="p-10 text-center">
//         <h2 className="text-red-500 text-xl font-bold">
//           Product Not Found
//         </h2>
//         <Link to="/shop" className="text-blue-500 underline mt-4 block">
//           Back to Shop
//         </Link>
//       </div>
//     );

//   // ---------------- RELATED PRODUCTS ----------------
//   const relatedProducts = products.filter(
//     (p) =>
//       p._id !== product._id &&
//       p.categoryId?._id === product.categoryId?._id
//   );

//   return (
//     <section className="py-10">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* BACK */}
//         <Link
//           to="/shop"
//           className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
//         >
//           <FiArrowLeft /> Back
//         </Link>

//         <div className="grid md:grid-cols-2 gap-10">

//           {/* IMAGE FIX */}
//           <div>
//             <img
//               src={
//                 product.image
//                   ? `${backendUrl}/uploads/${product.image}`
//                   : "https://via.placeholder.com/400"
//               }
//               alt={product.productName}
//               className="w-full h-[450px] object-contain rounded-lg border bg-white"
//               onError={(e) => {
//                 e.target.src =
//                   "https://via.placeholder.com/400?text=No+Image";
//               }}
//             />
//           </div>

//           {/* DETAILS */}
//           <div>
//             <span className="text-sm text-orange-600 font-semibold uppercase">
//               {product.categoryId?.name}
//             </span>

//             <h1 className="text-4xl font-bold mt-2">
//               {product.productName}
//             </h1>

//             <div className="mt-4 flex items-center gap-4">
//               <p className="text-3xl font-bold text-black">
//                 ₹{product.price}
//               </p>

//               <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
//                 <FaStar /> {product.rating}
//               </div>
//             </div>

//             <p className="mt-6 text-gray-600 leading-relaxed">
//               {product.description}
//             </p>

//             <div className="flex gap-4 mt-10">
//               <button className="flex-1 bg-orange-600 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition">
//                 Add To Cart
//               </button>

//               <button className="border p-3 rounded-md hover:bg-red-50">
//                 <FaHeart className="text-gray-400 hover:text-red-500" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ---------------- RELATED PRODUCTS ---------------- */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-16">
//             <h2 className="text-2xl font-bold mb-6">
//               Related Products
//             </h2>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//               {relatedProducts.slice(0, 4).map((item) => (
//                 <Link
//                   key={item._id}
//                   to={`/product/${item._id}`}
//                   className="border rounded-lg overflow-hidden hover:shadow-lg transition"
//                 >
//                   <img
//                     src={
//                       item.image
//                         ? `${backendUrl}/uploads/${item.image}`
//                         : "https://via.placeholder.com/300"
//                     }
//                     alt={item.productName}
//                     className="h-40 w-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/300?text=No+Image";
//                     }}
//                   />

//                   <div className="p-2">
//                     <p className="font-semibold line-clamp-1">
//                       {item.productName}
//                     </p>

//                     <div className="flex justify-between items-center mt-1">
//                       <p className="text-orange-600 font-bold">
//                         ₹{item.price}
//                       </p>

//                       <span className="text-xs text-gray-500">
//                         ⭐ {item.rating || 4.2}
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}

//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaStar, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const backendUrl = "https://holly-zolly-cvjd.onrender.com";

  // ---------------- FETCH SINGLE PRODUCT ----------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${backendUrl}/api/product/${id}`);
        const data = await res.json();

        setProduct(data.data || data);
      } catch (err) {
        console.log(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // ---------------- FETCH ALL PRODUCTS ----------------
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/product/all`);
        const data = await res.json();

        setProducts(data.data || data || []);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchAllProducts();
  }, []);

  // ---------------- CHECK WISHLIST ----------------
  useEffect(() => {
    if (!product) return;

    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const exists = wishlist.some((item) => item._id === product._id);
    setIsWishlisted(exists);
  }, [product]);

  // ---------------- ADD TO CART ----------------
  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first ❗");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const index = cart.findIndex((item) => item._id === product._id);

    if (index > -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({
        _id: product._id,
        name: product.productName,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${quantity} item(s) added to cart 🛒`);
  };

  // ---------------- WISHLIST TOGGLE ----------------
  const toggleWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const index = wishlist.findIndex((item) => item._id === product._id);

    if (index > -1) {
      wishlist.splice(index, 1);
      setIsWishlisted(false);
      toast.success("Removed from wishlist ❌");
    } else {
      wishlist.push({
        _id: product._id,
        name: product.productName,
        price: product.price,
        image: product.image,
      });
      setIsWishlisted(true);
      toast.success("Added to wishlist ❤️");
    }

    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-red-500 text-3xl font-bold mb-4">
            Product Not Found
          </h2>
          <Link to="/shop" className="text-blue-500 underline text-lg">
            Back to Shop
          </Link>
        </div>
      </div>
    );

  // ---------------- RELATED PRODUCTS ----------------
  const relatedProducts = products.filter(
    (p) =>
      p._id !== product._id &&
      p.categoryId?._id === product.categoryId?._id
  );

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* BACK BUTTON */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-orange-600 transition-colors duration-300 text-lg font-medium"
        >
          <FiArrowLeft className="text-xl" /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* PRODUCT IMAGE */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <img
                src={
                  product.image
                    ? `${backendUrl}/uploads/${product.image}`
                    : "https://via.placeholder.com/600"
                }
                alt={product.productName}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600?text=No+Image";
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange-500 rounded-full opacity-20"></div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              {product.categoryId?.name}
            </div>

            {/* Product Name */}
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {product.productName}
            </h1>

            {/* Price and Rating */}
            <div className="flex items-center gap-6">
              <p className="text-4xl font-bold text-orange-600">
                ₹{product.price}
              </p>
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <FaStar className="text-yellow-500" />
                <span className="font-bold">{product.rating}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FaMinus />
                </button>
                <span className="px-4 py-2 font-bold text-xl">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FaShoppingCart /> Add To Cart
              </button>

              <button
                onClick={toggleWishlist}
                className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl ${
                  isWishlisted
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300"
                }`}
              >
                <FaHeart className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        item.image
                          ? `${backendUrl}/uploads/${item.image}`
                          : "https://via.placeholder.com/300"
                      }
                      alt={item.productName}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300?text=No+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {item.productName}
                    </h3>

                    <div className="flex justify-between items-center">
                      <p className="text-orange-600 font-bold text-xl">
                        ₹{item.price}
                      </p>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span className="text-gray-600 text-sm font-medium">
                          {item.rating || 4.2}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}