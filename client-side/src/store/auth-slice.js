import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
  {
    name: "authReducer",
    initialState: {
      errors: undefined,
      isLoading: undefined,
      isSubmitted: false,
      successMessage: undefined
    },
    reducers: {
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
        state.successMessage = action.payload
      },
      idleSuccessMessage: (state) => {
        state.successMessage = undefined
      }
    },
  }
)

export const { setError, startLoading, endLoading, idleLoading, setSuccessMessage, idleSuccessMessage } = authSlice.actions;
export default authSlice;