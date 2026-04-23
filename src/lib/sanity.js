// import { createClient } from "@sanity/client";

// // 🔥 Sanity Client
// export const client = createClient({
//   projectId: "5o6gm3q4",
//   dataset: "categories",
//   apiVersion: "2024-01-01",
//   useCdn: false, 
//   perspective: "published",
// });

// // 🔥 Image URL Builder (optional but useful)
// import imageUrlBuilder from "@sanity/image-url";

// const builder = imageUrlBuilder(client);

// export function urlFor(source) {
//   return builder.image(source);
// }
// ✅ ALWAYS IMPORTS FIRST
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// ✅ THEN CONFIG
export const client = createClient({
  projectId: "5o6gm3q4",
  dataset: "categories",
  useCdn: false,
  apiVersion: "2023-01-01",
   perspective: "published",
});

// ✅ IMAGE BUILDER
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);