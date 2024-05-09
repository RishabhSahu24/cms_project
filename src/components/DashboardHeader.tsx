import React, { useRef } from "react";
import { DashboardHeaderProps } from "./types";

// DashboardHeader component
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  toggleDropdown,
}) => {
  return (
    <div className="container items-center flex rounded-3xl py-4 px-6 shadow bg-gray-800 text-white relative">
      {/* Title */}
      <Title />

      {/* Search Form */}
      <SearchForm />

      {/* Add Button */}
      <AddButton />

      {/* Filter Button */}
      <FilterButton toggleDropdown={toggleDropdown} />

      {/* Dropdown */}
      <Dropdown toggleDropdown={toggleDropdown} />
    </div>
  );
};

// Title component
const Title: React.FC = () => {
  return <h1 className="text-xl font-semibold mr-auto">Dashboard</h1>;
};

// SearchForm component
const SearchForm: React.FC = () => {
  return (
    <form className="py-1 px-6 w-1/2 rounded-full  text-gray-800 bg-gray-50 border flex focus-within:border-gray-300">
      <input
        type="text"
        placeholder="Search anything"
        className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
        name="topic"
      />
      <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium border transition ease-in-out duration-150 text-base bg-black text-white border-transparent py-1.5 -mr-3">
        Search
      </button>
    </form>
  );
};

// AddButton component
const AddButton: React.FC = () => {
  return (
    <button
      id="addnewbutton"
      className="ml-auto bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-white flex items-center"
      type="button"
    >
      Add
    </button>
  );
};

// FilterButton component
const FilterButton: React.FC<{ toggleDropdown: () => void }> = ({
  toggleDropdown,
}) => {
  return (
    <button
      id="dropdownDefaultButton"
      onClick={toggleDropdown}
      className="ml-auto bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-white flex items-center"
      type="button"
    >
      Filter
      <svg
        className="w-4 h-4 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
};

// Dropdown component
const Dropdown: React.FC<{ toggleDropdown: () => void }> = ({
  toggleDropdown,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="dropdown"
      ref={dropdownRef}
      className="z-10 hidden  divide-y divide-gray-100 rounded-lg shadow bg-gray-700 absolute top-16 right-6"
    >
      <ul className="py-2 text-sm text-gray-200">
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            Earnings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DashboardHeader;
