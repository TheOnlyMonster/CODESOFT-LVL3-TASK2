import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import authSlice from "./slices/auth-slice";
import userSlice from "./slices/user-slice";
const store = configureStore({
  reducer: {
    productsReducer: productsSlice.reducer,
    authReducer: authSlice.reducer,
    userReducer: userSlice.reducer,
  },
});

export default store;
