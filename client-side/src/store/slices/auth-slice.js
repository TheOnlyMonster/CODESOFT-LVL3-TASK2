import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "authReducer",
  initialState: {
    errors: undefined,
    isLoading: undefined,
    successMessage: undefined,
    isAuth: false,
    token: null,
    userId: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      if (
        localStorage.getItem("expiryDate") ||
        localStorage.getItem("token") ||
        localStorage.getItem("userId")
      )
        return;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      autoLogout(state, { payload: remainingMilliseconds });
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiryDate");
    },
    autoLogout: (state, action) => {
      setTimeout(() => {
        state.isAuth = false;
        state.token = null;
        state.userId = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("expiryDate");
      }, action.payload);
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    idleLoading: (state) => {
      state.isLoading = undefined;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    idleError: (state) => {
      state.errors = undefined;
    },
    idleSuccessMessage: (state) => {
      state.successMessage = undefined;
    },
  },
});

export const {
  setError,
  startLoading,
  endLoading,
  idleLoading,
  setSuccessMessage,
  idleSuccessMessage,
  setUser,
  logout,
  autoLogout,
  idleError,
} = authSlice.actions;
export default authSlice;
