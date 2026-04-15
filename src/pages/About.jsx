import { FaShippingFast, FaStar, FaLock } from "react-icons/fa";
import ContactCTA from "../components/ContactCTA";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";

export default function About() {
  return (
    <main className="bg-white">
 
      {/* HERO SECTION */}
      {/* <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
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
      </section> */}

      

      {/* ABOUT CONTENT */}
   <section className="py-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    {/* TEXT */}
    <div data-aos="fade-right">
      <h2 className="text-3xl font-heading font-bold text-black mb-4">
        Who We Are
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        <span className="text-black font-bold">Vastukkalp</span> is a trusted Vastu and spiritual brand dedicated to
        bringing positivity, prosperity, and harmony into your life through
        scientifically designed Vastu products.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Our products are inspired by ancient Vastu Shastra principles and are
        crafted with precision to remove negative energy and attract success,
        peace, and good fortune in your home and workplace.
      </p>

      <p className="text-xl text-black mt-4 mb-2 font-semibold">
        Our Key Features :
      </p>

      <ol className="list-disc ml-8 text-gray-600">
        <li>100% Vastu-based authentic products</li>
        <li>Energy-balanced and spiritually designed items</li>
        <li>Trusted by thousands of happy customers</li>
        <li>Positive energy & prosperity enhancement</li>
      </ol>

      <Link
        to="/shop"
        className="mt-4 inline-flex items-center gap-3 bg-black px-6 py-3 text-white font-semibold tracking-wide hover:opacity-90 transition"
      >
        Explore Products
        <span>→</span>
      </Link>
    </div>

    {/* IMAGE */}
    <div data-aos="fade-left">
      <img
        src="/image/about/vastu-about.jpg"
        alt="Vastu Products"
        className="rounded-xl shadow-lg md:h-[500px] md:w-full h-[300px] w-full object-cover"
      />
    </div>
  </div>
</section>


{/* MISSION & VISION */}
<section className="py-10 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

    <div data-aos="fade-up" className="border border-black/30 rounded-lg p-8">
      <h3 className="text-2xl font-heading font-semibold text-black mb-3">
        Our Mission
      </h3>
      <p className="text-gray-600 leading-relaxed">
        To help people live a balanced and prosperous life by providing
        effective Vastu solutions that eliminate negativity and enhance
        positive energy in everyday living.
      </p>
    </div>

    <div data-aos="fade-up" data-aos-delay="150" className="border border-black/30 rounded-lg p-8">
      <h3 className="text-2xl font-heading font-semibold text-black mb-3">
        Our Vision
      </h3>
      <p className="text-gray-600 leading-relaxed">
        To become a leading Vastu brand known for authenticity, trust, and
        powerful spiritual solutions that transform lives globally.
      </p>
    </div>
  </div>
</section>


{/* WHY CHOOSE US */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-12" data-aos="fade-up">
      <h2 className="text-3xl font-heading font-bold text-black">
        Why Choose Vastukkalp
      </h2>
      <p className="mt-2 text-gray-600">
        Experience the power of Vastu in your life
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

      <div className="p-6 border rounded-lg hover:shadow-lg transition" data-aos="zoom-in">
        <FaStar className="text-3xl text-primary mx-auto mb-4" />
        <h4 className="font-semibold mb-2">
          Authentic Vastu Products
        </h4>
        <p className="text-gray-600 text-sm">
          Designed based on proven Vastu principles for real results.
        </p>
      </div>

      <div className="p-6 border rounded-lg hover:shadow-lg transition" data-aos="zoom-in" data-aos-delay="100">
        <FaShippingFast className="text-3xl text-primary mx-auto mb-4" />
        <h4 className="font-semibold mb-2">
          Fast Delivery
        </h4>
        <p className="text-gray-600 text-sm">
          Safe and quick shipping across India.
        </p>
      </div>

      <div className="p-6 border rounded-lg hover:shadow-lg transition" data-aos="zoom-in" data-aos-delay="200">
        <FaLock className="text-3xl text-primary mx-auto mb-4" />
        <h4 className="font-semibold mb-2">
          Trusted & Secure
        </h4>
        <p className="text-gray-600 text-sm">
          Reliable service with secure payment options.
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
