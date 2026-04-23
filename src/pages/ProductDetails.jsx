import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../data/products";
import { FaHeart } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 🔥 Toast Style
  const toastStyle = {
    position: "bottom-right",
    style: {
      background: "#4B5563",
      color: "#fff",
      borderRadius: "10px",
    },
  };

  // ✅ Load Products
  useEffect(() => {
    const data = getProducts(); // if async → use await
    setProducts(data);
  }, []);

  // ✅ Find Product
  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.id === Number(id));
      setProduct(found);
    }
  }, [products, id]);

  // ✅ Setup Product State
  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || "");
      setSelectedSize(product.sizes?.[0] || "");

      const wishlist =
        JSON.parse(localStorage.getItem("wishlistItems")) || [];

      const exists = wishlist.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === (product.sizes?.[0] || "")
      );

      setIsWishlisted(!!exists);
    }
  }, [product]);

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // 🛒 ADD TO CART
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const index = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize
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
        selectedSize,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Added to cart 🛒", toastStyle);
  };

  // ❤️ TOGGLE WISHLIST
  const toggleWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const index = wishlist.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize
    );

    if (index > -1) {
      wishlist.splice(index, 1);
      setIsWishlisted(false);
      toast.success("Removed from wishlist ❌", toastStyle);
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        selectedSize,
      });
      setIsWishlisted(true);
      toast.success("Added to wishlist ❤️", toastStyle);
    }

    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* 🔙 BACK BUTTON */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 mb-6 text-gray-600 font-medium hover:text-black transition-all duration-300 group"
        >
          <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="relative">
            Back
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div>
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded"
            />

            <div className="flex gap-3 mt-4">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className="w-20 h-20 object-cover cursor-pointer border"
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* PRICE */}
            <div className="mt-3 flex items-center gap-3">
              <p className="text-orange-600 text-2xl font-bold">
                ₹{product.price}
              </p>

              {product.originalPrice && (
                <>
                  <p className="text-gray-400 text-lg line-through">
                    ₹{product.originalPrice}
                  </p>
                  <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            {/* SIZE */}
            {product.sizes && (
              <div className="mt-6">
                <h4>Select Size</h4>
                <div className="flex gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={addToCart}
                className="bg-orange-600 text-white px-6 py-2 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={toggleWishlist}
                className={`border px-4 py-2 rounded ${
                  isWishlisted ? "bg-red-500 text-white" : ""
                }`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(
                (p) =>
                  p.category === product.category &&
                  p.id !== product.id
              )
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <img
                    src={item.images[0]}
                    className="h-40 w-full object-cover rounded"
                  />
                  <p className="mt-2">{item.name}</p>

                  <div className="flex gap-2">
                    <p className="text-orange-600">
                      ₹{item.price}
                    </p>
                    <p className="line-through text-gray-400">
                      ₹{item.originalPrice}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}