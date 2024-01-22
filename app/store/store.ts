import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import favPackageSlice from "./Slices/favPackageSlice"

let reducers = combineReducers({
    favPackageSlice:favPackageSlice
});

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: [
    favPackageSlice
  ],
  blacklist: [
 
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const webStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const webPersistor = persistStore(webStore);

export { webStore, webPersistor };
