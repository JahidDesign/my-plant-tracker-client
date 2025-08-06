import React from "react";
import { Helmet } from "react-helmet-async";
import PlantCarousel from "./PlantCarousel";
import ModernImageCarousel from "./HomeCarousel";
import PlantCards from "./PlantCards";
import BlogSection from "./BlogSection";
const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Home | Plant Care Tracker</title>
        <meta
          name="description"
          content="Track and manage your plants with our easy-to-use Plant Care Tracker app."
        />
      </Helmet>

      {/* Hero Carousel */}
      <section className="mb-12">
        <ModernImageCarousel />
      </section>

      {/* New Plants Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10 tracking-wide">
          New Plants
        </h1>
        <PlantCards />
      </section>

      {/* Featured Plant Carousel */}
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PlantCarousel />
        </div>
      </section>

      {/* You can add more sections here */}
      <BlogSection />
    </div>
  );
};

export default Home;
