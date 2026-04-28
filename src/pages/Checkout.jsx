// import { useState, useEffect } from "react"; // ✅ useEffect added
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

//   // ✅ AUTO-FILL FROM LOCAL STORAGE
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("currentUser"));
//     const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
//     const profileAddresses = user
//       ? JSON.parse(localStorage.getItem(`addresses_${user.email}`)) || []
//       : [];
//     const addressToUse = savedAddress || profileAddresses[0] || null;

//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       }));
//     }

//     if (addressToUse) {
//       setFormData((prev) => ({
//         ...prev,
//         name: addressToUse.name || prev.name,
//         address: addressToUse.street || "",
//         city: addressToUse.city || "",
//         pincode: addressToUse.zip || "",
//       }));
//     }
//   }, []);

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
//   // ✅ PLACE ORDER
// const handlePlaceOrder = (e) => {
//   e.preventDefault();

//   if (!formData.name || !formData.phone || !formData.address) {
//     toast.error("Please fill all required fields");
//     return;
//   }

//   if (formData.phone.length !== 10) {
//     toast.error("Phone must be 10 digits");
//     return;
//   }

//   if (formData.pincode.length !== 6) {
//     toast.error("Pincode must be 6 digits");
//     return;
//   }

//   if (cartItems.length === 0) {
//     toast.error("Cart is empty");
//     return;
//   }

//   const newOrder = {
//     id: Date.now(),
//     date: new Date().toLocaleDateString(),
//     status: "Placed",
//     address: formData,
//     items: cartItems,
//     total,
//   };

//   const existingOrders =
//     JSON.parse(localStorage.getItem("orders")) || [];
//   localStorage.setItem(
//     "orders",
//     JSON.stringify([newOrder, ...existingOrders])
//   );

//   // ✅ WHATSAPP MESSAGE
//   const message = `
// 🛒 *New Order*

// 👤 Name: ${formData.name}
// 📞 Phone: ${formData.phone}

// 📍 Address:
// ${formData.address}, ${formData.city} - ${formData.pincode}

// 🧾 Order Details:
// ${cartItems
//   .map(
//     (item) =>
//       `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
//   )
//   .join("\n")}

// 💰 Total: ₹${total}
// `;

//   const phoneNumber = "8758592615"; // 👉 change to your number

//   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//     message
//   )}`;

//   localStorage.removeItem("cartItems");
//   window.dispatchEvent(new Event("cartUpdated"));

//   toast.success("Redirecting to WhatsApp...");

//   // ✅ OPEN WHATSAPP
//   setTimeout(() => {
//     window.open(whatsappURL, "_blank");
//     navigate("/orders");
//   }, 1000);
// };
//   // const handlePlaceOrder = (e) => {
//   //   e.preventDefault();

//   //   if (!formData.name || !formData.phone || !formData.address) {
//   //     toast.error("Please fill all required fields");
//   //     return;
//   //   }

//   //   if (formData.phone.length !== 10) {
//   //     toast.error("Phone must be 10 digits");
//   //     return;
//   //   }

//   //   if (formData.pincode.length !== 6) {
//   //     toast.error("Pincode must be 6 digits");
//   //     return;
//   //   }

//   //   if (cartItems.length === 0) {
//   //     toast.error("Cart is empty");
//   //     return;
//   //   }

//   //   const newOrder = {
//   //     id: Date.now(),
//   //     date: new Date().toLocaleDateString(),
//   //     status: "Placed",
//   //     address: formData,
//   //     items: cartItems,
//   //     total,
//   //   };

//   //   const existingOrders =
//   //     JSON.parse(localStorage.getItem("orders")) || [];
//   //   localStorage.setItem(
//   //     "orders",
//   //     JSON.stringify([newOrder, ...existingOrders])
//   //   );

//   //   localStorage.removeItem("cartItems");
//   //   window.dispatchEvent(new Event("cartUpdated"));

