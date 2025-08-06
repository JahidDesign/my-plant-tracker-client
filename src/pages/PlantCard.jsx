import React from "react";
import {
  FaTint,
  FaLeaf,
  FaCalendarCheck,
  FaHeart,
  FaComments,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";

const PlantCard = ({ plant }) => {
  return (
    <div className="bg-white max-w-6xl rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="h-56 w-full overflow-hidden relative">
        <img
          src={plant.image}
          alt={plant.plantName}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          {plant.category || "Plant"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Description */}
        <h2 className="text-xl font-bold text-green-700 mb-1">{plant.plantName}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{plant.description}</p>

        {/* Plant Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          {plant.category && (
            <div className="flex items-center gap-2">
              <FaLeaf className="text-green-500" />
              <span>{plant.category}</span>
            </div>
          )}
          {plant.careLevel && (
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-500" />
              <span>{plant.careLevel}</span>
            </div>
          )}
          {plant.wateringFrequency && (
            <div className="flex items-center gap-2">
              <FaTint className="text-blue-500" />
              <span>Every {plant.wateringFrequency}d</span>
            </div>
          )}
          {plant.lastWateredDate && (
            <div className="flex items-center gap-2">
              <FaCalendarCheck className="text-green-600" />
              <span>Last: {plant.lastWateredDate}</span>
            </div>
          )}
          {plant.nextWateringDate && (
            <div className="flex items-center gap-2 col-span-2">
              <FaCalendarCheck className="text-yellow-500" />
              <span>Next: {plant.nextWateringDate}</span>
            </div>
          )}
          {plant.healthStatus && (
            <div className="flex items-center gap-2 col-span-2">
              <FaHeart className="text-pink-500" />
              <span>Health: {plant.healthStatus}</span>
            </div>
          )}
        </div>

        {/* Footer - User & Meta Info */}
        <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs text-gray-600">
          {/* User Info */}
          <div className="flex items-center gap-3">
            {plant.userPhoto && (
              <img
                src={plant.userPhoto}
                alt={plant.userName}
                className="w-10 h-10 rounded-full border object-cover"
              />
            )}
            <div>
              {plant.userName && (
                <p className="font-semibold text-sm text-gray-800">{plant.userName}</p>
              )}
              {plant.userEmail && (
                <p className="flex items-center gap-1 text-xs mt-2">
                  <FaEnvelope className="text-gray-400" />
                  {plant.userEmail}
                </p>
              )}
            </div>
          </div>

          {/* Time & Comments */}
          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-400" />
              {plant.lastWateredDate || "Just now"}
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
