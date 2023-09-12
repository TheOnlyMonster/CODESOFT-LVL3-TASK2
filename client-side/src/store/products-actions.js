import { setProductData, startLoading, endLoading } from "./products-slice";

const apiUrl = "http://localhost:5000/products";

const fetchData = async (dispatch, page, price = null) => {
  try {
    dispatch(startLoading());
    const url = price
      ? `${apiUrl}/price/${price}?page=${page}`
      : `${apiUrl}?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    data.currentPage = page;
    return data;
  } catch (error) {
    return error;
  } finally {
    dispatch(endLoading());
  }
};

export const getAllProducts = (page) => {
  return async (dispatch) => {
    const data = await fetchData(dispatch, page);
    if (!(data instanceof Error)) {
      dispatch(setProductData(data));
    }
  };
};

export const getAllProductsFilterByPrice = (page, price) => {
  return async (dispatch) => {
    const data = await fetchData(dispatch, page, price);
    if (!(data instanceof Error)) {
      dispatch(setProductData(data));
    }
  };
};
