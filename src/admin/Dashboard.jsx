import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";




export default function Dashboard() {
  const stats = [
    { title: "Total Orders", value: 245 },
    { title: "Total Products", value: 120 },
    { title: "Total Users", value: 340 },
    { title: "Revenue", value: "₹4,25,000" },
    { title: "Pending Order", value: 340 },
    { title: "Returns", value: "₹4,25,000" },
  ];


  const salesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 210 },
    { month: "Mar", sales: 180 },
    { month: "Apr", sales: 260 },
    { month: "May", sales: 320 },
    { month: "Jun", sales: 400 },
  ];

  const revenueByCategory = [
    { name: "Men", value: 400 },
    { name: "Women", value: 300 },
    { name: "Footwear", value: 200 },
    { name: "Accessories", value: 150 },
  ];

  const orderStatusData = [
    { name: "Pending", value: 12 },
    { name: "Shipped", value: 20 },
    { name: "Delivered", value: 45 },
    { name: "Cancelled", value: 5 },
  ];

  const recentOrders = [
    {
      id: "#ORD1021",
      customer: "Rahul Sharma",
      amount: 2499,
      status: "Delivered",
    },
    {
      id: "#ORD1022",
      customer: "Neha Patel",
      amount: 1799,
      status: "Pending",
    },
    {
      id: "#ORD1023",
      customer: "Amit Verma",
      amount: 3599,
      status: "Shipped",
    },
    {
      id: "#ORD1024",
      customer: "Priya Singh",
      amount: 1299,
      status: "Cancelled",
    },
  ];

  const lowStockProducts = [
    {
      id: "PRD-101",
      name: "Men Cotton T-Shirt",
      category: "Men",
      stock: 5,
    },
    {
      id: "PRD-102",
      name: "Women Stylish Dress",
      category: "Women",
      stock: 2,
    },
    {
      id: "PRD-103",
      name: "Running Sneakers",
      category: "Footwear",
      stock: 0,
    },
  ];

  const topSellingProducts = [
    {
      id: "PRD-201",
      name: "Men Cotton T-Shirt",
      category: "Men",
      sold: 320,
      revenue: 447680,
    },
    {
      id: "PRD-202",
      name: "Running Sneakers",
      category: "Footwear",
      sold: 210,
      revenue: 545790,
    },
    {
      id: "PRD-203",
      name: "Women Stylish Dress",
      category: "Women",
      sold: 185,
      revenue: 295815,
    },
    {
      id: "PRD-204",
      name: "Smart Fitness Watch",
      category: "Accessories",
      sold: 150,
      revenue: 299850,
    },
  ];

  const returnsRefunds = [
    {
      id: "ORD-501",
      customer: "Amit Patel",
      type: "Return",
      reason: "Size issue",
      amount: 1399,
      status: "Pending",
    },
    {
      id: "ORD-502",
      customer: "Neha Sharma",
      type: "Refund",
      reason: "Damaged product",
      amount: 2599,
      status: "Approved",
    },
    {
      id: "ORD-503",
      customer: "Rahul Mehta",
      type: "Return",
      reason: "Wrong item delivered",
      amount: 1799,
      status: "Rejected",
    },
    {
      id: "ORD-504",
      customer: "Priya Verma",
      type: "Refund",
      reason: "Order cancelled",
      amount: 1999,
      status: "Refunded",
    },
  ];

  const payments = [
    {
      id: "PAY-1001",
      orderId: "ORD-201",
      customer: "Amit Patel",
      amount: 2499,
      method: "UPI",
      status: "Success",
      date: "12 Sep 2024",
    },
    {
      id: "PAY-1002",
      orderId: "ORD-202",
      customer: "Neha Sharma",
      amount: 1599,
      method: "Card",
      status: "Pending",
      date: "13 Sep 2024",
    },
    {
      id: "PAY-1003",
      orderId: "ORD-203",
      customer: "Rahul Mehta",
      amount: 3299,
      method: "Net Banking",
      status: "Failed",
      date: "13 Sep 2024",
    },
    {
      id: "PAY-1004",
      orderId: "ORD-204",
      customer: "Priya Verma",
      amount: 1999,
      method: "UPI",
      status: "Success",
      date: "14 Sep 2024",
    },
  ];




  const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626"];

  return (
    <>
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow"
          >
            <h3 className="text-sm text-gray-500 font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2 text-primary">
              {stat.value}
            </p>
          </div>
        ))}
      </div>


      <div className=" space-y-8">

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* SALES BAR CHART */}
          <div className="bg-white p-4 pb-10 rounded shadow h-[300px] w-full">
            <h3 className="font-semibold mb-4 text-primary">Monthly Sales</h3>
            <ResponsiveContainer >
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* REVENUE PIE */}
          <div className="bg-white p-4 rounded shadow h-[300px] w-full">
            <h3 className="font-semibold mb-4 text-primary">Revenue by Category</h3>
            <ResponsiveContainer >
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {revenueByCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ORDER STATUS PIE */}
          <div className="bg-white p-4 rounded shadow h-[300px] w-full">
            <h3 className="font-semibold mb-4 text-primary">Order Status</h3>
            <ResponsiveContainer >
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {orderStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white p-6 rounded shadow ">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Recent Orders
          </h3>

          <div className="relative w-full">
            <div className="overflow-x-auto overflow-y-hidden border border-primary/30">
              <table className="w-full min-w-[800px] border-collapse text-left ">
                <thead>
                  <tr className="border-b bg-primary/70 text-white border-primary/30">
                    <th className="py-3 px-2">Order ID</th>
                    <th className="px-2">Customer</th>
                    <th className="px-2">Amount</th>
                    <th className="px-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-primary/30">
                      <td className="py-3 px-2">{order.id}</td>
                      <td className="px-2">{order.customer}</td>
                      <td className="px-2">₹{order.amount}</td>
                      <td className="px-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>



        </div>

        {/* LOW STOCK PRODUCTS TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Low Stock Products
          </h3>

          <div className="relative w-full">
            <div className="overflow-x-auto overflow-y-hidden border border-primary/30">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b bg-primary/70 text-white border-primary/30">
                    <th className="py-3 px-2">Product ID</th>
                    <th className="px-2">Product Name</th>
                    <th className="px-2">Category</th>
                    <th className="px-2">Stock</th>
                    <th className="px-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-primary/30"
                    >
                      <td className="py-3 px-2">{product.id}</td>
                      <td className="px-2 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-2">{product.category}</td>
                      <td className="px-2 font-bold">
                        {product.stock}
                      </td>
                      <td className="px-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${product.stock === 0
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {product.stock === 0
                            ? "Out of Stock"
                            : "Low Stock"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TOP SELLING PRODUCTS TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Top Selling Products
          </h3>

          <div className="relative w-full">
            <div className="overflow-x-auto overflow-y-hidden border border-primary/30">
              <table className="w-full min-w-[950px] border-collapse text-left">
                <thead>
                  <tr className="border-b bg-primary/70 text-white border-primary/30">
                    <th className="py-3 px-2">Rank</th>
                    <th className="px-2">Product ID</th>
                    <th className="px-2">Product Name</th>
                    <th className="px-2">Category</th>
                    <th className="px-2">Units Sold</th>
                    <th className="px-2">Revenue</th>
                  </tr>
                </thead>

                <tbody>
                  {topSellingProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-primary/30"
                    >
                      {/* RANK */}
                      <td className="py-3 px-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${index === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : index === 1
                              ? "bg-gray-100 text-gray-700"
                              : index === 2
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                        >
                          #{index + 1}
                        </span>
                      </td>

                      <td className="px-2">{product.id}</td>

                      <td className="px-2 font-semibold">
                        {product.name}
                      </td>

                      <td className="px-2">{product.category}</td>

                      <td className="px-2 font-bold">
                        {product.sold}
                      </td>

                      <td className="px-2 font-semibold text-green-700">
                        ₹{product.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RETURNS & REFUNDS SUMMARY */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Returns & Refunds Summary
          </h3>

          <div className="relative w-full">
            <div className="overflow-x-auto overflow-y-hidden border border-primary/30">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead>
                  <tr className="border-b bg-primary/70 text-white border-primary/30">
                    <th className="py-3 px-2">Order ID</th>
                    <th className="px-2">Customer</th>
                    <th className="px-2">Type</th>
                    <th className="px-2">Reason</th>
                    <th className="px-2">Amount</th>
                    <th className="px-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {returnsRefunds.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-primary/30"
                    >
                      <td className="py-3 px-2">{item.id}</td>
                      <td className="px-2">{item.customer}</td>

                      {/* TYPE */}
                      <td className="px-2 font-semibold">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${item.type === "Return"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                            }`}
                        >
                          {item.type}
                        </span>
                      </td>

                      <td className="px-2 text-sm text-gray-600">
                        {item.reason}
                      </td>

                      <td className="px-2 font-semibold">
                        ₹{item.amount}
                      </td>

                      {/* STATUS */}
                      <td className="px-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "Refunded"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded shadow border border-primary/30">
            <p className="text-sm text-gray-500">Total Payments</p>
            <h3 className="text-2xl font-bold text-primary">₹8,396</h3>
          </div>

          <div className="bg-white p-5 rounded shadow border border-primary/30">
            <p className="text-sm text-gray-500">Successful</p>
            <h3 className="text-2xl font-bold text-green-600">₹4,498</h3>
          </div>

          <div className="bg-white p-5 rounded shadow border border-primary/30">
            <p className="text-sm text-gray-500">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">₹1,599</h3>
          </div>

          <div className="bg-white p-5 rounded shadow border border-primary/30">
            <p className="text-sm text-gray-500">Failed</p>
            <h3 className="text-2xl font-bold text-red-600">₹3,299</h3>
          </div>
        </div>

        {/* PAYMENTS OVERVIEW TABLE */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Payments Overview
          </h3>

          <div className="overflow-x-auto border border-primary/30">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-primary/70 text-white border-b border-primary/30">
                  <th className="py-3 px-2">Payment ID</th>
                  <th className="px-2">Order ID</th>
                  <th className="px-2">Customer</th>
                  <th className="px-2">Amount</th>
                  <th className="px-2">Method</th>
                  <th className="px-2">Status</th>
                  <th className="px-2">Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((pay) => (
                  <tr
                    key={pay.id}
                    className="border-b border-primary/30"
                  >
                    <td className="py-3 px-2">{pay.id}</td>
                    <td className="px-2">{pay.orderId}</td>
                    <td className="px-2">{pay.customer}</td>
                    <td className="px-2 font-semibold">₹{pay.amount}</td>
                    <td className="px-2">{pay.method}</td>

                    {/* STATUS */}
                    <td className="px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${pay.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : pay.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {pay.status}
                      </span>
                    </td>

                    <td className="px-2 text-sm text-gray-600">
                      {pay.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </>
  );
}

