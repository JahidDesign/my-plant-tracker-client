import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { auth } from "../firebase.config";
import { useAuth } from "../context/AuthContext";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_CACHE = 5;

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (cached) {
      setRecentSearches(JSON.parse(cached));
    }
  }, []);

  const saveSearchQuery = (query) => {
    if (!query) return;

    // Avoid duplicates, newest first
    const updated = [query, ...recentSearches.filter((q) => q !== query)];

    // Limit max cache size
    if (updated.length > MAX_CACHE) updated.pop();

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      setProfileOpen(false);
      setDrawerOpen(false);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const handleSearch = (e) => {
  e.preventDefault();
  const key = searchQuery.trim();
  if (!key) return;

  saveSearchQuery(key);

  navigate(`/search?query=${encodeURIComponent(key)}`);

  setSearchQuery("");
  setDrawerOpen(false);
  setProfileOpen(false);
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
          <img
            src="https://i.ibb.co.com/r2bgB9H8/plants.png"
            alt="Logo"
            className="mt-2 h-12 md:h-16"
          />
        </NavLink>

        {/* Search Bar (centered desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 justify-center mx-4 relative"
          role="search"
          autoComplete="off"
        >
          <input
            type="search"
            value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            placeholder="Search plants..."
             className="w-full max-w-md px-4 py-2 border-white rounded-full text-green-900 bg-white placeholder-green-500 border focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-sm transition duration-300"
            aria-label="Search plants"
            list="recent-searches-list"
          />
          <datalist id="recent-searches-list">
            {recentSearches.map((q, i) => (
              <option key={i} value={q} />
            ))}
          </datalist>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-900"
            aria-label="Submit search"
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {filteredLinks.map(({ to, label }) => (
            <NavItem key={to} to={to} label={label} />
          ))}
          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="User profile menu"
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
                    type="button"
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
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="text-white"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            {drawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden bg-green-800 text-white px-4 pb-4 space-y-1">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 mb-2"
            role="search"
            autoComplete="off"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              placeholder="Search plants..."
              className="flex-grow px-4 py-2 border-white rounded-full text-green-900 bg-white placeholder-green-500 border focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-sm transition duration-300"
              aria-label="Search plants"
              list="recent-searches-list-mobile"
            />
            <datalist id="recent-searches-list-mobile">
              {recentSearches.map((q, i) => (
                <option key={i} value={q} />
              ))}
            </datalist>
            <button
              type="submit"
              className="px-3 py-2 bg-green-600 rounded hover:bg-green-700"
              aria-label="Submit search"
            >
              <FaSearch />
            </button>
          </form>
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
                type="button"
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
