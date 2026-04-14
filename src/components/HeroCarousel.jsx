import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Harvon Menswear Ahmedabad",
    subtitle: "Premium Men's Clothing Store",
    description:
      "Discover the best men's wear in Ahmedabad. Shop casual, formal, party, and ethnic wear at Harvon, your go-to men's fashion store near SG Highway.",
    button: "Shop Collection",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    title: "Best Men's Wear Ahmedabad",
    subtitle: "Stylish Men's Fashion",
    description:
      "Explore trendy men's clothes in Ahmedabad. From jeans to kurta pajama, find affordable and premium men's wear at Harvon showroom.",
    button: "Explore Now",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    title: "Men's Clothing Store Ghatlodia",
    subtitle: "Branded Men's Wear",
    description:
      "Visit Harvon for groom wear, wedding attire, and more. Only men's clothing brand in Ahmedabad with showrooms in Vastrapur and Memnagar.",
    button: "View Products",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Refresh animation on slide change
  useEffect(() => {
    AOS.refresh();
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative md:h-[90vh] h-[70vh] w-full overflow-hidden">

    <img
  key={current}
  src={slides[current].image}
  alt={`${slides[current].title} - Premium Men's Clothing Ahmedabad`}
  className="absolute inset-0 w-full h-full object-cover animate-zoom"
/>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative -bottom-20 z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div
          key={current}
          data-aos="fade-up"
          className="text-white max-w-xl "
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-widest mb-2">
            {slides[current].title}
          </h1>

          <h3 className="text-xl font-semibold uppercase mb-1">
            {slides[current].subtitle}
          </h3>

          <p className="text-sm opacity-90 mb-3">
            {slides[current].description}
          </p>

          <Link to="/shop" className="mt-4 inline-flex items-center gap-3 bg-primary px-6 py-3 text-white font-semibold tracking-wide hover:opacity-90 transition">
            {slides[current].button}
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-6 bottom-0 -translate-y-1/2 text-white text-2xl opacity-70 hover:opacity-100 transition z-10 border border-light p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-6 bottom-0 -translate-y-1/2 text-white text-2xl opacity-70 hover:opacity-100 transition z-10 border border-light p-2 rounded-full"
      >
        <FaChevronRight />
      </button>

      {/* DOTS (RIGHT CENTER) */}
      <div className="absolute right-8 bottom-40 -translate-y-1/2 flex flex-col gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full border border-white ${
              current === index ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
