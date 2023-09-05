import Navbar from "../components/navbar";
import TelkomsatLogo from "../assets/telkomsat logo.png";
import Legend from "../components/maps/legend/legend";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [buttonTable, setBottomTable] = useState(false);
  const location = useLocation();

  const toggleTable = () => {
    setBottomTable(!buttonTable);
  };

  return (
    <div className="w-screen h-screen overflow-none ">
      <div className="w-full h-[6%]">
        <Navbar />
      </div>
      <div
        className={`w-full ${
          location.pathname !== "/"
            ? "h-[96%]"
            : buttonTable
            ? "h-[53%]"
            : "h-[79%]"
        }`}
      >
        <Outlet />
      </div>
      {location.pathname === "/" && (
        <div
          className={`bg-white   duration-500 w-full ${
            buttonTable ? "h-[40%] transition-y-0" : "h-[14%] transition-y-full"
          }`}
        >
          <button
            className="w-full h-fit hover:bg-gray-100 hover:shadow-md duration-300"
            onClick={toggleTable}
          >
            open
          </button>
          <div
            className={`w-full px-4  text-4xl ${
              buttonTable
                ? "h-[60%] transition-y-0"
                : "hidden transition-y-full"
            }`}
            // hidden={!buttonTable}
          >
            ini table
          </div>
          <div
            className={`w-full flex items-center space-x-5 px-4  ${
              buttonTable ? "h-[40%]" : "h-full"
            } `}
          >
            <div className="w-3/12 flex space-x-2 items-center ">
              <div className="">
                <div className="font-semibold text-md">TelkomsatGIS</div>
                <div className="text-xs">Market Intelligent</div>
              </div>
              <img src={TelkomsatLogo} className="w-40" alt="logo telkomsat" />
              <Legend />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
