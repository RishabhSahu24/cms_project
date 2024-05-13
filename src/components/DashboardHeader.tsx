import React, { useState } from "react";
import { AddButtonProps, DashboardHeaderProps } from "./types";
import { useNavigate } from "react-router-dom";

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ handleSearch }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add");
  };

  return (
    <div className="container items-center flex rounded-3xl py-4 px-6 shadow bg-gray-800 text-white relative">
      {/* Title */}
      <Title />

      {/* Search Form */}
      <SearchForm handleSearch={handleSearch} />

      {/* Add Button */}
      <AddButton handleClick={handleClick} />
    </div>
  );
};

// Title component
const Title: React.FC = () => {
  return <h1 className="text-xl font-semibold mr-auto">Dashboard</h1>;
};

const SearchForm: React.FC<{ handleSearch: (value: string) => void }> = ({
  handleSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
    console.log("Searching for:", searchValue);
    setSearchValue("");
  };

  return (
    <form
      className="py-1 px-6 w-1/2 rounded-full  text-gray-800 bg-gray-50 border flex focus-within:border-gray-300"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search anything"
        className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
        name="topic"
        value={searchValue}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium border transition ease-in-out duration-150 text-base bg-black text-white border-transparent py-1.5 -mr-3"
      >
        Search
      </button>
    </form>
  );
};

// AddButton component
const AddButton: React.FC<AddButtonProps> = ({ handleClick }) => {
  return (
    <button
      id="addnewbutton"
      className="ml-auto bg-indigo-600 hover:bg-indigo-700 focus:ring-4 w-40 focus:ring-indigo-300 focus:outline-none font-medium rounded-lg justify-center text-sm px-5 py-2.5 text-white flex items-center"
      type="button"
      onClick={handleClick}
    >
      Add +
    </button>
  );
};

export default DashboardHeader;
