// import categories from "../data/categories";
// import { Link } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// export default function FeaturedCategories() { 
//   return (
//     <section className="py-16 bg-light">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* ✅ SECTION TITLE UPDATED */}
//         <div className="text-start mb-12" data-aos="fade-up">
//           <h2 className="text-3xl font-heading font-bold text-black">
//             Vastu & Spiritual Categories
//           </h2>
//           <p className="mt-2 text-black">
//             Explore a wide range of Vastu items, spiritual tools, crystals, pyramids, and healing products to bring positivity and balance into your life.
//           </p>
//         </div> 

//         {/* SWIPER */}
//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={20}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           loop
//           breakpoints={{
//             320: {
//               slidesPerView: 1.2,
//             },
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 3,
//             },
//             1024: {
//               slidesPerView: 4,
//             },
//           }}
//         >
//           {categories.map((cat) => (
//             <SwiperSlide key={cat.id}>
//               <Link
//                 to={`/shop?category=${cat.name.toLowerCase()}`}
//                 data-aos="zoom-in"
//                 className="group relative block h-60 overflow-hidden rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
//                 />

//                 {/* OVERLAY */}
//                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition duration-300">
//   <h3 className="text-black text-lg md:text-xl font-heading font-semibold text-center px-4">
//     {cat.name}
//   </h3>
// </div>

//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//       </div>
//     </section>
//   );
// }

import categories from "../data/categories";
import { Link } from "react-router-dom";

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-[#f9f7f2]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="text-orange-600 font-semibold tracking-widest uppercase text-sm">Divine Collection</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mt-2">
              Vastu & Spiritual <span className="text-orange-600">Categories</span>
            </h2>
            <div className="h-1 w-20 bg-orange-500 mt-4"></div>
          </div>
          <p className="text-gray-600 max-w-md italic">
            "Positivity and balance in every corner of your home." Explore our curated spiritual tools.
          </p>
        </div>

        {/* STATIC GRID - No Slider */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6">
          {categories.map((cat, index) => (
            <div key={cat.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <Link
                to={`/shop?category=${cat.name.toLowerCase()}`}
                className="group relative flex flex-col items-center"
              >
                {/* Image Container - Circular */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:border-orange-400 group-hover:shadow-2xl">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
                </div>

                {/* Content Below Image */}
                <div className="mt-6 text-center">
                  <h3 className="text-lg md:text-xl font-heading font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-block">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}