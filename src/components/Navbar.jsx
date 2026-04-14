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
      ? "text-primary font-semibold border-b-4 border-primary font-heading"
      : "hover:text-primary font-heading";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <nav className="sticky top-0 z-[99990] bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center font-heading ">
          <img src="/image/logo/harvon-logo.png" alt="Logo" className="h-14" />
          <p className="text-4xl text-primary hidden lg:block">ARVON</p>
        </NavLink>


        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 font-heading text-lg items-center text-[18px] ">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
          </li> */}
          <li className="relative group">
            <NavLink to="/shop" className={navLinkClass}>
              Category
            </NavLink>

            {/* DROPDOWN */}
            <ul className="absolute left-0 top-full mt-2 w-44 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <li>
                <NavLink
                  to="/shop?category=all"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  All
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?category=men"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?category=women"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?category=footwear"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Footwear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop?category=accessories"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink to="/orders" className={navLinkClass}>
              Orders
            </NavLink>
          </li>
        </ul>


        <div className="flex items-center gap-5">

          {/* SEARCH ICON */}
          <button
            onClick={() => setOpenSearch(true)}
            className="text-xl hover:text-primary"
            aria-label="Search"
          >
            <FiSearch />
          </button>

          {/* SEARCH MODAL */}
          {openSearch && (
            <SearchModal onClose={() => setOpenSearch(false)} />
          )}

          {/* WISHLIST */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `${isActive ? "text-primary" : "hover:text-primary"} relative cursor-pointer`
            }
          >
            <FiHeart className="text-xl" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}

          </NavLink>


          {/* CART */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${isActive ? "text-primary" : "hover:text-primary"} relative cursor-pointer`
            }
          >
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}

          </NavLink>




          {/* PROFILE */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${isActive ? "text-primary" : "hover:text-primary"} relative cursor-pointer`
            }
          >
            <FiUser className="text-xl" />

          </NavLink>




          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl bg-primary text-light p-2 rounded-lg"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>




      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col gap-4 px-6 py-6 font-heading text-lg">
            <li>
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                About
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/shop"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                Shop
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/shop"
                onClick={() => setOpenCategory(!openCategory)}
                className={navLinkClass}
              >
                Category
              </NavLink>

              {openCategory && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li><NavLink to="/shop?category=all" onClick={() => setOpen(false)}>All</NavLink></li>
                  <li><NavLink to="/shop?category=men" onClick={() => setOpen(false)}>Men</NavLink></li>
                  <li><NavLink to="/shop?category=women" onClick={() => setOpen(false)}>Women</NavLink></li>
                  <li><NavLink to="/shop?category=footwear" onClick={() => setOpen(false)}>Footwear</NavLink></li>
                  <li><NavLink to="/shop?category=accessories" onClick={() => setOpen(false)}>Accessories</NavLink></li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/orders"
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                Orders
              </NavLink>
            </li>
          </ul>

        </div>
      )}
    </nav>
  );
}
