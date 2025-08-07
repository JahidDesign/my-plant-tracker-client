import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed.");
      console.error(error.message);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        You need to log in to view this page.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile | PlantCare Tracker</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=random`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-green-700 mb-1">
            {user.displayName || "Anonymous User"}
          </h2>
          <p className="text-gray-600">{user.email}</p>

          <NavLink to="/" className="text-green-600 hover:underline text-sm block mt-4">
            ← Back to Home
          </NavLink>

          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
