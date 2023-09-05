import { ADD_TOKEN, REMOVE_TOKEN } from "../constants/token.constant";
export const addToken = (token) => ({
  type: ADD_TOKEN,
  payload: token,
});
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});
