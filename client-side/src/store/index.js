import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import authSlice from "./slices/auth-slice";
const store = configureStore({
  reducer: {
    productsReducer: productsSlice.reducer,
    authReducer: authSlice.reducer,
  },
});

export default store;
