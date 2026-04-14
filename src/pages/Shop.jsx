import { useEffect, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import ContactCTA from "../components/ContactCTA";
import { useSearchParams } from "react-router-dom";




export default function Shop() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState("");
  const [size, setSize] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== "all") {
      setCategory(categoryFromUrl);
    } else {
      setCategory(""); // show all products
    }
  }, [categoryFromUrl]);



  const filteredProducts = products
    .filter((product) => {
      // CATEGORY
      if (category && product.category.toLowerCase() !== category) {
        return false;
      }

      // SIZE
      if (size && !product.sizes?.includes(size)) {
        return false;
      }

      // RATING
      if (rating && product.rating < Number(rating)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;

      if (sort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);

      if (sort === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      return 0;
    });




  return (
    <section className="pt-10">
      <div className="max-w-7xl mx-auto px-6 mb-5">

        {/* PAGE TITLE */}
        <div className="mb-6" data-aos="fade-up">
          <h1 className="text-3xl font-heading font-bold text-primary">
            Shop Products
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* FILTER SIDEBAR */}
          {/* FILTER SIDEBAR */}
          <aside className="md:col-span-1 bg-white p-6 rounded shadow border border-primary/30 space-y-6 h-fit" data-aos="fade-up">
            <h3 className="font-heading font-semibold text-primary">
              Filters
            </h3>

            {/* CATEGORY */}
            <div>
              <h4 className="font-semibold mb-2 text-primary">Category</h4>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* SIZE */}
            <div>
              <h4 className="font-semibold mb-2 text-primary">Size</h4>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All</option>
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
              </select>
            </div>

            {/* RATING */}
            <div>
              <h4 className="font-semibold mb-2 text-primary">Rating</h4>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">All</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
              </select>
            </div>

            {/* SORT */}
            <div>
              <h4 className="font-semibold mb-2 text-primary">Sort By</h4>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Default</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>

            </div>
          </aside>



          {/* PRODUCTS GRID */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
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
