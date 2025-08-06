import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PlantTable = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get("https://my-plant-tracker-server.onrender.com/plants");
        setPlants(res.data);
      } catch (error) {
        console.error("Failed to fetch plants", error);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div className="max-w-[95vw] mx-auto px-4 py-10 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-700">All Plant Details</h2>
      <table className="table-auto w-full border border-gray-300 text-sm text-left">
        <thead className="bg-green-200 text-gray-700">
          <tr>
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Image</th>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Care Level</th>
            <th className="px-3 py-2">Watering</th>
            <th className="px-3 py-2">Last Watered</th>
            <th className="px-3 py-2">Next Watering</th>
            <th className="px-3 py-2">Health</th>
            <th className="px-3 py-2">User</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">User Photo</th>
            <th className="px-3 py-2">Description</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, index) => (
            <tr key={plant._id} className="border-b hover:bg-green-50">
              <td className="px-3 py-2">{index + 1}</td>
              <td className="px-3 py-2">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-3 py-2">{plant.plantName}</td>
              <td className="px-3 py-2">{plant.category}</td>
              <td className="px-3 py-2">{plant.careLevel}</td>
              <td className="px-3 py-2">{plant.wateringFrequency} days</td>
              <td className="px-3 py-2">{plant.lastWateredDate}</td>
              <td className="px-3 py-2">{plant.nextWateringDate || "N/A"}</td>
              <td className="px-3 py-2">{plant.healthStatus}</td>
              <td className="px-3 py-2">{plant.userName || "—"}</td>
              <td className="px-3 py-2">{plant.userEmail || "—"}</td>
              <td className="px-3 py-2">
                {plant.userPhoto ? (
                  <img
                    src={plant.userPhoto}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  "—"
                )}
              </td>
              <td className="px-3 py-2 max-w-xs truncate">{plant.description}</td>
              <td className="px-3 py-2">
                <button
                  className="btn btn-sm btn-outline btn-success flex items-center gap-1"
                  onClick={() => navigate(`/plants/${plant._id}`)}
                >
                  <FaEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantTable;
