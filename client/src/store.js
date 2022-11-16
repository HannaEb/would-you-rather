import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import auth from "./reducers/auth";
import questions from "./reducers/questions";
import message from "./reducers/message";
import logger from "./middleware/logger";
import { apiSlice } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    auth,
    questions,
    message,
    loadingBar: loadingBarReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
});

export default store;
