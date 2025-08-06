import React from 'react';
import PlantTable from './PlantTable';
import { Helmet } from 'react-helmet-async';
import BlogPostTable from "./BlogPostTable";

const AllPlants = () => {
  return (
    <div className="p-8">
      <Helmet>
        <title>All Plants | Tree Tracker</title>
        <meta
          name="description"
          content="Browse all tracked plants and trees added by users. View details like watering, category, and care tips."
        />
      </Helmet>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-700">All Tracked Plants</h2>
        <p className="text-gray-600 mt-2">
          Explore a list of plants shared by nature lovers. From mighty oaks to tiny succulents —
          each plant tells a green story.
        </p>
      </div>

      {/* Table of all plants */}
      <PlantTable />

      {/* Table of blog posts */}
      <BlogPostTable />
    </div>
  );
};

export default AllPlants;
