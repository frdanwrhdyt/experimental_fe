import { useEffect, useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";
import { useSelector } from "react-redux";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function FeatureInfo({ map }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const layerList = useSelector((state) => state.overlay);
  const [layers, setLayers] = useState([]);
  const [data, setData] = useState([]);
  const [latlng, setLatlng] = useState([]);
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [keyData, setKeyData] = useState([]);

  const handleSidebarToggle = () => {
    const updatedValue = !isSidebarOpen;
    setIsSidebarOpen(updatedValue);
    localStorage.setItem("isSidebarOpen", updatedValue);
  };

  useEffect(() => {
    if (layerList) {
      const filteredLayers = layerList.layers.filter(
        (item) => item.status === true
      );
      if (filteredLayers.length) {
        setLayers(filteredLayers);
      }
    }
  }, [layerList]);

  useMapEvents({
    async click(e) {
      setKeyData([]);
      setData([]);
      setLatlng(e.latlng);
      const w = map.current._size.x;
      const h = map.current._size.y;
      const { x } = e.containerPoint;
      const { y } = e.containerPoint;

      const bbox = e.target.getBounds().toBBoxString().toString();

      const fetchPromises = layers.map(async (layer) => {
        const params = {
          service: "WMS",
          version: "1.1.1",
          request: "GetFeatureInfo",
          layers: layer.layer,
          info_format: "application/json",
          query_layers: layer.layer,
          width: w,
          height: h,
          x: parseInt(x),
          y: parseInt(y),
          bbox,
        };

        const url = `${
          process.env.REACT_APP_GEOSERVER_URL
        }wms?${new URLSearchParams(params)}`;
        if (layers[0].status === true) {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (result.features.length) {
              return { lay: layer.layer, prop: result.features[0].properties };
            }
            return [];
          } catch (error) {
            console.error("Error:", error);
            return [];
          }
        }
      });

      try {
        const results = await Promise.all(fetchPromises);
        const flattenedResults = results.flat();
        const extractedData = flattenedResults.map((obj) => obj.prop);
        const extractedLayer = flattenedResults.map((obj) => obj.lay);

        setData(extractedData);
        setSelectedLayers(extractedLayer);
        setIsSidebarOpen(true);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <>
      {data.length && (
        <div className="w-fit h-full absolute bottom-0 left-0 z-[1000]">
          {data.map((d, i) => (
            <table className="table-auto w-fit" key={i}>
              <tbody>
                {Object.keys(d).map((k, x) => (
                  <tr key={x}>
                    <td>{k}</td>
                    <td>{d[k]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      )}
    </>
    //   <div className="w-fit h-full z-[1000] min-z-[20px] absolute top-0 left-0 bg-white flex p-5">
    // <>
    //   <div
    //     className={`h-full ease-in-out duration-300  top-0 left-0 z-[1000] bg-white ${
    //       isSidebarOpen
    //         ? "translate-x-0 w-3/12 absolute"
    //         : "-translate-x-full w-0 relative"
    //     } `}
    //   >
    //     <div
    //       className={`h-full ${
    //         isSidebarOpen
    //           ? "translate-x-0 w-full"
    //           : "-translate-x-full hidden w-0"
    //       }`}
    //     >
    //       {data.map((d, i) => (
    //         <table className="table-auto w-fit" key={i}>
    //           <tbody>
    //             {Object.keys(d).map((k, x) => (
    //               <tr key={x}>
    //                 <td>{k}</td>
    //                 <td>{d[k]}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       ))}
    //     </div>
    //   </div>
    //   <div>
    //     {isSidebarOpen ? (
    //       <button
    //         className="flex w-[20px] h-full items-center hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-150 items-center cursor-pointer  relative top-0 left-0 z-[1000]"
    //         onClick={() => handleSidebarToggle()}
    //       >
    //         <AiOutlineDoubleLeft size={20} />
    //       </button>
    //     ) : (
    //       <button
    //         className="flex w-[20px] h-full items-center hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-150 cursor-pointer  relative top-0 left-0 z-[1000]"
    //         onClick={() => handleSidebarToggle()}
    //       >
    //         <AiOutlineDoubleRight size={20} />
    //       </button>
    //     )}
    //   </div>
    // </>
    //   </div>
  );
}
