import { startLoading, endLoading, setError } from "../slices/auth-slice";
export const apiUrl = "http://localhost:5000";
export const fetchData = async (
  dispatch,
  method,
  url,
  page = null,
  formData = null,
  type,
  token = null
) => {
  try {
    dispatch(startLoading());
    let headers = {};
    if (token) {
      headers =
        type === "json"
          ? {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          : {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    } else if (type === "json") {
      headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const body = method === "DELETE" ? null : formData;
    console.log(headers, body, token);
    const response = await fetch(url, {
      method,
      body,
      ...headers,
    });
    if (response.status >= 400) {
      const errors = await response.json();
      throw errors;
    }
    const data = await response.json();
    if (page && !formData) {
      data.currentPage = page;
    }
    return data;
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(endLoading());
  }
};
