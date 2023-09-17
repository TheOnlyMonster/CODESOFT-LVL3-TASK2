import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    orders: [],
    cart: { items: undefined },
    totalPrice: 0.0,
    Fname: undefined,
    Lname: undefined,
  },
  reducers: {
    setUserOrders: (state, action) => {
      state.orders = action.payload;
    },
    addToCart: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
      localStorage.setItem("totalPrice", action.payload.totalPrice);
    },
    updateQuantity: (state, action) => {
      const index = state.cart.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index === -1) return;
      let totalPrice =
        state.totalPrice -
        state.cart.items[index].price * state.cart.items[index].quantity;
      totalPrice += state.cart.items[index].price * action.payload.quantity;
      state.cart.items[index].quantity = action.payload.quantity;
      if (action.payload.quantity === 0) {
        state.cart.items = state.cart.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.totalPrice = 0.0;
      }
      state.totalPrice = totalPrice;
      localStorage.setItem("totalPrice", state.totalPrice);
    },
    setUserInfo: (state, action) => {
      state.Fname = action.payload.Fname;
      state.Lname = action.payload.Lname;
      state.totalPrice = action.payload.cart.totalPrice;
      localStorage.setItem("totalPrice", action.payload.cart.totalPrice);
      localStorage.setItem("Fname", action.payload.Fname);
      localStorage.setItem("Lname", action.payload.Lname);
    },
    setCart: (state, action) => {
      state.cart.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      localStorage.setItem("totalPrice", action.payload.totalPrice);
    },
    clearInfo: (state) => {
      state.cart.items = undefined;
      state.orders = [];
      state.totalPrice = 0.0;
      state.Fname = undefined;
      state.Lname = undefined;
      state.cart.isUpdated = false;
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("Fname");
      localStorage.removeItem("Lname");
    },
    autoClearInfo: (state, action) => {
      setTimeout(() => {
        clearInfo(state);
      }, action.payload);
    },
    setUserFromLocalStorage: (state) => {
      state.totalPrice = localStorage.getItem("totalPrice");
      state.Fname = localStorage.getItem("Fname");
      state.Lname = localStorage.getItem("Lname");
    },
  },
});
export const {
  addToCart,
  setUserInfo,
  setUserFromLocalStorage,
  setCart,
  clearInfo,
  autoClearInfo,
  updateQuantity,
  setUserOrders,
} = userSlice.actions;

export default userSlice;
