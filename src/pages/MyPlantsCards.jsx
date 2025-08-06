import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const MyPlantsBlog = () => {
  const { user, loading: authLoading } = useAuth();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserPlants = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const res = await axios.get(`https://my-plant-tracker-server.onrender.com/plants?email=${user.email}`);
        const userPlants = res.data.filter((p) => p.userEmail === user.email);
        setPlants(userPlants);
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlants();
  }, [user?.email]);

  const handleEdit = (plant) => {
    setEditingId(plant._id);
    reset({
      plantName: plant.plantName,
      category: plant.category,
      careLevel: plant.careLevel,
      wateringFrequency: plant.wateringFrequency,
      description: plant.description,
      image: plant.image,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset({});
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`https://my-plant-tracker-server.onrender.com/plants/${editingId}`, data);
      const updatedPlant = res.data;
      const updatedList = plants.map((p) =>
        p._id === editingId ? { ...p, ...updatedPlant } : p
      );
      setPlants(updatedList);
      setEditingId(null);
      Swal.fire("Updated!", "Plant updated successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update plant.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This plant will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://my-plant-tracker-server.onrender.com/plants/${id}`);
        setPlants((prev) => prev.filter((p) => p._id !== id));
        Swal.fire("Deleted!", "Plant removed successfully.", "success");
      } catch {
        Swal.fire("Error", "Failed to delete the plant.", "error");
      }
    }
  };

  if (authLoading || loading) {
    return <div className="p-10 text-center text-lg">Loading your plants...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Helmet>
        <title>My Plants || Plant Tracker</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">My Plants</h1>

      {user?.email && (
        <p className="text-gray-600 mb-6">
          Logged in as: <span className="font-semibold">{user.email}</span>
        </p>
      )}

      {plants.length === 0 ? (
        <p className="text-gray-500">You haven’t added any plants yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white border rounded-xl shadow p-4">
              {editingId === plant._id ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <input
                    {...register("plantName", { required: "Plant name is required" })}
                    placeholder="Plant Name"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("category", { required: "Category is required" })}
                    placeholder="Category"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    {...register("careLevel")}
                    placeholder="Care Level"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="number"
                    {...register("wateringFrequency")}
                    placeholder="Watering Frequency (days)"
                    className="w-full border p-2 rounded"
                  />
                  <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    rows={3}
                  />

                  <input
                    {...register("image", {
                      required: "Image URL is required",
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: "Enter a valid URL",
                      },
                    })}
                    placeholder="Image URL"
                    className={`input input-bordered w-full border p-2 rounded ${
                      errors.image ? "border-red-500" : ""
                    }`}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {plant.image && (
                    <img
                      src={plant.image}
                      alt={plant.plantName}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                  )}
                  <h2 className="text-xl font-bold text-green-800">{plant.plantName}</h2>
                  <p className="text-gray-700 mt-1">
                    <strong>Category:</strong> {plant.category}
                    <br />
                    <strong>Care Level:</strong> {plant.careLevel}
                    <br />
                    <strong>Watering:</strong> Every {plant.wateringFrequency} days
                  </p>
                  {plant.description && (
                    <p className="text-gray-800 mt-2 whitespace-pre-line">{plant.description}</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(plant)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plant._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlantsBlog;
