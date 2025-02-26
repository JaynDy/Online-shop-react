import React from "react";
import styles from "./ProductsList.module.css";
import AddToCart from "../../svg/AddToCart.svg";
import Added from "../../svg/Added.svg";

export const ProductsList = ({ products, itemsCart, onAddItemInCart }) => {
  // console.log("ProductsList products", products);
  // console.log("ProductsList itemsCart", itemsCart);

  return (
    <div className={styles.producList}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <img src={product.images[0]} alt="" className={styles.product} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          {itemsCart.items.some((item) => item.product.id === product.id) ? (
            <img src={Added} className={styles.addToCart} />
          ) : (
            <img
              src={AddToCart}
              className={styles.addToCart}
              onClick={() => onAddItemInCart(product)}
            ></img>
          )}
        </div>
      ))}
    </div>
  );
};
