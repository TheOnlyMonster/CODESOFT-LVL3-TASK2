import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "../Container/Container";
import styles from "./NavigationBar.module.css";
import Divider from "@mui/material/Divider";
import AddProduct from "../../pages/AddProduct/AddProduct";
import usePopUp from "../../hooks/usePopUp";
import Notification from "../Notification/Notification";
import SignInForm from "../../pages/SignInForm/SignInForm";
import { useEffect } from "react";
import { logout, setUser, autoLogout } from "../../store/slices/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearInfo,
  setUserFromLocalStorage,
  autoClearInfo,
} from "../../store/slices/user-slice";
import { TextField } from "@mui/material";
const NavigationBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [addProductOpen, handleAddProductClickOpen, handleAddProductClose] =
    usePopUp();
  const [signInOpen, handleSignInClickOpen, handleSignInClose] = usePopUp();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      dispatch(logout());
      dispatch(clearInfo());
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(setUser({ token, userId }));
    dispatch(setUserFromLocalStorage());
    dispatch(autoLogout(remainingMilliseconds));
    dispatch(autoClearInfo(remainingMilliseconds));
  }, [dispatch]);
  const { isAuth } = useSelector((state) => state.authReducer);
  const { totalPrice, Fname, Lname } = useSelector(
    (state) => state.userReducer
  );
  const { errors } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (errors?.statusCode === 401) {
      handleSignInClickOpen();
    }
  }, [errors, handleSignInClickOpen]);
  return (
    <>
      <Container>
        <header className={styles.header}>
          <ul>
            <li>
              Welcome to my website!, this is one of the tasks of the CodSoft
              internship
            </li>
            <li>
              {isAuth ? (
                <>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      dispatch(clearInfo());
                    }}
                    className={addProductOpen ? styles.active : ""}
                  >
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                  </button>
                  <button>
                    {Fname} {Lname}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignInClickOpen}
                  className={addProductOpen ? styles.active : ""}
                >
                  <span className="material-symbols-outlined">person</span>{" "}
                  Login/Register
                </button>
              )}
            </li>
          </ul>
        </header>
        <ul className={styles.search}>
          <TextField type="search" placeholder="Search..." />
          <li>
            <span className="material-symbols-outlined">shopping_cart</span>
            <Link to="/cart">
              <div>
                <p>Shopping Cart</p>
                <h5>{isAuth ? totalPrice : "0.00"}$</h5>
              </div>
            </Link>
          </li>
          <li>
            <span className="material-symbols-outlined">call</span>
            <div>
              <p>Call Us</p>
              <h6>+20 111 399 3807</h6>
            </div>
          </li>
        </ul>
        <ul className={styles.nav}>
          <li className={location.pathname === "/" ? styles.active : ""}>
            <Link to="/">Home</Link>
          </li>
          <li
            className={
              location.pathname === "/products" ||
              location.pathname === "/products/price/"
                ? styles.active
                : ""
            }
          >
            <Link to="/products">Products</Link>
          </li>
          <li>About Us</li>
          {isAuth && (
            <li className={location.pathname === "/orders" ? styles.active : ""}>
              <Link to="/orders">Orders</Link>
            </li>
          )}
          <li>
            {isAuth && (
              <button
                className={addProductOpen ? styles.active : ""}
                onClick={handleAddProductClickOpen}
              >
                Add Product
              </button>
            )}
            {isAuth && addProductOpen && (
              <AddProduct
                handleClose={handleAddProductClose}
                open={addProductOpen}
              />
            )}
            {!isAuth && signInOpen && (
              <SignInForm handleClose={handleSignInClose} open={signInOpen} />
            )}
          </li>
        </ul>
      </Container>
      <Divider variant="middle" />
      <Outlet />
      <Notification />
    </>
  );
};

export default NavigationBar;
