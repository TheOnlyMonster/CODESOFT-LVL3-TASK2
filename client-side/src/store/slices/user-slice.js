import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    cart: {
      items: [],
      totalPrice: 0.0,
    },
    Fname: undefined,
    Lname: undefined,
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const cart = action.payload;
      state.cart = cart;
      localStorage.setItem("totalPrice", action.payload.totalPrice);
    },
    setUserInfo: (state, action) => {
      console.log(action.payload);
      state.Fname = action.payload.Fname;
      state.Lname = action.payload.Lname;
      state.cart = action.payload.cart;
      localStorage.setItem("totalPrice", action.payload.cart.totalPrice);
    },
    setTotalPrice: (state, action) => {
      state.cart.totalPrice = action.payload;
    },
  },
});
export const { addToCart, setUserInfo, setTotalPrice } =
  userSlice.actions;

export default userSlice;
