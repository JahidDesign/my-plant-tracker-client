import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaLeaf, FaWater, FaUser, FaInfoCircle } from "react-icons/fa";

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch(`https://my-plant-tracker-server.onrender.com/plants/${id}`)
      .then((res) => res.json())
      .then((data) => setPlant(data))
      .catch((err) => console.error("Failed to load plant:", err));
  }, [id]);

  if (!plant) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-6">
      <Helmet>
        <title>{plant.name ? `View Plant - ${plant.plantName}` : "Loading..."}</title>
      </Helmet>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={plant.image}
          alt={plant.plantName}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-4xl font-bold text-green-700 flex items-center gap-2 mb-4">
            <FaLeaf /> {plant.plantName}
          </h1>

          <div className="text-gray-700 space-y-2">
            <p><strong>Category:</strong> {plant.category}</p>
            <p><strong>Watering Frequency:</strong> Every {plant.wateringFrequency} days</p>
            <p><strong>Care Level:</strong> {plant.careLevel}</p>
            <p><strong>Added on:</strong> {plant.date}</p>
            <p><strong>Description:</strong> {plant.description}</p>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaUser /> Added by:
            </h3>
            <div className="flex items-center gap-4">
              {plant.userPhoto && (
                <img
                  src={plant.userPhoto}
                  alt={plant.userName}
                  className="w-16 h-16 rounded-full border"
                />
              )}
              <div>
                <p className="font-medium">{plant.userName}</p>
                <p className="text-sm text-gray-500">{plant.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
