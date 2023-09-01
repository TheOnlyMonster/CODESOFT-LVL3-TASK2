import { Form, useNavigate } from "react-router-dom";
import Transition from "../../components/Transition/Transition";
import styles from "./AddProduct.module.css";
const AddProduct = () => {
  const navigate = useNavigate();
  return (
    <Transition>
      <div className={styles.popup}>
        <div className={styles["popup-inner"]}>
          <Form action="/add-product" method="post">
            <label>
              <input type="text" placeholder="Title" name="title" />
            </label>
            <label>
              <input type="number" placeholder="Price" name="price" />
            </label>
            <label>
              <input type="text" placeholder="Description" name="description" />
            </label>
            <label>
              <input type="file" name="image"/>
            </label>
            <button type="submit">Add Product</button>
            <button type="button" onClick={() => navigate(-1)}>Close</button>
          </Form>
        </div>
      </div>
    </Transition>
  );
};
const action = async ({ params, request }) => {
  const formData = new FormData();
  console.log(formData);
  
  // Assuming you have an <input> element with name="image" for file uploads
  formData.append('image', request.files.image);

  // Add other form fields if needed
  // formData.append('name', product.name);
  // formData.append('description', product.description);

  try {
    const response = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: formData, // Use FormData object as the request body
    });

    if (response.ok) {
      console.log('Product added successfully');
    } else {
      console.error('Failed to add product');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
export { action }; 
export default AddProduct;
