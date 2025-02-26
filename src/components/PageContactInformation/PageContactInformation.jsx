import React from "react";
import { Header } from "../Header/Header";
import styles from "./PageContactInformation.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Links } from "../Links/Links";
import { InputComponent } from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppRoutes } from "../../AppRoutes";
import { validationSchemaContact } from "../../validationSchemas";

export const PageContactInformation = ({
  itemsCart,
  totalQuantity,
  onNextStepClick,
  onFormChange,
}) => {
  const form = useSelector((state) => state.form);
  const { items } = itemsCart;
  const navigate = useNavigate();
  const location = useLocation();
  const orderItems = location.state?.orderItems || [];

  console.log("PageContactInformation form", form);
  console.log("PageContactInformation orderItems", orderItems);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: form.firstName || "",
      lastName: form.lastName || "",
      email: form.email || "",
      phone: form.phone || "",
    },
    validationSchema: validationSchemaContact,
    onSubmit: (values, { setSubmitting }) => {
      onFormChange({ ...form, ...values });

      navigate(`${AppRoutes.ShipmentInformation}`, {
        state: { formData: { ...form, ...values }, orderItems: items },
      });

      setSubmitting(false);
    },
  });

  return (
    <div className={styles.container}>
      <Header totalQuantity={totalQuantity} />
      <Links onNextStepClick={onNextStepClick} />

      <form
        action=""
        className={styles.wrapperItem}
        onSubmit={formik.handleSubmit}
      >
        <h1>Contact information</h1>
        <div className={styles.ItemContainer}>
          <div className={styles.form}>
            <div className={styles.informationContainer}>
              <InputComponent
                type="text"
                name="firstName"
                label="First name*"
                placeholder="Enter your first name"
                touched={formik.touched.firstName}
                errors={formik.errors.firstName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.firstName}
              />

              <InputComponent
                type="text"
                name="lastName"
                label="Last name*"
                placeholder="Enter your last name"
                touched={formik.touched.lastName}
                errors={formik.errors.lastName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.lastName}
              />

              <InputComponent
                type="email"
                name="email"
                label="Email*"
                placeholder="Enter your email"
                touched={formik.touched.email}
                errors={formik.errors.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
              />

              <InputComponent
                type="tel"
                name="phone"
                label="Phone*"
                placeholder="Enter your phone"
                touched={formik.touched.phone}
                errors={formik.errors.phone}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
          </div>
        </div>
        <div className={styles.containerNextStep}>
          <button
            type="submit"
            className={styles.buttonNextStep}
            disabled={formik.isSubmitting}
          >
            <h5>Next step</h5>
          </button>
        </div>
      </form>
    </div>
  );
};
