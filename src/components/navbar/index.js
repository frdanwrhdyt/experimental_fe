import React from "react";
import NavbarItems from "./navbarItems";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full h-full flex items-center justify-between bg-white shadow-lg px-10">
      <div className="flex items-center ">
        <div className="flex items-center space-x-10">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-14 aspect-square	" />
          </Link>
          {/* <div className="font-semibold">PETAin</div> */}
          <div className="border py-1 px-2 border-red-600 rounded-full text-xs text-red-600 bg-white hover:bg-red-600  hover:text-white duration-200">
            Experimental Version
          </div>
        </div>
      </div>
      <div>
        <NavbarItems />
      </div>
    </div>
  );
}
