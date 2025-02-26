import React from "react";
import styles from "./Links.module.css";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../AppRoutes";

export const Links = ({ onHandleNextStep, onNextStepClick }) => {
  return (
    <div className={styles.links}>
      <nav>
        <ul>
          <li>
            <NavLink
              to={AppRoutes.Cart}
              className={({ isActive }) =>
                isActive ? styles.active : styles.hover
              }
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to={AppRoutes.ContactInformation}
              className={({ isActive }) =>
                isActive && !onHandleNextStep ? styles.active : styles.hover
              }
              onClick={onHandleNextStep}
            >
              Contact information
            </NavLink>
          </li>
          <li>
            <NavLink
              to={AppRoutes.ShipmentInformation}
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={onNextStepClick}
            >
              Shipment information
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
