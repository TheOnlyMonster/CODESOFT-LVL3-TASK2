import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/slices/user-slice";
const CartItem = ({ item, getImageSrc }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateQuantity({ _id: item._id, quantity }));
  }, [quantity, dispatch, item._id, item]);
  return (
    <li className="cart-item" key={item._id}>
      <img src={getImageSrc(item.image)} alt="Shirt" />
      <div className="cart-item-info">
        <div className="cart-item-title">{item.title}</div>
        <div className="cart-item-description">{item.description}</div>
      </div>
      <div className="cart-item-quantity">
        <button
          className="quantity-button"
          onClick={() => setQuantity((prev) => prev - 1)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="quantity-button"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-price">
        &euro; {item.price} <span className="remove-item" onClick={() => setQuantity(0)}>&#10005;</span>
      </div>
    </li>
  );
};
export default CartItem;
