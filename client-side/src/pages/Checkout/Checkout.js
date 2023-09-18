import React, { useRef, useEffect } from "react";
import styles from "../PopUpForm/PopUpForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { checkoutAction } from "../../store/actions/products-actions";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paypal = useRef();
  const { totalPrice, cart } = useSelector((state) => state.userReducer);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "CodSoft Intern Task",
                amount: {
                  currency: "USD",
                  value: totalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          dispatch(
            checkoutAction(JSON.stringify(cart), localStorage.getItem("token"))
          );
          navigate("/");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.popup}>
      <div className={styles["popup-inner"]}>
        <div ref={paypal}></div>
      </div>
    </div>
  );
};

export default Checkout;
