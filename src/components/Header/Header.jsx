import React from "react";
import Cart from "../../svg/Cart.svg";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../AppRoutes";

export const Header = ({ totalQuantity }) => {
  console.log("totalQuantity", totalQuantity);

  return (
    <header>
      <div className={styles.topPanel}>
        <Link to={AppRoutes.Home} className={styles.logoContainer}>
          <div className={styles.greenRhombus}></div>
          <div className={styles.grayRhombus}></div>
          <h1 className={styles.titleLogo}>Goods</h1>
        </Link>

        <Link to={AppRoutes.Cart} className={styles.cartContainer}>
          <div className={styles.amountOfGoods}>
            <span>{totalQuantity}</span>
          </div>

          <img src={Cart} alt="" />
          <b>Cart</b>
        </Link>
      </div>
    </header>
  );
};
