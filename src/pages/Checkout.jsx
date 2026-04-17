// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import Loader from "../components/Loader";

// export default function Checkout() {

//     const [cartItems, setCartItems] = useState([]);
//     const [cartTotal, setCartTotal] = useState(0);

//     useEffect(() => {
//         const storedCart = localStorage.getItem("cartItems");

//         if (storedCart) {
//             const parsedCart = JSON.parse(storedCart);
//             setCartItems(parsedCart);

//             const total = parsedCart.reduce(
//                 (sum, item) => sum + item.price * item.quantity,
//                 0
//             );
//             setCartTotal(total);
//         }
//     }, []);


//     const [loading, setLoading] = useState(false);

//     const placeOrder = () => {
//         setLoading(true);

//         setTimeout(() => {
//             setLoading(false);
//             toast.success("Order placed successfully");
//         }, 1500);

//         if (paymentMethod === "COD") {
//             toast.success("Cash on Delivery Selected");
//         } else {
//             toast.success("Redirecting to Razorpay (UI only)");
//         }
//     };

//     const [paymentMethod, setPaymentMethod] = useState("COD");
//     const [selectedAddress, setSelectedAddress] = useState(0);

//     // TEMP ADDRESSES
//     const [addresses, setAddresses] = useState([
//         {
//             id: 1,
//             name: "Home",
//             street: "123 Ring Road",
//             city: "Ahmedabad",
//             state: "Gujarat",
//             zip: "380015",
//             country: "India",
//         },
//         {
//             id: 2,
//             name: "Office",
//             street: "SG Highway",
//             city: "Ahmedabad",
//             state: "Gujarat",
//             zip: "380054",
//             country: "India",
//         },
//     ]);

//     const [showForm, setShowForm] = useState(false);
//     const [editAddress, setEditAddress] = useState(null);

//     const openAddForm = () => {
//         setEditAddress(null);
//         setShowForm(true);
//     };


//     const coupons = [
//         { code: "HARVON10", discount: 10 }, // 10%
//         { code: "WELCOME20", discount: 20 }, // 20%
//     ];

//     const [couponCode, setCouponCode] = useState("");
//     const [appliedCoupon, setAppliedCoupon] = useState(null);
//     const [discountAmount, setDiscountAmount] = useState(0);
//     const [error, setError] = useState("");

//     const applyCoupon = () => {
//         const coupon = coupons.find(
//             (c) => c.code === couponCode.toUpperCase()
//         );

//         if (!coupon) {
//             setError("Invalid coupon code");
//             setAppliedCoupon(null);
//             setDiscountAmount(0);
//             return;
//         }

//         const discount = Math.round(
//             (cartTotal * coupon.discount) / 100
//         );

//         setAppliedCoupon(coupon);
//         setDiscountAmount(discount);
//         setError("");


//     };

//     const removeCoupon = () => {
//         setAppliedCoupon(null);
//         setCouponCode("");
//         setDiscountAmount(0);

//     };




//     return (
//         <section className="py-10">
//             <div className="max-w-7xl mx-auto px-6"  >

//                 <h1 className="text-3xl font-heading font-bold mb-10 text-primary" data-aos="fade-up">
//                     Checkout
//                 </h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

//                     {/* LEFT SIDE */}
//                     <div className="lg:col-span-2 space-y-10" data-aos="fade-up">

//                         {/* ADDRESS SELECTION */}
//                         <div className="bg-white p-6 rounded shadow border border-primary/30">
//                             <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
//                                 Delivery Address
//                             </h3>

//                             <div className="space-y-4">
//                                 {addresses.map((addr, index) => (
//                                     <label
//                                         key={index}
//                                         className={`block border rounded p-4 cursor-pointer ${selectedAddress === index
//                                             ? "border-primary bg-blue-50"
//                                             : ""
//                                             }`}
//                                     >
//                                         <input
//                                             type="radio"
//                                             name="address"
//                                             checked={selectedAddress === index}
//                                             onChange={() => setSelectedAddress(index)}
//                                             className="mr-3"
//                                         />
//                                         <span className="font-semibold">{addr.name}</span>
//                                         <p className="text-sm text-gray-600">
//                                             {addr.street}, {addr.city},<br /> {addr.state} -{" "}
//                                             {addr.zip},<br /> {addr.country}
//                                         </p>
//                                     </label>
//                                 ))}
//                             </div>

