import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "../Container/Container";
import styles from "./NavigationBar.module.css";
import Divider from '@mui/material/Divider';
const NavigationBar = () => {
  const location = useLocation();
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
              <Link to="/sign-in">
                <span className="material-symbols-outlined">person</span>{" "}
                Login/Register
              </Link>
            </li>
          </ul>
        </header>
        <ul className={styles.search}>
          <input type="search" placeholder="Search.."></input>
          <li>
            <div>
              <p>Shopping Cart</p>
              <h4>$0.00</h4>
            </div>
            <span className="material-symbols-outlined">shopping_cart</span>
          </li>
          <li>
            <span className="material-symbols-outlined">call</span>
            <div>
              <p>Call Us</p>
              <h4>+20 111 399 3807</h4>
            </div>
          </li>
        </ul>
        <ul className={styles.nav}>
          <li className={location.pathname === "/" ? styles.active : ""}>
            Home
          </li>
          <li
            className={location.pathname === "/products" ? styles.active : ""}
          >
            <Link to="/products">Products</Link>
          </li>
          <li>About Us</li>
          <li>Orders</li>
          <li
            className={
              location.pathname === "/add-product" ? styles.active : ""
            }
          >
            <Link to="/add-product">Add Product</Link>
          </li>
        </ul>
      </Container>
      <Divider variant="middle" />
      <Outlet />
    </>
  );
};

export default NavigationBar;
