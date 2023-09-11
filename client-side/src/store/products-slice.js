import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], productsCount: 0, currentPage: 1, highestPrice: 0, lowestPrice: 0, isLoading: false },
  reducers: {
    getAll: (state, action) => {
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.currentPage = action.payload.currentPage;
      state.highestPrice = action.payload.highestPrice;
      state.lowestPrice = action.payload.lowestPrice;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    }
  },
});

export default productsSlice;

export const { getAll, startLoading, endLoading } = productsSlice.actions;
