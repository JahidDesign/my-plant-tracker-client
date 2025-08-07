import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { FaPlusCircle, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import HeroSection from "./ADDHeroSection";
const AddPlant = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { user } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const [loading, setLoading] = useState(false);

  // Set hidden fields when user or date changes
  useEffect(() => {
    if (user) {
      setValue("userEmail", user.email || "");
      setValue("userName", user.displayName || "Anonymous");
      setValue("userPhoto", user.photoURL || "");
      setValue("lastWateredDate", today);
    }
  }, [user, setValue, today]);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Submitting data:", data); // Debug log

    try {
      await axios.post("https://my-plant-tracker-server.onrender.com/plants", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

     await Swal.fire({
  icon: "success",
  title: "Plant Added!",
  text: "Your plant has been added successfully.",
  confirmButtonText: "Sweet! OK",
  confirmButtonColor: "#22c55e", 
});

      reset();
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "Failed to add the plant. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading user...</div>;

  return (
    <>
      <Helmet>
        <title>Add Plant | Plant Care Tracker</title>
        <meta name="description" content="Add a new plant to your collection." />
      </Helmet>

      {/* <section className="bg-green-100 py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-green-700 mb-4">
              Add Your Favorite Plant
            </h1>
            <p className="text-gray-700 text-lg">
              Track and manage your plant collection with ease.
            </p>
          </div>
          <div className="text-center">
            <img
              src="https://i.ibb.co.com/G4VmHMny/plantsdesign.png"
              alt="Plant Illustration"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </section> */}
      <HeroSection/>

      <section className="max-w-4xl mx-auto p-6 mt-10">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-left mb-6 text-green-700 flex items-center justify-center gap-2">
            <FaPlusCircle /> Add a New Plant
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Plant Name */}
            <div>
              <input
                {...register("plantName", { required: "Plant Name is required" })}
                placeholder="Plant Name"
                className={`input input-bordered w-full ${
                  errors.plantName ? "input-error" : ""
                }`}
              />
              {errors.plantName && (
                <p className="text-red-600 text-sm">{errors.plantName.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <select
                {...register("category", { required: "Category is required" })}
                className={`select select-bordered w-full ${
                  errors.category ? "select-error" : ""
                }`}
              >
                <option value="">Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
                <option value="Herb">Herb</option>
                <option value="Cactus">Cactus</option>
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Description"
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <input
                {...register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: "Enter a valid URL",
                  },
                })}
                placeholder="Image URL"
                className={`input input-bordered w-full ${
                  errors.image ? "input-error" : ""
                }`}
              />
              {errors.image && (
                <p className="text-red-600 text-sm">{errors.image.message}</p>
              )}
              {watch("image") && (
                <img
                  src={watch("image")}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded mt-2 border"
                />
              )}
            </div>

            {/* Watering Frequency */}
            <div>
              <input
                type="number"
                {...register("wateringFrequency", {
                  required: "Watering frequency is required",
                  min: { value: 1, message: "Must be at least 1 day" },
                })}
                placeholder="Watering Frequency (in days)"
                className={`input input-bordered w-full ${
                  errors.wateringFrequency ? "input-error" : ""
                }`}
              />
              {errors.wateringFrequency && (
                <p className="text-red-600 text-sm">{errors.wateringFrequency.message}</p>
              )}
            </div>

            {/* Care Level */}
            <div>
              <select
                {...register("careLevel", { required: "Care level is required" })}
                className={`select select-bordered w-full ${
                  errors.careLevel ? "select-error" : ""
                }`}
              >
                <option value="">Select Care Level</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Difficult">Difficult</option>
              </select>
              {errors.careLevel && (
                <p className="text-red-600 text-sm">{errors.careLevel.message}</p>
              )}
            </div>

            {/* Health Status */}
            <div>
              <select
                {...register("healthStatus", { required: "Health status is required" })}
                className={`select select-bordered w-full ${
                  errors.healthStatus ? "select-error" : ""
                }`}
              >
                <option value="">Select Health Status</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
              </select>
              {errors.healthStatus && (
                <p className="text-red-600 text-sm">{errors.healthStatus.message}</p>
              )}
            </div>

            {/* User Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={user?.displayName || "Anonymous"}
                  readOnly
                  className="input input-bordered w-full pl-10"
                />
                <FaUserCircle className="absolute left-3 top-3 text-gray-500" />
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full pl-10"
                />
                <FaUserCircle className="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>

            {/* Date & User Photo */}
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="relative">
                <input
                  type="text"
                  value={today}
                  readOnly
                  className="input input-bordered w-full pl-10"
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
              </div>
              {user?.photoURL && (
                <div className="text-center">
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-16 h-16 rounded-full border-2 border-green-500 mx-auto"
                  />
                  <p className="text-sm text-gray-600 mt-1">User Photo</p>
                </div>
              )}
            </div>

            {/* Hidden Inputs */}
            <input type="hidden" {...register("userEmail")} />
            <input type="hidden" {...register("userName")} />
            <input type="hidden" {...register("userPhoto")} />
            <input type="hidden" {...register("lastWateredDate")} />

            <button
              type="submit"
              disabled={!isValid || loading}
              className="btn btn-success w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <FaPlusCircle />
              )}
              {loading ? "Submitting..." : "Add Plant"}
            </button>
          </form>
        </div>
      </section>
      
    </>
  );
};

export default AddPlant;
