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
//   const [openSearch, setOpenSearch] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [user, setUser] = useState(null);
//   const [openCategory, setOpenCategory] = useState(false);

//   // ✅ Load user
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (currentUser) setUser(currentUser);
//   }, []);

//   // ✅ Cart & Wishlist Count
//   useEffect(() => {
//     const updateCounts = () => {
//       const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
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

//   // 🔒 Prevent scroll when menu open
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-black font-semibold border-b-2 border-black pb-1"
//       : "text-black hover:text-gray-700";

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav className="sticky top-0 z-[99990] bg-gray-300 shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           {/* LOGO */}
//           <NavLink to="/" onClick={() => setOpen(false)}>
//             <img
//               src="/image/logo/LOGO.png"
//               alt="Logo"
//               className="h-14 md:h-16 lg:h-20 object-contain"
//             />
//           </NavLink>

//           {/* DESKTOP MENU */}
//           <ul className="hidden md:flex gap-8 text-base md:text-lg items-center">
//             <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
//             <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

//             {/* CATEGORY */}
//             <li className="relative group">
//               <NavLink to="/shop" className={navLinkClass}>
//                 Category
//               </NavLink>

//               <ul className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
//                 {[
//                   "all",
//                   "Vedic Vastukkalp Aayudh",
//                   "Aayudh Frame",
//                   "Vastu Shashtra Book",
//                   "Kamal Kalp Yantra",
//                   "Charoit Rath",
//                 ].map((cat) => (
//                   <li key={cat}>
//                     <NavLink
//                       to={`/shop?category=${cat}`}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       {cat}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </li>

//             <li><NavLink to="/orders" className={navLinkClass}>Orders</NavLink></li>
//           </ul>

//           {/* DESKTOP ICONS */}
//           <div className="hidden md:flex items-center gap-6">
//             <button onClick={() => setOpenSearch(true)}>
//               <FiSearch size={22} />
//             </button>

//             <NavLink to="/wishlist" className="relative">
//               <FiHeart size={22} />
//               {wishlistCount > 0 && (
//                 <span className="badge">{wishlistCount}</span>
//               )}
//             </NavLink>

//             <NavLink to="/cart" className="relative">
//               <FiShoppingCart size={22} />
//               {cartCount > 0 && (
//                 <span className="badge">{cartCount}</span>
//               )}
//             </NavLink>

//             {user ? (
//               <div className="cursor-pointer">
//                 <FiUser size={22} />
//               </div>
//             ) : (
//               <NavLink to="/login">
//                 <FiUser size={22} />
//               </NavLink>
//             )}
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             className="md:hidden text-2xl"
//             onClick={() => setOpen(true)}
//           >
//             <FaBars />
//           </button>
//         </div>
//       </nav>

//       {/* ================= OVERLAY ================= */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-[99998]"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* ================= MOBILE SIDE MENU ================= */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white z-[99999] transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-semibold">Menu</h2>
//           <FaTimes onClick={() => setOpen(false)} className="cursor-pointer text-xl" />
//         </div>

//         <ul className="flex flex-col p-4 gap-4 text-lg">
//           <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
//           <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

//           {/* CATEGORY DROPDOWN */}
//           <div>
//             <button
//               onClick={() => setOpenCategory(!openCategory)}
//               className="w-full text-left font-medium"
//             >
//               Category
//             </button>

//             {openCategory && (
//               <div className="ml-4 mt-2 flex flex-col gap-2 text-base">
//                 {[
//                   "All",
//                   "Vedic Vastukkalp Aayudh",
//                   "Aayudh Frame",
//                   "Vastu Shashtra Book",
//                   "Kamal Kalp Yantra",
//                   "Charoit Rath",
//                 ].map((cat) => (
//                   <NavLink
//                     key={cat}
//                     to={`/shop?category=${cat}`}
//                     onClick={() => setOpen(false)}
//                   >
//                     {cat}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>

