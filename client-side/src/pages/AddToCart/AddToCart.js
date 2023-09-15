import PopUpForm from "../PopUpForm/PopUpForm";
import FormInput from "../../components/FormInput";
import * as yup from "yup";
import { useSelector } from "react-redux";
const AddToCart = ({ product, handleClose, open }) => {
  const schema = yup.object().shape({
    quantity: yup
      .number("Quantity must be a number")
      .required("Quantity is required")
      .min(1, "Quantity must be greater than or equal to 1"),
  });
  const {token} = useSelector((state) => state.authReducer);
  return (
    <PopUpForm
      open={open}
      submitText="Add To Cart"
      handleClose={handleClose}
      action={handleClose}
      schema={schema}
      formNames={["quantity"]}
      type={"json"}
      token={token}
    >
      <FormInput
        type="text"
        name="title"
        disabled={true}
        value={product.title}
        label={"Title"}
      />
      <FormInput
        type="number"
        name="price"
        disabled={true}
        value={product.price}
        label={"Price"}
      />
      <FormInput
        type="text"
        name="description"
        disabled={true}
        value={product.description}
        label={"Description"}
      />
      <FormInput label="Quantity" type="number" name="quantity" />
    </PopUpForm>
  );
};

export default AddToCart;
