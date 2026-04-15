import categories from "../data/categories";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedCategories() { 
  return (
    <section className="py-16 bg-light">
      <div className="max-w-7xl mx-auto px-6">

        {/* ✅ SECTION TITLE UPDATED */}
        <div className="text-start mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-heading font-bold text-black">
            Vastu & Spiritual Categories
          </h2>
          <p className="mt-2 text-black">
            Explore a wide range of Vastu items, spiritual tools, crystals, pyramids, and healing products to bring positivity and balance into your life.
          </p>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
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
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link
                to={`/shop?category=${cat.name.toLowerCase()}`}
                data-aos="zoom-in"
                className="group relative block h-60 overflow-hidden rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  <h3 className="text-white text-lg md:text-xl font-heading font-semibold text-center px-4">
                    {cat.name}
                  </h3>
                </div>

              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}