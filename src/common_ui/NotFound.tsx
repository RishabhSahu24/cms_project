import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center text-5xl justify-center px-6 py-4 font-bold text-gray-400">
      <svg
        className="w-12 h-12 mr-4 text-gray-300"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
      No data found.
    </div>
  );
};

export default NotFound;