//           <NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink>
//         </ul>
//       </div>

//       {/* ================= SEARCH MODAL ================= */}
//       {openSearch && (
//         <SearchModal onClose={() => setOpenSearch(false)} />
//       )}

//       {/* ================= MOBILE BOTTOM BAR ================= */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-3 md:hidden z-[99999]">

//         <button onClick={() => setOpenSearch(true)}>
//           <FiSearch size={24} />
//         </button>

//         <NavLink to="/wishlist" className="relative">
//           <FiHeart size={24} />
//           {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
//         </NavLink>

//         <NavLink to="/cart" className="relative">
//           <FiShoppingCart size={24} />
//           {cartCount > 0 && <span className="badge">{cartCount}</span>}
//         </NavLink>

//         <NavLink to="/login">
//           <FiUser size={24} />
//         </NavLink>
//       </div>
//     </>
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
  const [openCategory, setOpenCategory] = useState(false);

  // ✅ Load user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  // ✅ Cart & Wishlist Count
  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
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

  // 🔒 Prevent scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold border-b-2 border-black pb-1"
      : "text-black hover:text-gray-700";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-[99999] bg-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <NavLink to="/" onClick={() => setOpen(false)}>
            <img
              src="/image/logo/LOGO.png"
              alt="Logo"
              className="h-14 md:h-16 lg:h-20 object-contain"
            />
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 text-base md:text-lg items-center">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

            {/* CATEGORY */}
            <li className="relative group">
              <NavLink to="/shop" className={navLinkClass}>
                Category
              </NavLink>

              <ul className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                {[
                  "all",
                  "Vedic Vastukkalp Aayudh",
                  "Aayudh Frame",
                  "Vastu Shashtra Book",
                  "Kamal Kalp Yantra",
                  "Charoit Rath",
                ].map((cat) => (
                  <li key={cat}>
                    <NavLink
                      to={`/shop?category=${cat}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {cat}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li><NavLink to="/orders" className={navLinkClass}>Orders</NavLink></li>
          </ul>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setOpenSearch(true)}>
              <FiSearch size={22} />
            </button>

            <NavLink to="/wishlist" className="relative">
              <FiHeart size={22} />
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className="relative">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </NavLink>

            {user ? (
              <div className="cursor-pointer">
                <FiUser size={22} />
              </div>
            ) : (
              <NavLink to="/login">
                <FiUser size={22} />
              </NavLink>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* ✅ IMPORTANT: Spacer (navbar ni height jetlu) */}
      <div className="h-[90px] md:h-[100px] lg:h-[110px]" />

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[99998]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDE MENU ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[99999] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">  
          <FaTimes onClick={() => setOpen(false)} className="cursor-pointer text-xl" />
        </div>

        <ul className="flex flex-col p-4 gap-4 text-lg">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

          <div>
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="w-full text-left font-medium"
            >
              Category
            </button>

            {openCategory && (
              <div className="ml-4 mt-2 flex flex-col gap-2 text-base">
                {[
                  "all",
                  "Vedic Vastukkalp Aayudh",
                  "Aayudh Frame",
                  "Vastu Shashtra Book",
                  "Kamal Kalp Yantra",
                  "Charoit Rath",
                ].map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/shop?category=${cat}`}
                    onClick={() => setOpen(false)}
                  >
                    {cat}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink>
        </ul>
      </div>

      {/* SEARCH MODAL */}
      {openSearch && (
        <SearchModal onClose={() => setOpenSearch(false)} />
      )}

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-3 md:hidden z-[99999]">
        <button onClick={() => setOpenSearch(true)}>
          <FiSearch size={24} /> 
        </button>

        <NavLink to="/wishlist" className="relative">
          <FiHeart size={24} />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </NavLink>

        <NavLink to="/cart" className="relative">
          <FiShoppingCart size={24} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>

        <NavLink to="/login">
          <FiUser size={24} />
        </NavLink>
      </div>
    </>
  );
}