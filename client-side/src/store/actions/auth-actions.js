import {
  setUser
} from "../slices/auth-slice";
import { setSuccessMessage } from "../slices/auth-slice";
import { fetchData, apiUrl } from "../utils/fetchData";

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
    if (data) {
      dispatch(setUser(data));
      
      dispatch(setSuccessMessage("User logged in successfully"));
    }
  };
}