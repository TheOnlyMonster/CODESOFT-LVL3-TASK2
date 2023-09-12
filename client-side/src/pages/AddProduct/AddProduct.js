import PopUpForm from "../PopUpForm/PopUpForm";
import { useState } from "react";
import FormInput from "../../components/FormInput";
import useInputValidation from "../../hooks/useInputValidation";
import styles from "../PopUpForm/PopUpForm.module.css";
const AddProduct = ({ handleClose , open }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, handleImage, handleImageBlur, handleImageFocus, handleImageValidation] = useInputValidation([]);

  return (
    <PopUpForm
      open={open}
      handleClose={handleClose}
      action="http://localhost:5000/add-product"
      method="POST"
      formData={[
        { name: "title", value: title },
        { name: "price", value: price },
        { name: "description", value: description },
        { name: "image", value: image },
      ]}
      type="mixed"
    >
      <FormInput
        inputValidation={[
          {
            regex: /^[a-zA-Z0-9\s]+$/,
            errorMessage: "Only letters and numbers are allowed",
          },
          {
            regex: /^(?=.{3,})[a-zA-Z0-9\s]+$/,
            errorMessage: "Title must be at least 3 characters long",
          },
        ]}
        type="text"
        placeholder="Title"
        name="title"
        getValue={(title) => setTitle(title)}
      />
      <FormInput
        inputValidation={[
          {
            regex: /^[0-9]+$/,
            errorMessage: "Only numbers are allowed",
          },
        ]}
        type="number"
        placeholder="Price"
        name="price"
        getValue={(price) => setPrice(price)}
      />
      <FormInput
        inputValidation={[
          {
            regex: /^[a-zA-Z0-9\s]+$/,
            errorMessage: "Only letters and numbers are allowed",
          },
          {
            regex: /^(?=.{10,})[a-zA-Z0-9\s]+$/,
            errorMessage: "Description must be at least 10 characters long",
          }
        ]}
        type="text"
        placeholder="Description"
        name="description"
        getValue={(description) => setDescription(description)}
      />
      <label key={"image"}>
        <input
          className={!handleImageValidation().isValid ? styles.error : ""}
          type="file"
          required
          onChange={handleImage}
          onBlur={handleImageBlur}
          onFocus={handleImageFocus}
        />
        {!handleImageValidation().isValid && (
          <p>{handleImageValidation().errorMessage}</p>
        )}
      </label>
      <button type="submit">Add Product</button>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </PopUpForm>
  );
};
export default AddProduct;
