import {
  setUser
} from "../slices/auth-slice";
import { setSuccessMessage } from "../slices/auth-slice";
import { fetchData, apiUrl } from "../utils/fetchData";
import { setUserInfo } from "../slices/user-slice";

export const signInAction = (page, userInfo) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/sign-in`,
      page,
      userInfo,
      "json"
    );
    if (!data) {
      return;
    }
    dispatch(setUser(data));
    dispatch(setUserInfo(data));
    dispatch(setSuccessMessage("User logged in successfully"));
  };
}
export const signUpAction = (page, userInfo) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/sign-up`,
      page,
      userInfo,
      "json"
    );
    if (data) {
      dispatch(setSuccessMessage("User registered successfully"));
    }
  };
}