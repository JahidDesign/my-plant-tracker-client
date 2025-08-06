import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const { pathname } = useLocation();

  // Define routes where Navbar and Footer should be hidden
  const hideNavFooterRoutes = ["/login", "/signup","/404"];

  // Check if current route should hide Navbar and Footer
  const shouldHideNavFooter = hideNavFooterRoutes.some(route =>
    pathname.startsWith(route)
  );

  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen mozilla-headline">
        {!shouldHideNavFooter && <Navbar />}

        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>

        {!shouldHideNavFooter && <Footer />}
      </div>
    </AuthContextProvider>
  );
};

export default App;
