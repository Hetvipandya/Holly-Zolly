import { useParams } from "react-router-dom";
import products from "../../data/products";
import DeliveryTracking from "../../components/DeliveryTracking";

export default function OrderDetails() {
  const { orderId } = useParams();

  // TEMP ORDER DETAILS
  const order = {
    id: orderId,
    date: "12 Sep 2025",
    status: "Delivered",
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


  // here get details from database for tracking
  const orderStatus = "out-for-delivery";

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">

        <h1 className="text-3xl font-heading font-bold mb-2 text-primary" >
          Order Details
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Order ID: {order.id} | Placed on {order.date}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8  border border-primary/50">

            {/* ORDER ITEMS */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
                Items
              </h3>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b py-4 last:border-b-0"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* DELIVERY ADDRESS */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-heading font-semibold text-xl mb-4 text-primary">
                Delivery Address
              </h3>

              <p className="font-semibold">{order.address.name}</p>
              <p className="text-sm">{order.address.address}</p>
              <p className="text-sm">📞 {order.address.phone}</p>
            </div>

            
            <DeliveryTracking status={orderStatus} />
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white p-6 rounded shadow h-fit  border border-primary/30" data-aos="fade-up" data-aos-duration="2500">
            <h3 className="font-heading font-semibold text-xl mb-6 text-primary">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
