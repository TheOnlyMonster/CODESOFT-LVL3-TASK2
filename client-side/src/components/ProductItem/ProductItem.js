import { Link } from "react-router-dom";
import Card from "../Card/Card";
import DeleteProduct from "../../pages/DeleteProduct/DeleteProduct";
import AddToCart from "../../pages/AddToCart/AddToCart";
import usePopUp from "../../hooks/usePopUp";
import { useSelector } from "react-redux";
const ProductItem = ({ product }) => {
  const { isAuth } = useSelector((state) => state.authReducer);
  const [
    deleteProductOpen,
    handleDeleteProductClickOpen,
    handleDeleteProductClose,
  ] = usePopUp();
  const [addProductOpen, handleAddProductClickOpen, handleAddProductClose] =
    usePopUp();
  const imagePath = `/uploads/${product.image.split("uploads\\")[1]}`;
  return (
    <li>
      <Card>
        <img src={imagePath} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}$</p>
        <Link to={`/products/${product._id}`}>
          <span className="material-symbols-outlined">info_i</span>
        </Link>
        <span
          className="material-symbols-outlined"
          onClick={handleAddProductClickOpen}
        >
          add_shopping_cart
        </span>
        {isAuth && (
          <span
            className="material-symbols-outlined"
            onClick={handleDeleteProductClickOpen}
          >
            delete
          </span>
        )}
        {isAuth && deleteProductOpen && (
          <DeleteProduct
            product={product}
            handleClose={handleDeleteProductClose}
            open={deleteProductOpen}
          />
        )}
        {addProductOpen && (
          <AddToCart
            product={product}
            handleClose={handleAddProductClose}
            open={addProductOpen}
          />
        )}
      </Card>
    </li>
  );
};

export default ProductItem;
