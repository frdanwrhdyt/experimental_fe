import React, { useRef } from "react";
import {
  MapContainer,
  LayersControl,
  ScaleControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Wms from "../components/maps/wms/wms";
import FeatureInfo from "../components/maps/fetureInfo/featureInfo";
import BaseTileLayer from "../components/maps/baseLayer";
import LeafletRuler from "../components/maps/ruler/LeafletRuler";

export default function Index() {
  const mapRef = useRef();

  return (
    <div className="w-full h-full">
      <MapContainer center={[0.9592, 116.699]} zoom={[5]} ref={mapRef}>
        <FeatureInfo map={mapRef} />

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
