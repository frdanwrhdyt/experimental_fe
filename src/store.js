import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/auth.reducer";
import overlayReducer from "./reducers/overlay.reducer";

const store = configureStore({
  reducer: {
    overlay: overlayReducer,
  },
});

export default store;
