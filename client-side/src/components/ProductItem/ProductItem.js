import { Link } from "react-router-dom";
import Card from "../Card/Card";
import DeleteProduct from "../../pages/DeleteProduct/DeleteProduct";
import usePopUp from "../../hooks/usePopUp";
const ProductItem = ({ product }) => {
  const [ open, handleClickOpen, handleClose ] = usePopUp();
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
        <Link to={`/add-to-cart/${product._id}`}>
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </Link>
        <span className="material-symbols-outlined" onClick={handleClickOpen}>delete</span>
        {open && <DeleteProduct product={product} handleClose={handleClose} open={open} />}
      </Card>
    </li>
  );
};

export default ProductItem;
