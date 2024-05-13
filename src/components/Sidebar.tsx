import React, { useState } from "react";
import { SidebarProps } from "./types";

const Sidebar: React.FC<SidebarProps> = ({ handleLogout, applyFilters }) => {
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilters(color, category);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800 flex flex-col justify-between">
        <div className="space-y-2 font-medium">
          <h2 className="font-bold leading-9 text-3xl tracking-tight text-white">
            Filters
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="color" className="text-white">
                  Color:
                </label>
                <select
                  id="color"
                  name="color"
                  value={color}
                  onChange={handleColorChange}
                  className="block w-full py-2 px-2 mt-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <option value="">Select Color</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Brown">Brown</option>
                  <option value="Grey">Grey</option>
                  <option value="Indigo">Indigo</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="text-white">
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="block w-full px-2 py-2 mt-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <option value="">Select Category</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Laptop PC">Laptop PC</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg shadow-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
