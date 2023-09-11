import { useLoaderData, useNavigation } from "react-router-dom";
import ProductList from "../../components/ProductsList/ProductsList";
import ProductItemSkeleton from "../../components/Skeletons/ProductItemSkeleton";
import Container from "../../components/Container/Container";
import Transition from "../../components/Transition/Transition";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Products.module.css";
const Products = () => {
  const { products, productsCount, currentPage, highestPrice, lowestPrice } =
    useLoaderData();
  
  const navigation = useNavigation();
  const skeletons = [];
  if (navigation.state === "loading") {
    for (let i = 0; i < 10; i++) {
      skeletons.push(<ProductItemSkeleton key={i} />);
    }
  }
  return (
    <Container>
      {navigation.state === "loading" ? (
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
const loader = async ({ request }) => {
  try {
    const clientUrl = new URL(request.url);
    const searchTerm = clientUrl.searchParams.get("page") || 1;
    const url = `http://localhost:5000/products?page=${searchTerm}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    data.currentPage = searchTerm;
    return data;
  } catch (error) {
    return error;
  }
};
export { loader };
export default Products;
