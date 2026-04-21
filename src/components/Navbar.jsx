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
//   const [user, setUser] = useState(null);
//   const [openCategory, setOpenCategory] = useState(false);

//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (currentUser) setUser(currentUser);
//   }, []);

//   useEffect(() => {
//     const updateCounts = () => {
//       const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
//       const totalQty = cart.reduce(
//         (sum, item) => sum + Number(item.quantity || 0),
//         0
//       );
//       setCartCount(totalQty);
//     };

//     updateCounts();

//     window.addEventListener("cartUpdated", updateCounts);

//     return () => {
//       window.removeEventListener("cartUpdated", updateCounts);
//     };
//   }, []);

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
//       <nav className="fixed top-0 left-0 w-full z-[99999] bg-gray-300 shadow-md">
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

//             <li className="relative group">
//               <NavLink to="/shop" className={navLinkClass}>
//                 Category
//               </NavLink>

//               <ul className="absolute left-0 top-full pt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
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

//           {/* ICONS */}
//           <div className="hidden md:flex items-center gap-6">

//             <button onClick={() => setOpenSearch(true)}>
//               <FiSearch size={22} />
//             </button>

//             {/* ❤️ Wishlist (NO COUNT) */}
//             <NavLink to="/wishlist" className="w-8 h-8 flex items-center justify-center">
//               <FiHeart size={22} />
//             </NavLink>

//             {/* 🛒 Cart */}
//             <NavLink to="/cart" className="relative w-8 h-8 flex items-center justify-center">
//               <FiShoppingCart size={22} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
//                   {cartCount}
//                 </span>
//               )}
//             </NavLink>

//             {/* 👤 User */}
//             {user ? (
//               <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
//                 <FiUser size={22} />
//               </div>
//             ) : (
//               <NavLink to="/login" className="w-8 h-8 flex items-center justify-center">
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

//       <div className="h-[90px] md:h-[100px] lg:h-[110px]" />

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-[99998]"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* MOBILE MENU */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white z-[99999] transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <FaTimes onClick={() => setOpen(false)} className="cursor-pointer text-xl" />
//         </div>

//         <ul className="flex flex-col p-4 gap-4 text-lg">
//           <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
//           <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

//           <NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink>
//         </ul>
//       </div>

//       {openSearch && (
//         <SearchModal onClose={() => setOpenSearch(false)} />
//       )}

//       {/* MOBILE BOTTOM BAR */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-3 md:hidden z-[99999]">
//         <button onClick={() => setOpenSearch(true)}>
//           <FiSearch size={24} />
//         </button>

//         {/* ❤️ Wishlist (NO COUNT) */}
//         <NavLink to="/wishlist" className="w-8 h-8 flex items-center justify-center">
//           <FiHeart size={24} />
//         </NavLink>

//         {/* 🛒 Cart */}
//         <NavLink to="/cart" className="relative w-8 h-8 flex items-center justify-center">
//           <FiShoppingCart size={24} />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
//               {cartCount}
//             </span>
//           )}
//         </NavLink>

//         <NavLink to="/login" className="w-8 h-8 flex items-center justify-center">
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
  const [user, setUser] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);

  const categories = [
    "all",
    "Vedic Vastukkalp Aayudh",
    "Aayudh Frame",
    "Vastu Shashtra Book",
    "Kamal Kalp Yantra",
    "Charoit Rath",
  ];

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalQty = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );
      setCartCount(totalQty);
    };

    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
    };
  }, []);

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

            <li className="relative group">
              <NavLink to="/shop" className={navLinkClass}>
                Category
              </NavLink>

              <ul className="absolute left-0 top-full pt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                {categories.map((cat) => (
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

          {/* ICONS */}
          <div className="hidden md:flex items-center gap-6">

            <button onClick={() => setOpenSearch(true)}>
              <FiSearch size={22} />
            </button>

            <NavLink to="/wishlist" className="w-8 h-8 flex items-center justify-center">
              <FiHeart size={22} />
            </NavLink>

            <NavLink to="/cart" className="relative w-8 h-8 flex items-center justify-center">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {user ? (
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
                <FiUser size={22} />
              </div>
            ) : (
              <NavLink to="/login" className="w-8 h-8 flex items-center justify-center">
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

      <div className="h-[90px] md:h-[100px] lg:h-[110px]" />

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[99998]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[99999] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <FaTimes
            onClick={() => setOpen(false)}
            className="cursor-pointer text-xl"
          />
        </div>

        <ul className="flex flex-col p-4 gap-4 text-lg">

          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>

          {/* 🔥 CATEGORY ADDED IN MOBILE */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Category</p>

            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/shop?category=${cat}`}
                onClick={() => setOpen(false)}
                className="text-sm text-gray-700 ml-2 hover:text-black"
              >
                {cat}
              </NavLink>
            ))}
          </div>

          <NavLink to="/orders" onClick={() => setOpen(false)}>
            Orders
          </NavLink>
        </ul>
      </div>

      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}

      {/* MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-3 md:hidden z-[99999]">

        <button onClick={() => setOpenSearch(true)}>
          <FiSearch size={24} />
        </button>

        <NavLink to="/wishlist" className="w-8 h-8 flex items-center justify-center">
          <FiHeart size={24} />
        </NavLink>

        <NavLink to="/cart" className="relative w-8 h-8 flex items-center justify-center">
          <FiShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
              {cartCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/login" className="w-8 h-8 flex items-center justify-center">
          <FiUser size={24} />
        </NavLink>
      </div>
    </>
  );
}