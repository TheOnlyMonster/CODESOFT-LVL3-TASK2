import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { useState } from "react";
import DeleteProduct from "../../pages/DeleteProduct/DeleteProduct";
const ProductItem = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
