// import { useEffect, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const slides = [
//   {
//     title: "Welcome to Holly Zolly",
//     subtitle: "Vastu & Spiritual Products Store",
//     description:
//       "Enhance your space with positive energy through our carefully selected Vastu items, spiritual tools, and healing products.",
//     image:
//       "https://i.pinimg.com/1200x/78/a8/17/78a817db87c881fbf32ae0a8c31f06be.jpg",
//   },
//   {
//     title: "Daily Horoscope & Predictions",
//     subtitle: "Know What Stars Say",
//     description:
//       "Stay ahead with daily, weekly, and monthly horoscope updates. Understand love, career, and health predictions based on your zodiac.",
//     image:
//       "https://i.pinimg.com/1200x/ce/67/cd/ce67cddd1f6b525d942c9b012cf87249.jpg",
//   },
//   {
//     title: "Astrology Consultation",
//     subtitle: "Talk to Expert Astrologers",
//     description:
//       "Connect with professional astrologers for accurate guidance on marriage, career, business, and life decisions.",
//      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
//   },
// ];

// export default function AstrologyHero() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const prevSlide = () => {
//     setCurrent((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   return (
//     <section className="relative h-[90vh] w-full overflow-hidden bg-black">

//       {/* BACKGROUND IMAGE */}
//       <img
//         key={current}
//         src={slides[current].image}
//         alt="Astrology Background"
//         className="absolute inset-0 w-full h-full object-cover scale-110 animate-[zoom_6s_linear_infinite]"
//       />

//       {/* OVERLAY */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

//       {/* CONTENT */}
//       <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
//         <div
//           key={current}
//           data-aos="fade-up"
//           className="text-white max-w-2xl"
//         >
//         <h1 className="text-xl md:text-6xl font-bold mb-4 tracking-wide whitespace-nowrap">
//   {slides[current].title}
// </h1>

//           <h3 className="text-lg md:text-xl text-white/70 font-semibold mb-3 uppercase tracking-widest">
//             {slides[current].subtitle}
//           </h3>

//           <p className="text-sm md:text-base text-white/80 mb-6 leading-relaxed">
//             {slides[current].description}
//           </p>

//           {/* <Link
//             to="/horoscope"
//             className="inline-flex items-center gap-3 border border-white px-6 py-3 text-white font-semibold rounded-full hover:bg-white hover:text-black transition"
//           >
//             {slides[current].button}
//             →
//           </Link> */}
//         </div>
//       </div>

//       {/* LEFT BUTTON */}
//      <button
//   onClick={prevSlide}
//   className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl border border-white/40 p-3 rounded-full hover:bg-white hover:text-black transition"
// >
//   <FaChevronLeft />
// </button>

//       {/* RIGHT BUTTON */}
//      <button
//   onClick={nextSlide}
//   className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white text-xl border border-white/40 p-3 rounded-full hover:bg-white hover:text-black transition"
// >
//   <FaChevronRight />
// </button>

//       {/* DOTS */}
//       <div className="absolute bottom-8 w-full flex justify-center gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`h-3 w-3 rounded-full ${
//               current === index ? "bg-white" : "bg-white/40"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const slides = [
  {
    title: "Welcome to Holly Zolly",
    subtitle: "Vastu & Spiritual Products Store",
    description:
      "Enhance your space with positive energy through our carefully selected Vastu items, spiritual tools, and healing products.",
    image:
      "https://i.pinimg.com/1200x/78/a8/17/78a817db87c881fbf32ae0a8c31f06be.jpg",
  },
  {
    title: "Daily Horoscope & Predictions",
    subtitle: "Know What Stars Say",
    description:
      "Stay ahead with daily, weekly, and monthly horoscope updates. Understand love, career, and health predictions based on your zodiac.",
    image:
      "https://i.pinimg.com/1200x/ce/67/cd/ce67cddd1f6b525d942c9b012cf87249.jpg",
  },
  {
    title: "Astrology Consultation",
    subtitle: "Talk to Expert Astrologers",
    description:
      "Connect with professional astrologers for accurate guidance on marriage, career, business, and life decisions.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AstrologyHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative md:h-[90vh] h-[75vh] w-full overflow-hidden bg-black">
      
      {/* BACKGROUND IMAGE */}
      <img
        key={current}
        src={slides[current].image}
        alt="Astrology Background"
        className="absolute inset-0 w-full h-full object-cover scale-100 md:scale-110 md:animate-[zoom_6s_linear_infinite]"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center md:justify-start text-center md:text-left max-w-7xl mx-auto px-6">
        <div
          key={current}
          data-aos="fade-up"
          className="text-white max-w-2xl"
        >
          
          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 tracking-wide leading-tight">
            {slides[current].title}
          </h1>

          {/* ✅ SUBTITLE (ONE LINE FIXED) */}
          <h3 className="text-sm sm:text-base md:text-xl text-white/70 font-semibold mb-3 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
            {slides[current].subtitle}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 leading-relaxed">
            {slides[current].description}
          </p>
        </div>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 text-white text-xl border border-white/40 p-3 rounded-full hover:bg-white hover:text-black transition"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-white text-xl border border-white/40 p-3 rounded-full hover:bg-white hover:text-black transition"
      >
        <FaChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 md:bottom-8 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}