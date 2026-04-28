// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaLock,
//   FaMapMarkerAlt,
//   FaCreditCard,
//   FaChevronLeft,
// } from "react-icons/fa";
// import toast from "react-hot-toast";

// export default function Checkout() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "", 
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//   });

//   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // ✅ INPUT HANDLER
//   const handleInputChange = (e) => {
//     let { name, value } = e.target;

//     if (name === "phone") {
//       value = value.replace(/\D/g, "").slice(0, 10);
//     }

//     if (name === "pincode") {
//       value = value.replace(/\D/g, "").slice(0, 6);
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   // ✅ PLACE ORDER
//   const handlePlaceOrder = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.phone || !formData.address) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     if (formData.phone.length !== 10) {
//       toast.error("Phone must be 10 digits");
//       return;
//     }

//     if (formData.pincode.length !== 6) {
//       toast.error("Pincode must be 6 digits");
//       return;
//     }

//     if (cartItems.length === 0) {
//       toast.error("Cart is empty");
//       return;
//     }

//     const newOrder = {
//       id: Date.now(),
//       date: new Date().toLocaleDateString(),
//       status: "Placed",
//       address: formData,
//       items: cartItems,
//       total,
//     };

//     const existingOrders =
//       JSON.parse(localStorage.getItem("orders")) || [];
//     localStorage.setItem(
//       "orders",
//       JSON.stringify([newOrder, ...existingOrders])
//     );

//     localStorage.removeItem("cartItems");
//     window.dispatchEvent(new Event("cartUpdated"));

//     toast.success("Order Placed Successfully 🎉");
//     navigate("/orders");
//   };

//   return (
//     <section className="py-16 bg-gradient-to-b from-[#FCFBFA] to-white min-h-screen">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div>
//             <button
//               onClick={() => navigate("/cart")}
//               className="flex items-center gap-2 text-gray-400 hover:text-black text-sm font-semibold mb-4"
//             >
//               <FaChevronLeft size={12} /> Back to Cart
//             </button>

//             <h1 className="text-4xl font-bold text-black">
//               Secure <span className="text-orange-600 italic">Checkout</span>
//             </h1>
//           </div>

//           <div className="flex items-center gap-2 bg-green-50 text-green-700 px-5 py-2 rounded-full text-xs font-semibold border border-green-100 shadow-sm">
//             <FaLock /> 100% Secure Payment
//           </div>
//         </div>

//         <form
//           onSubmit={handlePlaceOrder}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-12"
//         >

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* SHIPPING CARD */}
//             <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
//               <div className="flex items-center gap-3 mb-6">
//                 <FaMapMarkerAlt className="text-orange-600" />
//                 <h3 className="font-bold text-xl">
//                   Shipping Details
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   required
//                   onChange={handleInputChange}
//                   className="input-style"
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   placeholder="Phone Number"
//                   required
//                   onChange={handleInputChange}
//                   className="input-style"
//                 />

//                 <textarea
//                   name="address"
//                   placeholder="Full Address"
//                   required
//                   onChange={handleInputChange}
//                   className="input-style md:col-span-2 h-28"
//                 />

//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   required
//                   onChange={handleInputChange}
//                   className="input-style"
//                 />

//                 <input
//                   type="text"
//                   name="pincode"
//                   value={formData.pincode}
//                   placeholder="Pincode"
//                   required
//                   onChange={handleInputChange}
//                   className="input-style"
//                 />
//               </div>
//             </div>

//             {/* PAYMENT CARD */}
//             <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
//               <div className="flex items-center gap-3 mb-4">
//                 <FaCreditCard className="text-orange-600" />
//                 <h3 className="font-bold text-xl">
//                   Payment Method
//                 </h3>
//               </div>

//               <div className="flex justify-between items-center border-2 border-orange-500 bg-orange-50 px-6 py-4 rounded-2xl">
//                 <span className="font-bold text-orange-700">
//                   Cash on Delivery
//                 </span>
//                 <span className="text-xs font-semibold bg-orange-600 text-white px-3 py-1 rounded-full">
//                   Selected
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <aside>
//             <div className="bg-black text-white rounded-3xl p-8 sticky top-24 shadow-2xl border-b-8 border-orange-600">

//               <h3 className="text-2xl font-bold mb-6">
//                 Order Summary
//               </h3>

//               <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">

