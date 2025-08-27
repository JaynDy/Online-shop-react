import React from "react";
import styles from "./InputComponent.module.css";

export const InputComponent = ({
  name,
  label,
  placeholder,
  touched,
  errors,
  handleChange,
  handleBlur,
  value,
}) => (
  <div className={styles.containerInput}>
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      className={touched && errors ? styles.inputError : ""}
    />
    {touched && errors && <div className={styles.error}>{errors}</div>}
  </div>
);
