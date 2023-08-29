import React, { useEffect, useState } from "react";
import { WMSTileLayer } from "react-leaflet";
import { LayersControl } from "react-leaflet";
import axios from "axios";

const { Overlay } = LayersControl;

export default function Wms() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [layerData, setLayerData] = useState([]);
  const [commonLayer, setCommonLayer] = useState([]);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch layer data from backend when isAuthenticated is true
      axios
        .get("http://localhost:8000/mylayers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setLayerData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching layer data:", error);
        });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    axios.get("http://localhost:8000/common-layers").then((response) => {
      const commonLayerNames = response.data.map((item) => item.name);
      setCommonLayer(commonLayerNames);
    });
  });
  if (isAuthenticated) {
    return (
      <>
        {layerData.map((layerName, i) => (
          <Overlay name={layerName} key={i}>
            <WMSTileLayer
              url={`${process.env.REACT_APP_GEOSERVER_URL}wms?`} // Replace with your WMS server URL
              layers={layerName} // Use the layer name from layerData
              opacity={1}
              transparent
              format="image/png"
            />
          </Overlay>
        ))}
        {commonLayer.map((layerName, i) => (
          <Overlay name={layerName} key={i}>
            <WMSTileLayer
              url={`${process.env.REACT_APP_GEOSERVER_URL}wms?`} // Replace with your WMS server URL
              layers={layerName} // Use the layer name from layerData
              opacity={1}
              transparent
              format="image/png"
            />
          </Overlay>
        ))}
      </>
    );
  } else {
    return (
      <>
        {commonLayer.map((layerName, i) => (
          <Overlay name={layerName} key={i}>
            <WMSTileLayer
              url={`${process.env.REACT_APP_GEOSERVER_URL}wms?`} // Replace with your WMS server URL
              layers={layerName} // Use the layer name from layerData
              opacity={1}
              transparent
              format="image/png"
            />
          </Overlay>
        ))}
      </>
    );
  }
}
