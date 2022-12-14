import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./user";
import signup from "./signup";
import cartReducer from "./reducers/cart";

const reducers = combineReducers({
  user: user,
  signup: signup,
  cartlist: cartReducer,
});

const persistConfig = {
  // key: storage에 저장할 때의 key값 지정
  key: "root",
  // session, local storage 중에서 저장할 storage 지정
  storage,
  // storage에 저장할 redux module 나열
  // blacklist : 저장하지 않을 redux module 나열
  whitelist: ["signup", "user", "cartlist"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export default store;

