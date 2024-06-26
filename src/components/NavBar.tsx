import React from "react";
import { NavBarProps } from "./types";
import { Link } from "react-router-dom";

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex gap-5 justify-center items-center"
          >
            <img
              className="w-10 h-10 rounded-full"
              src="/logo.png"
              alt="Your Company"
            />

            <h2 className="font-bold text-center flex items-center leading-9 text-3xl tracking-tight text-white">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                GeekyAnts
              </span>
            </h2>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-gray-300 text-3xl">
              {props.userDetails?.firstName
                ? props.userDetails?.firstName.charAt(0).toUpperCase() +
                  props.userDetails?.firstName.slice(1)
                : "User Name Not Found"}
              &nbsp;
              {props.userDetails?.lastName
                ? props.userDetails?.lastName.charAt(0).toUpperCase() +
                  props.userDetails?.lastName.slice(1)
                : ""}
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
