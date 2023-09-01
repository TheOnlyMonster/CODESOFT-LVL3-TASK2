import { createBrowserRouter } from "react-router-dom";
import Products, { loader as productLoader } from "./pages/Products/Products";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AddProduct from "./pages/AddProduct/AddProduct";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      {
        path: "products",
        element: <Products />,
        loader: productLoader,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

export default router;
