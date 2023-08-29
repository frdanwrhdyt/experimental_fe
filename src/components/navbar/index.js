import React from "react";
import NavbarItems from "./navbarItems";
import logo from "../../logo.svg";

export default function Navbar() {
  return (
    <div className="w-full h-full flex items-center justify-between bg-white shadow-lg px-10">
      <div className="flex items-center">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div>
        <NavbarItems />
      </div>
    </div>
  );
}
