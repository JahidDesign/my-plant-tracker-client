import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../firebase.config";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const menuItems = [
    { to: "/", label: "Home", auth: "any" },
    { to: "/all-plants", label: "All Plants", auth: "any" },
    { to: "/add-plant", label: "Add Plant", auth: "private" },
    { to: "/add-blog", label: "Add Blog", auth: "private" },
    { to: "/my-plants", label: "My Plants", auth: "private" },
    { to: "/login", label: "Login", auth: "guest" },
    { to: "/signup", label: "Register", auth: "guest" },
  ];

  const filteredLinks = menuItems.filter((item) => {
    if (item.auth === "any") return true;
    if (item.auth === "private") return user;
    if (item.auth === "guest") return !user;
  });

  const NavItem = ({ to, label }) => (
    <NavLink
      to={to}
      onClick={() => setDrawerOpen(false)}
      className={({ isActive }) =>
        `block px-4 py-2 rounded hover:bg-green-600 ${
          isActive ? "font-bold underline" : ""
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
            <NavLink to="/" className="mb-8">
           <img src="https://i.ibb.co.com/r2bgB9H8/plants.png" alt="Logo" className="mt-2 h-12 md:h-16" />
           </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {filteredLinks.map(({ to, label }) => (
            <NavItem key={to} to={to} label={label} />
          ))}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8" />
                )}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-green-700 rounded shadow-md z-50">
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-green-100"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-green-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(!drawerOpen)} className="text-white">
            {drawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden bg-green-800 text-white px-4 pb-4 space-y-1">
          {filteredLinks.map(({ to, label }) => (
            <NavItem key={to} to={to} label={label} />
          ))}
          {user && (
            <>
              <NavLink
                to="/profile"
                onClick={() => setDrawerOpen(false)}
                className="block px-4 py-2 rounded hover:bg-green-600"
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                className="block w-full text-left mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
