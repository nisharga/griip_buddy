import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import baseSlice from "./features/baseSlice";
import cartReducer from "./features/cart-slice";
import userReducer from "./features/userSlice";
import apiSlice from "./api/api-slice";
import apiSliceAuth from "./api/api-slice-auth";

const rootReducer = combineReducers({
  utils: baseSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiSliceAuth.reducerPath]: apiSliceAuth.reducer,
  cart: cartReducer,
  user: userReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware)
      .concat(apiSliceAuth.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store