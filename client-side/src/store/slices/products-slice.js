import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "productsReducer",
  initialState: {
    products: [],
    productsCount: 0,
    currentPage: 1,
    highestPrice: undefined,
    lowestPrice: undefined,
  },
  reducers: {
    setProductData: (state, action) => {
      const {
        products,
        productsCount,
        currentPage,
        highestPrice,
        lowestPrice,
      } = action.payload;
      return {
        ...state,
        products,
        productsCount,
        currentPage,
        highestPrice,
        lowestPrice,
      };
    },
    addProduct: (state, action) => {
      const { product } = action.payload;
      state.products.push(product);
      state.productsCount++;
      state.highestPrice = Math.max(state.highestPrice, product.price);
      state.lowestPrice = Math.min(state.lowestPrice, product.price);
    },
    deleteProduct: (state, action) => {
      const { product, highestPrice, lowestPrice } = action.payload;
      state.products = state.products.filter((p) => p._id !== product._id);
      state.productsCount--;
      state.highestPrice = highestPrice;
      state.lowestPrice = lowestPrice;
    },
  },
});

export default productsSlice;

export const { setProductData, addProduct, deleteProduct } =
  productsSlice.actions;
