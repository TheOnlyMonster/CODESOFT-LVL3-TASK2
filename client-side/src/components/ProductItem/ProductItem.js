import Card from "../Card/Card";
import DeleteProduct from "../../pages/DeleteProduct/DeleteProduct";
import AddToCart from "../../pages/AddToCart/AddToCart";
import usePopUp from "../../hooks/usePopUp";
import { useSelector } from "react-redux";
import getImageSrc from "../../utils/getImageSrc";
const ProductItem = ({ product }) => {
  const { isAuth } = useSelector((state) => state.authReducer);
  const [
    deleteProductOpen,
    handleDeleteProductClickOpen,
    handleDeleteProductClose,
  ] = usePopUp();
  const [addProductOpen, handleAddProductClickOpen, handleAddProductClose] =
    usePopUp();
  return (
    <li>
      <Card>
        <img src={getImageSrc(product.image)} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}$</p>
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
