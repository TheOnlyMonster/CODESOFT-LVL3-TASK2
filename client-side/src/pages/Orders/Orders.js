import { Container } from "@mui/material";
import styles from "./Orders.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersAction } from "../../store/actions/products-actions";
import CartSkeleton from "../../components/Skeletons/CartSkeleton";
import Transition from "../../components/Transition/Transition";
import getImageSrc from "../../utils/getImageSrc";
export default function Orders() {
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => state.authReducer);
  const { orders } = useSelector((state) => state.userReducer);
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  }
  useEffect(() => {
    dispatch(getUserOrdersAction(localStorage.getItem("token")));
  }, [dispatch, isAuth]);
  if (isLoading || !isAuth) {
    return (
      <Container>
        <CartSkeleton />
      </Container>
    );
  }
  return (
    <Transition>
      <Container>
        <div className={styles.ordersContainer}>
          <h2 className={styles.heading}>Your Orders</h2>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderItem}>
              <div className={styles.orderDetails}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderSection}>
                    <h6 className={styles.infoLabel}>Order Number</h6>
                    <p className={styles.orderLink}>{order._id}</p>
                  </div>
                  <div className={styles.orderSection}>
                    <h6 className={styles.infoLabel}>Date</h6>
                    <p className={styles.infoValue}>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className={styles.orderSection}>
                    <h6 className={styles.infoLabel}>Total</h6>
                    <p className={styles.infoValue}>{order.totalPrice}$</p>
                  </div>
                </div>
                {order.products.map((product) => (
                  <div key={product._id} className={styles.productInfo}>
                    <div className={styles.productImage}>
                      <img
                        src={getImageSrc(product.image)}
                        alt={product.title}
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <h6 className={styles.productTitle}>
                        <p className={styles.productLink}>
                          {product.quantity} x {product.title}
                        </p>
                      </h6>
                      <h6 className={styles.productPrice}>
                        <b>{product.price}$</b>
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Transition>
  );
}
