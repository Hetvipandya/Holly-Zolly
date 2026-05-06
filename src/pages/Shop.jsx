import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ContactCTA from "../components/ContactCTA";
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaSortAmountDown, FaStar, FaSearch, FaTimes } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState("");
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // ✅ Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://holly-zolly-cvjd.onrender.com/api/product/all");
        const data = await res.json();

        // API Response Handling
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [products]);

  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== "all") {
      setCategory(categoryFromUrl);
    } else {
      setCategory("");
    }
  }, [categoryFromUrl]);

  // ✅ FILTER & SORT LOGIC
  const filteredProducts = (Array.isArray(products) ? products : [])
    .filter((product) => {
      // 1. Category Filter
      const productCategoryName = product.categoryId?.name || product.category;
      if (category && productCategoryName !== category) return false;

      // 2. Search Filter
      const nameMatch = product.productName || product.name || "";
      if (search && !nameMatch.toLowerCase().includes(search.toLowerCase())) return false;

      // 3. Rating Filter
      if (rating && Number(product.rating) < Number(rating)) return false;

      return true;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const categoriesList = [
    "Vedic Vastukkalp Aayudh",
    "Aayudh Frame",
    "Vastu Shashtra Book",
    "Kamal Kalp Yantra",
    "Charoit Rath",
  ];

  const clearAllFilters = () => {
    setCategory("");
    setRating("");
    setSearch("");
    setSort("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading divine products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-20">

        {/* HEADER */}
        <div className="text-center mb-16" data-aos="fade-down">
          <div className="inline-block bg-orange-100 text-orange-800 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Divine Marketplace
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Sacred Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover authentic Vedic products crafted with ancient wisdom and modern elegance
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sacred products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none text-lg transition-all duration-300 shadow-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-6" data-aos="fade-right">

            {/* CATEGORY */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="flex items-center gap-3 font-bold mb-6 text-lg uppercase text-gray-800">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaFilter className="text-orange-600" />
                </div>
                Categories
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    category === ""
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md"
                  }`}
                >
                  All Products
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full px-4 py-3 rounded-xl text-sm text-left font-medium transition-all duration-300 ${
                      category === cat
                        ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg transform scale-105"
                        : "bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* SORTING */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h4 className="flex items-center gap-3 font-bold mb-6 text-lg uppercase text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaSortAmountDown className="text-blue-600" />
                </div>
                Sort By
              </h4>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm font-medium transition-all duration-300"
              >
                <option value="">Default Order</option>
                <option value="newest">Latest First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>

            {/* RATING */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h4 className="flex items-center gap-3 font-bold mb-6 text-lg uppercase text-gray-800">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FaStar className="text-yellow-500" />
                </div>
                Min Rating
              </h4>
              <div className="space-y-3">
                {["4", "3", "2"].map((r) => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-yellow-50 transition-colors">
                    <input
                      type="radio"
                      name="rating"
                      className="accent-orange-600 w-4 h-4"
                      onChange={() => setRating(r)}
                      checked={rating === r}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium group-hover:text-orange-600 transition-colors">{r}+ Stars</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-xs ${i < parseInt(r) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setRating("")}
                className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
              >
                Clear Rating
              </button>
            </div>

            {/* CLEAR ALL FILTERS */}
            {(category || rating || search || sort) && (
              <button
                onClick={clearAllFilters}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3" data-aos="fade-left">
            <div className="flex items-center justify-between mb-8">
              <p className="text-lg text-gray-600 font-medium">
                Showing <span className="font-bold text-orange-600">{filteredProducts.length}</span> sacred items
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>✨</span>
                <span>Authentic Vedic Products</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-300 shadow-inner">
                <div className="text-6xl mb-4">🕉️</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="h-full transform hover:scale-105 transition-all duration-300"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ContactCTA />
    </section>
  );
}

// import { useEffect, useState } from "react";
// import { getProducts } from "../data/products";
// import ProductCard from "../components/ProductCard";
// import ContactCTA from "../components/ContactCTA";
// import { useSearchParams } from "react-router-dom";
// import { FaFilter, FaSortAmountDown, FaStar } from "react-icons/fa";

// export default function Shop() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("");
//   const [rating, setRating] = useState("");
//   const [size, setSize] = useState("");
//   const [search, setSearch] = useState("");

//   const [searchParams] = useSearchParams();
//   const categoryFromUrl = searchParams.get("category");

//   // ✅ Fetch Products
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ URL Category Sync
//   useEffect(() => {
//     if (categoryFromUrl && categoryFromUrl !== "all") {
//       setCategory(categoryFromUrl);
//     } else {
//       setCategory("");
//     }
//   }, [categoryFromUrl]);

//   // ✅ Filter + Sort Logic
// const filteredProducts = products
//   .filter((product) => {
//     const productCategory = product.category
//       ?.toString()
//       .trim()
//       .toLowerCase();

//     const selectedCategory = category
//       ?.toString()
//       .trim()
//       .toLowerCase();

//     if (selectedCategory && productCategory !== selectedCategory)
//       return false;

//     if (
//       search &&
//       !product.name?.toLowerCase().includes(search.toLowerCase())
//     )
//       return false;

//     if (size && !product.sizes?.includes(size)) return false;

//     if (rating && product.rating < Number(rating)) return false;

//     return true;
//   })
//     .sort((a, b) => {
//       if (sort === "low") return a.price - b.price;
//       if (sort === "high") return b.price - a.price;
//       if (sort === "newest")
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sort === "oldest")
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       return 0;
//     });

//   const categoriesList = [
//     "Vedic Vastukkalp Aayudh",
//     "Aayudh Frame",
//     "Vastu Shashtra Book",
//     "Kamal Kalp Yantra",
//     "Charoit Rath",
//   ];

//   // ✅ Loading UI
//   if (loading) {
//     return (
//       <p className="text-center mt-20 text-lg font-semibold">
//         Loading products...
//       </p>
//     );
//   }

//   return (
//     <section className="pt-16 bg-[#FCFBFA] min-h-screen">
//       <div className="max-w-7xl mx-auto px-6 mb-20">
        
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
//               Divine Marketplace
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold text-black mt-2">
//               Explore <span className="text-orange-600">Collection</span>
//             </h1>
//           </div>

//           {/* 🔍 Search */}
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-4 py-2 rounded-xl w-full md:w-64"
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

//           {/* SIDEBAR */}
//           <aside className="lg:col-span-1 space-y-10">
            
//             {/* CATEGORY */}
//             <div>
//               <h3 className="flex items-center gap-2 font-bold mb-5 text-sm uppercase">
//                 <FaFilter /> Category
//               </h3>

//               <div className="flex flex-wrap lg:flex-col gap-2">
//                 <button
//                   onClick={() => setCategory("")}
//                   className={`px-4 py-2 rounded-xl text-sm ${
//                     category === "" ? "bg-orange-500 text-white" : "bg-gray-100"
//                   }`}
//                 >
//                   All Products
//                 </button>

//                 {categoriesList.map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => setCategory(cat)}
//                     className={`px-4 py-2 rounded-xl text-sm ${
//                       category === cat.toLowerCase()
//                         ? "bg-orange-600 text-white"
//                         : "bg-white border"
//                     }`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* SORT */}
//             <div className="bg-white p-6 rounded-xl">
//               <h4 className="flex items-center gap-2 font-bold mb-4 text-sm uppercase">
//                 <FaSortAmountDown /> Sort
//               </h4>

//               <select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-lg"
//               >
//                 <option value="">Default</option>
//                 <option value="newest">Latest</option>
//                 <option value="low">Low to High</option>
//                 <option value="high">High to Low</option>
//               </select>
//             </div>

//             {/* RATING */}
//             <div className="bg-white p-6 rounded-xl">
//               <h4 className="flex items-center gap-2 font-bold mb-4 text-sm uppercase">
//                 <FaStar /> Rating
//               </h4>

//               {["4", "3", "2"].map((r) => (
//                 <label key={r} className="block">
//                   <input
//                     type="radio"
//                     name="rating"
//                     onChange={() => setRating(r)}
//                     checked={rating === r}
//                   />{" "}
//                   {r}+ Stars
//                 </label>
//               ))}

//               <button
//                 onClick={() => setRating("")}
//                 className="text-sm text-orange-600 mt-2"
//               >
//                 Clear
//               </button>
//             </div>
//           </aside>

//           {/* PRODUCTS */}
//           <div className="lg:col-span-3">
//             <p className="mb-6 text-gray-500">
//               Showing {filteredProducts.length} results
//             </p>

//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-20">
//                 <p>No products found</p>
//                 <button
//                   onClick={() => {
//                     setCategory("");
//                     setRating("");
//                     setSearch("");
//                   }}
//                   className="text-orange-600 underline mt-3"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {filteredProducts.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <ContactCTA />
//     </section>
//   );
// }