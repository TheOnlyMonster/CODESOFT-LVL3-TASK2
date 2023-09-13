import {
  setProductData,
  startLoading,
  endLoading,
  addProduct,
  deleteProduct,
} from "./products-slice";

const apiUrl = "http://localhost:5000";

const fetchData = async (
  dispatch,
  method,
  url,
  page,
  formData = null,
  type
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
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    if (!formData) {
      data.currentPage = page;
    }
    return data;
  } catch (error) {
    return error;
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
      "json"
    );
    if (!(data instanceof Error)) {
      dispatch(setProductData(data));
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
      "json"
    );
    if (!(data instanceof Error)) {
      dispatch(setProductData(data));
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
      "mixed"
    );
    if (!(data instanceof Error)) {
      dispatch(addProduct({ product: { ...data } }));
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
      "mixed"
    );
    if (!(data instanceof Error)) {
      dispatch(deleteProduct( data ));
    }
  };
}
