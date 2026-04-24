// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DeliveryTracking from "../../components/DeliveryTracking";
// import {
//   FaMapMarkerAlt,
//   FaReceipt,
//   FaBox,
//   FaPhoneAlt,
//   FaTrash,
// } from "react-icons/fa";

// export default function OrderDetails() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);

//   // ✅ LOAD ORDER
//   useEffect(() => {
//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
//     const foundOrder = orders.find((o) => String(o.id) === orderId);

//     if (!foundOrder) navigate("/orders");
//     else setOrder(foundOrder);
//   }, [orderId, navigate]);

//   if (!order) return null;

//   const orderStatus = order.status?.toLowerCase().replace(/\s/g, "-");

//   // ✅ CANCEL FULL ORDER
//   const handleCancelOrder = () => {
//     if (!window.confirm("Cancel full order?")) return;

//     let orders = JSON.parse(localStorage.getItem("orders")) || [];
//     orders = orders.filter((o) => String(o.id) !== orderId);

//     localStorage.setItem("orders", JSON.stringify(orders));
//     window.dispatchEvent(new Event("ordersUpdated"));

//     alert("Order Cancelled ❌");
//     navigate("/orders");
//   };

//   // ✅ CANCEL SINGLE PRODUCT
//   const handleRemoveItem = (itemId) => {
//     if (!window.confirm("Remove this item from order?")) return;

//     let orders = JSON.parse(localStorage.getItem("orders")) || [];

//     const updatedOrders = orders.map((o) => {
//       if (String(o.id) === orderId) {
//         const updatedItems = o.items.filter((i) => i.id !== itemId);

//         // if no items left → delete order
//         if (updatedItems.length === 0) {
//           return null;
//         }

//         const newTotal = updatedItems.reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0
//         );

//         return {
//           ...o,
//           items: updatedItems,
//           total: newTotal,
//         };
//       }
//       return o;
//     }).filter(Boolean);

//     localStorage.setItem("orders", JSON.stringify(updatedOrders));
//     window.dispatchEvent(new Event("ordersUpdated"));

//     const updatedOrder = updatedOrders.find(
//       (o) => String(o.id) === orderId
//     );

//     if (!updatedOrder) {
//       navigate("/orders");
//     } else {
//       setOrder(updatedOrder);
//     }
//   };

//   return (
//     <section className="py-16 bg-gradient-to-b from-[#FCFBFA] to-white min-h-screen">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold mb-3">
//             Order <span className="text-orange-600 italic">Details</span>
//           </h1>

//           <div className="flex flex-wrap items-center gap-4">
//             <span className="bg-black text-white px-3 py-1 rounded-md text-sm font-mono">
//               #{order.id}
//             </span>

//             <span className="text-gray-400 text-sm">
//               {order.date}
//             </span>

//             <div className="ml-auto flex gap-3">
//               <span className="bg-orange-50 text-orange-700 px-4 py-1 rounded-full text-xs font-bold uppercase">
//                 {order.status}
//               </span>

//               {order.status !== "Delivered" && (
//                 <button
//                   onClick={handleCancelOrder}
//                   className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition"
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* LEFT */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* ITEMS */}
//             <div className="bg-white rounded-3xl p-8 shadow-sm border">
//               <div className="flex items-center gap-3 mb-6">
//                 <FaBox className="text-orange-600" />
//                 <h3 className="text-xl font-bold">Order Items</h3>
//               </div>

//               <div className="space-y-6">
//                 {order.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex flex-col sm:flex-row gap-4 border-b pb-4"
//                   >
//                     <img
//                       src={item.image || item.images?.[0]}
//                       className="w-24 h-24 object-cover rounded-xl"
//                     />

//                     <div className="flex-1">
//                       <h4 className="font-bold text-lg">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity}
//                       </p>
//                       <p className="text-orange-600 font-bold mt-1">
//                         ₹{item.price * item.quantity}
//                       </p>
//                     </div>

//                     {/* CANCEL ITEM */}
//                     {order.status !== "Delivered" && (
//                       <button
//                         onClick={() => handleRemoveItem(item.id)}
//                         className="flex items-center gap-2 text-red-500 text-sm font-bold hover:underline"
//                       >
//                         <FaTrash size={12} /> Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* TRACKING */}
//             <div className="bg-white rounded-3xl p-8 shadow-sm border">
//               <DeliveryTracking status={orderStatus} />
//             </div>

//             {/* ADDRESS */}
//             <div className="bg-white rounded-3xl p-8 shadow-sm border">
//               <div className="flex items-center gap-3 mb-4">
//                 <FaMapMarkerAlt className="text-orange-600" />
//                 <h3 className="font-bold text-xl">Shipping Address</h3>
//               </div>

//               <p className="font-bold">{order.address.name}</p>
//               <p className="text-gray-600">{order.address.address}</p>

