import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import userReducer from "./user";
import signupReducer from "./signup";
import cartReducer from "./reducers/cart";

const reducers = combineReducers({
  user: userReducer,
  signup: signupReducer,
  cartlist: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cartlist"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

