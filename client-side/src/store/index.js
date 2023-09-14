import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice";
import authSlice from "./auth-slice";
const store = configureStore({
  reducer: {
    productsReducer: productsSlice.reducer,
    authReducer: authSlice.reducer,
  },
});

export default store;
