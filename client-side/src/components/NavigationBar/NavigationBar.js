import { Link, Outlet } from "react-router-dom";
import Container from "../Container/Container";
import styles from "./NavigationBar.module.css";
const NavigationBar = () => {
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
              <span className="material-symbols-outlined">person</span> Login/Register
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
          <li>Home</li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>About Us</li>
          <li>Orders</li>
        </ul>
      </Container>
      <Outlet />
    </>
  );
};

export default NavigationBar;
