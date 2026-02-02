import { configureStore } from "@reduxjs/toolkit";
import {
  persistCombineReducers,
  persistStore,
  PERSIST,
  REHYDRATE,
  FLUSH,
  REGISTER,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerReducer from "../redux/slices/register.slice";
import productReducer from "../redux/slices/product.slice";

const persistConfig = {
  key: "data",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  register: registerReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, FLUSH, REGISTER, PURGE],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;
