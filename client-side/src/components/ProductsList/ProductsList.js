import { Button, Slider, Typography } from "@mui/material";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.css";
import { useState, useEffect } from "react";

const ProductList = (props) => {
  const [tempPrice, setTempPrice] = useState([
    props.lowestPrice,
    props.highestPrice,
  ]);
  const [isClicked, setIsClicked] = useState(false);
  function valueText(value) {
    return `${value}`;
  }
  const minDistance = 1;
  const maxValue = props.highestPrice;
  const handleChange = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [newValue1, newValue2] = newValue.map((val) =>
      Math.min(Math.max(val, props.lowestPrice), maxValue)
    );

    if (activeThumb === 0) {
      setTempPrice([
        Math.min(newValue1, tempPrice[1] - minDistance),
        tempPrice[1],
      ]);
    } else {
      setTempPrice([
        tempPrice[0],
        Math.max(newValue2, tempPrice[0] + minDistance),
      ]);
    }
  };
  useEffect(() => {
    if (!isClicked) return;
    props.setPrice(tempPrice);
    props.setIsFiltered(true);
    setIsClicked(false);
  }, [isClicked, tempPrice, props]);

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
              value={tempPrice}
              valueLabelDisplay="auto"
              onChange={handleChange}
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
                onClick={() => setIsClicked(true)}
              >
                Filter
              </Button>
              <Typography className="ms-auto" variant="h7">
                Price : ${tempPrice[0]} — ${tempPrice[1]}{" "}
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
