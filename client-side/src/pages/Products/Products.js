import { useLocation } from "react-router-dom";
import ProductList from "../../components/ProductsList/ProductsList";
import ProductItemSkeleton from "../../components/Skeletons/ProductItemSkeleton";
import Container from "../../components/Container/Container";
import Transition from "../../components/Transition/Transition";
import PaginationList from "../../components/Pagination/PaginationList";
import styles from "./Products.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsAction,
  getAllProductsFilterByPriceAction,
  getAllProductsFilterBySearchAction,
} from "../../store/actions/products-actions";
const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, productsCount, currentPage, highestPrice, lowestPrice } =
    useSelector((state) => state.productsReducer);
  const { isLoading } = useSelector((state) => state.authReducer);
  const [price, setPrice] = useState([0, 100]);
  function useQuery() {
    return new URLSearchParams(location.search);
  }
  const query = useQuery();
  const page = +query.get("page") || 1;

  useEffect(() => {
    if (location.pathname === "/products/price/") {
      dispatch(getAllProductsFilterByPriceAction(page, price));
    } else if (location.pathname === "/products") {
      dispatch(getAllProductsAction(page));
    } else if (location.pathname.includes("/products/search")) {
      dispatch(getAllProductsFilterBySearchAction(page, query.get("text")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch, location]);

  useEffect(() => {
    if (lowestPrice === undefined || highestPrice === undefined) return;
    setPrice([lowestPrice, highestPrice]);
  }, [lowestPrice, highestPrice]);

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
          <ProductList allProducts={products} setPrice={setPrice} price={price}>
            <div className={styles.results}>
              <h1>Results</h1>
              <div>
                <p>
                  Showing {10 * (currentPage - 1) + 1}-
                  {10 * (currentPage - 1) + Math.min(10, products.length)} of{" "}
                  {productsCount} results
                </p>
              </div>
            </div>
          </ProductList>
          {products.length !== 0 && (
            <PaginationList
              productsCount={productsCount}
              currentPage={currentPage}
              pageItems={10}
              query={query.get("text")}
            />
          )}
        </Transition>
      )}
    </Container>
  );
};
export default Products;
