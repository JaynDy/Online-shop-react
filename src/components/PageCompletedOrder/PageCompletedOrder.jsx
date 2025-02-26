import React, { useEffect, useMemo } from "react";
import { Header } from "../Header/Header";
import styles from "./PageCompletedOrder.module.css";
import { Link } from "react-router-dom";
import CompletedImg from "../../svg/Completed.svg";
import PersonImg from "../../svg/Person.svg";
import TruckImg from "../../svg/Truck.svg";
import InfImg from "../../svg/Inf.svg";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

export const PageCompletedOrder = ({
  itemsCart,
  totalQuantity,
  onClearPagesData,
}) => {
  const currentDate = format(new Date(), "d MMM yyyy");
  const location = useLocation();
  const formData = location.state?.formData || {};
  const orderItems = location.state?.orderItems || [];

  console.log("PageContactInformation orderItems", orderItems);
  console.log("PageCompletedOrder formData", formData);
  console.log("itemsCart", itemsCart.items);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((total, item) => {
      return total + item.product.price * item.product.quantity;
    }, 0);
  }, [orderItems]);

  const formattedTotalPrice = totalPrice.toFixed(2);

  useEffect(() => {
    onClearPagesData();
  }, [onClearPagesData]);

  return (
    <div className={styles.container}>
      <Header totalQuantity={totalQuantity} />

      <div className={styles.wrapperItem}>
        <img src={CompletedImg} alt="" />
        <h6>Thank you for your order!</h6>
        <p className={styles.confirmationText}>
          The order confirmation email with details of your order and a link to
          track its progress has been sent to your email address.
        </p>
        <p className={styles.orderNumber}>
          Your order # is 000000003 - PENDING
        </p>
        <p className={styles.orderData}>Order Date: {currentDate}</p>

        <div className={styles.containerInformation}>
          <div className={styles.wrapperInformation}>
            <div className={styles.information}>
              <img src={PersonImg} alt="" />
              <h4>Contact information</h4>
            </div>
            <div className={styles.customerName}>
              {formData.firstName} {formData.lastName}
            </div>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
          </div>
          <div className={styles.wrapperInformation}>
            <div className={styles.information}>
              <img src={TruckImg} alt="" />
              <h4>Shipment information</h4>
            </div>
            <div className={styles.customerAddress}>
              {`${formData.address}
             Apt ${formData.apartment}
             `}{" "}
            </div>
            <p>{`${formData.city}
             ${formData.state}
             ${formData.zip}`}</p>
            <p>{`${formData.countryRegion}`}</p>
          </div>
        </div>
        <div className={styles.containerOrderSummary}>
          <div className={styles.wrapperCardOrder}>
            <div className={styles.information}>
              <img src={InfImg} alt="" />
              <h4>Order summary</h4>
            </div>
            <div className={styles.ItemContainer}>
              {orderItems.map((item, index) => (
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
                        <div className={styles.productDescription}>
                          {item.product.description}
                        </div>
                      </div>
                    </div>

                    <p className={styles.price}>{`$${
                      item.product.price * item.product.quantity
                    },  ${item.product.quantity} ${
                      item.product.quantity === 1 ? "product" : "products"
                    }`}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card"></div>
            <div className={styles.wrapperSummary}>
              <div className={styles.subtotal}>Subtotal:</div>
              <span>${formattedTotalPrice}</span>
            </div>
            <div className={styles.wrapperSummary}>
              <div className={styles.shippingAndHandling}>
                Shipping & Handling:
              </div>
              <span>$0.00</span>
            </div>
            <div className={styles.wrapperSummary}>
              <div className="tax">Tax:</div>
              <span>$0.00</span>
            </div>
            <div className={styles.wrapperSummary}>
              <div className={styles.grandTotal}>Grand Total:</div>
              <span className={styles.grandTotal}>${formattedTotalPrice}</span>
            </div>
          </div>
        </div>
        <div className={styles.containerContinueShopping}>
          <Link to="/" className={styles.buttonContinueShopping}>
            <h5>Continue shopping</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};
