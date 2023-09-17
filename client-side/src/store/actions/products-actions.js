import {
  setProductData,
  addProduct,
  deleteProduct,
} from "../slices/products-slice";
import { addToCart, setCart, setUserOrders } from "../slices/user-slice";
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
export const getAllProductsFilterBySearchAction = (page, searchValue) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "GET",
      `${apiUrl}/products/search/${searchValue}?page=${page}`,
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

export const addToCartAction = (page, quantity, token, product) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/add-to-cart/${product._id}?page=${page}`,
      page,
      quantity,
      "json",
      token
    );
    if (data) {
      dispatch(addToCart(data));
      dispatch(setSuccessMessage("Product added to cart successfully"));
    }
  };
};
export const checkoutAction = (cart, token) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/checkout`,
      null,
      cart,
      "json",
      token
    );
    if (data) {
      dispatch(setSuccessMessage("Order placed successfully"));
      dispatch(setCart({ items: [], totalPrice: 0 }));
    }
  };
};
export const getUpdatedCartAction = (token) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "GET",
      `${apiUrl}/cart`,
      null,
      null,
      "json",
      token
    );
    if (data) {
      dispatch(setCart(data));
    }
  };
};

export const getUserOrdersAction = (token) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "GET",
      `${apiUrl}/orders`,
      null,
      null,
      "json",
      token
    );
    if (data) {
      dispatch(setUserOrders(data));
    }
  };
};

export const updateCartAction = (token, cart) => {
  return async (dispatch) => {
    const data = await fetchData(
      dispatch,
      "POST",
      `${apiUrl}/update-cart`,
      null,
      cart,
      "json",
      token
    );
    if (data) {
      dispatch(setSuccessMessage("Cart updated successfully"));
    }
  };
};