//   //   toast.success("Order Placed Successfully 🎉");
//   //   navigate("/orders");
//   // };

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
//                   value={formData.name}   // ✅ added
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
//                   value={formData.address}   // ✅ added
//                   placeholder="Full Address"
//                   required
//                   onChange={handleInputChange}
//                   className="input-style md:col-span-2 h-28"
//                 />

//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}   // ✅ added
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { client } from "../lib/sanity";

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

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 FETCH SAVED ADDRESSES
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    }));

    const fetchProfileAddresses = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "profile" && email == $email][0]{addresses}`,
          { email: user.email }
        );

        if (data?.addresses) {
          setSavedAddresses(data.addresses);

          if (data.addresses.length > 0) {
            handleSelectAddress(data.addresses[0]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfileAddresses();
  }, []);

  // ✅ SELECT ADDRESS
  const handleSelectAddress = (addr) => {
    setSelectedKey(addr._key);

    setFormData((prev) => ({
      ...prev,
      address: addr.street || "",
      city: addr.city || "",
      pincode: addr.pincode || "",
    }));

    toast.success(`Selected: ${addr.title}`);
  };

  // ✍️ INPUT CHANGE
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);

    setFormData({ ...formData, [name]: value });
    setSelectedKey(null);
  };

  // 🚀 PLACE ORDER (SANITY FIXED)
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    const orderPayload = {
      _type: "order",
      orderId: Date.now().toString(),
      date: new Date().toISOString(),
      status: "Placed",
      total,

      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "",
      })),

      address: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        city: formData.city,
        pincode: formData.pincode,
      },
    };

    try {
      // ✅ SAVE TO SANITY
      await client.create(orderPayload);

      // localStorage backup
      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([orderPayload, ...existingOrders])
      );

      // WhatsApp message
      const message = `🛒 New Order
👤 ${formData.name}
📞 ${formData.phone}
📍 ${formData.address}, ${formData.city} - ${formData.pincode}
💰 Total: ₹${total}`;

      const whatsappURL = `https://wa.me/8758592615?text=${encodeURIComponent(
        message
      )}`;

      localStorage.removeItem("cartItems");
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Order placed successfully!");

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
        navigate("/orders");
      }, 1000);
    } catch (err) {
      console.error("Order Error:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-gray-400 hover:text-black mb-4"
          >
            <FaChevronLeft size={12} /> Back to Cart
          </button>

          <h1 className="text-4xl font-bold text-black">
            Secure <span className="text-orange-600 italic">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* SAVED ADDRESSES */}
            {savedAddresses.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border shadow-sm">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-orange-600" />
                  Select Saved Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((addr, index) => (
                    <div
                      key={addr._key || index}
                      onClick={() => handleSelectAddress(addr)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition ${
                        selectedKey === addr._key
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="font-bold text-orange-600 text-sm">
                          {addr.title}
                        </span>

                        {selectedKey === addr._key && (
                          <FaCheckCircle className="text-orange-600" />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {addr.street}, {addr.city}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORM */}
            <div className="bg-white rounded-3xl p-8 border shadow-sm">
              <h3 className="font-bold text-xl mb-6">
                Delivery Details
              </h3>

              <form
                onSubmit={handlePlaceOrder}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="input-style"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="input-style"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="input-style md:col-span-2 h-28"
                />

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="input-style"
                />

                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="input-style"
                />
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <aside>
            <div className="bg-black text-white rounded-3xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-orange-400">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-500">₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-orange-600 py-3 rounded-xl font-bold"
              >
                Place Order
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* STYLE (React safe) */}
      <style>{`
        .input-style {
          width: 100%;
          background: #f9fafb;
          border-radius: 14px;
          padding: 12px 16px;
          border: 1px solid #eee;
          outline: none;
        }
        .input-style:focus {
          border: 1px solid #ea580c;
          background: white;
        }
      `}</style>
    </section>
  );
}