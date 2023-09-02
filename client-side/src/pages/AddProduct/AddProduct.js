import { useNavigate } from "react-router-dom";
import styles from "../PopUpForm/PopUpForm.module.css";
import useInputValidation from "../../hooks/useInputValidation";
import PopUpForm from "../PopUpForm/PopUpForm";
const AddProduct = () => {
  const navigate = useNavigate();
  const [
    image,
    handleImage,
    handleImageBlur,
    handleImageFocus,
    imageValidation,
  ] = useInputValidation();
  const [
    title,
    handleTitle,
    handleTitleBlur,
    handleTitleFocus,
    titleValidation,
  ] = useInputValidation([
    {
      regex: /^[a-zA-Z0-9\s]+$/,
      errorMessage: "Only letters and numbers are allowed",
    },
    {
      regex: /^(?=.{3,})[a-zA-Z0-9\s]+$/,
      errorMessage: "Title must be at least 3 characters long",
    },
  ]);
  const [
    price,
    handlePrice,
    handlePriceBlur,
    handlePriceFocus,
    priceValidation,
  ] = useInputValidation([
    {
      regex: /^[0-9]+$/,
      errorMessage: "Only numbers are allowed",
    },
  ]);
  const [
    description,
    handleDescription,
    handleDescriptionBlur,
    handleDescriptionFocus,
    descriptionValidation,
  ] = useInputValidation([
    {
      regex: /^[a-zA-Z0-9\s]+$/,
      errorMessage: "Only letters and numbers are allowed",
    },
    {
      regex: /^(?=.{10,})[a-zA-Z0-9\s]+$/,
      errorMessage: "Description must be at least 10 characters long",
    },
  ]);
  function handleImageValidation() {
    return imageValidation((image) => {
      if (!image) {
        return { isValid: false, errorMessage: "This field is required" };
      }
      if (
        image.type === "image/jpeg" ||
        image.type === "image/png" ||
        image.type === "image/jpg"
      ) {
        return { isValid: true };
      }
      return {
        isValid: false,
        errorMessage: "Only jpg and jpeg and png images are allowed",
      };
    });
  }
  const handleValidation = async () => {
    if (
      !titleValidation().isValid ||
      !priceValidation().isValid ||
      !descriptionValidation().isValid ||
      !handleImageValidation().isValid
    ) {
      return false;
    }
    return true;
  };
  const handleOk = () => {
    navigate("/products");
  };
  return (
    <PopUpForm
      handleValidation={handleValidation}
      handleOk={handleOk}
      action="http://localhost:5000/add-product"
      method="POST"
      formData={[{ name: "title", value: title }, { name: "price", value: price }, { name: "description", value: description }, { name: "image", value: image }]}
      type="mixed"
    >
      <label key={"title"}>
        <input
          className={!titleValidation().isValid ? styles.error : ""}
          type="text"
          placeholder="Title"
          name="title"
          required
          value={title}
          onChange={handleTitle}
          onBlur={handleTitleBlur}
          onFocus={handleTitleFocus}
        />
        {!titleValidation().isValid && <p>{titleValidation().errorMessage}</p>}
      </label>
      <label key={"price"}>
        <input
          className={!priceValidation().isValid ? styles.error : ""}
          type="number"
          placeholder="Price"
          name="price"
          required
          value={price}
          onChange={handlePrice}
          onBlur={handlePriceBlur}
          onFocus={handlePriceFocus}
        />
        {!priceValidation().isValid && <p>{priceValidation().errorMessage}</p>}
      </label>
      <label key={"description"}>
        <input
          className={!descriptionValidation().isValid ? styles.error : ""}
          type="text"
          placeholder="Description"
          name="description"
          required
          value={description}
          onChange={handleDescription}
          onBlur={handleDescriptionBlur}
          onFocus={handleDescriptionFocus}
        />
        {!descriptionValidation().isValid && (
          <p>{descriptionValidation().errorMessage}</p>
        )}
      </label>
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
      <button type="button" onClick={() => navigate("/")}>
        Close
      </button>
    </PopUpForm>
  );
};
export default AddProduct;
