import products from "../data/products";
import categories from "../data/categories";
import ProductCard from "../components/ProductCard";
import FeaturedCategories from "../components/FeaturedCategories";
import HeroCarousel from "../components/HeroCarousel";
import ContactCTA from "../components/ContactCTA";
import NewArrivalsSwiper from "../components/NewArrivalsSwiper";

export default function Home() {

  const bestSellers = categories.filter(c => c.status === "active");
  const saleProducts = products.filter(p => p.isSale);

  return (
    <>
      {/* HERO SECTION */}
      <HeroCarousel /> 

      <FeaturedCategories />

      {/* ✅ BEST SELLERS TEXT FIXED */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-start mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-heading font-bold text-black">
              Our Popular Vastu Collection
            </h2>
            <p className="text-black mt-2">
              Explore our most loved categories designed to bring harmony, prosperity, and positivity.
            </p>
          </div>

          {/* categories images (UNCHANGED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {bestSellers.map(item => (
              <div key={item.id} className="text-center group cursor-pointer">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewArrivalsSwiper />

      <ContactCTA />
    </>
  );
}