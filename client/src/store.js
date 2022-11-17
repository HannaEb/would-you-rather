import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authReducer from "./features/auth/authSlice";
import message from "./reducers/message";
import logger from "./middleware/logger";
import { apiSlice } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message,
    loadingBar: loadingBarReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
});

export default store;
