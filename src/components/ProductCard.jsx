import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {

  // ❤️ ADD TO WISHLIST
  const addToWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const sizeToSend = product.sizes?.[0]; // ✅ default size

    const exists = wishlist.some(
      (item) =>
        item.id === product.id &&
        item.selectedSize === sizeToSend
    );

    if (exists) {
      toast("Already in wishlist ❤️", { icon: "ℹ️" });
      return;
    }

    wishlist.push({
      ...product,
      selectedSize: sizeToSend, // ✅ IMPORTANT
    });

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlist)
    );
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`Added to wishlist (Size: ${sizeToSend}) ❤️`);
  };


  // 🛒 ADD TO CART
  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const sizeToSend = product.sizes?.[0]; // ✅ default size

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
        selectedSize: sizeToSend, // ✅ IMPORTANT
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Added to cart (Size: ${sizeToSend}) 🛒`);
  };


  return (
    <div
      className="group bg-white rounded-lg shadow hover:shadow-xl transition relative overflow-hidden"
      data-aos="fade-up"
    >
      {/* BADGES (HIDE ON IMAGE HOVER) */}
      {product.isSale && (
        <span className="absolute top-3 z-10 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ">
          SALE
        </span>
      )}

      {product.isBestSeller && (
        <span className="absolute z-10 top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ">
          HOT
        </span>
      )}

      {/* WISHLIST ICON (HIDE ON IMAGE HOVER) */}
      <button
        onClick={addToWishlist}
        className="absolute top-12 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition-opacity duration-300  z-10"
      >
        <FaHeart size={14} />
      </button>

      {/* IMAGE */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg truncate">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mt-1">
          <p className="text-primary font-bold">
            ₹{product.price}
          </p>

          <p className="flex items-center gap-1 text-sm font-semibold">
            <FaStar className="text-yellow-400" />
            {product.rating}
          </p>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={addToCart}
          className="mt-4 w-full bg-primary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-secondary transition"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
