import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // Import Axios
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { AiOutlineFile } from "react-icons/ai";

export default function TableDetail() {
  const [data, setData] = useState([]);
  const { auth } = useAuth();
  const { tableName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Menggunakan Axios untuk mengambil data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/table/${tableName}?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [tableName, currentPage, auth.accessToken]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {data.length > 0 && (
        <div className="p-4 bg-gray-100 overflow-x-auto overflow-y-auto w-full h-full">
          <div className="w-fit p-5 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Tabel {tableName}</h2>
            <table className="max-w-full table-auto">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key, index) => (
                    <th
                      key={index}
                      className="px-6 py-3  text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    {Object.keys(d).map((key, j) => (
                      <td
                        key={d["id"]}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-xs"
                      >
                        {key === "geom" || key === "GEOM" ? (
                          d[key]?.coordinates.length > 2 ||
                          Array.isArray(d[key]?.coordinates[0]) ? (
                            <AiOutlineFile />
                          ) : (
                            `[${d[key]?.coordinates.join(", ")}]`
                          )
                        ) : (
                          d[key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// key === "geom" && d[key].length > 2 ? (
//     <AiOutlineFile /> // Gantilah IconComponent dengan komponen ikon yang sesuai
//   ) :
// [${d[key]?.coordinates.join(", ")}]
