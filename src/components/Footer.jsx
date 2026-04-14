import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300 pt-16 mt-[1px]">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center mb-4 gap-2">
            <img
              src="/image/logo/harvon-logo.png"
              alt="Harvon"
              className="h-16 w-16 object-contain  bg-light p-2"
            />
            <p className="text-5xl font-bold text-light font-body ">ARVON</p>
          </div>
          <p className="text-sm leading-relaxed">
            HARVON delivers premium outerwear and modern fashion
            crafted with minimalist aesthetics and superior comfort.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-col md:items-center ">
          <h4 className="text-white font-heading font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm md:-ml-10" >
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h4 className="text-white font-heading font-semibold mb-4">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/careers" className="hover:text-white">Career</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-heading font-semibold mb-5">
            Contact Us
          </h4>

          <ul className="space-y-4 text-sm">
            {/* EMAIL */}
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-light" />
              <a
                href="mailto:support@apnawebx.com"
                className="hover:text-white transition"
              >
                support@apnawebx.com
              </a>
            </li>

            {/* PHONE */}
            <li className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-light" />
              <a
                href="tel:+919876543210"
                className="hover:text-white transition"
              >
                +91 98765 43210
              </a>
            </li>

            {/* ADDRESS */}
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-light" />
              <span>
                2nd Floor, Harvon Fashion Hub,
                <br />
                SG Highway, Ahmedabad, Gujarat
              </span>
            </li>
          </ul>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mt-6">
            <a
              href="/"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-primary hover:border-primary hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="/"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-primary hover:border-primary hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="/"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-primary hover:border-primary hover:text-white transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="/"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-primary hover:border-primary hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} HARVON. All rights reserved.
        </div>
      </div>

    </footer>
  );
}
