import { createBrowserRouter } from "react-router-dom";
import Products, { loader as productLoader } from "./pages/Products/Products";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AddProduct from "./pages/AddProduct/AddProduct";
import AuthForm from "./pages/AuthForm/AuthForm";
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
      {
        path: "sign-in",
        element: <AuthForm />,
      },
    ],
  },
]);

export default router;
