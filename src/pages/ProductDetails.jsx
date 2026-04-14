import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import { FaStar, FaHeart } from "react-icons/fa";
import { FaTruck, FaUndo, FaLock } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import SizeGuidePopup from "../components/SizeGuidePopup";


export default function ProductDetails() {
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);


  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    // ✅ if size not selected, take first available size
    const sizeToSend = selectedSize || product.sizes[0];

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
        selectedSize: sizeToSend,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Added to cart (Size: ${sizeToSend}) 🛒`);
  };


  const addToWishlist = (product) => {
    const existingWishlist =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];

    const sizeToSend = selectedSize || product.sizes[0];

    const alreadyExists = existingWishlist.some(
      (item) =>
        item.id === product.id &&
        item.selectedSize === sizeToSend
    );

    if (alreadyExists) {
      toast("Already in wishlist ❤️", { icon: "ℹ️" });
      return;
    }

    const updatedWishlist = [
      ...existingWishlist,
      {
        ...product,
        selectedSize: sizeToSend, // ✅ STORE SIZE
      },
    ];

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(updatedWishlist)
    );
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`Added to wishlist (Size: ${sizeToSend}) ❤️`);
  };



  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(
    product?.images[0]
  );
  // const [selectedSize, setSelectedSize] = useState("");
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] || ""
  );


  if (!product) {
    return <div className="p-10">Product not found</div>;
  }



  const submitReview = () => {
    if (!reviewName || !reviewText || rating === 0) {
      toast.error("Please fill all fields and select rating");
      return;
    }

    const reviewData = {
      name: reviewName,
      rating,
      comment: reviewText,
      date: new Date().toISOString(),
      status: "Pending", // for admin approval
    };

    console.log("REVIEW SUBMITTED:", reviewData);

    // 👉 Later: send to API / database
    // axios.post("/api/reviews", reviewData)

    toast.success("Your review has been submitted for approval ⭐");

    // Reset form
    setReviewName("");
    setReviewText("");
    setRating(0);
  };


  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-6">

        <Link to="/shop" className="flex items-center gap-2 text-primary"><FiArrowLeft /> All Products</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-5" data-aos="fade-up">

          {/* IMAGE GALLERY */}
          <div>
            <img
              src={activeImage}
              alt={product.name}
              className="w-full rounded-lg mb-4 h-[400px] md:h-[600px] "
            />

            <div className="flex gap-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 object-cover rounded cursor-pointer border ${activeImage === img
                    ? "border-primary"
                    : "border-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              SKU: {product.sku}
            </p>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              <FaStar className="text-yellow-400" />
              <span>{product.rating} / 5</span>
            </div>

            {/* PRICE BLOCK */}
            <div className="mt-4 space-y-2 shadow p-3 border border-primary/10">

              {/* PRICE + DISCOUNT */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-red-600">
                  ₹{product.price}
                </span>

                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>

                <span className="text-red-600 font-semibold text-sm">
                  (
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                    100
                  )}
                  % OFF)
                </span>
              </div>

              {/* STOCK MESSAGE */}
              {product.stock && product.stockQty > 0 ? (
                <p className="text-sm font-semibold text-red-600 flex items-center gap-2">
                  🚚 <span>HURRY!</span> Only {product.stockQty} units left in stock.
                </p>
              ) : (
                <p className="text-sm font-semibold text-gray-500">
                  Out of Stock
                </p>
              )}
            </div>


            {/* DESCRIPTION */}
            <p className="mt-4 text-gray-700">
              {product.description}
            </p>

            {/* SIZE SELECT */}
            <div className="my-6">
              <h4 className="font-semibold mb-2">Select Size</h4>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${selectedSize === size
                      ? "bg-primary text-white"
                      : "hover:border-primary"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 📏 Fit Guide & Size Chart */}

            <button
              onClick={() => setOpenSizeGuide(true)}
              className="fmt-4 font-bold text-gray-700 hover:text-primary"
            >
              📏 Size Guide
            </button>
            <SizeGuidePopup
              isOpen={openSizeGuide}
              onClose={() => setOpenSizeGuide(false)}
            />



            {/* ACTION BUTTONS */}
            <div className="mt-8 flex gap-4">


              <button
                onClick={addToCart}
                className="flex-1 bg-primary text-white py-3 rounded hover:bg-secondary transition"
              >
                Add to Cart
              </button>



              <button
                onClick={() => addToWishlist(product)}
                className="w-14 border rounded flex items-center justify-center
               hover:text-red-500"
              >
                <FaHeart />
              </button>

            </div>

            <section className="border-t border-b bg-white border-primary/40 mt-7">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-3 gap-6 text-center">

                  {/* FREE SHIPPING */}
                  <div className="flex flex-col items-center gap-2">
                    <FaTruck className="text-green-600 text-2xl" />
                    <p className="text-sm font-semibold tracking-wide">
                      FREE SHIPPING
                    </p>
                  </div>

                  {/* RETURN */}
                  <div className="flex flex-col items-center gap-2">
                    <FaUndo className="text-blue-600 text-2xl" />
                    <p className="text-sm font-semibold tracking-wide">
                      15 DAYS RETURN
                    </p>
                  </div>

                  {/* SECURE PAYMENTS */}
                  <div className="flex flex-col items-center gap-2">
                    <FaLock className="text-yellow-600 text-2xl" />
                    <p className="text-sm font-semibold tracking-wide">
                      SECURE PAYMENTS
                    </p>
                  </div>

                </div>
              </div>
            </section>

          </div>
        </div>

        {/* RATING & REVIEWS */}
        <section className="my-10" data-aos="fade-up">
          <h2 className="text-2xl font-heading font-bold mb-8 text-primary">
            Rating & Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT: OVERALL RATING */}
            <div>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-bold text-primary">
                  {product.rating}
                </span>
                <span className="text-gray-500 mb-2">/ 5</span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                (50 New Reviews)
              </p>

              {/* STAR DISTRIBUTION */}
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm w-4">{star}</span>
                    <FaStar className="text-yellow-400 text-sm" />

                    <div className="flex-1 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-primary rounded"
                        style={{
                          width:
                            star === 5
                              ? "70%"
                              : star === 4
                                ? "45%"
                                : star === 3
                                  ? "20%"
                                  : star === 2
                                    ? "10%"
                                    : "5%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: REVIEW CARD */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-accent">
                    Alex Mathio
                  </h4>
                  <div className="flex text-yellow-400 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                </div>

                <span className="text-xs text-gray-400">
                  13 Oct 2024
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                “NextGen’s dedication to sustainability and ethical practices
                resonates strongly with today’s consumers, positioning the brand
                as a responsible choice in the fashion world.”
              </p>

              {/* USER AVATAR */}
              <div className="flex items-center gap-3 mt-6">
                {/* <img
          src="/image/users/user1.jpg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        /> */}
                <span className="text-sm text-gray-500">
                  Verified Buyer
                </span>
              </div>

            </div>
          </div>
        </section>


        {/* ADD REVIEW SECTION */}
        <section className="my-12" data-aos="fade-up">
          <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
            Write a Review
          </h2>

          <form>

          <div className="bg-white border rounded-xl p-6 shadow-sm border-primary/30 ">

           <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 items-center justify-center">       
            {/* NAME */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-primary">
                Your Name
              </label>
              <input
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary"
              />
            </div>

            {/* STAR RATING */}
            <div className="mb-4 flex flex-col justify-center md:items-center">
              <label className="block text-sm font-semibold mb-1 text-primary">
                Your Rating
              </label>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-2xl transition ${(hoverRating || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                      }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  You selected {rating} star{rating > 1 && "s"}
                </p>
              )}
            </div>
            </div>

            {/* COMMENT */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1 text-primary">
                Your Review
              </label>
              <textarea
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* SUBMIT */}
            <button
              onClick={submitReview}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
            >
              Submit Review
            </button>

            <p className="text-xs text-gray-400 mt-3">
              Your review will be visible after admin approval.
            </p>
          </div>
          </form>
        </section>



        {/* YOU MIGHT ALSO LIKE */}
        <section className="mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-body font-semibold text-center mb-10 text-primary">
            You might also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {products
              .filter(
                (p) =>
                  p.category === product.category &&
                  p.id !== product.id
              )
              .slice(0, 4)
              .map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="group"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-72 w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="mt-4 space-y-1">
                    <h4 className="text-sm font-semibold truncate">
                      {item.name}
                    </h4>

                    {/* RATING */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FaStar className="text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        ₹{item.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>

                      {/* DISCOUNT */}
                      <span className="text-xs text-red-500 font-semibold">
                        {Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                          100
                        )}
                        % OFF
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>


      </div>
    </section>
  );
}
