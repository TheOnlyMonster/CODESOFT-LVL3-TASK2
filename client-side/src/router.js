import { createBrowserRouter, Navigate } from "react-router-dom";
import Products from "./pages/Products/Products";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ErrorPage from "./pages/ErrorPage.js";
import Cart from "./pages/Cart/Cart.js";
import Orders from "./pages/Orders/Orders";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="products" />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/price",
        element: <Products />,
      },
      {
        path: "products/search",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);

export default router;