//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex justify-between text-sm border-b border-white/10 pb-2"
//                   >
//                     <span className="truncate w-40">
//                       {item.name} x {item.quantity}
//                     </span>
//                     <span className="text-orange-400 font-semibold">
//                       ₹{item.price * item.quantity}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-white/10 mt-6 pt-6 flex justify-between text-lg font-bold">
//                 <span>Total</span>
//                 <span className="text-orange-500">₹{total}</span>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full mt-8 bg-orange-600 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
//               >
//                 Place Order
//               </button>
//             </div>
//           </aside>
//         </form>
//       </div>

//       {/* ✅ INPUT STYLE */}
//       <style jsx>{`
//         .input-style {
//           width: 100%;
//           background: #f9fafb;
//           border-radius: 16px;
//           padding: 14px 18px;
//           border: 1px solid transparent;
//           outline: none;
//           transition: 0.3s;
//         }
//         .input-style:focus {
//           border: 1px solid #ea580c;
//           background: white;
//         }
//       `}</style>
//     </section>
//   );
// }

import { useState, useEffect } from "react"; // ✅ useEffect added
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaChevronLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ AUTO-FILL FROM LOCAL STORAGE
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
    const profileAddresses = user
      ? JSON.parse(localStorage.getItem(`addresses_${user.email}`)) || []
      : [];
    const addressToUse = savedAddress || profileAddresses[0] || null;

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }

    if (addressToUse) {
      setFormData((prev) => ({
        ...prev,
        name: addressToUse.name || prev.name,
        address: addressToUse.street || "",
        city: addressToUse.city || "",
        pincode: addressToUse.zip || "",
      }));
    }
  }, []);

  // ✅ INPUT HANDLER
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "pincode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData({ ...formData, [name]: value });
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error("Phone must be 10 digits");
      return;
    }

    if (formData.pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: "Placed",
      address: formData,
      items: cartItems,
      total,
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Order Placed Successfully 🎉");
    navigate("/orders");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#FCFBFA] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-gray-400 hover:text-black text-sm font-semibold mb-4"
            >
              <FaChevronLeft size={12} /> Back to Cart
            </button>

            <h1 className="text-4xl font-bold text-black">
              Secure <span className="text-orange-600 italic">Checkout</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-5 py-2 rounded-full text-xs font-semibold border border-green-100 shadow-sm">
            <FaLock /> 100% Secure Payment
          </div>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* SHIPPING CARD */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <FaMapMarkerAlt className="text-orange-600" />
                <h3 className="font-bold text-xl">
                  Shipping Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  value={formData.name}   // ✅ added
                  placeholder="Full Name"
                  required
                  onChange={handleInputChange}
                  className="input-style"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone Number"
                  required
                  onChange={handleInputChange}
                  className="input-style"
                />

                <textarea
                  name="address"
                  value={formData.address}   // ✅ added
                  placeholder="Full Address"
                  required
                  onChange={handleInputChange}
                  className="input-style md:col-span-2 h-28"
                />

                <input
                  type="text"
                  name="city"
                  value={formData.city}   // ✅ added
                  placeholder="City"
                  required
                  onChange={handleInputChange}
                  className="input-style"
                />

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  placeholder="Pincode"
                  required
                  onChange={handleInputChange}
                  className="input-style"
                />
              </div>
            </div>

            {/* PAYMENT CARD */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-orange-600" />
                <h3 className="font-bold text-xl">
                  Payment Method
                </h3>
              </div>

              <div className="flex justify-between items-center border-2 border-orange-500 bg-orange-50 px-6 py-4 rounded-2xl">
                <span className="font-bold text-orange-700">
                  Cash on Delivery
                </span>
                <span className="text-xs font-semibold bg-orange-600 text-white px-3 py-1 rounded-full">
                  Selected
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside>
            <div className="bg-black text-white rounded-3xl p-8 sticky top-24 shadow-2xl border-b-8 border-orange-600">

              <h3 className="text-2xl font-bold mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm border-b border-white/10 pb-2"
                  >
                    <span className="truncate w-40">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-orange-400 font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 mt-6 pt-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">₹{total}</span>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-orange-600 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
              >
                Place Order
              </button>
            </div>
          </aside>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          background: #f9fafb;
          border-radius: 16px;
          padding: 14px 18px;
          border: 1px solid transparent;
          outline: none;
          transition: 0.3s;
        }
        .input-style:focus {
          border: 1px solid #ea580c;
          background: white;
        }
      `}</style>
    </section>
  );
}