import { Link } from "react-router-dom";
import products from "../data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function NewArrivalsSwiper() {
  const newArrivals = [...products].slice(-6); // latest products

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-primary">
            Latest Men's Fashion Arrivals in Ahmedabad
          </h2>

          <Link
            to="/shop"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {newArrivals.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

                {/* IMAGE */}
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-56 w-full object-cover hover:scale-105 transition duration-300"
                    />

                    {/* NEW BADGE */}
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded">
                      New
                    </span>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm truncate">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
