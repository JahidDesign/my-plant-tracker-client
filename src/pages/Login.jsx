import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed.");
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
        <title>Login | PlantCare Tracker</title>
        <link rel="icon" type="image/png" href="/plant-icon.png" />
      </Helmet>

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('https://i.ibb.co.com/jP3xWZn4/tea-Gradens.webp')" }} // 🔁 Update with your image path
      >
        <div className="bg-white bg-opacity-90 shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Login to Your Account</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded mt-1"
                type="email"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded mt-1"
                type="password"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Login
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
            New here?{" "}
            <Link to="/signup" className="text-green-600 font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
