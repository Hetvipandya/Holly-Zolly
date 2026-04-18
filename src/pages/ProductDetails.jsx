import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";
import { FaHeart } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || "");
      setSelectedSize(product.sizes?.[0] || "");
    }
  }, [product]);

  if (!product) {
    return <div className="p-10 text-center">Product Not Found</div>;
  }

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
    toast.success("Added to cart 🛒");
  };

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">

        <Link to="/shop" className="flex gap-2 mb-6">
          <FiArrowLeft /> Back
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
            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            {/* 🔥 PRICE SECTION FIX */}
            <div className="mt-3 flex items-center gap-3">
              
              <p className="text-orange-600 text-2xl font-bold">
                ₹{product.price}
              </p>

              {product.originalPrice && (
                <p className="text-gray-400 text-lg line-through">
                  ₹{product.originalPrice}
                </p>
              )}

              {product.originalPrice && (
                <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}% OFF
                </span>
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

              <button className="border px-4 py-2 rounded">
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

                  {/* 🔥 PRICE */}
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