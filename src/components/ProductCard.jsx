// import { Link } from "react-router-dom";
// import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
// import toast from "react-hot-toast";

// export default function ProductCard({ product }) {

//   // ❤️ ADD TO WISHLIST
//   const addToWishlist = () => {
//     const wishlist =
//       JSON.parse(localStorage.getItem("wishlistItems")) || [];

//     const sizeToSend = product.sizes?.[0]; // ✅ default size

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
//       selectedSize: sizeToSend, // ✅ IMPORTANT
//     });

//     localStorage.setItem(
//       "wishlistItems",
//       JSON.stringify(wishlist)
//     );
//     window.dispatchEvent(new Event("cartUpdated"));

//     toast.success(`Added to wishlist (Size: ${sizeToSend}) ❤️`);
//   };


//   // 🛒 ADD TO CART
//   const addToCart = () => {
//     const cart =
//       JSON.parse(localStorage.getItem("cartItems")) || [];

//     const sizeToSend = product.sizes?.[0]; // ✅ default size

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
//         selectedSize: sizeToSend, // ✅ IMPORTANT
//       });
//     }

//     localStorage.setItem("cartItems", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//     toast.success(`Added to cart (Size: ${sizeToSend}) 🛒`);
//   };
 

//   return (
//     <div
//       className="group bg-white rounded-lg shadow hover:shadow-xl transition relative overflow-hidden"
//       data-aos="fade-up"
//     >
//       {/* BADGES (HIDE ON IMAGE HOVER) */}
//       {product.isSale && (
//         <span className="absolute top-3 z-10 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ">
//           SALE
//         </span>
//       )}

//       {product.isBestSeller && (
//         <span className="absolute z-10 top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ">
//           HOT
//         </span>
//       )}

//       {/* WISHLIST ICON (HIDE ON IMAGE HOVER) */}
//       <button
//         onClick={addToWishlist}
//         className="absolute top-12 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition-opacity duration-300  z-10"
//       >
//         <FaHeart size={14} />
//       </button>

//       {/* IMAGE */}
//       <Link to={`/product/${product.id}`}>
//         <img
//           src={product.images[0]}
//           alt={product.name}
//           className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
//         />
//       </Link>

//       {/* CONTENT */}
//       <div className="p-4">
//         <h3 className="font-heading font-semibold text-lg truncate">
//           {product.name}
//         </h3>

//         <div className="flex justify-between items-center mt-1">
//           <p className="text-primary font-bold">
//             ₹{product.price}
//           </p>

//           <p className="flex items-center gap-1 text-sm font-semibold">
//             <FaStar className="text-yellow-400" />
//             {product.rating}
//           </p>
//         </div>

//         {/* ADD TO CART */}
//         <button
//           onClick={addToCart}
//           className="mt-4 w-full bg-primary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-secondary transition"
//         >
//           <FaShoppingCart />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // ❤️ ADD TO WISHLIST (LOGIN REQUIRED)
  const addToWishlist = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first");
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
      toast("Already in wishlist ❤️", { icon: "ℹ️" });
      return;
    }

    wishlist.push({
      ...product,
      selectedSize: sizeToSend,
    });

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlist)
    );
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to wishlist ❤️");
  };

  // 🛒 ADD TO CART (LOGIN REQUIRED)
  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first");
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

    toast.success("Added to cart 🛒");
  };

  return (
    <div
      className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 relative"
      data-aos="fade-up"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden bg-[#F9F9F9]">

        {/* BADGES */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isSale && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Sale
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Hot
            </span>
          )}
        </div>

        {/* IMAGE */}
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

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
          <h3 className="font-heading font-bold text-lg truncate group-hover:text-orange-600">
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

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold">
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