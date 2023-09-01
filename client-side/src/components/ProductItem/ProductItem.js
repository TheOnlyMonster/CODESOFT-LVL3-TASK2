import { Link } from "react-router-dom";
import Card from "../Card/Card";
const ProductItem = ({ product }) => {
  return (
    <li>
      <Card>
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}$</p>

          <Link to={`/products/${product._id}`}>
            <span className="material-symbols-outlined">info_i</span>
          </Link>
        <Link to={`/add-to-cart/${product._id}`}>
          <span className="material-symbols-outlined">add_shopping_cart</span>
          </Link>
      </Card>
    </li>
  );
};

export default ProductItem;
