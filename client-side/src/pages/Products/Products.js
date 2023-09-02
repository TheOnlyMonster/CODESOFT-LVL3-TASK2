import { useLoaderData, useNavigation } from "react-router-dom";
import ProductList from "../../components/ProductsList/ProductsList";
import ProductItemSkeleton from "../../components/Skeletons/ProductItemSkeleton";
import Container from "../../components/Container/Container";
import Transition from "../../components/Transition/Transition";
const Products = () => {

  const products = useLoaderData();
  const navigation = useNavigation();
  const skeletons = [];
  if (navigation.state === "loading") {
    for (let i = 0; i < 6; i++) {
      skeletons.push(<ProductItemSkeleton key={i} />);
    }
  }
  return (
    <Container>
      {navigation.state === "loading" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "25px",
          }}
        >
          {skeletons}
        </div>
      ) : (
        <Transition>
          <ProductList products={products} />
        </Transition>
      )}
    </Container>
  );
};
const loader = async () => {
  try {
    const response = await fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const products = await response.json();
    return products;
  } catch (error) {
    return error;
  }
};
export { loader };
export default Products;
