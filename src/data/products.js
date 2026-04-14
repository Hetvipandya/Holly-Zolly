const products = [
  {
    id: 1,
    name: "Men Cotton T-Shirt",
    price: 1399,
    originalPrice: 2099,
    stockQty: 8,
    category: "men",
    createdAt: "2024-11-27",
    rating: 4.5,
    stock: true,
    sku: "MEN-TS-001",
    description:
      "Premium quality cotton t-shirt with comfortable fit and durable fabric.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/image/products/men/men1.jpg",
      "/image/products/men/men2.jpg",
    ],
    isBestSeller: true,
    isSale: false,
  },

  {
    id: 2,
    name: "Women Stylish Dress",
    price: 1599,
    originalPrice: 2399,
    stockQty: 5,
    category: "women",
    createdAt: "2021-05-11",
    rating: 4.2,
    stock: true,
    sku: "WM-DR-002",
    description:
      "Elegant dress perfect for parties and special occasions.",
    sizes: ["S", "M", "L"],
    images: [
      "/image/products/women/women1.jpg",
      "/image/products/women/women2.jpg",
    ],
    isBestSeller: true,
    isSale: false,
  },

  {
    id: 3,
    name: "Men Slim Fit Jeans",
    price: 2399,
    originalPrice: 4099,
    stockQty: 1,
    category: "men",
    createdAt: "2022-09-02",
    rating: 4.6,
    stock: true,
    sku: "MEN-JN-003",
    description:
      "Stylish slim fit jeans made with stretchable denim for daily comfort.",
    sizes: ["30", "32", "34", "36"],
    images: [
      "/image/products/men/men3.jpg",
      "/image/products/men/men4.jpg",
    ],
    isBestSeller: false,
    isSale: true,
  },

  {
    id: 4,
    name: "Women Casual Top",
    price: 1099,
    originalPrice: 2099,
    stockQty: 10,
    category: "women",
    createdAt: "2025-01-28",
    rating: 4.1,
    stock: true,
    sku: "WM-TP-004",
    description:
      "Comfortable casual top for everyday wear with soft breathable fabric.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/image/products/women/women3.jpg",
      "/image/products/women/women4.jpg",
    ],
    isBestSeller: false,
    isSale: true,
  },

  {
    id: 5,
    name: "Running Sneakers",
    price: 2599,
    originalPrice: 4099,
    stockQty: 4,
    category: "footwear",
    createdAt: "2020-05-10",
    rating: 4.8,
    stock: true,
    sku: "FW-SNK-005",
    description:
      "Lightweight running sneakers with cushioned sole and breathable mesh.",
    sizes: ["7", "8", "9", "10", "11"],
    images: [
      "/image/products/footwear/foot1.jpg",
      "/image/products/footwear/foot2.jpg",
    ],
    isBestSeller: true,
    isSale: false,
  },

  {
    id: 6,
    name: "Leather Formal Shoes",
    price: 1799,
    originalPrice: 2899,
    stockQty: 2,
    category: "footwear",
    createdAt: "2024-01-23",
    rating: 4.4,
    stock: true,
    sku: "FW-FRM-006",
    description:
      "Premium leather formal shoes suitable for office and events.",
    sizes: ["7", "8", "9", "10"],
    images: [
      "/image/products/footwear/foot3.jpg",
      "/image/products/footwear/foot4.jpg",
    ],
    isBestSeller: false,
    isSale: true,
  },

  {
    id: 7,
    name: "Smart Fitness Watch",
    price: 1999,
    originalPrice: 5099,
    stockQty: 1,
    category: "accessories",
    createdAt: "2023-09-15",
    rating: 4.3,
    stock: true,
    sku: "ACC-WT-007",
    description:
      "Smart fitness watch with heart rate monitoring and activity tracking.",
    sizes: ["FREE"],
    images: [
      "/image/products/accessories/acc1.jpg",
      "/image/products/accessories/acc2.jpg",
    ],
    isBestSeller: true,
    isSale: false,
  },

  {
    id: 8,
    name: "Stylish Sunglasses",
    price: 5099,
    originalPrice: 9099,
    stockQty: 10,
    category: "accessories",
    createdAt: "2024-09-10",
    rating: 4.0,
    stock: true,
    sku: "ACC-SG-008",
    description:
      "UV protected stylish sunglasses suitable for all face types.",
    sizes: ["FREE"],
    images: [
      "/image/products/accessories/acc3.jpg",
      "/image/products/accessories/acc4.jpg",
    ],
    isBestSeller: false,
    isSale: true,
  },
];

export default products;
