import {
  setProductData,
  addProduct,
  deleteProduct,
  addToCart,
} from "../slices/products-slice";
import { setSuccessMessage } from "../slices/auth-slice";
import { fetchData, apiUrl } from "../utils/fetchData";
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
    if (data) {
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
    if (data) {
      dispatch(setProductData(data));
    }
  };
};

export const addProductAction = (page, product, token) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/add-product?page=${page}`,
      page,
      product,
      "mixed",
      token
    );
    if (data) {
      dispatch(addProduct({ product: { ...data } }));
      dispatch(setSuccessMessage("Product added successfully"));
    }
  };
};

export const deleteProductAction = (page, product, token) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "DELETE",
      `${apiUrl}/delete-product/${product._id}?page=${page}`,
      page,
      product,
      "mixed",
      token
    );
    if (data) {
      dispatch(deleteProduct(data));
      dispatch(setSuccessMessage("Product deleted successfully"));
    }
  };
};

export const addToCartAction = (page, product) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/add-to-cart/${product._id}?page=${page}`,
      page,
      null,
      "json"
    );
    if (data) {
      dispatch(addToCart(data));
      dispatch(setSuccessMessage("Product added to cart successfully"));
    }
  };
};
