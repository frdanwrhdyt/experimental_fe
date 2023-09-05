import React, { useEffect } from "react";
import { WMSTileLayer } from "react-leaflet";
import { LayersControl } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  addOverlay,
  updateOverlayStatus,
} from "../../../actions/overlay.action";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const { Overlay } = LayersControl;

export default function Wms() {
  const { auth } = useAuth();
  const layers = useSelector((state) => state.overlay);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}mylayers`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const res = response.data.data;

        const indexOfDesa = res.findIndex(
          (layer) => layer.layer === "tsat_geo:desa"
        );

        if (indexOfDesa > -1) {
          const desaLayer = res.splice(indexOfDesa, 1)[0]; // Remove and store the "tsat_geo:desa" layer
          res.unshift(desaLayer); // Add it back to the beginning
        }

        const layerName = res.map((l) => {
          return {
            layerName: l.layer.replace("tsat_geo:", ""),
            layer: l.layer,
          };
        });

        const layerObjects = layerName.map((layer) => ({
          name: layer.layerName,
          layer: layer.layer,
          status: false,
        }));

        dispatch(addOverlay(layerObjects));
      } catch (error) {
        console.error("Error fetching layer data:", error);
      }
    };

    fetchData();
  }, [auth.accessToken, dispatch]);

  function handleChange(e, layerName) {
    const isAddEvent = e.type === "add";
    dispatch(updateOverlayStatus(layerName, isAddEvent));
  }

  const renderOverlay = (layerNames) =>
    layerNames.map((layerName, i) => (
      <Overlay
        name={`DATA ${layerName.name.replace(/_/g, " ").toUpperCase()}`}
        key={i}
      >
        <WMSTileLayer
          url={`${process.env.REACT_APP_GEOSERVER_URL}wms?`} // Ganti dengan URL server WMS Anda
          layers={layerName.name}
          opacity={1}
          transparent
          format="image/png"
          eventHandlers={{
            add: (e) => handleChange(e, layerName.name, layerName.layer),
            remove: (e) => handleChange(e, layerName.name, layerName.layer),
          }}
        />
      </Overlay>
    ));

  return <>{!!layers.layers && renderOverlay(layers.layers)}</>;
}
// import React, { useEffect, useState } from "react";
// import { WMSTileLayer } from "react-leaflet";
// import { LayersControl } from "react-leaflet";
// import { useSelector, useDispatch } from "react-redux";
// import { addOverlay, removeOverlay } from "../../../actions/overlay.action";
// import axios from "axios";

// const { Overlay } = LayersControl;

// export default function Wms() {
//   const token = useSelector((state) => state.auth);
//   const layers = useSelector((state) => state.overlay);
//   const [myLayers, setMyLayers] = useState();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!!token.token) {
//       axios
//         .get(`${process.env.REACT_APP_BACKEND_BASE_URL}mylayers`, {
//           headers: {
//             Authorization: `Bearer ${token.token}`,
//           },
//         })
//         .then((response) => {
//           const layerData = response.data.data.map((layer) =>
//             layer.layer.replace("tsat_geo:", "")
//           );

//           const layerObjects = layerData.map((layer) => ({
//             layer,
//             status: false,
//           }));
//           dispatch(addOverlay(layerObjects));
//           setMyLayers(layerObjects);
//         })
//         .catch((error) => console.error("Error fetching layer data:", error));
//     }
//     axios
//       .get(`${process.env.REACT_APP_BACKEND_BASE_URL}common-layers`)
//       .then((response) => {
//         const commonLayerData = response.data.map((item) => item.layer);
//         const indexOfDesa = commonLayerData.indexOf("tsat_geo:desa");

//         if (indexOfDesa > -1) {
//           commonLayerData.splice(indexOfDesa, 1); // Hapus dari posisi semula
//           commonLayerData.unshift("tsat_geo:desa"); // Tambahkan ke indeks 0
//         }

//         const cleanedCommonLayer = commonLayerData.map((layer) =>
//           layer.replace("tsat_geo:", "")
//         );

//         const layerObjects = cleanedCommonLayer.map((layer) => ({
//           layer,
//           status: false,
//         }));

//         dispatch(addOverlay(layerObjects));
//       })
//       .catch((error) =>
//         console.error("Error fetching common layer data:", error)
//       );
//   }, [dispatch, token.token]);
//   useEffect(() => {
//     if (!!token.token === false && !!myLayers) {
//       dispatch(removeOverlay(myLayers));
//       console.log(!!token.token, myLayers);
//       setMyLayers();
//     }
//   }, [dispatch, myLayers, token.token]);

//   function handleChange(e, layerName) {
//     console.log(e.type, layerName);
//   }

//   const renderOverlay = (layerNames) =>
//     layerNames.map((layerName, i) => (
//       <Overlay name={layerName.layer} key={i}>
//         <WMSTileLayer
//           url={`${process.env.REACT_APP_GEOSERVER_URL}wms?`} // Ganti dengan URL server WMS Anda
//           layers={layerName.layer}
//           opacity={1}
//           transparent
//           format="image/png"
//           eventHandlers={{
//             add: (e) => handleChange(e, layerName.layer),
//             remove: (e) => handleChange(e, layerName.layer),
//           }}
//         />
//       </Overlay>
//     ));

//   return <>{!!layers.layers && renderOverlay(layers.layers)}</>;
// }
