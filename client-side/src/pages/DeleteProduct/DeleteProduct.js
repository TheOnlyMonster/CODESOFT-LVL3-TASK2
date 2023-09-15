import PopUpForm from "../PopUpForm/PopUpForm";
import { deleteProductAction } from "../../store/actions/products-actions";
import { useSelector } from "react-redux";
const DeleteProduct = ({ product, handleClose, open }) => {
  const { token } = useSelector((state) => state.authReducer);
  return (
    <PopUpForm
      open={open}
      submitText="Delete Product"
      handleClose={handleClose}
      action={deleteProductAction}
      item={product}
      enableReinitialize={false}
      token={token}
    >
      <h1>Are you sure you want to delete this product?</h1>
    </PopUpForm>
  );
};

export default DeleteProduct;
