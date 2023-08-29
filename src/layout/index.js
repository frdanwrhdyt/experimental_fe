import React, { useState } from "react";
import Navbar from "../components/navbar";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    const updatedValue = !isSidebarOpen;
    setIsSidebarOpen(updatedValue);
    localStorage.setItem("isSidebarOpen", updatedValue);
  };
  return (
    <div className="w-screen h-screen overflow-none">
      <div className="w-full h-[8%]">
        <Navbar />
      </div>
      <div className="w-full h-[92%] flex">
        <div
          className={`h-full ease-in-out duration-300 ${
            isSidebarOpen ? "translate-x-0 w-3/12" : "-translate-x-full w-0"
          }`}
        ></div>
        <>
          {isSidebarOpen ? (
            <button
              className="flex w-[20px] h-full items-center hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-150 items-center cursor-pointer relative "
              onClick={() => handleSidebarToggle()}
            >
              <AiOutlineDoubleLeft size={20} />
            </button>
          ) : (
            <button
              className="flex w-[20px] h-full items-center hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-150 cursor-pointer relative "
              onClick={() => handleSidebarToggle()}
            >
              <AiOutlineDoubleRight size={20} />
            </button>
          )}
        </>

        <div className={`h-full duration-150 w-full `}>{children}</div>
      </div>
    </div>
  );
}
