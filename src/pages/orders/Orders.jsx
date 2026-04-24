// import { Link } from "react-router-dom";
// import { FaBoxOpen, FaChevronRight, FaRegClock, FaTruck } from "react-icons/fa";

// export default function Orders() {
//   // TEMP ORDER DATA
//   const orders = [
//     {
//       id: "ORD12345",
//       date: "12 Sep 2025",
//       total: 4397,
//       status: "Delivered",
//       items: 3,
//     },
//     {
//       id: "ORD12346",
//       date: "15 Sep 2025",
//       total: 1999,
//       status: "Shipped",
//       items: 1,
//     },
//   ];

//   const statusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//         return "text-green-700 bg-green-50 border-green-200";
//       case "Shipped":
//         return "text-orange-600 bg-orange-50 border-orange-200";
//       case "Pending":
//         return "text-yellow-700 bg-yellow-50 border-yellow-200";
//       default:
//         return "text-gray-600 bg-gray-50 border-gray-200";
//     }
//   };

//   return (
//     <section className="py-16 bg-[#FCFBFA] min-h-screen">
//       <div className="max-w-5xl mx-auto px-6" data-aos="fade-up">
        
//         {/* HEADER */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-heading font-bold text-black mb-2">
//             My <span className="text-orange-600 italic font-serif">Orders</span>
//           </h1>
//           <p className="text-gray-500">Track and manage your spiritual tool purchases.</p>
//           <div className="h-1 w-20 bg-black mt-4"></div>
//         </div>

//         {/* ORDERS LIST */}
//         <div className="space-y-4">
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-500"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
//                   {/* LEFT: Order Info */}
//                   <div className="flex items-start gap-5">
//                     <div className="hidden sm:flex h-14 w-14 bg-orange-50 text-orange-600 rounded-2xl items-center justify-center text-xl shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
//                       {order.status === "Delivered" ? <FaBoxOpen /> : <FaTruck />}
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-3 mb-1">
//                         <span className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase">ID: {order.id}</span>
//                         <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-tighter ${statusStyle(order.status)}`}>
//                           {order.status}
//                         </span>
//                       </div>
//                       <h3 className="text-xl font-bold text-black mb-1">Placed on {order.date}</h3>
//                       <p className="text-sm text-gray-500 flex items-center gap-1">
//                         <FaRegClock className="text-xs" /> {order.items} items in this order
//                       </p>
//                     </div>
//                   </div>

//                   {/* RIGHT: Price & Action */}
//                   <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0">
//                     <div className="text-left md:text-right">
//                       <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-0.5">Total Amount</p>
//                       <p className="text-2xl font-heading font-bold text-black">₹{order.total}</p>
//                     </div>
                    
//                     <Link
//                       to={`/orders/${order.id}`}
//                       className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-orange-600 transition-all group/btn shadow-lg shadow-gray-100"
//                     >
//                       Details
//                       <FaChevronRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
//                     </Link>
//                   </div>

//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
//                <FaBoxOpen className="text-5xl text-gray-200 mx-auto mb-4" />
//                <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
//                <Link to="/shop" className="text-orange-600 font-bold underline mt-2 inline-block">Start Shopping</Link>
//             </div>
//           )}
//         </div>

//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaChevronRight,
  FaRegClock,
  FaTruck,
} from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // ✅ LOAD ORDERS FROM LOCALSTORAGE
  useEffect(() => {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    // ✅ Listen for updates (after checkout)
    const handleUpdate = () => {
      const updated =
        JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(updated);
    };

    window.addEventListener("ordersUpdated", handleUpdate);

    return () => {
      window.removeEventListener("ordersUpdated", handleUpdate);
    };
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-700 bg-green-50 border-green-200";
      case "Shipped":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "Placed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            My <span className="text-orange-600 italic">Orders</span>
          </h1>
          <p className="text-gray-500">
            Track and manage your orders
          </p>
          <div className="h-1 w-20 bg-black mt-4"></div>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white rounded-3xl p-6 md:p-8 border shadow-sm hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex gap-5">
                    <div className="hidden sm:flex h-14 w-14 bg-orange-50 text-orange-600 rounded-2xl items-center justify-center text-xl">
                      {order.status === "Delivered" ? (
                        <FaBoxOpen />
                      ) : (
                        <FaTruck />
                      )}
                    </div>

                    <div>
                      <div className="flex gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">
                          ID: {order.id}
                        </span>

                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${statusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold">
                        {order.date}
                      </h3>

                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FaRegClock />{" "}
                        {order.items?.length || 0} items
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex justify-between md:justify-end gap-8 items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        Total
                      </p>
                      <p className="text-xl font-bold">
                        ₹{order.total}
                      </p>
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition"
                    >
                      Details <FaChevronRight size={10} />
                    </Link>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
              <FaBoxOpen className="text-5xl text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">
                No orders yet
              </p>

              <Link
                to="/shop"
                className="text-orange-600 font-bold underline mt-2 inline-block"
              >
                Start Shopping
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}