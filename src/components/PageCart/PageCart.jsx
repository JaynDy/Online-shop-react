import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import styles from "./PageCart.module.css";
import { Links } from "../Links/Links";
import Delete from "../../svg/Delete.svg";

export const PageCart = ({
  itemsCart,
  totalQuantity,
  onAddItemInCart,
  onDecreaseItemInCart,
  onDeleteItemInCart,
  onHandleNextStep,
  onNextStepClick,
}) => {
  const { items } = itemsCart;
  console.log("items ", items);
  const formattedTotalPrice = itemsCart.totalPrice.toFixed(2);

  return (
    <div className={styles.container}>
      <Header totalQuantity={totalQuantity} />
      <Links
        onHandleNextStep={onHandleNextStep}
        onNextStepClick={onNextStepClick}
      />

      <div className={styles.wrapperItem}>
        <h1>Cart</h1>
        <div className={styles.ItemContainer}>
          {items.map((item, index) => (
            <div key={index} className={styles.ItemCart}>
              <img
                src={item.product.images[0]}
                alt=""
                className={styles.ItemCardsImage}
              />
              <div className={styles.aboutItemCart}>
                <div className={styles.wrapperDescription}>
                  <div className={styles.descriptionItemCart}>
                    <h2>{item.product.title}</h2>
                    <p>{item.product.description}</p>
                  </div>

                  <div
                    className={styles.buttonContainer}
                    onClick={() => onDeleteItemInCart(item)}
                  >
                    <img src={Delete} alt="" />
                    <b>Delete</b>
                  </div>
                </div>

                <div className={styles.wrapperDescription}>
                  <div className={styles.quantity}>
                    <div
                      className={`${styles.minus} ${
                        item.product.quantity === 1 ? styles.disabled : ""
                      }`}
                      onClick={() => onDecreaseItemInCart(item.product.id)}
                      disabled={item.product.quantity === 1}
                    >
                      -
                    </div>
                    <span>{item.product.quantity}</span>
                    <div
                      className={styles.plus}
                      onClick={() => onAddItemInCart(item.product)}
                    >
                      +
                    </div>
                  </div>

                  <p className={styles.price}>
                    <b>Price:</b> ${item.product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.containerTotalQuantity}>
          <div className={styles.totalQuantity}>
            <h3>Together: </h3>
            <h4>
              {items.length} {items.length === 1 ? "product." : "products."}
            </h4>
          </div>
          <div className={styles.totalQuantity}>
            <h3>Sum: </h3>
            <h4>${formattedTotalPrice}</h4>
          </div>
          <Link
            className={styles.buttonNextStep}
            onClick={(e) => {
              onHandleNextStep(e);
              onNextStepClick(e);
            }}
          >
            <h5>Next step</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};
