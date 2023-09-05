import { combineReducers } from "redux";
import { RESET_STORE } from "../constants/reset.constat";
// Import reducer lainnya di sini
import overlayReducer from "./reducersoverlay.reducer";

// Buat reducer reset
const resetReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    // Reset seluruh state ke initialState
    return {
      overlay: overlayReducer(undefined, action),
      // Tambahkan reducer lainnya jika diperlukan
    };
  }
  return state;
};

// Gabungkan reducer reset dengan reducer lainnya
const rootReducer = combineReducers({
  overlay: overlayReducer,
  // Tambahkan reducer lainnya di sini
});

export default rootReducer;
