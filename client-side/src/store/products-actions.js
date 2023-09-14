import {
  setProductData,
  addProduct,
  deleteProduct,
} from "./products-slice";
import { startLoading, endLoading, setError, setSuccessMessage } from "./auth-slice";

const apiUrl = "http://localhost:5000";

const fetchData = async (
  dispatch,
  method,
  url,
  page,
  formData = null,
  type,
) => {
  try {
    dispatch(startLoading());
    const headers =
      type === "json"
        ? { headers: { "Content-Type": "application/json" } }
        : {};
    const body = method === "DELETE" ? null : formData; 
    const response = await fetch(url, {
      method,
      body,
      ...headers,
    });
    if (response.status >= 400 && response.status < 500) {
      const errors = await response.json();
      throw errors;
    }
    const data = await response.json();
    if (!formData) {
      data.currentPage = page;
    }
    return data;
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(endLoading());
  }
};
export const getAllProductsAction = (page) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "GET",
      `${apiUrl}/products?page=${page}`,
      page,
      null,
      "json",
    );
    if (data) {
      dispatch(setProductData(data));
      dispatch(setSuccessMessage("Products fetched successfully"));
    }
  };
};

export const getAllProductsFilterByPriceAction = (page, price) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "GET",
      `${apiUrl}/products/price/${price}?page=${page}`,
      page,
      null,
      "json",
    );
    if (data) {
      dispatch(setProductData(data));
      dispatch(setSuccessMessage("Products filtered successfully"));
    }
  };
};

export const addProductAction = (page, product) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/add-product?page=${page}`,
      page,
      product,
      "mixed",
    );
    if (data) {
      dispatch(addProduct({ product: { ...data } }));
      dispatch(setSuccessMessage("Product added successfully"));
    } 
  };
};

export const deleteProductAction = (page, product) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "DELETE",
      `${apiUrl}/delete-product/${product._id}?page=${page}`,
      page,
      product,
      "mixed",
    );
    if (data) {
      dispatch(deleteProduct(data));
      dispatch(setSuccessMessage("Product deleted successfully"));
    }
  };
}
