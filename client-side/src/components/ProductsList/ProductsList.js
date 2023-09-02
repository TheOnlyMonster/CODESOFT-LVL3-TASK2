import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.css";
const ProductList = (props) => {
  return props.products.length === 0 ? (
    <p>No products found</p>
  ) : (
    <ul className={styles.list}>
      {props.products.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </ul>
  );
};

export default ProductList;
