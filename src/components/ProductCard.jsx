// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
// import toast from "react-hot-toast";

// export default function ProductCard({ product }) {
//   const navigate = useNavigate();

//   // 👉 Navigate to detail
//   const goToDetail = () => {
//     navigate(`/product/${product.id}`);
//   };

//   // ❤️ ADD TO WISHLIST
//   const addToWishlist = (e) => {
//     e.stopPropagation();

//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     const wishlist =
//       JSON.parse(localStorage.getItem("wishlistItems")) || [];

//     const sizeToSend = product.sizes?.[0] || "Standard";

//     const exists = wishlist.some(
//       (item) =>
//         item.id === product.id &&
//         item.selectedSize === sizeToSend 
//     );

//     if (exists) {
//       toast("Already in wishlist ❤️", { icon: "ℹ️" });
//       return;
//     }

//     wishlist.push({
//       ...product,
//       selectedSize: sizeToSend,
//     });

//     localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
//     window.dispatchEvent(new Event("cartUpdated"));

//     toast.success("Added to wishlist ❤️");
//   };

//   // 🛒 ADD TO CART
//   const addToCart = (e) => {
//     e.stopPropagation();

//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     const cart =
//       JSON.parse(localStorage.getItem("cartItems")) || [];

//     const sizeToSend = product.sizes?.[0] || "Standard";

//     const index = cart.findIndex(
//       (item) =>
//         item.id === product.id &&
//         item.selectedSize === sizeToSend
//     );

//     if (index > -1) {
//       cart[index].quantity += 1;
//     } else {
//       cart.push({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.images[0],
//         quantity: 1,
//         selectedSize: sizeToSend,
//       });
//     }

//     localStorage.setItem("cartItems", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));

//     toast.success("Added to cart 🛒");
//   };

//   // 🔥 Discount %
//   const discount =
//     product.originalPrice > product.price
//       ? Math.round(
//           ((product.originalPrice - product.price) /
//             product.originalPrice) *
//             100
//         )
//       : 0;

//   return (
//     <div
//       onClick={goToDetail}
//       className="cursor-pointer group bg-white rounded-[2rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 relative"
//       data-aos="fade-up"
//     >
//       {/* IMAGE */}
//       <div className="relative h-64 overflow-hidden bg-[#F9F9F9]">

//         {/* BADGES */}
//         <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
//           {product.isSale && (
//             <span className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-full">
//               Sale
//             </span>
//           )}
//           {product.isBestSeller && (
//             <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full">
//               Hot
//             </span>
//           )}
//         </div>

//         {/* IMAGE */}
//         <img
//           src={product.images[0]}
//           alt={product.name}
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         {/* HOVER ACTION */}
//         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//           <button
//             onClick={addToWishlist}
//             className="bg-white p-3 rounded-full hover:bg-orange-600 hover:text-white transition"
//           >
//             <FaHeart />
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-bold text-lg truncate group-hover:text-orange-600">
//             {product.name}
//           </h3>

//           <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
//             <FaStar size={10} />
//             <span className="text-xs font-bold">{product.rating}</span>
//           </div>
//         </div>

//         <p className="text-gray-400 text-xs mb-4">
//           Authentic Vastu Product
//         </p>

//         {/* 💰 PRICE SECTION */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
            
//             {/* Original Price */}
//             {product.originalPrice > product.price && (
//               <span className="text-gray-400 line-through text-sm">
//                 ₹{product.originalPrice}
//               </span>
//             )}

//             {/* Final Price */}
//             <span className="text-xl font-bold text-black">
//               ₹{product.price}
//             </span>
//           </div>

//           <button
//             onClick={addToCart}
//             className="bg-black text-white p-3 rounded-xl hover:bg-orange-600 transition"
//           >
//             <FaShoppingCart />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // 👉 Navigate to detail
  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  // 🔥 Common Toast Style
  const toastStyle = {
    position: "bottom-right",
    style: {
      background: "#4B5563", // gray
      color: "#fff",
      borderRadius: "10px",
    },
  };

  // ❤️ ADD TO WISHLIST
  const addToWishlist = (e) => {
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first ❗", toastStyle);
      navigate("/login");
      return;
    }

    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const sizeToSend = product.sizes?.[0] || "Standard";

    const exists = wishlist.some(
      (item) =>
        item.id === product.id &&
        item.selectedSize === sizeToSend
    );

    if (exists) {
      toast("Already in wishlist ❤️", {
        ...toastStyle,
        icon: "ℹ️",
      });
      return;
    }

    wishlist.push({
      ...product,
      selectedSize: sizeToSend,
    });

    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to wishlist ❤️", toastStyle);
  };

  // 🛒 ADD TO CART
  const addToCart = (e) => {
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first ❗", toastStyle);
      navigate("/login");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const sizeToSend = product.sizes?.[0] || "Standard";

    const index = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === sizeToSend
    );

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        selectedSize: sizeToSend,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to cart 🛒", toastStyle);
  };

  // 🔥 Discount %
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <div
      onClick={goToDetail}
      className="cursor-pointer group bg-white rounded-[2rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 relative"
      data-aos="fade-up"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden bg-[#F9F9F9]">

        {/* BADGES */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isSale && (
            <span className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-full">
              Sale
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full">
              Hot
            </span>
          )}
        </div>

        {/* IMAGE */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* HOVER ACTION */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <button
            onClick={addToWishlist}
            className="bg-white p-3 rounded-full hover:bg-orange-600 hover:text-white transition"
          >
            <FaHeart />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate group-hover:text-orange-600">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
            <FaStar size={10} />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-xs mb-4">
          Authentic Vastu Product
        </p>

        {/* 💰 PRICE */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">

            {product.originalPrice > product.price && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}

            <span className="text-xl font-bold text-black">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={addToCart}
            className="bg-black text-white p-3 rounded-xl hover:bg-orange-600 transition"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}