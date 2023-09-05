import {
  ADD_OVERLAY,
  REMOVE_OVERLAY,
  UPDATE_OVERLAY_STATUS,
} from "../constants/overlay.constant";

const initialState = {
  layers: [],
};

const overlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OVERLAY:
      const newLayers = action.payload.filter(
        (newLayer) =>
          !state.layers.some(
            (existingLayer) => existingLayer.layer === newLayer.layer
          )
      );

      return {
        ...state,
        layers: [...state.layers, ...newLayers],
      };
    case REMOVE_OVERLAY:
      return { layers: [] };
    case UPDATE_OVERLAY_STATUS:
      const updatedLayers = state.layers.map((layer) =>
        layer.name === action.payload.layerName
          ? { ...layer, status: action.payload.status }
          : layer
      );
      return {
        ...state,
        layers: updatedLayers,
      };
    default:
      return state;
  }
};

export default overlayReducer;
// import { ADD_OVERLAY, REMOVE_OVERLAY } from "../constants/overlay.constant";

// const initialState = {
//   layers: [],
// };

// const overlayReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_OVERLAY:
//       const newLayers = action.payload.filter(
//         (newLayer) =>
//           !state.layers.some(
//             (existingLayer) => existingLayer.layer === newLayer.layer
//           )
//       );

//       return {
//         ...state,
//         layers: [...state.layers, ...newLayers],
//       };
//     case REMOVE_OVERLAY:
//       return {
//         ...state,
//         layers: state.layers.filter((layer) => {
//           const found = action.payload.some(
//             (payloadLayer) => payloadLayer.layer === layer.layer
//           );
//           return !found;
//         }),
//       };
//     default:
//       return state;
//   }
// };

// export default overlayReducer;
