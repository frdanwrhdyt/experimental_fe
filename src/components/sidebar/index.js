import React, { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="relative h-full w-full flex bg-white">
      <div
        className={`h-full ease-in-out duration-300 ${
          isOpen ? "translate-x-0 w-3/12" : "-translate-x-full w-0"
        }`}
      ></div>
      <>
        {isOpen ? (
          <button
            className="flex w-[20px] h-full items-center hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-150 items-center cursor-pointer relative "
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineDoubleLeft size={20} />
          </button>
        ) : (
          <button
            className="flex w-[20px] h-full items-center hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-150 cursor-pointer relative "
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineDoubleRight size={20} />
          </button>
        )}
      </>
    </div>
  );
}
