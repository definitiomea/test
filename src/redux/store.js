import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/user";
import signupReducer from "./reducers/signup";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    signup: signupReducer,
  },
});

export default store;
