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

//   // 🔥 MOBILE CATEGORY OPEN STATE
//   const [openCategory, setOpenCategory] = useState(false);

//   const categories = [
//     "all",
//     "Vedic Vastukkalp Aayudh",
//     "Aayudh Frame",
//     "Vastu Shashtra Book",
//     "Kamal Kalp Yantra",
//     "Charoit Rath",
//   ];

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

//     return () => window.removeEventListener("cartUpdated", updateCounts);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [open]);

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 w-full z-[99999] bg-gray-300 shadow-md">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           <NavLink to="/">
//             <img src="/image/logo/LOGO.png" className="h-14" />
//           </NavLink>

//           {/* DESKTOP MENU (UNCHANGED) */}
//           <ul className="hidden md:flex gap-8 items-center">
//             <li><NavLink to="/">Home</NavLink></li>
//             <li><NavLink to="/about">About</NavLink></li>

//             {/* DESKTOP CATEGORY HOVER */}
//             <li className="relative group">
//               <NavLink to="/shop">Category</NavLink>

//               <ul className="absolute left-0 top-full pt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
//                 {categories.map((cat) => (
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

//             <li><NavLink to="/orders">Orders</NavLink></li>
//           </ul>

//           {/* ICONS */}
//           <div className="hidden md:flex gap-5">
//             <FiSearch onClick={() => setOpenSearch(true)} />
//             <FiHeart />
//             <FiShoppingCart />
//             <FiUser />
//           </div>

//           <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
//             <FaBars />
//           </button>
//         </div>
//       </nav>

//       <div className="h-[90px]" />

//       {/* BACKDROP */}
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
//         <div className="flex justify-between p-4 border-b">
//           <FaTimes onClick={() => setOpen(false)} />
//         </div>

//         <ul className="flex flex-col p-4 gap-4">

//           <NavLink onClick={() => setOpen(false)} to="/">Home</NavLink>
//           <NavLink onClick={() => setOpen(false)} to="/about">About</NavLink>

//           {/* 🔥 MOBILE CATEGORY (ACCORDION STYLE) */}
//           <div>
//             <button
//               onClick={() => setOpenCategory(!openCategory)}
//               className="w-full text-left font-medium"
//             >
//               Category ▾
//             </button>

//             {openCategory && (
//               <div className="ml-3 mt-2 flex flex-col gap-2">
//                 {categories.map((cat) => (
//                   <NavLink
//                     key={cat}
//                     to={`/shop?category=${cat}`}
//                     onClick={() => setOpen(false)}
//                     className="text-sm text-gray-700 hover:text-black"
//                   >
//                     {cat}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>

//           <NavLink onClick={() => setOpen(false)} to="/orders">
//             Orders
//           </NavLink>
//         </ul>
//       </div>

//       {/* MOBILE BOTTOM BAR (UNCHANGED) */}
//       <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around py-3 md:hidden">
//         <FiSearch onClick={() => setOpenSearch(true)} />
//         <FiHeart />
//         <FiShoppingCart />
//         <FiUser />
//       </div>

//       {openSearch && (
//         <SearchModal onClose={() => setOpenSearch(false)} />
//       )}
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

    return () => window.removeEventListener("cartUpdated", updateCounts);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[99999] bg-gray-300 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <NavLink to="/">
            <img src="/image/logo/LOGO.png" className="h-14" />
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 items-center">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>

            <li className="relative group">
              <NavLink to="/shop">Category</NavLink>

              <ul className="absolute left-0 top-full pt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
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

            <li><NavLink to="/orders">Orders</NavLink></li>
          </ul>

          {/* ICONS */}
          <div className="hidden md:flex gap-5">
            <FiSearch onClick={() => setOpenSearch(true)} />
            <FiHeart />
            <FiShoppingCart />
            <FiUser />
          </div>

          <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
            <FaBars />
          </button>
        </div>
      </nav>

      <div className="h-[90px]" />

      {/* BACKDROP */}
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
        <div className="flex justify-between p-4 border-b">
          <FaTimes onClick={() => setOpen(false)} />
        </div>

        <ul className="flex flex-col p-4 gap-4">

          <NavLink onClick={() => setOpen(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about">About</NavLink>

          {/* CATEGORY ACCORDION */}
          <div>
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="w-full text-left font-medium"
            >
              Category ▾
            </button>

            {openCategory && (
              <div className="ml-3 mt-2 flex flex-col gap-2">
                {categories.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/shop?category=${cat}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-gray-700 hover:text-black"
                  >
                    {cat}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink onClick={() => setOpen(false)} to="/orders">
            Orders
          </NavLink>
        </ul>
      </div>

      {/* 🔥 FIXED MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-300 flex justify-around items-center py-3 md:hidden z-[999999] border-t border-gray-400 pb-[env(safe-area-inset-bottom)]">

        <button onClick={() => setOpenSearch(true)} className="flex flex-col items-center">
          <FiSearch size={22} />
        </button>

        <NavLink to="/wishlist" className="flex flex-col items-center">
          <FiHeart size={22} />
        </NavLink>

        <NavLink to="/cart" className="relative flex flex-col items-center">
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
              {cartCount}
            </span>
          )}
        </NavLink>

        <NavLink to={user ? "/profile" : "/login"} className="flex flex-col items-center">
          <FiUser size={22} />
        </NavLink>

      </div>

      {openSearch && (
        <SearchModal onClose={() => setOpenSearch(false)} />
      )}
    </>
  );
}