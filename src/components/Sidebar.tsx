import React from "react";
import { SidebarProps } from "./types";

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800 flex flex-col justify-between">
        <div className="space-y-2 font-medium">
          <ul>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H12.75V5.997c0-.516-.411-.997-.897-.997H9.146a.997.997 0 00-.896.997V11H4.025a.999.999 0 00-.707 1.707l6.25 6.25a1 1 0 001.414 0l6.25-6.25A1 1 0 0016.975 11z" />
                </svg>
                <span className="ms-2">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M15.997 0H1.997C.895 0 0 .895 0 1.997v17.995c0 1.102.895 1.997 1.997 1.997h13.995c1.102 0 1.997-.895 1.997-1.997V1.997C17.994.895 17.099 0 15.997 0zM4 5.001a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V6.001a1 1 0 00-1-1H4zm2 2v6h4v-6H6zm10 12a1 1 0 01-1 1H3a1 1 0 01-1-1V2h2v1a1 1 0 002 0V2h8v1a1 1 0 002 0V2h2v15z" />
                </svg>
                <span className="ms-2">Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M21 10.5c0-4.136-3.364-7.5-7.5-7.5s-7.5 3.364-7.5 7.5c0 3.14 1.956 5.786 4.725 6.858l-1.705 3.41L12 21l3.48-1.232-1.705-3.41C19.044 16.285 21 13.64 21 10.5zm-7.5-5c3.037 0 5.5 2.463 5.5 5.5 0 2.84-2.146 5.768-5.5 8.521-3.354-2.753-5.5-5.681-5.5-8.521 0-3.037 2.463-5.5 5.5-5.5zm-2.5 9h-3v-2h3v2zm0-3h-3V7h3v4z" />
                </svg>
                <span className="ms-2">Products</span>
              </a>
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-lg shadow-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
