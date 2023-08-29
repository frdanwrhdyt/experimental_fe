import React, { useRef, useEffect } from "react";
import {
  MapContainer,
  LayersControl,
  ScaleControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Wms from "./components/maps/wms";

import BaseTileLayer from "./components/maps/baseLayer";
import LeafletRuler from "./components/maps/ruler/LeafletRuler";

export default function App() {
  const mapRef = useRef();
  const wmsRef = useRef();
  useEffect(() => {
    console.log(wmsRef);
  }, [wmsRef]);
  return (
    <div className="w-full h-full">
      <MapContainer center={[-6.2, 107]} zoom={[5]} ref={mapRef}>
        <LayersControl position="topright" className="leaflet-control-layers">
          <BaseTileLayer />
          <Wms />
          <ScaleControl position="bottomright" />
        </LayersControl>
        <LeafletRuler />
      </MapContainer>
    </div>
  );
}
