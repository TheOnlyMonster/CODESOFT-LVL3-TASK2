import { Form, useNavigate } from "react-router-dom";
import Transition from "../../components/Transition/Transition";
import styles from "./AddProduct.module.css";
import useInputValidation from "../../hooks/useInputValidation";
import { useState } from "react";
const AddProduct = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState({ val: false, msg: "" });
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
    }
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
    }
  ]);
  function handleImageValidation() {
    return imageValidation((image) => {
      if (!image) {
        return { isValid: false, errorMessage: "This field is required" };
      }
      if (image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/jpg") {
        return { isValid: true };
      }
      return {
        isValid: false,
        errorMessage: "Only jpg and jpeg and png images are allowed",
      };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !titleValidation().isValid ||
      !priceValidation().isValid ||
      !descriptionValidation().isValid ||
      !handleImageValidation().isValid
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    try {
      const res = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: formData,
      });
      if (res.status === 422) {
        const errors = await res.json();
        throw errors;
      }
      if (res.ok) {
        setServerError({ val: false, msg: "" });
        navigate("/products");
      }
    } catch (error) {
      if (error.statusCode === 422) {
        setServerError({ val: true, msg: error.msg });
      } else {
        // ...
      }
    }
  };
  return (
    <Transition>
      <div className={styles.popup}>
        <div className={styles["popup-inner"]}>
          <Form action="/add-product" method="post" onSubmit={handleSubmit}>
            {serverError.val && (
              <input disabled className={styles.error} value={serverError.msg} />
            )}
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
              {!titleValidation().isValid && (
                <p>{titleValidation().errorMessage}</p>
              )}
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
              {!priceValidation().isValid && (
                <p>{priceValidation().errorMessage}</p>
              )}
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
          </Form>
        </div>
      </div>
    </Transition>
  );
};
export default AddProduct;
