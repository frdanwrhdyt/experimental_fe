import { ADD_TOKEN, REMOVE_TOKEN } from "../constants/token.constant";
const initialState = {
  token: null,
};
const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      return {
        token: null,
      };
    default:
      return state;
  }
};
export default tokenReducer;
