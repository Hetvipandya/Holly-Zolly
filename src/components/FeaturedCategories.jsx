// import categories from "../data/categories";
// import { Link } from "react-router-dom";

// export default function FeaturedCategories() {
//   return (
//     <section className="py-20 bg-[#f9f7f2]">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Header Section */}
//         <div
//           className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
//           data-aos="fade-up"
//         >
//           <div className="max-w-2xl">
//             <span className="text-orange-600 font-semibold tracking-widest uppercase text-sm">
//               Divine Collection
//             </span>

//             <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mt-2">
//               Vastu & Spiritual <span className="text-orange-600">Categories</span>
//             </h2>

//             <div className="h-1 w-20 bg-orange-500 mt-4"></div>
//           </div>

//           <p className="text-gray-600 max-w-md italic">
//             "Positivity and balance in every corner of your home." Explore our curated spiritual tools.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6">
//           {categories.map((cat, index) => (
//             <div
//               key={cat.id}
//               data-aos="fade-up"
//               data-aos-delay={index * 100}
//             >
//               <Link
//                 to={`/shop?category=${encodeURIComponent(cat.slug)}`}
//                 className="group relative flex flex-col items-center"
//               >

//                 {/* Image */}
//                 <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:border-orange-400 group-hover:shadow-2xl">

//                   <img
//                     src={cat.image}
//                     alt={cat.name}
//                     className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
//                 </div>

//                 {/* Text */}
//                 <div className="mt-6 text-center">
//                   <h3 className="text-lg md:text-xl font-heading font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
//                     {cat.name}
//                   </h3>

//                   <span className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-block">
//                     Explore Collection →
//                   </span>
//                 </div>
 
//               </Link>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

import categories from "../data/categories";
import { Link } from "react-router-dom";

export default function FeaturedCategories() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#f9f7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header Section */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 md:mb-16 gap-6"
          data-aos="fade-up"
        >
          <div className="max-w-2xl">
            <span className="text-orange-600 font-semibold tracking-widest uppercase text-xs sm:text-sm">
              Divine Collection
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-2 leading-snug">
              Vastu & Spiritual{" "}
              <span className="text-orange-600">Categories</span>
            </h2>

            <div className="h-1 w-16 sm:w-20 bg-orange-500 mt-3 sm:mt-4"></div>
          </div>

          <p className="text-gray-600 max-w-md italic text-sm sm:text-base">
            "Positivity and balance in every corner of your home." Explore our curated spiritual tools.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-6">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group relative flex flex-col items-center"
              >

                {/* Image */}
                <div className="
                  relative
                  w-28 h-28
                  sm:w-36 sm:h-36
                  md:w-44 md:h-44
                  lg:w-52 lg:h-52
                  rounded-full overflow-hidden
                  border-4 border-white shadow-lg
                  transition-all duration-500
                  group-hover:border-orange-400 group-hover:shadow-2xl
                ">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
                </div>

                {/* Text */}
                <div className="mt-4 sm:mt-6 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-heading font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h3>

                  <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-block">
                    Explore →
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