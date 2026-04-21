import { useState, useEffect } from "react";
import { FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // 🔥 Common Toast Style
  const toastStyle = {
    position: "bottom-right",
    style: {
      background: "#4B5563", // gray
      color: "#fff",
      borderRadius: "10px",
    },
  };

  useEffect(() => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));

    toast.success("Removed from wishlist ❌", toastStyle);
  };

  const moveToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const sizeToSend =
      product.selectedSize || product.sizes?.[0] || "Standard";

    const index = cart.findIndex(
      (item) =>
        item.id === product.id && item.selectedSize === sizeToSend
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
        selectedSize: sizeToSend,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    const updatedWishlist = wishlistItems.filter(
      (item) =>
        !(item.id === product.id && item.selectedSize === sizeToSend)
    );

    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Moved to cart 🛒", toastStyle);

    navigate("/cart");
  };

  if (wishlistItems.length === 0) {
    return (
      <div
        className="py-28 text-center bg-[#FCFBFA] min-h-[60vh] flex flex-col items-center justify-center px-6"
        data-aos="fade-up"
      >
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-200">
          <FaShoppingCart size={40} />
        </div>

        <h2 className="text-3xl font-heading font-bold mb-4 text-black">
          Your Wishlist is{" "}
          <span className="text-orange-600 italic">Empty</span>
        </h2>

        <p className="text-gray-500 mb-8 max-w-sm">
          Looks like you haven't saved any Vastu tools yet. Start exploring our collection.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
        >
          Discover Products <FaArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">

        {/* TITLE */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mb-2">
            My <span className="text-orange-600 italic font-serif">Wishlist</span>
          </h1>
          <div className="h-1.5 w-20 bg-orange-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 relative"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* INFO */}
              <div className="p-8">
                <h3 className="font-heading font-bold text-xl text-black truncate mb-2">
                  {item.name}
                </h3>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xs text-gray-400 uppercase font-bold">
                      Price
                    </span>
                    <span className="block text-2xl font-bold text-black">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400 uppercase font-bold">
                      Size
                    </span>
                    <p className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg mt-1 inline-block">
                      {item.selectedSize}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => moveToCart(item)}
                  className="w-full bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-orange-600 transition-all shadow-lg"
                >
                  <FaShoppingCart size={16} />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}