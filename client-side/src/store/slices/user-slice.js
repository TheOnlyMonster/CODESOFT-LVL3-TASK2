import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    cart: {
      items: [],
      totalPrice: 0.00,
    },
    Fname : undefined,
    Lname : undefined
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const cart = action.payload;
      state.cart = cart;
    },
    setUserInfo: (state, action) => {
      console.log(action.payload);
      state.Fname = action.payload.Fname;
      state.Lname = action.payload.Lname;
      state.cart = action.payload.cart;
    }
  },
});
export const { addToCart, setUserInfo } = userSlice.actions;

export default userSlice;
