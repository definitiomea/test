import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/user";
import signupReducer from "./reducers/signup";
import cartReducer from "./reducers/cart";
import orderReducer from "./reducers/order";
import review from "./reducers/reviewReducer";
import reviewInputReducer from "./reducers/reviewInputReducer";

const reducers = combineReducers({
  user: userReducer,
  signup: signupReducer,
  product: productReducer,
  cartlist: cartReducer,
  orderlist: orderReducer,
  review: review,
  reviewInput: reviewInputReducer,
});

const persistConfig = {
  // key: storage에 저장할 때의 key값 지정
  key: "root",
  // session, local storage 중에서 저장할 storage 지정
  storage,
  // storage에 저장할 redux module 나열
  // blacklist : 저장하지 않을 redux module 나열
  whitelist: [
    "signup",
    "user",
    "cartlist",
    "orderlist",
    "review",
    "reviewInput",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export default store;
