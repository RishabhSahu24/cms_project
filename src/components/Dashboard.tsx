import React, { useRef, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import ProductTable from "./ProductTable";

const Dashboard: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        const dropdown = document.getElementById("dropdown");
        if (dropdown && !dropdown.contains(event.target as Node)) {
          dropdown.classList.add("hidden");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  return (
    <div className="flex-grow mt-20 lg:pl-64">
      <div className="container px-4 mx-auto">
        <DashboardHeader toggleDropdown={toggleDropdown} />
        <ProductTable />
      </div>
    </div>
  );
};

export default Dashboard;
