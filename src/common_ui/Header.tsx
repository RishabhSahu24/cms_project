import React from "react";
import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <div className="container flex items-center justify-center text-3xl rounded-3xl py-4 px-6 shadow bg-black text-white relative">
      {heading}
    </div>
  );
};

export default Header;
