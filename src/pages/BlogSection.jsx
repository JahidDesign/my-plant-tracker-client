import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);

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

  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        {/* Featured post (first post) */}
        {blogPosts[0] && (
          <a
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
          >
            <img
              src={blogPosts[0].imageUrl}
              alt={blogPosts[0].title}
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {blogPosts[0].title}
              </h3>
              <span className="text-xs dark:text-gray-600">
                {moment(blogPosts[0].postDateTime).format("MMMM DD, YYYY")}
              </span>
              <p>{blogPosts[0].description}</p>
            </div>
          </a>
        )}

        {/* Grid of the rest */}
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <a
              key={post._id}
              href="#"
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
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
            </a>
          ))}
        </div>

        {/* Load More button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
          >
            Load more posts...
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
            