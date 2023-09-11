import { useLocation } from "react-router-dom";
import ProductList from "../../components/ProductsList/ProductsList";
import ProductItemSkeleton from "../../components/Skeletons/ProductItemSkeleton";
import Container from "../../components/Container/Container";
import Transition from "../../components/Transition/Transition";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Products.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products-actions";
const Products = () => {
  const dispatch = useDispatch();
  const { products, productsCount, currentPage, highestPrice, lowestPrice, isLoading } = useSelector((state) => state.products);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get("page") || 1;
  useEffect(() => {
    dispatch(getAllProducts(page));
  },[page, dispatch])
  const skeletons = [];
  if (isLoading) {
    for (let i = 0; i < 10; i++) {
      skeletons.push(<ProductItemSkeleton key={i} />);
    }
  }
  return (
    <Container>
      {isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {skeletons}
        </div>
      ) : (
        <Transition className={styles.products}>
          <ProductList products={products} highestPrice={highestPrice} lowestPrice={lowestPrice}>
            <div className={styles.results}>
              <h1>Results</h1>
              <div>
                <p>
                  Showing {10 * (currentPage - 1) + 1}-
                  {10 * (currentPage - 1) + products.length} of {productsCount}{" "}
                  results
                </p>
              </div>
            </div>
          </ProductList>
          <Pagination
            productsCount={productsCount}
            currentPage={currentPage}
            pageItems={10}
          />
        </Transition>
      )}
    </Container>
  );
};
export default Products;
