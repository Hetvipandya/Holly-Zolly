

export default function ContactCTA() {
  return (
    <section
      className="relative py-24 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.8)), url('/image/contact/contact-bg.jpg')",
      }}
    >

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">

        <div data-aos="fade-up" className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide">
            Let’s Build Your Perfect Look
          </h2>

          <p className="max-w-2xl mx-auto text-gray-300">
            Have questions about our collections or need personalized styling?
            Our team is ready to help you craft your signature style.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-4 md:px-8 py-3 text-white font-semibold tracking-wide hover:opacity-90 transition"
            >
              Contact Us →
            </a>

            <a
              href="/shop"
              className="inline-flex items-center gap-2 border border-white/30 px-4 md:px-8 py-3 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition"
            >
              Explore Collection
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
