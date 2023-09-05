import Navbar from "../components/navbar";
import TelkomsatLogo from "../assets/telkomsat logo.png";
import Legend from "../components/maps/legend/legend";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const [buttonTable, setBottomTable] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();

  const toggleTable = () => {
    setBottomTable(!buttonTable);
  };
  useEffect(() => {}, []);

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
            className={`w-full flex items-center space-x-5 px-4 absolute bottom-0 ${
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

const DataTable = ({ data, currentPage, totalPages, onPageChange }) => {
  const itemsPerPage = 20;

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              {Object.keys(item).map((key) => (
                <td className="px-6 py-4 whitespace-nowrap" key={key}>
                  {key === "geom"
                    ? `[${item[key].coordinates.join(", ")}]`
                    : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  } px-3 py-2 rounded-lg text-sm font-medium`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
