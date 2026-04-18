import { Link } from "react-router-dom";
import products from "../data/products"; // ✅ FIXED
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function NewArrivalsSwiper() {

  // ✅ Latest products
  const newArrivals = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="py-20 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-600">
              New <span className="text-orange-600">Vastu</span> Arrivals
            </h2>
          </div>

          <Link to="/shop" className="bg-gray-600 text-white px-5 py-2 rounded-full">
            Explore All →
          </Link>
        </div>

        {/* SWIPER */}
        <Swiper 
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={25}
          autoplay={{ delay: 4000 }}
          navigation
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            320: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {newArrivals.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group bg-white rounded-2xl p-3 shadow">

                {/* ✅ CLICK → PRODUCT DETAIL */}
                <Link to={`/product/${item.id}`}>
                  <div className="h-64 overflow-hidden rounded-xl">
                    <img
                      src={item.images[0]} // ✅ FIXED
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition"
                    />
                  </div>
                </Link>

                <div className="pt-4 text-center">
                  <h3 className="font-bold">{item.name}</h3>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}