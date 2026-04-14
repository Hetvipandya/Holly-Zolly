import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    return (
        <main className="bg-white">

            {/* HERO / HEADER */}
            <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center" style={{
                backgroundImage:
                    "linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.7)), url('/image/about/breadcrumb-bg.jpg')",
            }}>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-light">
                        Get in Touch
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400">
                        Have questions about our products or need assistance?
                        Our team is here to help you every step of the way.
                    </p>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT SIDE – CTA CARDS */}
                    <div data-aos="fade-up"  className="space-y-6">

                        <div className="p-6 border border-primary/30 rounded-xl hover:shadow-lg transition">
                            <div className="flex items-center gap-4">
                                <FaPhoneAlt className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <a
                                        href="tel:+919876543210"
                                        className="text-gray-600 hover:text-primary"
                                    >
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-primary/30 rounded-xl hover:shadow-lg transition">
                            <div className="flex items-center gap-4">
                                <FaPhoneAlt className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <a
                                        href="tel:+919876543210"
                                        className="text-gray-600 hover:text-primary"
                                    >
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-primary/30 rounded-xl hover:shadow-lg transition">
                            <div className="flex items-center gap-4">
                                <FaEnvelope className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-semibold">Email Us</h4>
                                    <a
                                        href="mailto:support@harvon.com"
                                        className="text-gray-600 hover:text-primary"
                                    >
                                        support@harvon.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-primary/30 rounded-xl hover:shadow-lg transition">
                            <div className="flex items-center gap-4">
                                <FaMapMarkerAlt className="text-2xl text-primary" />
                                <div>
                                    <h4 className="font-semibold">Visit Us</h4>
                                    <p className="text-gray-600">
                                        2nd Floor, Harvon Fashion Hub,<br />
                                        SG Highway, Ahmedabad, Gujarat
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE – CONTACT FORM */}
                    <div data-aos="fade-up" className="bg-gray-50 p-8 rounded-xl shadow-sm border border-primary/30">
                        <h3 className="text-2xl font-heading font-bold mb-6 text-primary">
                            Send Us a Message
                        </h3>

                        <form className="space-y-5">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border rounded px-4 py-3"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border rounded px-4 py-3"
                                required
                            />

                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full border rounded px-4 py-3"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded font-semibold hover:opacity-90 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* GOOGLE MAP */}
            <section className="pb-20" data-aos="fade-up" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-xl overflow-hidden shadow">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps?q=SG%20Highway%20Ahmedabad&output=embed"
                            className="w-full h-[400px] border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

        </main>
    );
}
