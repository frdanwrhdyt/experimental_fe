import {
  ADD_OVERLAY,
  REMOVE_OVERLAY,
  UPDATE_OVERLAY_STATUS,
} from "../constants/overlay.constant";

export const addOverlay = (overlay) => ({
  type: ADD_OVERLAY,
  payload: overlay,
});

export const removeOverlay = () => ({
  type: REMOVE_OVERLAY,
});
export const updateOverlayStatus = (layerName, status) => {
  return {
    type: UPDATE_OVERLAY_STATUS,
    payload: {
      layerName,
      status,
    },
  };
};
// import { ADD_OVERLAY, REMOVE_OVERLAY } from "../constants/overlay.constant";

// export const addOverlay = (overlay) => ({
//   type: ADD_OVERLAY,
//   payload: overlay,
// });

// export const removeOverlay = (overlay) => ({
//   type: REMOVE_OVERLAY,
//   payload: overlay,
// });
