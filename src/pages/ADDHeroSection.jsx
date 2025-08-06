import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-[50vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://i.ibb.co.com/ZnnrXBP/simon-berger-9-GL6-YGDJ-tw-unsplash.jpg')` }}>
      {/* Dark overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          Welcome to Tree Tracker
        </h1>
        <p className="text-lg md:text-xl mb-6 text-green-600">
          Discover and care for your favorite plants
        </p>
        <a href="/plants" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition">
          Explore Plants
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
