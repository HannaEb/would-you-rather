import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import logger from "./middleware/logger";
import { apiSlice } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
});

export default store;
