import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products/Products";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ErrorPage from "./pages/ErrorPage.js";
import SignUpForm from "./pages/SignUpForm/SignUpForm";
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
        path: "sign-up",
        element: <SignUpForm />,
      }
    ],
  },
]);

export default router;