//               <div className="flex items-center gap-2 mt-3 text-orange-600 font-bold">
//                 <FaPhoneAlt size={12} />
//                 {order.address.phone}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <aside className="space-y-6">

//             <div className="bg-black text-white rounded-3xl p-8 shadow-lg">
//               <div className="flex items-center gap-3 mb-4">
//                 <FaReceipt />
//                 <h3 className="text-xl font-bold">Order Summary</h3>
//               </div>

//               <div className="flex justify-between text-lg font-semibold">
//                 <span>Total</span>
//                 <span className="text-orange-500">
//                   ₹{order.total}
//                 </span>
//               </div>
//             </div>

//             <div className="bg-white rounded-3xl p-6 border text-center">
//               <p className="text-sm text-gray-500 mb-3">
//                 Need help?
//               </p>

//               <Link
//                 to="/contact"
//                 className="text-orange-600 font-bold underline"
//               >
//                 Contact Support
//               </Link>
//             </div>

//           </aside>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeliveryTracking from "../../components/DeliveryTracking";
import {
  FaMapMarkerAlt,
  FaReceipt,
  FaBox,
  FaPhoneAlt,
  FaTrash,
} from "react-icons/fa";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = orders.find((o) => String(o.id) === orderId);

    if (!foundOrder) navigate("/orders");
    else setOrder(foundOrder);
  }, [orderId, navigate]);

  if (!order) return null;

  const orderStatus = order.status?.toLowerCase().replace(/\s/g, "-");

  const openCancelOrder = () => {
    setActionType("order");
    setShowModal(true);
  };

  const openRemoveItem = (itemId) => {
    setActionType("item");
    setSelectedItemId(itemId);
    setShowModal(true);
  };

  const handleConfirm = () => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (actionType === "order") {
      orders = orders.filter((o) => String(o.id) !== orderId);
      localStorage.setItem("orders", JSON.stringify(orders));
      window.dispatchEvent(new Event("ordersUpdated"));
      setShowModal(false);
      navigate("/orders");
      return;
    }

    if (actionType === "item") {
      const updatedOrders = orders
        .map((o) => {
          if (String(o.id) === orderId) {
            const updatedItems = o.items.filter(
              (i) => i.id !== selectedItemId
            );

            if (updatedItems.length === 0) return null;

            const newTotal = updatedItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return {
              ...o,
              items: updatedItems,
              total: newTotal,
            };
          }
          return o;
        })
        .filter(Boolean);

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event("ordersUpdated"));

      const updatedOrder = updatedOrders.find(
        (o) => String(o.id) === orderId
      );

      if (!updatedOrder) navigate("/orders");
      else setOrder(updatedOrder);
    }

    setShowModal(false);
  };

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-[#FCFBFA] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Order <span className="text-orange-600 italic">Details</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="bg-black text-white px-3 py-1 rounded-md text-xs sm:text-sm font-mono w-fit">
              #{order.id}
            </span>

            <span className="text-gray-400 text-xs sm:text-sm">
              {order.date}
            </span>

            <div className="sm:ml-auto flex flex-wrap gap-2">
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {order.status}
              </span>

              {order.status !== "Delivered" && (
                <button
                  onClick={openCancelOrder}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* ITEMS */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-5">
                <FaBox className="text-orange-600" />
                <h3 className="text-lg md:text-xl font-bold">Order Items</h3>
              </div>

              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image || item.images?.[0]}
                      className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h4 className="font-bold text-base md:text-lg">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-orange-600 font-bold mt-1">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => openRemoveItem(item.id)}
                        className="flex items-center gap-2 text-red-500 text-sm font-bold hover:underline self-start sm:self-center"
                      >
                        <FaTrash size={12} /> Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TRACKING */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border">
              <DeliveryTracking status={orderStatus} />
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border">
              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-orange-600" />
                <h3 className="font-bold text-lg md:text-xl">
                  Shipping Address
                </h3>
              </div>

              <p className="font-bold text-sm md:text-base">
                {order.address.name}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address.address}
              </p>

              <div className="flex items-center gap-2 mt-3 text-orange-600 font-bold text-sm">
                <FaPhoneAlt size={12} />
                {order.address.phone}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">

            <div className="bg-black text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <FaReceipt />
                <h3 className="text-lg md:text-xl font-bold">
                  Order Summary
                </h3>
              </div>

              <div className="flex justify-between text-base md:text-lg font-semibold">
                <span>Total</span>
                <span className="text-orange-500">
                  ₹{order.total}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border text-center">
              <p className="text-sm text-gray-500 mb-2">
                Need help?
              </p>
              <Link
                to="/contact"
                className="text-orange-600 font-bold underline text-sm"
              >
                Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-5 md:p-6 w-full max-w-md text-center">
            <h2 className="text-lg md:text-xl font-bold mb-2">
              {actionType === "order"
                ? "Cancel this Order?"
                : "Remove this Item?"}
            </h2>

            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to continue?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 w-full sm:w-auto"
              >
                No
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white w-full sm:w-auto"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}