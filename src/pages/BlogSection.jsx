import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://my-plant-tracker-server.onrender.com/blogpost");
        setBlogPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visiblePosts = blogPosts.slice(0, visibleCount);

  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">

        {/* Featured Post */}
        {visiblePosts[0] && (
          <div
            onClick={() => navigate(`/blogpost/${visiblePosts[0]._id}`)}
            className="cursor-pointer block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
          >
            <img
              src={visiblePosts[0].imageUrl}
              alt={visiblePosts[0].title}
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {visiblePosts[0].title}
              </h3>
              <span className="text-xs dark:text-gray-600">
                {moment(visiblePosts[0].postDateTime).format("MMMM DD, YYYY")}
              </span>
              <p>{visiblePosts[0].description}</p>
            </div>
          </div>
        )}

        {/* Grid of Remaining Posts */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.slice(1).map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/blogpost/${post._id}`)}
              className="cursor-pointer max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover w-full rounded h-44 dark:bg-gray-500"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {post.title}
                </h3>
                <span className="text-xs dark:text-gray-600">
                  {moment(post.postDateTime).format("MMMM DD, YYYY")}
                </span>
                <p>{post.description.slice(0, 120)}...</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < blogPosts.length && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
            >
              Load more posts...
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
