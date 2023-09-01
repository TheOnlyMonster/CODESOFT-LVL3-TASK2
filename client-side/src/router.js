import { createBrowserRouter } from "react-router-dom";
import Products, { loader as productLoader } from "./pages/Products/Products";
import NavigationBar from "./components/NavigationBar/NavigationBar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      {
        path: "products",
        element: <Products />,
        loader: productLoader
      }
    ]
  },
]);

export default router;
