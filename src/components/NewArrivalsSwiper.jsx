import { Link } from "react-router-dom";
import categories from "../data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function NewArrivalsSwiper() {

  const newArrivals = categories.filter(c => c.status === "active");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* ✅ HEADER UPDATED */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-black">
            New Vastu Arrivals
          </h2>

          <Link
            to="/shop"
            className="text-sm font-semibold text-black hover:underline"
          >
            Explore All →
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
          {newArrivals.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

                {/* IMAGE */}
                <Link to={`/category/${item.name}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-56 w-full object-cover hover:scale-105 transition duration-300"
                    />

                    {/* ✅ BADGE UPDATED */}
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded">
                      New Arrival
                    </span>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-sm text-black">
                    {item.name}
                  </h3>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}