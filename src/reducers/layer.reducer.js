import { ADD_LAYER, REMOVE_LAYER } from "../constants/layer.constant";
const initialState = [];
const layerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAYER:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_LAYER:
      return {
        token: null,
      };
    default:
      return state;
  }
};
export default layerReducer;
