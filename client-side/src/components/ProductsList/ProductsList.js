import { Button, Slider, Typography } from "@mui/material";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductList = ({ allProducts, setPrice, children, price}) => {
  const { lowestPrice, highestPrice } = useSelector((state) => state.productsReducer);
  const navigate = useNavigate();
  const products = [];
  for(let i = 0; i < Math.min(allProducts.length, 10); i++) {
    products.push(<ProductItem product={allProducts[i]} key={i} />);
  }
  const [tempPrice, setTempPrice] = useState(price);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    setTempPrice(price);
  },[price])
  function valueText(value) {
    return `${value}`;
  }
  const minDistance = 1;
  const handleChange = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    const [newValue1, newValue2] = newValue.map((val) =>
      Math.min(Math.max(val, lowestPrice), highestPrice)
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
    setPrice(tempPrice);
    navigate("/products/price/");
    setIsClicked(false);
  }, [isClicked, tempPrice, navigate, setPrice]);
  return (
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
            max={highestPrice}
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
      {products.length === 0 ? (
        <p className={styles.p}>No products found</p>
      ) : (
        <div>
          {children}
          <ul className={styles.list}>
            {products}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductList, (prevProps, nextProps) => {
  return false;
});
