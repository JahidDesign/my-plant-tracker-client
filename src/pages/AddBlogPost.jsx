import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddBlogPost = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const blogData = {
      ...data,
      postDateTime: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "https://my-plant-tracker-server.onrender.com/blogpost",
        JSON.stringify(blogData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire("Success!", "Blog post added successfully.", "success");
        reset();
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      Swal.fire("Error", "Failed to add blog post.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Helmet>
        <title>Add Blog Post</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-green-700">Add Blog Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-3 py-2 rounded"
            rows={5}
            placeholder="Write your blog content"
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="url"
            {...register("imageUrl", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddBlogPost;
