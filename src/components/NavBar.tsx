import React from "react";
import { NavBarProps } from "./types";

const NavBar: React.FC<NavBarProps> = (props) => {
  console.log("User", props.userDetails);

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-800 border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold  text-white">My App</span>
          <div className="flex items-center space-x-3">
            <span className="text-gray-300">
              {props.userDetails?.firstName
                ? props.userDetails?.firstName
                : "User Name Not Found"}
              &nbsp;
              {props.userDetails?.lastName}
            </span>
            <img
              src="https://via.placeholder.com/150"
              alt={props.userDetails?.firstName}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
