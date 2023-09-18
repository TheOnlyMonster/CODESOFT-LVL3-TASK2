import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUpdatedCartAction,
  updateCartAction,
} from "../../store/actions/products-actions";
import CartItem from "../../components/CartItem/CartItem";
import Transition from "../../components/Transition/Transition";
import CartSkeleton from "../../components/Skeletons/CartSkeleton";
import Checkout from "../Checkout/Checkout";
const Cart = () => {
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => state.authReducer);
  const { totalPrice, cart } = useSelector((state) => state.userReducer);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    dispatch(getUpdatedCartAction(localStorage.getItem("token")));
  }, [dispatch, isAuth]);
  useEffect(() => {
    if (!isAuth || cart.items === undefined || !isUpdated) return;
    dispatch(
      updateCartAction(localStorage.getItem("token"), JSON.stringify(cart))
    );
    setIsUpdated(false);
  }, [cart.items, isAuth, dispatch, cart, isUpdated]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!isAuth) return;
    setIsSubmitted(true);
  };
  if (isLoading || !isAuth || cart.items === undefined) {
    return (
      <Container>
        <CartSkeleton />
      </Container>
    );
  }
  return (
    <>
      <Transition>
        <Container>
          {cart.items.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              There are no items in your cart
            </p>
          ) : (
            <div className="sub-container">
              <div className="card">
                <div className="card-header">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                  <span className="text-muted">{cart.items.length} items</span>
                </div>
                <ul className="cart-items">
                  {cart.items.map((item) => (
                    <CartItem
                      item={item}
                      key={item._id}
                      setIsUpdated={setIsUpdated}
                    />
                  ))}
                </ul>
              </div>
              <div className="summary">
                <h5 className="summary-title">
                  <b>Summary</b>
                </h5>
                <hr />
                <div className="row">
                  <div className="col">ITEMS {cart.items.length}</div>
                  <div className="col text-right">&euro; {totalPrice}</div>
                </div>
                <form onSubmit={formSubmitHandler}>
                  <p>SHIPPING</p>
                  <select>
                    <option className="text-muted">
                      Standard-Delivery- &euro;5.00
                    </option>
                  </select>
                  <div
                    className="row"
                    style={{
                      borderTop: "1px solid rgba(0,0,0,.1)",
                      padding: "2vh 0",
                    }}
                  >
                    <div className="col">TOTAL PRICE</div>
                    <div className="col text-right">
                      &euro; {totalPrice + 5}
                    </div>
                  </div>
                  <button type="submit" className="checkout-button">
                    CHECKOUT
                  </button>
                </form>
              </div>
            </div>
          )}
        </Container>
      </Transition>
      {isSubmitted && <Checkout />}
    </>
  );
};

export default Cart;
