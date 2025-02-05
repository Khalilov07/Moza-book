import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import classReducer from "./classSlice";
import classDetailReducer from "./classDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    classDetail: classDetailReducer
  },
});
