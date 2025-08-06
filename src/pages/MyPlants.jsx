import React from "react";
import MyPlantsBlog from "./MyPlantsCards";
import { Helmet } from "react-helmet-async";

const MyPlants = () => {
  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <Helmet>
        <title>My Plants | Plant Care Tracker</title>
        <meta name="description" content="View all plants you’ve added, including care details and blog-style descriptions." />
      </Helmet>

      
      
      {/* Render blog-style posts */}
      <MyPlantsBlog />
    </div>
  );
};

export default MyPlants;
