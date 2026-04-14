import { Link } from "react-router-dom";

export default function Orders() {
  // TEMP ORDER DATA
  const orders = [
    {
      id: "ORD12345",
      date: "12 Sep 2025",
      total: 4397,
      status: "Delivered",
    },
    {
      id: "ORD12346",
      date: "15 Sep 2025",
      total: 1999,
      status: "Shipped",
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">

        <h1 className="text-3xl font-heading font-bold mb-6 text-primary">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-primary/30"
            >
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">
                  Placed on {order.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded text-sm font-semibold ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <p className="font-bold">₹{order.total}</p>

                <Link
                  to={`/orders/${order.id}`}
                  className="hover:text-primary font-semibold bg-primary hover:bg-transparent text-light border border-primary/30 px-2 py-1"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
