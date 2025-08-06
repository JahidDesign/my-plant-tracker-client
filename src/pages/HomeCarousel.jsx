import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ModernImageCarousel = () => {
  return (
    <div className="w-full mt-2 rounded-none overflow-hidden shadow-xl">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={700}
        emulateTouch
        stopOnHover
      >
        {/* Slide 1 */}
        <div className="relative w-full">
          <img
            src="https://i.ibb.co.com/xtz1jj7m/johann-siemens-EPy0g-BJzz-ZU-unsplash-1.jpg"
            alt="Indoor Plants"
            className="object-cover w-full h-[700px]"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Indoor Plant Collection
            </h2>
            <p className="text-lg md:text-xl text-white mt-4 max-w-2xl">
              Explore our curated selection of indoor plants that bring life,
              freshness, and style to your living space.
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full">
          <img
            src="https://i.ibb.co/4cRDWkd/sergei-a-he-LWtu-AN3c-unsplash.jpg"
            alt="Watering Tips"
            className="object-cover w-full h-[700px]"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Smart Watering Tips
            </h2>
            <p className="text-lg md:text-xl text-white mt-4 max-w-2xl">
              Learn how to water your plants effectively without overdoing it.
              Keep your plants healthy and thriving year-round.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative w-full">
          <img
            src="https://i.ibb.co.com/rG6mffZ6/kumiko-shimizu-cvad-Dls-Rq-H0-unsplash.jpg"
            alt="Light Requirements"
            className="object-cover w-full h-[700px]"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Understanding Light Needs
            </h2>
            <p className="text-lg md:text-xl text-white mt-4 max-w-2xl">
              Discover the best lighting conditions for different plant species
              and how to position them for optimal growth.
            </p>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="relative w-full">
          <img
            src="https://i.ibb.co.com/spT76B6P/rui-silvestre-VJKv-OLg-Cb-KM-unsplash.jpg"
            alt="Gardening Tools"
            className="object-cover w-full h-[700px]"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Essential Gardening Tools
            </h2>
            <p className="text-lg md:text-xl text-white mt-4 max-w-2xl">
              Equip yourself with the right tools to simplify plant care,
              pruning, repotting, and maintenance tasks.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ModernImageCarousel;
