// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// function capitalizeFirstLetter(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
// export default function Legend() {
//   const layers = useSelector((state) => state.overlay);

//   //   const [totalFeatures, setTotalFeatures] = useState([]);

// const fetchTotalFeatures = async () => {
//   const promises = layers.map((layer) => {
//     return axios
//       .get(
//         `${process.env.REACT_APP_GEOSERVER_URL}wfs?request=GetFeature&typename=${layer.layer}&service=WFS&version=2.0.0&resultType=hits`
//       )
//       .then((response) => {
//         const parse = new DOMParser();
//         const xmlDoc = parse.parseFromString(
//           response.data,
//           "application/xml"
//         );
//         const featureCollection = xmlDoc.getElementsByTagName(
//           "wfs:FeatureCollection"
//         )[0];
//         return featureCollection.getAttribute("numberMatched");
//       })
//       .catch((error) => {
//         console.error(`Error for layer ${layer.layer}:`, error);
//         return 0; // Mengembalikan nilai 0 jika terjadi kesalahan pada permintaan API
//       });
//   });
//   try {
//     const results = await Promise.all(promises);
//     setTotalFeatures(results);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
//   if (layers.layers.length) {
//     return (
//       <div className="w-full h-full p-5">
//         <div className="text-sm font-medium text-center">Legenda</div>

//         <div className="text-xs ">
//           {layers.layers.map((layer, index) => (
//             <div
//               className="w-full leaflet-control leaflet-control-custom flex items-center"
//               key={index}
//             >
//               <div className="w-2/3">
//                 <img
//                   src={`${process.env.REACT_APP_GEOSERVER_URL}wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layer.layer}`}
//                   alt={layer.name}
//                 />
//               </div>
//               <div className="w-1/3 font-medium">
//                 {layer.name.replace(/_/g, " ").toUpperCase()}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import "./legend.css";

function Legend() {
  const layerList = useSelector((state) => state.overlay);
  const [layers, setLayers] = useState([]);
  const [totalFeatures, setTotalFeatures] = useState([]);

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
      }
    }
  }, [layerList]);

  useEffect(() => {
    const fetchLegendData = async () => {
      const promises = layers.map((layer) => {
        return axios
          .get(
            `${process.env.REACT_APP_GEOSERVER_URL}wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=${layer.layer}&format=application/json`
          )
          .then((response) => response.data);
      });

      try {
        const results = await Promise.all(promises);
        setTotalFeatures(results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLegendData();
    if (!layers.length) setTotalFeatures([]);
  }, [layers]);
  //   console.log(JSON.stringify(totalFeatures));
  if (layers.length) {
    return (
      <div className="z-[1000] bg-white w-full">
        <div className="text-sm font-medium pb-2">Legend</div>
        <div className=" w-full grid grid-cols-3 gap-2 text-xs grid-flow-row-dense	">
          {totalFeatures.map((legendGroup, groupIndex) => (
            <div key={groupIndex} className=" w-full">
              {legendGroup.Legend.map((legend, legendIndex) => (
                <div
                  key={legendIndex}
                  className="flex space-x-1 w-fit justify-center"
                >
                  {legend.rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="w-fit">
                      {/* {JSON.stringify(rule.symbolizers[0].Point.url)} */}
                      {!!rule.symbolizers[0]?.Point ? (
                        <div className="flex items-center space-x-1 w-fit">
                          <img
                            src={rule.symbolizers[0].Point.url}
                            className="h-3"
                            alt={rule.name}
                          />
                          <div className="w-fit">{rule.name}</div>
                        </div>
                      ) : !!rule.symbolizers[0]?.Polygon ? (
                        <div className="flex items-center space-x-1 w-fit">
                          <div
                            className="h-3 w-3"
                            style={{
                              backgroundColor: rule.symbolizers[0].Polygon.fill,
                            }}
                          ></div>
                          <div className="w-fit">{rule.name}</div>
                        </div>
                      ) : !!rule.symbolizers[0]?.Line ? (
                        <div className="flex items-center space-x-1 w-fit">
                          <div
                            className="h-3 w-3"
                            style={{
                              backgroundColor: rule.symbolizers[0].Line.stroke,
                            }}
                          ></div>
                          <div className="w-fit">{rule.name}</div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Legend;

//   if (layers.length) {
//     return (
//       <div className="w-1/5 h-fit max-h-full p-5 absolute bg-white rounded-lg p-5 bottom-0 left-0 z-[1000] m-5">
//         <div className="text-sm font-medium text-center">Legenda</div>

//         <div className="text-xs ">
//           {layers.map((layer, index) => (
//             <div
//               className="w-full leaflet-control leaflet-control-custom flex items-center"
//               key={index}
//             >
//               <div className="legend-container p-4">
//                 {totalFeatures.map((legendGroup, groupIndex) => (
//                   <div key={groupIndex} className="mb-4">
//                     <div className="text-lg font-semibold mb-2">
//                       {legendGroup.layerName}
//                     </div>
//                     <div className="grid grid-cols-2 gap-2">
//                       {legendGroup.rules.map((rule, ruleIndex) => (
//                         <div
//                           key={ruleIndex}
//                           className="flex items-center space-x-2"
//                         >
//                           <div
//                             className="w-6 h-6"
//                             style={{
//                               backgroundColor: rule.symbolizers[0].Polygon.fill,
//                             }}
//                           ></div>
//                           <div>{rule.title}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