//                             <button className="mt-4 text-primary font-semibold" onClick={openAddForm}>
//                                 + Add New Address
//                             </button>

                        

//                             {/* MODAL */}
//                             {showForm && (
//                                 <AddressForm
//                                     onClose={() => setShowForm(false)}
//                                 />
//                             )}
//                         </div>

//                         {/* PAYMENT METHOD */}
//                         <div className="bg-white p-6 rounded shadow">
//                             <h3 className="font-heading font-semibold text-xl mb-4">
//                                 Payment Method
//                             </h3>

//                             <div className="space-y-4">
//                                 <label className="flex items-center gap-3 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         checked={paymentMethod === "COD"}
//                                         onChange={() => setPaymentMethod("COD")}
//                                     />
//                                     Cash on Delivery
//                                 </label>

//                                 <label className="flex items-center gap-3 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         checked={paymentMethod === "RAZORPAY"}
//                                         onChange={() => setPaymentMethod("RAZORPAY")}
//                                     />
//                                     Razorpay (UPI / Card / Netbanking)
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ORDER SUMMARY */}
//                     <div className="bg-white p-6 rounded shadow h-fit border border-primary/30" data-aos="fade-up">
//                         <h3 className="font-heading font-semibold text-xl mb-6 text-primary">
//                             Order Summary
//                         </h3>

//                         <div className="space-y-4">
//                             {cartItems.map((item) => (
//                                 <div key={item.id} className="flex justify-between text-sm">
//                                     <span>
//                                         {item.name} × {item.quantity}
//                                     </span>
//                                     <span>₹{item.price * item.quantity}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         <hr className="my-4" />

//                         <div className="flex justify-between mb-2">
//                             <span>Subtotal</span>
//                             <span>₹{cartTotal}</span>
//                         </div>

//                         {/* COUPON INPUT */}
//                         {!appliedCoupon && (
//                             <div className="mt-4">
//                                 <label className="text-sm font-semibold text-primary">
//                                     Apply Coupon
//                                 </label>

//                                 <div className="flex mt-2 gap-2">
//                                     <input
//                                         type="text"
//                                         value={couponCode}
//                                         onChange={(e) => setCouponCode(e.target.value)}
//                                         placeholder="Enter coupon code"
//                                         className="flex-1 border rounded px-3 py-2"
//                                     />
//                                     <button
//                                         onClick={applyCoupon}
//                                         className="bg-primary text-white px-4 rounded hover:bg-secondary transition"
//                                     >
//                                         Apply
//                                     </button>
//                                 </div>

//                                 {error && (
//                                     <p className="text-red-600 text-sm mt-2">
//                                         {error}
//                                     </p>
//                                 )}
//                             </div>
//                         )}

//                         {/* APPLIED COUPON */}
//                         {appliedCoupon && (
//                             <div className="mt-4 bg-green-50 border border-green-300 p-3 rounded">
//                                 <div className="flex justify-between items-center text-sm">
//                                     <span className="text-green-700 font-semibold">
//                                         Coupon Applied: {appliedCoupon.code}
//                                     </span>
//                                     <button
//                                         onClick={removeCoupon}
//                                         className="text-red-600 text-xs font-semibold"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         )}

//                         {/* DISCOUNT */}
//                         {discountAmount > 0 && (
//                             <div className="flex justify-between mt-4 text-green-700">
//                                 <span>Discount</span>
//                                 <span>-₹{discountAmount}</span>
//                             </div>
//                         )}

//                         <div className="flex justify-between mb-2">
//                             <span>Shipping</span>
//                             <span className="text-green-600">Free</span>
//                         </div>

