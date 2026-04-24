import { useState } from "react";
import { FaEye } from "react-icons/fa";
import OrderDetailsModal from "../components/OrderDetailsModal";


export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD1001",
      customer: "Rahul Sharma",
      date: "10 Sep 2025",
      total: 2599,
      payment: "COD",
      status: "Pending",
      items: [
        { name: "Running Sneakers", qty: 1, price: 2599 },
      ],
    },
    {
      id: "ORD1002",
      customer: "Anita Patel",
      date: "12 Sep 2025",
      total: 4397,
      payment: "Razorpay",
      status: "Shipped",
      items: [
        { name: "Men T-Shirt", qty: 1, price: 799 },
        { name: "Sneakers Shoes", qty: 2, price: 1799 },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      {/* HEADER */}
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Orders Management
      </h2>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/70 ">
            <tr className="text-light">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-semibold">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.payment}</td>
                <td className="p-3">₹{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-primary"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </>
  );
}
