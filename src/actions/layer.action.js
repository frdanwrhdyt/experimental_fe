import { ADD_LAYER, REMOVE_LAYER } from "../constants/layer.constant";
export const addLayer = (token) => ({
  type: ADD_LAYER,
  payload: token,
});
export const removeLayer = () => ({
  type: REMOVE_LAYER,
});
