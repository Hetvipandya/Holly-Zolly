  // import { useEffect, useState } from "react";
  // import { getProducts } from "../data/products";
  // import ProductCard from "../components/ProductCard";
  // import ContactCTA from "../components/ContactCTA";
  // import { useSearchParams } from "react-router-dom";
  // import { FaFilter, FaSortAmountDown, FaStar } from "react-icons/fa";

  // export default function Shop() {
  //   const [category, setCategory] = useState("");
  //   const [sort, setSort] = useState("");
  //   const [rating, setRating] = useState("");
  //   const [size, setSize] = useState("");

  //   const [searchParams] = useSearchParams();
  //   const categoryFromUrl = searchParams.get("category");

  //   useEffect(() => {
  //     if (categoryFromUrl && categoryFromUrl !== "all") {
  //       setCategory(categoryFromUrl);
  //     } else {
  //       setCategory(""); 
  //     }
  //   }, [categoryFromUrl]);

  //   const filteredProducts = products
  //     .filter((product) => {
  //       if (category && product.category.toLowerCase() !== category.toLowerCase()) return false;
  //       if (size && !product.sizes?.includes(size)) return false;
  //       if (rating && product.rating < Number(rating)) return false;
  //       return true;
  //     })
  //     .sort((a, b) => {
  //       if (sort === "low") return a.price - b.price;
  //       if (sort === "high") return b.price - a.price;
  //       if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
  //       if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
  //       return 0;
  //     });

  //   const categoriesList = [
  //     "Vedic Vastukkalp Aayudh",
  //     "Aayudh Frame",
  //     "Vastu Shashtra Book",
  //     "Kamal Kalp Yantra",
  //     "Charoit Rath",
  //   ];

  //   return (
  //     <section className="pt-16 bg-[#FCFBFA] min-h-screen">
  //       <div className="max-w-7xl mx-auto px-6 mb-20">
          
  //         {/* HEADER SECTION */}
  //         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up">
  //           <div>
  //             <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">Divine Marketplace</span>
  //             <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mt-2">
  //               Explore <span className="text-orange-600">Collection</span>
  //             </h1>
  //             <div className="h-1.5 w-20 bg-orange-500 mt-4 rounded-full"></div>
  //           </div>
  //           <p className="text-gray-500 max-w-sm italic text-sm">
  //             Discover authentic Vastu tools crafted to align your home with positive cosmic vibrations.
  //           </p>
  //         </div>

  //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

  //           {/* ELEGANT FILTER SIDEBAR */}
  //           <aside className="lg:col-span-1 space-y-10" data-aos="fade-right">
              
  //             {/* CATEGORY FILTER - Stylish List */}
  //             <div>
  //               <h3 className="flex items-center gap-2 font-heading font-bold text-black mb-5 uppercase tracking-wider text-sm">
  //                 <FaFilter className="text-orange-600 text-xs" /> Filter by Category
  //               </h3>
  //               <div className="flex flex-wrap lg:flex-col gap-2">
  //                <button
  //   onClick={() => setCategory("")}
  //   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
  //     category === ""
  //       ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200"
  //       : "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
  //   }`}
  // >
  //   All Products
  // </button>
  //                 {categoriesList.map((cat) => (
  //                   <button
  //                     key={cat}
  //                     onClick={() => setCategory(cat.toLowerCase())}
  //                     className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border text-left ${
  //                       category === cat.toLowerCase() ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100" : "bg-white text-gray-600 border-gray-100 hover:border-orange-200"
  //                     }`}
  //                   >
  //                     {cat}
  //                   </button>
  //                 ))}
  //               </div>
  //             </div>

  //             {/* SORTING - Modern Dropdown */}
  //             <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
  //               <h4 className="flex items-center gap-2 font-bold text-black mb-4 text-sm uppercase">
  //                 <FaSortAmountDown className="text-orange-600" /> Sort Order
  //               </h4>
  //               <select
  //                 value={sort}
  //                 onChange={(e) => setSort(e.target.value)}
  //                 className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
  //               >
  //                 <option value="">Default Selection</option>
  //                 <option value="newest">Latest Arrivals</option>
  //                 <option value="low">Price: Low to High</option>
  //                 <option value="high">Price: High to Low</option>
  //               </select>
  //             </div>

  //             {/* RATING FILTER - Stars */}
  //             <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
  //               <h4 className="flex items-center gap-2 font-bold text-black mb-4 text-sm uppercase">
  //                 <FaStar className="text-orange-600" /> Minimum Rating
  //               </h4>
  //               <div className="space-y-3">
  //                 {["4", "3", "2"].map((r) => (
  //                   <label key={r} className="flex items-center gap-3 cursor-pointer group">
  //                     <input
  //                       type="radio"
  //                       name="rating"
  //                       className="w-4 h-4 accent-orange-600"
  //                       onChange={() => setRating(r)}
  //                       checked={rating === r}
  //                     />
  //                     <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
  //                       {r} Stars & Above
  //                     </span>
  //                   </label>
  //                 ))}
  //                 <button onClick={() => setRating("")} className="text-xs text-orange-600 font-bold hover:underline mt-2">Clear Rating</button>
  //               </div>
  //             </div>
  //           </aside>

  //           {/* PRODUCTS GRID AREA */}
  //           <div className="lg:col-span-3">
  //             <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
  //                <p className="text-gray-500 text-sm italic">
  //                  Showing <span className="text-black font-bold font-heading">{filteredProducts.length}</span> results
  //                </p>
  //                {category && (
  //                  <button onClick={() => setCategory("")} className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold hover:bg-orange-100 hover:text-orange-600 transition-all">
  //                    Reset Category ×
  //                  </button>
  //                )}
  //             </div>

  //             {filteredProducts.length === 0 ? (
  //               <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
  //                 <p className="text-gray-400 font-medium">No products match your current filters.</p>
  //                 <button onClick={() => {setCategory(""); setRating(""); setSize("");}} className="mt-4 text-orange-600 font-bold underline">Clear All Filters</button>
  //               </div>
  //             ) : (
  //               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
  //                 {filteredProducts.map((product) => (
  //                   <div key={product.id} data-aos="fade-up">
  //                     <ProductCard product={product} />
  //                   </div>
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

  import { useEffect, useState } from "react";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import ContactCTA from "../components/ContactCTA";
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaSortAmountDown, FaStar } from "react-icons/fa";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState("");
  const [size, setSize] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  // ✅ FETCH PRODUCTS FROM SANITY
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        console.log("Products:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ✅ CATEGORY FROM URL
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== "all") {
      setCategory(categoryFromUrl);
    } else {
      setCategory("");
    }
  }, [categoryFromUrl]);

  // ✅ FILTER + SORT
  const filteredProducts = products
    .filter((product) => {
      if (category && product.category?.toLowerCase() !== category.toLowerCase()) return false;
      if (size && !product.sizes?.includes(size)) return false;
      if (rating && product.rating < Number(rating)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  // ✅ DYNAMIC CATEGORY LIST FROM DATA
  const categoriesList = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <section className="pt-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-20">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
              Divine Marketplace
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-black mt-2">
              Explore <span className="text-orange-600">Collection</span>
            </h1>
            <div className="h-1.5 w-20 bg-orange-500 mt-4 rounded-full"></div>
          </div>
          <p className="text-gray-500 max-w-sm italic text-sm">
            Discover authentic Vastu tools crafted to align your home with positive cosmic vibrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-10">

            {/* CATEGORY */}
            <div>
              <h3 className="flex items-center gap-2 font-bold text-black mb-5 uppercase text-sm">
                <FaFilter className="text-orange-600 text-xs" /> Filter by Category
              </h3>

              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => setCategory("")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                    category === ""
                      ? "bg-orange-500 text-white"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  All Products
                </button>

                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat.toLowerCase())}
                    className={`px-4 py-2 rounded-xl text-sm border ${
                      category === cat?.toLowerCase()
                        ? "bg-orange-600 text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* SORT */}
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-black mb-4 text-sm uppercase">
                <FaSortAmountDown className="text-orange-600" /> Sort
              </h4>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm"
              >
                <option value="">Default</option>
                <option value="newest">Latest</option>
                <option value="low">Price Low → High</option>
                <option value="high">Price High → Low</option>
              </select>
            </div>

            {/* RATING */}
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-black mb-4 text-sm uppercase">
                <FaStar className="text-orange-600" /> Rating
              </h4>

              {["4", "3", "2"].map((r) => (
                <label key={r} className="flex gap-2">
                  <input
                    type="radio"
                    checked={rating === r}
                    onChange={() => setRating(r)}
                  />
                  {r}+ Stars
                </label>
              ))}

              <button
                onClick={() => setRating("")}
                className="text-orange-600 text-xs mt-2"
              >
                Clear
              </button>
            </div>

          </aside>

          {/* PRODUCTS */}
          <div className="lg:col-span-3">

            {loading ? (
              <div className="text-center py-20">Loading...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                No products found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
