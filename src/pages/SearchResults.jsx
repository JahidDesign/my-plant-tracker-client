import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("query") || "";

  const [plants, setPlants] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plantsRes, blogsRes] = await Promise.all([
          axios.get("https://my-plant-tracker-server.onrender.com/plants"),
          axios.get("https://my-plant-tracker-server.onrender.com/blogpost"),
        ]);
        setPlants(
          plantsRes.data.filter((p) =>
            p.plantName?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setBlogs(
          blogsRes.data.filter((b) =>
            b.title?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  if (loading) return <p>Loading results...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchTerm}"</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Plants</h2>
        {plants.length === 0 ? (
          <p>No plants found.</p>
        ) : (
          plants.map((plant) => (
            <div key={plant._id} className="mb-2 border-b pb-2">
              <h3 className="font-semibold">{plant.plantName}</h3>
              <p>{plant.description || "No description available."}</p>
            </div>
          ))
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="mb-2 border-b pb-2">
              <h3 className="font-semibold">{blog.title}</h3>
              <p>{blog.summary || "No summary available."}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default SearchResults;
