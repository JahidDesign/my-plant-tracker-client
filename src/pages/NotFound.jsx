import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img
        src="https://i.ibb.co.com/bgZ852rm/error.png" // Replace with your preferred 404 PNG
        alt="404 Not Found"
        className="max-w-xs md:max-w-md lg:max-w-lg mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <NavLink
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg transition duration-300"
      >
        Go Back Home
      </NavLink>
    </div>
  );
};

export default NotFound;
