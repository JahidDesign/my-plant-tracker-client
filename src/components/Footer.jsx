import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="px-4 divide-y bg-green-700 text-white">
      <div className="container mx-auto flex flex-col justify-between py-10 space-y-8 lg:flex-row lg:space-y-0">
        {/* Logo & Brand */}
        <div className="lg:w-1/3">
          <a href="#" className="flex justify-center lg:justify-start items-center space-x-3">
            {/* <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z" />
              </svg>
            </div> */}
                     <NavLink to="/" className="mb-8">
                       <img src="https://i.ibb.co.com/r2bgB9H8/plants.png" alt="Logo" className="h-12 md:h-16" />
                       </NavLink>
            {/* <span className="text-2xl font-semibold tracking-tight">PlantCare</span> */}
          </a>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 text-sm lg:w-2/3">
          {/* Product */}
          <div>
            <h3 className="uppercase font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Integrations</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="uppercase font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="uppercase font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">API Docs</a></li>
              <li><a href="#" className="hover:underline">Guides</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="uppercase font-semibold mb-3">Social</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" title="Facebook" className="hover:text-green-300 transition">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.2c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.873h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" title="Twitter" className="hover:text-green-300 transition">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775a4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184A4.92 4.92 0 0 0 16.616 3c-2.737 0-4.958 2.224-4.958 4.958 0 .388.044.765.128 1.124C7.728 8.865 4.1 6.864 1.671 3.889c-.427.734-.671 1.586-.671 2.494 0 1.722.876 3.241 2.21 4.134a4.934 4.934 0 0 1-2.248-.618v.062c0 2.404 1.71 4.406 3.976 4.857a4.996 4.996 0 0 1-2.239.084c.63 1.967 2.445 3.397 4.6 3.437a9.867 9.867 0 0 1-6.102 2.104c-.397 0-.788-.023-1.174-.067a13.936 13.936 0 0 0 7.548 2.212c9.056 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.637a10.012 10.012 0 0 0 2.457-2.548z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" title="Instagram" className="hover:text-green-300 transition">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm5.25-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5.25 2.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="py-6 text-sm text-center text-white">
        &copy; {new Date().getFullYear()} Tree Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
