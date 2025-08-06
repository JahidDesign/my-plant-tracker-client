import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const PlantCarousel = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000}
        transitionTime={800}
        className="rounded-xl shadow-lg"
      >
        {/* Section 1 */}
        <div className="bg-green-100 p-8 h-72 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2 text-green-800">🌿 Indoor Plants</h2>
          <p className="text-gray-700 max-w-md text-center">
            Discover the best low-maintenance indoor plants to brighten up your space and purify your air.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-green-200 p-8 h-72 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2 text-green-900">💧 Watering Tips</h2>
          <p className="text-gray-800 max-w-md text-center">
            Learn how to properly water your plants and avoid root rot, overwatering, or dehydration.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-green-300 p-8 h-72 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2 text-green-900">☀️ Light Needs</h2>
          <p className="text-gray-900 max-w-md text-center">
            Match your plants to the right light conditions — direct, indirect, or shade.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-green-400 p-8 h-72 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2 text-white">🛠️ Gardening Tools</h2>
          <p className="text-white max-w-md text-center">
            Explore essential tools for repotting, pruning, and supporting plant growth effectively.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default PlantCarousel;
