import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {

  const navigate = useNavigate();
  const proceedToCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate("/checkout");
  };



  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

 useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.dispatchEvent(new Event("cartUpdated"));
}, [cartItems]);




  // QUANTITY HANDLERS
const increaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, Number(item.quantity) - 1),
          }
        : item
    )
  );
};


const removeItem = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
  toast.success("Item removed from cart");
};



  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // EMPTY CART UI
  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">
          Your Cart is Empty
        </h2>
        <Link
          to="/shop"
          className="inline-block bg-primary text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-heading font-bold mb-10 text-primary" data-aos="fade-up">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6" data-aos="fade-up" data-aos-duration="3000">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border rounded-lg p-4 bg-white border-primary/30"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize}
                  </p>

                  <p className="text-primary font-bold mt-1">
                    ₹{item.price}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="border px-3 py-1 rounded"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="border px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className="bg-white p-6 rounded-lg shadow h-fit border border-primary/30"  data-aos="fade-up" data-aos-duration="2000">
            <h3 className="font-heading font-semibold text-xl mb-6 text-primary">
              Order Summary
            </h3>

            {/* SUBTOTAL */}
            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>

            {/* SHIPPING */}
            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>



            <hr className="my-4 border-primary" />

            {/* TOTAL */}
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>

            <button
              onClick={proceedToCheckout}
              className="block w-full text-center bg-primary text-white py-3 rounded hover:bg-secondary transition"
            >
              Proceed to Checkout
            </button>

          </div>


        </div>
      </div>
    </section>
  );
}
