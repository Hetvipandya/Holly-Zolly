// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
// import toast from "react-hot-toast";

// export default function ProductCard({ product }) {
//   const navigate = useNavigate();

//   // 👉 Navigate to detail
//   const goToDetail = () => {
//     navigate(`/product/${product.id}`);
//   };

//   // 🔥 Common Toast Style (default for cart)
//   const toastStyle = {
//     position: "bottom-right",
//     style: {
//       background: "#4B5563",
//       color: "#fff",
//       borderRadius: "10px",
//     },
//   };

//   // ❤️ ADD TO WISHLIST
//   const addToWishlist = (e) => {
//     e.stopPropagation();

//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//       toast.error("Please login first ❗", {
//         position: "top-center",
//         style: {
//           background: "#4B5563",
//           color: "#fff",
//           borderRadius: "10px",
//         },
//       });
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
//       toast("Already in wishlist ❤️", {
//         position: "top-center",
//         icon: "ℹ️",
//         style: {
//           background: "#4B5563",
//           color: "#fff",
//           borderRadius: "10px",
//         },
//       });
//       return;
//     }

//     wishlist.push({
//       ...product,
//       selectedSize: sizeToSend,
//     });

//     localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
//     window.dispatchEvent(new Event("cartUpdated"));

//     toast.success("Added to wishlist ❤️", {
//       position: "top-center",
//       style: {
//         background: "#4B5563",
//         color: "#fff",
//         borderRadius: "10px",
//       },
//     });
//   };

//   // 🛒 ADD TO CART
//   const addToCart = (e) => {
//     e.stopPropagation();

//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//       toast.error("Please login first ❗", toastStyle);
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

//     toast.success("Added to cart 🛒", toastStyle);
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

//         {/* 💰 PRICE + ACTIONS */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">

//             {product.originalPrice > product.price && (
//               <span className="text-gray-400 line-through text-sm">
//                 ₹{product.originalPrice}
//               </span>
//             )}

//             <span className="text-xl font-bold text-black">
//               ₹{product.price}
//             </span>
//           </div>

//           {/* 👉 ACTION BUTTONS */}
//           <div className="flex items-center gap-2">

//             {/* ❤️ Wishlist */}
//             <button
//               onClick={addToWishlist}
//               className="bg-gray-100 text-black p-3 rounded-xl hover:bg-orange-600 hover:text-white transition"
//             >
//               <FaHeart />
//             </button>

//             {/* 🛒 Cart */}
//             <button
//               onClick={addToCart}
//               className="bg-black text-white p-3 rounded-xl hover:bg-orange-600 transition"
//             >
//               <FaShoppingCart />
//             </button>

//           </div>
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

  const toastStyle = {
    position: "bottom-right",
    style: {
      background: "#1f2937",
      color: "#fff",
      borderRadius: "10px",
    },
  };

  const goToDetail = () => {
    navigate(`/product/${product._id}`);
  };

  // ❤️ Wishlist
  const addToWishlist = (e) => {
    e.stopPropagation();

    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const exists = wishlist.some((item) => item._id === product._id);

    if (exists) {
      toast("Already in wishlist ❤️", {
        ...toastStyle,
        icon: "ℹ️",
      });
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));

    toast.success("Added to wishlist ❤️", toastStyle);
  };

  // 🛒 Cart
  const addToCart = (e) => {
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first ❗", {
        position: "top-center",
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "10px",
        },
      });
      navigate("/login");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const index = cart.findIndex(
      (item) => item._id === product._id
    );

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to cart 🛒", toastStyle);
  };

  const discount =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        ) 
      : 0;

  return (
    <div
      onClick={goToDetail}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full"
    >

      {/* IMAGE */}
      <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden bg-gray-50">

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-orange-600 text-white text-[10px] px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">

        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 group-hover:text-orange-600">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="text-xs font-semibold">
              {product.rating || 4.2}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-1">
          {product.category}
        </p>

        {/* PRICE + BUTTONS */}
        <div className="mt-auto flex items-center justify-between pt-4">

          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}

            <span className="text-lg font-bold text-black">
              ₹{product.price}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2">

            <button
              onClick={addToWishlist}
              className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-red-500 hover:text-white transition"
            >
              <FaHeart size={14} />
            </button>

            <button
              onClick={addToCart}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-orange-600 transition"
            >
              <FaShoppingCart size={14} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}