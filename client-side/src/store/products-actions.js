import { getAll, startLoading, endLoading } from "./products-slice";
export const getAllProducts = (page) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const url = `http://localhost:5000/products?page=${page}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      data.currentPage = page;
      dispatch(getAll(data));
      dispatch(endLoading());
    } catch (error) {
      return error;
    }
  };
};


export const getAllPrice = (page, price) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const url = `http://localhost:5000/products/price/${price}?page=${page}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      data.currentPage = page;
      console.log(price, page, data)
      dispatch(getAll(data));
      dispatch(endLoading());
    } catch (error) {
      return error;
    }
  };
};

