// import { useState, useEffect } from "react";
// import { FaTrash, FaPlus, FaMinus, FaArrowRight, FaShoppingBag } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Cart() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   // 🔥 SAME TOAST STYLE AS WISHLIST
//   const toastStyle = {
//     position: "bottom-right",
//     style: {
//       background: "#4B5563",
//       color: "#fff",
//       borderRadius: "10px",
//     },
//   };

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedCart);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     window.dispatchEvent(new Event("cartUpdated"));
//   }, [cartItems]);

//   const increaseQty = (id) => { 
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, Number(item.quantity) - 1) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));

//     // 🔥 UPDATED TOAST
//     toast.success("Item removed from cart ❌", toastStyle);
//   };

//   const cartTotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const proceedToCheckout = () => {
//     const user = JSON.parse(localStorage.getItem("currentUser"));

//     if (!user) {
//       toast.error("Please login first", toastStyle);
//       navigate("/login");
//       return;
//     }

//     navigate("/checkout");
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="py-28 text-center bg-[#FCFBFA] min-h-[60vh] flex flex-col items-center justify-center px-6">
//         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
//            <FaShoppingBag size={40} />
//         </div>
//         <h2 className="text-3xl font-heading font-bold mb-4 text-black">
//           Your Cart is <span className="text-orange-600 italic">Empty</span>
//         </h2>
//         <p className="text-gray-500 mb-8 max-w-sm">Add some spiritual tools to your cart to begin your Vastu journey.</p>
//         <Link
//           to="/shop"
//           className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
//         >
//           Explore Shop <FaArrowRight size={12} />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 bg-[#FCFBFA] min-h-screen">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* PAGE HEADER */}
//         <div className="mb-12" data-aos="fade-up">
//           <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mb-2">
//             Shopping <span className="text-orange-600 italic font-serif">Cart</span>
//           </h1>
//           <div className="h-1.5 w-20 bg-black rounded-full"></div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
//           {/* CART ITEMS LIST */}
//           <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="group bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all duration-500"
//               >
//                 {/* PRODUCT IMAGE */}
//                 <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-50">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                 </div>

//                 {/* PRODUCT DETAILS */}
//                 <div className="flex-1 text-center sm:text-left">
//                   <h3 className="font-heading font-bold text-xl text-black mb-1">
//                     {item.name}
//                   </h3>
//                   <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm mb-4">
//                     <span className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">
//                       Size: <span className="text-orange-600 font-bold">{item.selectedSize}</span>
//                     </span>
//                     <span className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">
//                       Price: <span className="text-black font-bold">₹{item.price}</span>
//                     </span>
//                   </div>

//                   {/* QUANTITY CONTROLS */}
//                   <div className="inline-flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
//                     <button
//                       onClick={() => decreaseQty(item.id)}
//                       className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-orange-600 transition-all text-gray-400"
//                     >
//                       <FaMinus size={10} />
//                     </button>
//                     <span className="w-10 text-center font-bold text-black">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQty(item.id)}
//                       className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-orange-600 transition-all text-gray-400"
//                     >
//                       <FaPlus size={10} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* TOTAL PRICE & REMOVE */}
//                 <div className="flex flex-col items-end gap-4 min-w-[100px]">
//                   <p className="text-xl font-bold text-black font-heading">
//                     ₹{item.price * item.quantity}
//                   </p>
//                   <button
//                     onClick={() => removeItem(item.id)}
//                     className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
//                   >
//                     <FaTrash size={14} />
//                   </button> 
//                 </div>
//               </div>
//             ))}

//             <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors mt-4">
//               <FaArrowRight size={10} className="rotate-180" /> Continue Shopping
//             </Link>
//           </div>

//           {/* ORDER SUMMARY SIDEBAR */}
//           <aside className="lg:col-span-1" data-aos="fade-left">
//             <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl sticky top-24">
//               <h3 className="font-heading font-bold text-2xl mb-8 text-black border-b border-gray-50 pb-4">
//                 Order <span className="text-orange-600 italic">Summary</span>
//               </h3>

//               <div className="space-y-4 mb-8">
//                 <div className="flex justify-between text-gray-500 font-medium">
//                   <span>Subtotal</span>
//                   <span className="text-black font-bold">₹{cartTotal}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-500 font-medium">
//                   <span>Shipping</span>
//                   <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
//                 </div>
//                 <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
//                   <span className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.2em]">Estimated Total</span>
//                   <span className="text-3xl font-heading font-bold text-black leading-none">₹{cartTotal}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={proceedToCheckout}
//                 className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-100"
//               >
//                 Checkout Now
//                 <FaArrowRight size={14} />
//               </button>

//               <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
//                 <span className="h-1 w-1 bg-green-500 rounded-full"></span>
//                 Secure Checkout Powered by Vastukkalp
//               </div>
//             </div>
//           </aside>

//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const toastStyle = {
    position: "bottom-right",
    style: {
      background: "#4B5563",
      color: "#fff",
      borderRadius: "10px",
    },
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Number(item.quantity) - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart ❌", toastStyle);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const proceedToCheckout = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first", toastStyle);
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-28 text-center min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5 text-gray-300">
          <FaShoppingBag size={32} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Your Cart is <span className="text-orange-600 italic">Empty</span>
        </h2>

        <p className="text-gray-500 mb-6 text-sm md:text-base max-w-xs">
          Add items to start shopping
        </p>

        <Link
          to="/shop"
          className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold"
        >
          Explore Shop <FaArrowRight className="inline ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* TITLE */}
        <h1 className="text-2xl md:text-5xl font-bold mb-6">
          Shopping <span className="text-orange-600 italic">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 md:p-6 border flex flex-col sm:flex-row gap-4 shadow-sm"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  className="w-full sm:w-28 h-28 object-cover rounded-xl"
                  alt={item.name}
                />

                {/* DETAILS */}
                <div className="flex-1">

                  <h3 className="font-bold text-base md:text-lg">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Size:{" "}
                    <span className="text-orange-600 font-semibold">
                      {item.selectedSize}
                    </span>
                  </p>

                  <p className="text-sm font-bold mt-1">
                    ₹{item.price}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center mt-3 border rounded-lg w-fit">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-2"
                    >
                      <FaMinus size={10} />
                    </button>

                    <span className="px-3 text-sm font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-2"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                {/* PRICE + DELETE */}
                <div className="flex sm:flex-col items-center justify-between sm:items-end">

                  <p className="font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 mt-2"
                  >
                    <FaTrash />
                  </button>

                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="text-sm text-gray-500 hover:text-orange-600"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-md sticky top-24">

              <h2 className="text-xl md:text-2xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{cartTotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold">₹{cartTotal}</span>
                </div>

              </div>

              <button
                onClick={proceedToCheckout}
                className="w-full mt-6 bg-black text-white py-3 rounded-xl font-bold"
              >
                Checkout <FaArrowRight className="inline ml-2" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}