//                         {/* TOTAL */}
//                         <div className="flex justify-between font-bold text-lg mb-6">
//                             <span>Total</span>
//                             <span>₹{cartTotal - discountAmount}</span>
//                         </div>


//                         <button
//                             onClick={placeOrder}
//                             disabled={loading}
//                             className="w-full mt-6 bg-primary text-white py-3 rounded hover:bg-secondary transition"
//                         >
//                             {loading ? <Loader /> : "Place Order"}
//                         </button>

//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// }


// function AddressForm({ onClose, onSave, address }) {
//     const [form, setForm] = useState(
//         address || {
//             name: "",
//             street: "",
//             city: "",
//             state: "",
//             zip: "",
//             country: "",
//         }
//     );

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave({ ...form, id: address?.id });
//     };

//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//             <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

//                 <h3 className="text-xl font-heading font-bold mb-6 text-primary">
//                     {address ? "Edit Address" : "Add New Address"}
//                 </h3>

//                 <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//                     <input name="name" placeholder="Address Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" required />
//                     <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="border rounded px-3 py-2 md:col-span-2" required />
//                     <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border rounded px-3 py-2" required />
//                     <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border rounded px-3 py-2" required />
//                     <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="border rounded px-3 py-2" required />
//                     <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="border rounded px-3 py-2" required />

//                     <div className="md:col-span-2 flex justify-end gap-3 mt-4">
//                         <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
//                             Cancel
//                         </button>
//                         <button type="submit" className="px-6 py-2 bg-primary text-white rounded">
//                             Save Address
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaMapMarkerAlt, FaCreditCard, FaChevronLeft } from "react-icons/fa";
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
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Simple Validation
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Order Placed Successfully! 🎉");
    localStorage.removeItem("cartItems"); // Clear cart
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/orders");
  };

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BACK BUTTON & HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors text-sm font-bold mb-4 uppercase tracking-widest"
            >
              <FaChevronLeft size={10} /> Back to Cart
            </button>
            <h1 className="text-4xl font-heading font-bold text-black">
              Secure <span className="text-orange-600 italic font-serif">Checkout</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-100 text-xs font-bold">
            <FaLock /> SSL Encrypted & Secure
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT: SHIPPING FORM */}
          <div className="lg:col-span-2 space-y-8" data-aos="fade-right">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                <FaMapMarkerAlt className="text-orange-600" />
                <h3 className="font-heading font-bold text-xl text-black">Shipping Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                    placeholder="Enter 10-digit number"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Detailed Address *</label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 transition-all outline-none resize-none"
                    placeholder="House No, Street, Landmark..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                    placeholder="Ahmedabad"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-600 transition-all outline-none"
                    placeholder="3800XX"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-orange-600" />
                <h3 className="font-heading font-bold text-xl text-black">Payment Method</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">Currently we only accept Cash on Delivery for Vastu items.</p>
              <div className="p-4 rounded-2xl border-2 border-orange-600 bg-orange-50 flex items-center justify-between">
                <span className="font-bold text-orange-700">Cash on Delivery (COD)</span>
                <div className="h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center">
                   <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="lg:col-span-1" data-aos="fade-left">
            <div className="bg-black text-white rounded-[2.5rem] p-8 shadow-2xl sticky top-24 border-b-8 border-orange-600">
              <h3 className="font-heading font-bold text-2xl mb-8 border-b border-white/10 pb-4">
                Order Items
              </h3>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-bold truncate w-32">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-orange-500">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400 text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm font-medium">
                  <span>Delivery</span>
                  <span className="text-green-400 font-bold uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">Total Amount</span>
                    <span className="text-3xl font-heading font-bold text-orange-500 leading-none">₹{total}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-orange-600 text-white py-5 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-orange-900/20 uppercase tracking-widest text-sm"
              >
                Place Order Now
              </button>
            </div>
          </aside>

        </form>
      </div>
    </section>
  );
}