// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import {
//   FiSearch,
//   FiHeart,
//   FiShoppingCart,
//   FiUser,
// } from "react-icons/fi";
// import SearchModal from "./SearchModal";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [openCategory, setOpenCategory] = useState(false);
//   const [openSearch, setOpenSearch] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [user, setUser] = useState(null);

//   // ✅ Load logged-in user
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (currentUser) setUser(currentUser);
//   }, []);

//   // ✅ Cart & Wishlist Count
//   useEffect(() => {
//     const updateCounts = () => {
//       const cart =
//         JSON.parse(localStorage.getItem("cartItems")) || [];

//       const totalQty = cart.reduce(
//         (sum, item) => sum + Number(item.quantity || 0),
//         0
//       );

//       setCartCount(totalQty);

//       const wishlist =
//         JSON.parse(localStorage.getItem("wishlistItems")) || [];

//       setWishlistCount(wishlist.length);
//     };

//     updateCounts();

//     window.addEventListener("cartUpdated", updateCounts);
//     window.addEventListener("wishlistUpdated", updateCounts);

//     return () => {
//       window.removeEventListener("cartUpdated", updateCounts);
//       window.removeEventListener("wishlistUpdated", updateCounts);
//     };
//   }, []);

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-black font-semibold border-b-2 border-black font-heading"
//       : "text-black hover:text-gray-700 font-heading";

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   return (
//     <nav className="sticky top-0 z-[99990] bg-gray-300 shadow-md border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

//         {/* LOGO */}
//         <NavLink to="/" onClick={() => setOpen(false)}>
//           <img
//             src="/image/logo/LOGO.png"
//             alt="Logo"
//             className="h-20 w-auto object-contain"
//           />
//         </NavLink>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex gap-8 font-heading text-lg items-center">
//           <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
//           <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

//           <li className="relative group">
//             <NavLink to="/shop" className={navLinkClass}>
//               Category
//             </NavLink>

//             <ul className="absolute left-0 top-full mt-2 w-44 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//               <li><NavLink to="/shop?category=all" className="block px-4 py-2 hover:bg-gray-100">All</NavLink></li>
//               <li><NavLink to="/shop?category=Vedic Vastukkalp Aayudh" className="block px-4 py-2 hover:bg-gray-100">Vedic Vastukkalp Aayudh</NavLink></li>
//               <li><NavLink to="/shop?category=Aayudh Frame" className="block px-4 py-2 hover:bg-gray-100">Aayudh Frame</NavLink></li>
//               <li><NavLink to="/shop?category=Vastu Shashtra Book" className="block px-4 py-2 hover:bg-gray-100">Vastu Shashtra Book</NavLink></li>
//               <li><NavLink to="/shop?category=Kamal Kalp Yantra" className="block px-4 py-2 hover:bg-gray-100">Kamal Kalp Yantra</NavLink></li>
//               <li><NavLink to="/shop?category=Charoit Rath" className="block px-4 py-2 hover:bg-gray-100">Charoit Rath</NavLink></li>
//             </ul>
//           </li>

//           <li><NavLink to="/orders" className={navLinkClass}>Orders</NavLink></li>
//         </ul>

//         {/* ICONS */}
//         <div className="flex items-center gap-5 text-black">

//           {/* SEARCH */}
//           <button onClick={() => setOpenSearch(true)}>
//             <FiSearch className="text-xl" />
//           </button>

//           {openSearch && (
//             <SearchModal onClose={() => setOpenSearch(false)} />
//           )}

//           {/* WISHLIST */}
//           <NavLink to="/wishlist" className="relative">
//             <FiHeart className="text-xl" />
//             {wishlistCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
//                 {wishlistCount}
//               </span>
//             )}
//           </NavLink>

//           {/* CART */}
//           <NavLink to="/cart" className="relative">
//             <FiShoppingCart className="text-xl" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
//                 {cartCount}
//               </span>
//             )}
//           </NavLink>

//           {/* ✅ USER */}
//           {user ? (
//             <div className="relative group cursor-pointer">
//               <FiUser className="text-xl" />

//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition z-50">
//                 <p className="px-4 py-2 text-sm font-semibold">
//                   {user.name}
//                 </p>

//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("currentUser");
//                     setUser(null);
//                     window.location.href = "/";
//                   }}
//                   className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <NavLink to="/login">
//               <FiUser className="text-xl" />
//             </NavLink>
//           )}

//           {/* ✅ MOBILE BUTTON (GRAY FIX) */}
//           <button
//             className="md:hidden text-2xl bg-gray-300 text-black p-2 rounded-lg"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden bg-black border-t border-white/10">
//           <ul className="flex flex-col gap-4 px-6 py-6 text-white">
//             <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
//             <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>
//             <li><NavLink to="/orders">Orders</NavLink></li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

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
  const [openSearch, setOpenSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);

  // ✅ Load logged-in user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  // ✅ Cart & Wishlist Count
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
      ? "text-black font-semibold border-b-2 border-black font-heading"
      : "text-black hover:text-gray-700 font-heading";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-[99990] bg-gray-300 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          {/* LOGO */}
          <NavLink to="/" onClick={() => setOpen(false)}>
            <img
              src="/image/logo/LOGO.png"
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 font-heading text-lg items-center">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

            <li className="relative group">
              <NavLink to="/shop" className={navLinkClass}>
                Category
              </NavLink>

              <ul className="absolute left-0 top-full mt-2 w-44 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <li><NavLink to="/shop?category=all" className="block px-4 py-2 hover:bg-gray-100">All</NavLink></li>
                <li><NavLink to="/shop?category=Vedic Vastukkalp Aayudh" className="block px-4 py-2 hover:bg-gray-100">Vedic Vastukkalp Aayudh</NavLink></li>
                <li><NavLink to="/shop?category=Aayudh Frame" className="block px-4 py-2 hover:bg-gray-100">Aayudh Frame</NavLink></li>
                <li><NavLink to="/shop?category=Vastu Shashtra Book" className="block px-4 py-2 hover:bg-gray-100">Vastu Shashtra Book</NavLink></li>
                <li><NavLink to="/shop?category=Kamal Kalp Yantra" className="block px-4 py-2 hover:bg-gray-100">Kamal Kalp Yantra</NavLink></li>
                <li><NavLink to="/shop?category=Charoit Rath" className="block px-4 py-2 hover:bg-gray-100">Charoit Rath</NavLink></li>
              </ul>
            </li>

            <li><NavLink to="/orders" className={navLinkClass}>Orders</NavLink></li>
          </ul>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-5 text-black">

            <button onClick={() => setOpenSearch(true)}>
              <FiSearch className="text-xl" />
            </button>

            <NavLink to="/wishlist" className="relative">
              <FiHeart className="text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart" className="relative">
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {user ? (
              <div className="relative group cursor-pointer">
                <FiUser className="text-xl" />
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition z-50">
                  <p className="px-4 py-2 text-sm font-semibold">
                    {user.name}
                  </p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      setUser(null);
                      window.location.href = "/";
                    }}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink to="/login">
                <FiUser className="text-xl" />
              </NavLink>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl bg-gray-300 text-black p-2 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-black border-t border-white/10">
            <ul className="flex flex-col gap-4 px-6 py-6 text-white">
              <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink></li>
              <li><NavLink to="/orders">Orders</NavLink></li>
            </ul>
          </div>
        )}
      </nav>

      {/* ================= SEARCH MODAL ================= */}
      {openSearch && (
        <SearchModal onClose={() => setOpenSearch(false)} />
      )}

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 border-t shadow-lg flex justify-around items-center py-3 md:hidden z-[99999]">

        <button onClick={() => setOpenSearch(true)}>
          <FiSearch className="text-xl" />
        </button>

        <NavLink to="/wishlist" className="relative">
          <FiHeart className="text-xl" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/cart" className="relative">
          <FiShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </NavLink>

        {user ? (
          <div className="relative group cursor-pointer">
            <FiUser className="text-xl" />
          </div>
        ) : (
          <NavLink to="/login">
            <FiUser className="text-xl" />
          </NavLink>
        )}
      </div>
    </>
  );
}