import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // ✅ LOAD WISHLIST FROM LOCALSTORAGE
  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  // ✅ REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== id
    );
    setWishlistItems(updatedWishlist);
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(updatedWishlist)
    );

window.dispatchEvent(new Event("wishlistUpdated"));
    toast.success("Removed from wishlist");
  };

  // ✅ MOVE TO CART
  const moveToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const sizeToSend = product.selectedSize || product.sizes?.[0];

    const index = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === sizeToSend
    );

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        selectedSize: sizeToSend, // ✅ SAME SIZE
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    // Remove from wishlist
    const updatedWishlist = wishlistItems.filter(
      (item) =>
        !(
          item.id === product.id &&
          item.selectedSize === sizeToSend
        )
    );

    setWishlistItems(updatedWishlist);
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`Moved to cart (Size: ${sizeToSend}) 🛒`);
    navigate("/cart");
  };



  // ✅ EMPTY STATE
  if (wishlistItems.length === 0) {
    return (
      <div className="py-20 text-center"  data-aos="fade-up">
        <h2 className="text-2xl font-heading font-bold mb-4">
          Your Wishlist is Empty
        </h2>
        <Link
          to="/shop"
          className="inline-block bg-primary text-white px-6 py-3 rounded"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6"  data-aos="fade-up">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-heading font-bold mb-10 text-primary">
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden hover:border border-primary"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />
              </Link>

              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg truncate">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center mr-8">
                  <p className="text-primary font-bold mt-1">
                    ₹{item.price}
                  </p>

                  <p className="text-primary font-bold mt-1">
                    Size : {item.selectedSize}
                  </p>
                </div>


                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => moveToCart(item)}
                    className="flex-1 bg-primary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-secondary transition"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-12 border rounded flex items-center justify-center text-red-500 hover:bg-red-50"
                  >
                    <FaTrash />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
