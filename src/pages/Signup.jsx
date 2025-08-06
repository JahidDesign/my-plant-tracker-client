import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    return password.length >= 6 && hasUpper && hasLower;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = form;

    if (!validatePassword(password)) {
      toast.error("Password must include uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
      });

      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Signup failed.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | PlantCare Tracker</title>
        <link rel="icon" type="image/png" href="/plant-icon.png" />
      </Helmet>

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/YGzLzxY/What-are-some-hidden-gems-off-the-beaten-path-in-Sylhet.jpg')",
        }}
      >
        <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded mt-1 focus:outline-green-500"
                type="text"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded mt-1 focus:outline-green-500"
                type="email"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Photo URL</label>
              <input
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded mt-1 focus:outline-green-500"
                type="url"
                placeholder="Photo URL (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded mt-1 focus:outline-green-500"
                type="password"
                placeholder="Password"
              />
              <p className="text-xs text-gray-600 mt-1">
                Must include uppercase, lowercase, and be at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">or</p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Continue with Google
            </button>
          </div>

          <div className="mt-4 text-center text-sm">
            Already registered?{" "}
            <Link to="/login" className="text-green-700 font-medium hover:underline">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
