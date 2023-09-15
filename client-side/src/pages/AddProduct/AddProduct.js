import PopUpForm from "../PopUpForm/PopUpForm";
import * as yup from "yup";
import FormInput from "../../components/FormInput";
import { addProductAction } from "../../store/actions/products-actions";
import { useSelector } from "react-redux";
const AddProduct = ({ handleClose, open }) => {
  const { token } = useSelector((state) => state.authReducer);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const schema = yup.object().shape({
    title: yup
      .string("Title must be a string")
      .required("Title is required")
      .min(3, "Title must be at least 3 characters long"),
    price: yup
      .number("Price must be a number")
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    description: yup
      .string("Description must be a string")
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long"),
    image: yup
      .mixed()
      .required("Image is required")
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .png",
        (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }
      ),
  });
  return (
    <PopUpForm
      open={open}
      submitText="Add Product"
      handleClose={handleClose}
      action={addProductAction}
      schema={schema}
      formNames={["title", "price", "description", "image"]}
      type="mixed"
      token={token}
    >
      <FormInput label="Title" type="text" name="title" />
      <FormInput label="Price" type="number" name="price" />
      <FormInput label="Description" type="text" name="description" />
    </PopUpForm>
  );
};
export default AddProduct;
