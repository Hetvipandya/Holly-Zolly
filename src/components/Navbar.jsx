import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const cart =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      const totalQty = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      setCartCount(totalQty);

      const wishlist =
        JSON.parse(localStorage.getItem("wishlistItems")) || [];

      setWishlistCount(wishlist.length);
    };

    updateCounts();

    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold border-b-2 border-white font-heading"
      : "text-black hover:text-gray-700 font-heading";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <nav className="sticky top-0 z-[99990] bg-gray-300 shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO + TEXT */}
    <NavLink
  to="/"
  onClick={() => setOpen(false)}
  className="flex items-center gap-2"
>
  <img
    src="/image/logo/LOGO.png"
    alt="Logo"
    className="h-20 w-auto object-contain"
  />
</NavLink>


        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 font-heading text-lg  items-center">
          <li><NavLink to="/" className={navLinkClass} >Home</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

          <li className="relative group">
            <NavLink to="/shop" className={navLinkClass}>
              Category
            </NavLink>

            <ul className="absolute left-0 top-full mt-2 w-44 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <li><NavLink to="/shop?category=all" className="block px-4 py-2 hover:bg-gray-100">All</NavLink></li>
              <li><NavLink to="/shop?category=men" className="block px-4 py-2 hover:bg-gray-100">Men</NavLink></li>
              <li><NavLink to="/shop?category=women" className="block px-4 py-2 hover:bg-gray-100">Women</NavLink></li>
              <li><NavLink to="/shop?category=footwear" className="block px-4 py-2 hover:bg-gray-100">Footwear</NavLink></li>
              <li><NavLink to="/shop?category=accessories" className="block px-4 py-2 hover:bg-gray-100">Accessories</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/orders" className={navLinkClass}>Orders</NavLink></li>
        </ul>

        {/* ICONS */}
        <div className="flex items-center gap-5 text-black">

          <button
            onClick={() => setOpenSearch(true)}
            className="text-xl hover:text-black"
          >
            <FiSearch />
          </button>

          {openSearch && (
            <SearchModal onClose={() => setOpenSearch(false)} />
          )}

          <NavLink to="/wishlist" className="relative hover:text-primary">
            <FiHeart className="text-xl text-black" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className="relative hover:text-primary">
            <FiShoppingCart className="text-xl text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/profile" className="hover:text-primary">
            <FiUser className="text-xl text-black" />
          </NavLink>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl bg-primary text-black p-2 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10">
          <ul className="flex flex-col gap-4 px-6 py-6 text-white">
            <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>

            <li>
              <button
                onClick={() => setOpenCategory(!openCategory)}
                className="text-left w-full"
              >
                Category
              </button>

              {openCategory && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li><NavLink to="/shop?category=all">All</NavLink></li>
                  <li><NavLink to="/shop?category=men">Men</NavLink></li>
                  <li><NavLink to="/shop?category=women">Women</NavLink></li>
                  <li><NavLink to="/shop?category=footwear">Footwear</NavLink></li>
                  <li><NavLink to="/shop?category=accessories">Accessories</NavLink></li>
                </ul>
              )}
            </li>

            <li><NavLink to="/orders">Orders</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
}