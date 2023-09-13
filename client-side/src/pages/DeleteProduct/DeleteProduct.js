import PopUpForm from "../PopUpForm/PopUpForm";
import { deleteProductAction } from "../../store/products-actions";
const DeleteProduct = ({ product, handleClose, open }) => {
  
  return (
    <PopUpForm
      open={open}
      submitText="Delete Product"
      handleClose={handleClose}
      action={deleteProductAction}
      item={product}
      enableReinitialize={false}
    >
      <h1>Are you sure you want to delete this product?</h1>
    </PopUpForm>
  );
};

export default DeleteProduct;
