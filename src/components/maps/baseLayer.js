import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const { BaseLayer } = LayersControl;

export default function BaseTileLayer() {
  return (
    <>
      <BaseLayer checked name="Standar View">
        <TileLayer
          url={process.env.REACT_APP_BASE_LAYER_STANDAR}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
      </BaseLayer>
      <BaseLayer name="Satellite View">
        <TileLayer
          url={
            process.env.REACT_APP_MAPTILER_LAYER_SATELLITE +
            process.env.REACT_APP_MAPTILER_API_KEY
          }
          attribution='Map data &copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
        />
      </BaseLayer>
      <BaseLayer name="Hill View">
        <TileLayer
          url={
            process.env.REACT_APP_MAPTILER_LAYER_HILL +
            process.env.REACT_APP_MAPTILER_API_KEY
          }
          attribution='Map data &copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
        />
      </BaseLayer>
    </>
  );
}
