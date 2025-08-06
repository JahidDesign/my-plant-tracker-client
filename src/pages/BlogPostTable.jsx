import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const BlogPostTable = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://my-plant-tracker-server.onrender.com/blogpost");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://my-plant-tracker-server.onrender.com/blogpost/${id}`);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        fetchPosts();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Failed to delete post.", "error");
      }
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditedFields({
      title: post.title,
      description: post.description,
    });
  };

  const handleFieldChange = (e) => {
    setEditedFields({
      ...editedFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://my-plant-tracker-server.onrender.com/blogpost/${editingPostId}`, editedFields);
      Swal.fire("Success!", "Post updated successfully.", "success");
      setEditingPostId(null);
      fetchPosts();
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error!", "Failed to update post.", "error");
    }
  };

  const handleCancel = () => {
    setEditingPostId(null);
    setEditedFields({});
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Blog Posts</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100 text-left text-gray-800">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-gray-100 transition-all">
                  <td className="px-4 py-2">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {editingPostId === post._id ? (
                      <input
                        type="text"
                        name="title"
                        value={editedFields.title}
                        onChange={handleFieldChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="font-semibold">{post.title}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 max-w-sm">
                    {editingPostId === post._id ? (
                      <textarea
                        name="description"
                        value={editedFields.description}
                        onChange={handleFieldChange}
                        className="border rounded px-2 py-1 w-full"
                        rows={2}
                      />
                    ) : (
                      <p className="text-gray-600 line-clamp-2">{post.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {moment(post.postDateTime).isValid()
                      ? moment(post.postDateTime).format("MMMM D, YYYY")
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    {editingPostId === post._id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(post)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No blog posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostTable;
