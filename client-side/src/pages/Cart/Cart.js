import { useEffect } from "react";
import Container from "../../components/Container/Container";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatedCartAction } from "../../store/actions/products-actions";
import CartItem from "../../components/CartItem/CartItem";
const Cart = () => {
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => state.authReducer);
  const { totalPrice, cart } = useSelector((state) => state.userReducer);
  function getImageSrc(imagePath) {
    return `/uploads/${imagePath.split("uploads\\")[1]}`;
  }
  useEffect(() => {
    if(!isAuth) return
    dispatch(getUpdatedCartAction(localStorage.getItem("token")));
  }, [dispatch, isAuth]);
  return (
    <Container>
      {cart.items.length === 0 && !isLoading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>There are no items in your cart</p>
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
                <CartItem item={item} getImageSrc={getImageSrc} key={item._id} />
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
            <form>
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
                <div className="col text-right">&euro; {totalPrice + 5}</div>
              </div>
              <button className="checkout-button">CHECKOUT</button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
