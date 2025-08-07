import React, { useEffect, useState } from "react";
import axios from "axios";
import PlantCard from "./PlantCard";
import { NavLink } from "react-router-dom";

const PlantCards = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); 

  useEffect(() => {
    axios
      .get("https://my-plant-tracker-server.onrender.com/plants")
      .then((res) => {
        setPlants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch plants:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl animate-pulse">
        Loading plant cards...
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        No plants found.
      </div>
    );
  }

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6 flex justify-between items-center border-b pb-3">
        <h2 className="text-green-700 text-2xl font-semibold">Plant Blog</h2>
        <NavLink to="/all-plants" className="text-green-600 text-sm hover:underline">
          See All
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {plants.slice(0, visibleCount).map((plant) => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>

      {visibleCount < plants.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleViewMore}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantCards;
