import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import reviewReducer from "./reducers/reviewReducer";
import orderlistReducer from "./reducers/order";

const reducers = combineReducers({
  user: userReducer,
  product: productReducer,
  review: reviewReducer,
  orderlist: orderlistReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cartlist", "review"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export default store;
