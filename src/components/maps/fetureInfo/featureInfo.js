// import React, { useEffect, useState } from "react";
// import { Popup, useMapEvents } from "react-leaflet";
// import { useSelector } from "react-redux";

// export default function FeatureInfo({ map }) {
//   const layerList = useSelector((state) => state.overlay);
//   const featureList = useSelector((state) => state.featureInfo);
//   const [layers, setLayers] = useState([]);

//   const [data, setData] = useState([]);
//   const [latlng, setLatlng] = useState([]);
//   const [keyData, setKeyData] = useState([]);
//   const [selectedLayers, setSelectedLayers] = useState([]);
//   const [edit, setEdit] = useState(false);

//   useEffect(() => {
//     if (layerList) {
//       const filteredLayers = layerList.layers.filter(
//         (item) => item.status === true
//       );
//       if (filteredLayers.length) {
//         setLayers(filteredLayers);
//       }
//     }
//   }, [layerList]);

//   useMapEvents({
//     async click(e) {
//       setKeyData([]);
//       setData([]);
//       setLatlng(e.latlng);
//       const w = map.current._size.x;
//       const h = map.current._size.y;
//       const { x } = e.containerPoint;
//       const { y } = e.containerPoint;

//       const bbox = e.target.getBounds().toBBoxString().toString();

//       const fetchPromises = layers.map(async (layer) => {
//         const params = {
//           service: "WMS",
//           version: "1.1.1",
//           request: "GetFeatureInfo",
//           layers: layer.layer,
//           info_format: "application/json",
//           query_layers: layer.layer,
//           width: w,
//           height: h,
//           x: parseInt(x),
//           y: parseInt(y),
//           bbox,
//         };

//         const url = `${
//           process.env.REACT_APP_GEOSERVER_URL
//         }wms?${new URLSearchParams(params)}`;
//         if (layers[0].status === true) {
//           try {
//             const response = await fetch(url);
//             if (!response.ok) {
//               throw new Error("Network response was not ok");
//             }
//             const result = await response.json();
//             if (result.features.length) {
//               return { lay: layer.layer, prop: result.features[0].properties };
//             }
//             return [];
//           } catch (error) {
//             console.error("Error:", error);
//             return [];
//           }
//         }
//       });

//       try {
//         const results = await Promise.all(fetchPromises);
//         const flattenedResults = results.flat();
//         const extractedData = flattenedResults.map((obj) => obj.prop);
//         const extractedLayer = flattenedResults.map((obj) => obj.lay);

//         setData(extractedData);
//         setSelectedLayers(extractedLayer);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     },
//   });
//   const handleEditClick = () => {
//     setEdit(!edit);
//   };

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         // Tutup popup saat tombol "Esc" ditekan
//         setData([]);
//         setLatlng([]);
//         setEdit(false);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   if (data.length) {
//     return (
//       <Popup
//         position={[latlng.lat, latlng.lng]}
//         className="w-fit h-fit z-[20] "
//         autoClose={false}
//       >
//         {/* <div className="absolute top-0 left-0 p-2">
//           <button onClick={handleEditClick}>Edit</button>
//         </div> */}
//         <div className="text-sm font-medium text-center">Keterangan</div>
//         <div className="flex flex-col space-y-5 divide-y">
//           {/* {edit
//             ? data.map((d, i) => (
//                 <>
//                   <table className="table-auto w-fit" key={i}>
//                     <tbody>
//                       {Object.keys(d).map((k, x) => (
//                         <tr key={x}>
//                           <td>{k}</td>
//                           <td>
//                             <input
//                               type="text"
//                               value={d[k]}
//                               onChange={(e) => {
//                                 const updatedData = [...data];
//                                 updatedData[i][k] = e.target.value;
//                                 setData(updatedData);
//                               }}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <button>Submit</button>
//                 </>
//               ))
//             :  */}
//           {data.map((d, i) => (
//             <table className="table-auto w-fit" key={i}>
//               <tbody>
//                 {Object.keys(d).map((k, x) => (
//                   <tr key={x}>
//                     <td>{k}</td>
//                     <td>{d[k]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ))}
//         </div>
//       </Popup>
//     );
//   }
// }

import React, { useEffect, useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";
import { useSelector } from "react-redux";

export default function FeatureInfo() {
  const layerList = useSelector((state) => state.overlay);
  const [layers, setLayers] = useState([]);
  const [data, setData] = useState([]);
  const [latlng, setLatlng] = useState([]);
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (layerList) {
      const filteredLayers = layerList.layers.filter(
        (item) => item.status === true
      );
      if (filteredLayers.length) {
        setLayers(filteredLayers);
      } else {
        // Handle when no layers have status true
        setLayers([]);
        setData([]);
      }
    }
  }, [layerList]);

  useMapEvents({
    async click(e) {
      setEdit(false);
      setLatlng(e.latlng);
      const w = e.target._size.x;
      const h = e.target._size.y;
      const { x, y } = e.containerPoint;
      const bbox = e.target.getBounds().toBBoxString().toString();

      const fetchPromises = layers.map(async (layer) => {
        if (layer.status === true) {
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
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleEditClick = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setData([]);
        setLatlng([]);
        setEdit(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (data.length) {
    return (
      <Popup
        position={[latlng.lat, latlng.lng]}
        className="w-fit h-fit z-[20]"
        autoClose={false}
      >
        <div className="text-sm font-medium text-center">Keterangan</div>
        <div className="flex flex-col space-y-5 divide-y">
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
      </Popup>
    );
  } else {
    return null;
  }
}
