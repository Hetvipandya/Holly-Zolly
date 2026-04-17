// import { Link } from "react-router-dom";
// import categories from "../data/categories";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// export default function NewArrivalsSwiper() {

//   const newArrivals = categories.filter(c => c.status === "active");

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* ✅ HEADER UPDATED */}
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl font-heading font-bold text-black">
//             New Vastu Arrivals
//           </h2>

//           <Link
//             to="/shop"
//             className="text-sm font-semibold text-black hover:underline"
//           >
//             Explore All →
//           </Link>
//         </div>

//         {/* SWIPER */}
//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={20}
//           autoplay={{ delay: 3500, disableOnInteraction: false }}
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
//           {newArrivals.map((item) => (
//             <SwiperSlide key={item.id}>
//              <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">

//                 {/* IMAGE */}
//                 <Link to={`/category/${item.name}`}>
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-56 w-full object-cover hover:scale-105 transition duration-300"
//                     />

//                     {/* ✅ BADGE UPDATED */}
//                     <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded">
//                       New Arrival
//                     </span>
//                   </div>
//                 </Link>

//                 {/* CONTENT */}
//                 <div className="p-4 text-center">
//                   <h3 className="font-semibold text-sm text-black">
//                     {item.name}
//                   </h3>
//                 </div>

//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import categories from "../data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function NewArrivalsSwiper() {
  const newArrivals = categories.filter((c) => c.status === "active");

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-600">
              New <span className="text-orange-600">Vastu</span> Arrivals
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Handpicked spiritual essentials recently added to our collection.
            </p>
          </div>

          <Link
            to="/shop"
            className="group flex items-center gap-2 px-6 py-2.5 bg-gray-600 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-slate-200"
          >
            Explore All 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={25}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1.3, spaceBetween: 15 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
          className="new-arrivals-swiper !pb-14"
        >
          {newArrivals.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group relative bg-white border border-gray-100 rounded-2xl p-3 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                
                {/* IMAGE AREA */}
                <Link to={`/shop?category=${item.name.toLowerCase()}`}>
                  <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* GLASS BADGE */}
                    <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-md border border-white/50 text-slate-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                      ✨ New In
                    </div>
                  </div>
                </Link>

                {/* CONTENT AREA */}
                <div className="pt-5 pb-2 px-2 text-center">
                  <h3 className="text-lg font-heading font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">
                    Vastu & Energy Healing
                  </p>
                  
                  {/* Subtle Shop Button that appears on hover */}
                  <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                     <button className="text-orange-600 text-sm font-bold border-b-2 border-orange-600 pb-0.5">
                        Shop Now
                     </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CUSTOM SWIPER CSS */}
      <style jsx>{`
        .new-arrivals-swiper .swiper-button-next,
        .new-arrivals-swiper .swiper-button-prev {
          color: #000 !important;
          background: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .new-arrivals-swiper .swiper-button-next:after,
        .new-arrivals-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        .new-arrivals-swiper .swiper-pagination-bullet-active {
          background: #ea580c !important;
        }
      `}</style>
    </section>
  );
}