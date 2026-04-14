import products from "../data/products";
import ProductCard from "../components/ProductCard";
import FeaturedCategories from "../components/FeaturedCategories";
import HeroCarousel from "../components/HeroCarousel";
import ContactCTA from "../components/ContactCTA";
import NewArrivalsSwiper from "../components/NewArrivalsSwiper";

export default function Home() {
  const bestSellers = products.filter(p => p.isBestSeller);
  const saleProducts = products.filter(p => p.isSale);

  return (
    <>
      {/* HERO SECTION */}
      <HeroCarousel />

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Harvon - Best Men's Clothing Store in Ahmedabad</h1>
          <p className="text-lg text-gray-700">Shop premium men's wear, casual wear, formal wear, and more at Harvon, Ahmedabad's leading men's fashion store. Find men's shirts, trousers, jeans, and kurta pajama near SG Highway, Vastrapur, and Ghatlodia.</p>
        </div>
      </section>

      <FeaturedCategories />

      {/* BEST SELLERS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-start mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Best Selling Men's Clothing in Ahmedabad
            </h2>
            <p className="text-gray-600 mt-2">Discover our top men's wear collection, including shirts, trousers, and jeans from Harvon.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {bestSellers.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <NewArrivalsSwiper />

      {/* SALE PRODUCTS */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-start mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-heading font-bold text-red-600">
              Affordable Men's Wear Sale in Ahmedabad
            </h2>
            <p className="text-gray-600 mt-2">Get stylish men's clothes at discounted prices. Shop men's casual wear, formal wear, and party wear on sale at Harvon.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {saleProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />



    </>
  );
}
