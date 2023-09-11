import { Button, Slider, Typography } from "@mui/material";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.css";

const ProductList = (props) => {
  function valueText(value) {
    return `${value}`;
  }
  const minDistance = 1;
  const maxValue = props.highestPrice;
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [newValue1, newValue2] = newValue.map((val) =>
      Math.min(Math.max(val, props.lowestPrice), maxValue)
    );

    if (activeThumb === 0) {
      props.setPrice([
        Math.min(newValue1, props.price[1] - minDistance),
        props.price[1],
      ]);
    } else {
      props.setPrice([
        props.price[0],
        Math.max(newValue2, props.price[0] + minDistance),
      ]);
    }
  };
  return props.products.length === 0 ? (
    <p>No products found</p>
  ) : (
    <>
      <div className={styles.container}>
        <ul>
          <li>
            <h2>Filter by price</h2>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={props.price}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              size="small"
              disableSwap
              max={maxValue}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                id="button-addon2"
                onClick={props.handleFiltering}
              >
                Filter
              </Button>
              <Typography className="ms-auto" variant="h7">
                Price : ${props.price[0]} — ${props.price[1]}{" "}
              </Typography>
            </div>
          </li>
          <li>
            <h2>Filter by category</h2>
            <ul className={styles.category}>
              <li>Category 1</li>
              <li>Category 2</li>
              <li>Category 3</li>
            </ul>
          </li>
        </ul>
        <div>
          {props.children}
          <ul className={styles.list}>
            {props.products.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductList;
