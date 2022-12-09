import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import userReducer from "./reducers/user";
import signupReducer from "./reducers/signup";
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
  middleware: [],
});

export default store;

