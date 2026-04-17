// import { useParams } from "react-router-dom";
// import products from "../../data/products";
// import DeliveryTracking from "../../components/DeliveryTracking";

// export default function OrderDetails() {
//   const { orderId } = useParams();

//   // TEMP ORDER DETAILS
//   const order = {
//     id: orderId,
//     date: "12 Sep 2025",
//     status: "Delivered",
//     address: {
//       name: "Darshil Patel",
//       phone: "9876543210",
//       address: "123, Ring Road, Ahmedabad, Gujarat - 380015",
//     },
//     items: [
//       { ...products[0], quantity: 1 },
//       { ...products[4], quantity: 2 },
//     ],
//   };

//   const total = order.items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );


//   // here get details from database for tracking
//   const orderStatus = "out-for-delivery";

//   return (
//     <section className="py-10">
//       <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">

//         <h1 className="text-3xl font-heading font-bold mb-2 text-primary" >
//           Order Details
//         </h1>

//         <p className="text-sm text-gray-500 mb-6">
//           Order ID: {order.id} | Placed on {order.date}
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

//           {/* LEFT SIDE */}
//           <div className="lg:col-span-2 space-y-8  border border-primary/50">

//             {/* ORDER ITEMS */}
//             <div className="bg-white p-6 rounded shadow">
//               <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
//                 Items
//               </h3>

//               {order.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex gap-4 border-b py-4 last:border-b-0"
//                 >
//                   <img
//                     src={item.images[0]}
//                     alt={item.name}
//                     className="h-20 w-20 object-cover rounded"
//                   />

//                   <div className="flex-1">
//                     <p className="font-semibold">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       Qty: {item.quantity}
//                     </p>
//                   </div>

//                   <p className="font-bold">
//                     ₹{item.price * item.quantity}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* DELIVERY ADDRESS */}
//             <div className="bg-white p-6 rounded shadow">
//               <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
//                 Delivery Address
//               </h3>

//               <p className="font-semibold">{order.address.name}</p>
//               <p className="text-sm">{order.address.address}</p>
//               <p className="text-sm">📞 {order.address.phone}</p>
//             </div>

            
//             <DeliveryTracking status={orderStatus} />
//           </div>

//           {/* ORDER SUMMARY */}
//           <div className="bg-white p-6 rounded shadow h-fit  border border-primary/30" data-aos="fade-up" data-aos-duration="2500">
//             <h3 className="font-heading font-semibold text-xl mb-6 text-primary">
//               Order Summary
//             </h3>

//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span>₹{total}</span>
//             </div>

//             <div className="flex justify-between mb-2">
//               <span>Shipping</span>
//               <span className="text-green-600">Free</span>
//             </div>

//             <hr className="my-4" />

//             <div className="flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span>₹{total}</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import { useParams } from "react-router-dom";
import products from "../../data/products";
import DeliveryTracking from "../../components/DeliveryTracking";
import { FaMapMarkerAlt, FaReceipt, FaBox, FaPhoneAlt } from "react-icons/fa";

export default function OrderDetails() {
  const { orderId } = useParams();

  // TEMP ORDER DETAILS
  const order = {
    id: orderId,
    date: "12 Sep 2025",
    status: "Out for Delivery",
    address: {
      name: "Darshil Patel",
      phone: "9876543210",
      address: "123, Ring Road, Ahmedabad, Gujarat - 380015",
    },
    items: [
      { ...products[0], quantity: 1 },
      { ...products[4], quantity: 2 },
    ],
  };

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderStatus = "out-for-delivery";

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        
        {/* TOP NAVIGATION / HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-heading font-bold text-black mb-2">
            Order <span className="text-orange-600 italic font-serif">Invoice</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-black text-white px-3 py-1 rounded-md font-mono">#{order.id}</span>
            <span className="text-gray-400">Placed on {order.date}</span>
            <span className="ml-auto bg-orange-50 text-orange-700 px-4 py-1 rounded-full border border-orange-100 font-bold text-xs uppercase tracking-widest">
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* LEFT SIDE: Items & Delivery */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* ORDER ITEMS CARD */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <FaBox className="text-orange-600" />
                <h3 className="font-heading font-bold text-xl text-black">Purchased Items</h3>
              </div>

              <div className="divide-y divide-gray-50">
                {order.items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 py-6 first:pt-0 last:pb-0 group">
                    <div className="h-24 w-24 overflow-hidden rounded-2xl bg-gray-50 shrink-0 border border-gray-100">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-lg text-slate-800 group-hover:text-orange-600 transition-colors">{item.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">Quantity: <span className="text-black font-semibold">{item.quantity}</span></p>
                    </div>

                    <div className="flex flex-col justify-center items-end">
                      <p className="text-xl font-bold text-black">₹{item.price * item.quantity}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRACKING SECTION */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
               <DeliveryTracking status={orderStatus} />
            </div>

            {/* ADDRESS SECTION */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FaMapMarkerAlt size={100} />
              </div>
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <FaMapMarkerAlt className="text-orange-600" />
                <h3 className="font-heading font-bold text-xl text-black">Shipping Address</h3>
              </div>

              <div className="relative z-10">
                <p className="font-bold text-lg text-black mb-2">{order.address.name}</p>
                <p className="text-gray-600 leading-relaxed max-w-sm mb-4">
                  {order.address.address}
                </p>
                <div className="flex items-center gap-2 text-orange-600 font-bold bg-orange-50 w-fit px-4 py-2 rounded-xl">
                  <FaPhoneAlt size={12} />
                  <span>{order.address.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY */}
          <aside className="sticky top-24 space-y-6">
            <div className="bg-black text-white rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-orange-600" data-aos="fade-left">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <FaReceipt className="text-orange-500" />
                <h3 className="font-heading font-bold text-xl">Order Summary</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Items Subtotal</span>
                  <span className="text-white font-medium">₹{total}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Shipping Fee</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Vastu Consultation Fee</span>
                  <span className="text-white font-medium">₹0.00</span>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <span className="text-sm uppercase tracking-[0.2em] text-gray-400">Total Amount</span>
                    <span className="text-3xl font-heading font-bold text-orange-500">₹{total}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-orange-900/20">
                Download Invoice (PDF)
              </button>
            </div>

            {/* NEED HELP BOX */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center">
               <p className="text-sm text-gray-500 mb-3 font-medium">Have issues with this order?</p>
               <button className="text-orange-600 font-bold hover:underline">Contact Vastu Support</button>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}