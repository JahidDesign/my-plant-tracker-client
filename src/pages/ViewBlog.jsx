import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://my-plant-tracker-server.onrender.com/blogpost/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-lg font-semibold">Loading blog post...</div>;
  }

  if (!blog) {
    return <div className="text-center py-20 text-red-600 text-lg font-semibold">Blog post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-100 shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
        {/* Banner Image */}
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-80 sm:h-[450px] object-cover rounded-t-3xl"
        />

        {/* Blog Content */}
        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold leading-snug bg-gradient-to-r from-green-600 to-lime-500 text-transparent bg-clip-text">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-500">
            Posted on{" "}
            <span className="font-medium text-gray-600">
              {moment(blog.postDateTime).format("MMMM DD, YYYY")}
            </span>
          </p>

          <div className="text-gray-800 text-lg leading-relaxed tracking-wide">
            {blog.description}
          </div>

          {/* Back Link Button */}
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:underline mt-6"
          >
            <FaArrowLeft /> Back to blog list
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
