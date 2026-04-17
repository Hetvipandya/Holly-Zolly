// import products from "../data/products";
// import categories from "../data/categories";
// import ProductCard from "../components/ProductCard";
// import FeaturedCategories from "../components/FeaturedCategories";
// import HeroCarousel from "../components/HeroCarousel";
// import ContactCTA from "../components/ContactCTA";
// import NewArrivalsSwiper from "../components/NewArrivalsSwiper";

// export default function Home() {

//   const bestSellers = categories.filter(c => c.status === "active");
//   const saleProducts = products.filter(p => p.isSale);

//   return (
//     <>
//       {/* HERO SECTION */}
//       <HeroCarousel /> 

//       <FeaturedCategories />

//       {/* ✅ BEST SELLERS TEXT FIXED */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-start mb-12" data-aos="fade-up">
//             <h2 className="text-3xl font-heading font-bold text-black">
//               Our Popular Vastu Collection
//             </h2>
//             <p className="text-black mt-2">
//               Explore our most loved categories designed to bring harmony, prosperity, and positivity.
//             </p>
//           </div>

//           {/* categories images (UNCHANGED) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             {bestSellers.map(item => (
//               <div key={item.id} className="text-center group cursor-pointer">
//              <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
//                   />
//                 </div>
//                 <h3 className="mt-4 text-lg font-semibold text-black">
//                   {item.name}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <NewArrivalsSwiper />

//       <ContactCTA />
//     </>
//   );
// }

import products from "../data/products";
import categories from "../data/categories";
import FeaturedCategories from "../components/FeaturedCategories";
import HeroCarousel from "../components/HeroCarousel";
import ContactCTA from "../components/ContactCTA";
import NewArrivalsSwiper from "../components/NewArrivalsSwiper";
import { Link } from "react-router-dom";

export default function Home() {
  // Filtering active categories
  const bestSellers = categories.filter(c => c.status === "active").slice(0, 4);

  return (
    <div className="bg-white">
      {/* HERO SECTION - Vibrant & Welcoming */}
      <HeroCarousel /> 

      {/* FEATURED CATEGORIES - Circular Layout je aple banayu e */}
      <FeaturedCategories />

      {/* POPULAR COLLECTION - Modern Grid with Overlay Effects */}
      <section className="py-24 bg-[#fcfaf8] relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16" data-aos="fade-up">
            <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Top Rated
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mt-4">
              Our Popular <span className="text-orange-600">Vastu Collection</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl text-lg">
              Explore our most loved categories designed to bring harmony, prosperity, and positivity to your sacred space.
            </p>
          </div>

          {/* Elegant Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {bestSellers.map((item, index) => (
              <Link 
                key={item.id} 
                to={`/shop?category=${item.name.toLowerCase()}`}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Image Wrapper with Custom Border Radius */}
                <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="overflow-hidden rounded-[1.5rem] h-80">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Subtle Text Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white/80 text-sm mb-1 uppercase tracking-widest">View All Items</p>
                    <h3 className="text-white text-2xl font-bold">{item.name}</h3>
                  </div>
                </div>

                {/* Visible Title below for accessibility */}
                <div className="mt-6 text-center group-hover:hidden transition-all">
                  <h3 className="text-xl font-heading font-bold text-slate-800 transition-colors">
                    {item.name}
                  </h3>
                  <div className="w-10 h-0.5 bg-orange-400 mx-auto mt-2 transition-all group-hover:w-20"></div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View More Button */}
          <div className="mt-16 text-center">
             <Link to="/shop" className="inline-block border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-md">
               View Full Collection
             </Link>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS - Stylish Swiper Section */}
      <div className="bg-white">
        <NewArrivalsSwiper />
      </div>

      {/* CONTACT CTA - Direct & Bold */}
      <ContactCTA />
    </div>
  );
}