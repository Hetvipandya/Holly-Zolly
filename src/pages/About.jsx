import { FaShippingFast, FaStar, FaLock } from "react-icons/fa";
import ContactCTA from "../components/ContactCTA";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";

export default function About() {
  return (
    <main className="bg-white">

      {/* HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.7)), url('/image/about/breadcrumb-bg.jpg')",
        }}
      >
        <div className="text-center text-white px-6" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wide">
            About <span className="text-accent"> HARVON</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-200">
            Crafted with purpose. Designed for modern lifestyles.
          </p>
        </div>
      </section>

      

      {/* ABOUT CONTENT */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div data-aos="fade-right">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <span className="text-primary font-bold">HARVON</span> is a modern fashion and lifestyle brand dedicated to
              delivering premium-quality apparel, footwear, and accessories
              designed for comfort, durability, and timeless style.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe fashion should feel effortless. Every product we
              create is carefully curated with attention to detail, high-grade
              materials, and minimalist aesthetics that fit seamlessly into
              your everyday life.
            </p>

            <p className="text-xl text-primary mt-4 mb-2 font-semibold">Our Key Features :</p>

            <ol className="list-disc ml-8 text-gray-600">
                <li>Quick and reliable shipping</li>
                <li>High-quality materials</li>
                <li>Safe and encrypted payments</li>
                <li>Hassle-free returns</li>
            </ol>

             <Link to="/shop" className="mt-4 inline-flex items-center gap-3 bg-primary px-6 py-3 text-white font-semibold tracking-wide hover:opacity-90 transition">
            View Collection
            <span>→</span>
          </Link>

          </div>

          {/* IMAGE */}
          <div data-aos="fade-left">
            <img
              src="/image/about/about-hero.jpg"
              alt="About Harvon"
              className="rounded-xl shadow-lg md:h-[500px] md:w-full h-[300px] w-full"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

          <div data-aos="fade-up" className="border border-primary/30 rounded-lg p-8">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver high-quality fashion essentials that combine style,
              comfort, and affordability empowering customers to express
              themselves with confidence.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="150" className="border border-primary/30 rounded-lg p-8">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted lifestyle brand known for innovation,
              sustainability, and customer-first experiences across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Why Choose HARVON
            </h2>
            <p className="mt-2 text-gray-600">
              What makes us different
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            <div
              className="p-6 border rounded-lg hover:shadow-lg transition"
              data-aos="zoom-in"
            >
              <FaStar className="text-3xl text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                Premium Quality
              </h4>
              <p className="text-gray-600 text-sm">
                Carefully selected materials and strict quality control.
              </p>
            </div>

            <div
              className="p-6 border rounded-lg hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <FaShippingFast className="text-3xl text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                Fast & Reliable Delivery
              </h4>
              <p className="text-gray-600 text-sm">
                Quick shipping with real-time order tracking.
              </p>
            </div>

            <div
              className="p-6 border rounded-lg hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <FaLock className="text-3xl text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">
                Secure Shopping
              </h4>
              <p className="text-gray-600 text-sm">
                100% secure payments and data protection.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <ContactCTA />

    </main>
  );
}
