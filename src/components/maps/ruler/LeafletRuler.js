import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./src/leaflet-ruler";
import "./src/leaflet-ruler.css";

export default function LeafletRuler() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    L.control.ruler().addTo(map);
  }, [map]);
  return null;
}
