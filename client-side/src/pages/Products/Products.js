import { useLocation, useNavigate } from "react-router-dom";
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
} from "../../store/products-actions";
const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFiltered, setIsFiltered] = useState(false);
  const {
    products,
    productsCount,
    currentPage,
    highestPrice,
    lowestPrice,
    isLoading,
  } = useSelector((state) => state.products);
  const [price, setPrice] = useState([lowestPrice, highestPrice]);
  function useQuery() {
    return new URLSearchParams(location.search);
  }
  const query = useQuery();
  const page = +query.get("page") || 1;
  useEffect(() => {
    if (!isFiltered) return;
    navigate("/products/price/");
    setIsFiltered(false);
  }, [dispatch, navigate, price, page, isFiltered]);

  useEffect(() => {
    if (location.pathname === "/products/price/") {
      dispatch(getAllProductsFilterByPriceAction(page, price));
    } else {
      dispatch(getAllProductsAction(page));
    }
  }, [page, dispatch, price, location.pathname]);

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
          <ProductList
            products={products}
            highestPrice={highestPrice}
            lowestPrice={lowestPrice}
            price={price}
            setPrice={setPrice}
            setIsFiltered={setIsFiltered}
          >
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
          {products.length !== 0 && (
            <PaginationList
              productsCount={productsCount}
              currentPage={currentPage}
              pageItems={10}
            />
          )}
        </Transition>
      )}
    </Container>
  );
};
export default Products;
