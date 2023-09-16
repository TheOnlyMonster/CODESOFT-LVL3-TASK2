import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products/Products";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ErrorPage from "./pages/ErrorPage.js";
import Cart from "./pages/Cart/Cart.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/price",
        element: <Products />
      },
      {
        path: "cart",
        element: <Cart />,
      }
    ],
  },
]);

export default router;
