import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import baseSlice from "./features/baseSlice";
import cartReducer from "./features/cart-slice";
import userReducer from "./features/userSlice";
import apiSlice from "./api/api-slice";
import apiSliceAuth from "./api/api-slice-auth";

// Combine all reducers
const rootReducer = combineReducers({
  utils: baseSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiSliceAuth.reducerPath]: apiSliceAuth.reducer,
  cart: cartReducer,
  user: userReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // No need to ignore persist actions
    })
      .concat(apiSlice.middleware)
      .concat(apiSliceAuth.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
