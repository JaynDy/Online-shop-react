import React from "react";
import { Header } from "../Header/Header";
import styles from "./PageShipmentInformation.module.css";
import { Links } from "../Links/Links";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "../Dropdown/Dropdown";
import { InputComponent } from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { AppRoutes } from "../../AppRoutes";
import { validationSchemaShipment } from "../../validationSchemas";

export const PageShipmentInformation = ({
  itemsCart,
  totalQuantity,
  onNextStepClick,
  onFormChange,
}) => {
  const form = useSelector((state) => state.form);
  const { items } = itemsCart;
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};
  const orderItems = location.state?.orderItems || [];

  console.log("PageContactInformation orderItems", orderItems);
  console.log("PageShipmentInformation form", form);
  console.log("PageShipmentInformation formData", formData);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: form.address || "",
      apartment: form.apartment || "",
      city: form.city || "",
      countryRegion: form.countryRegion || "",
      state: form.state || "",
      zip: form.zip || "",
    },
    validationSchema: validationSchemaShipment,

    onSubmit: (values, { setSubmitting }) => {
      onFormChange({ ...form, ...values });

      navigate(`${AppRoutes.CompletedOrder}`, {
        state: { formData: { ...form, ...values }, orderItems: items },
      });
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.container}>
      <Header totalQuantity={totalQuantity} />
      <Links onNextStepClick={onNextStepClick} />

      <form className={styles.wrapperItem} onSubmit={formik.handleSubmit}>
        <h1>Shipment information</h1>
        <div className={styles.ItemContainer}>
          <div className={styles.form}>
            <div className={styles.informationContainer}>
              <div className={styles.inputContainer}>
                <InputComponent
                  type="text"
                  name="address"
                  label="Address (No P. O. Boxes)*"
                  placeholder="Enter your address"
                  touched={formik.touched.address}
                  errors={formik.errors.address}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.address}
                />

                <InputComponent
                  type="text"
                  name="apartment"
                  label="Apartment, suite etc. (optional)*"
                  placeholder="Enter your apartment information"
                  touched={formik.touched.apartment}
                  errors={formik.errors.apartment}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.apartment}
                />

                <InputComponent
                  type="text"
                  name="city"
                  label="City*"
                  placeholder="Enter your city"
                  touched={formik.touched.city}
                  errors={formik.errors.city}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.city}
                />

                <div className={styles.selectContainer}>
                  <Dropdown
                    name="countryRegion"
                    label="Country/Region*"
                    placeholder="Select your country/region*"
                    touched={formik.touched.countryRegion}
                    errors={formik.errors.countryRegion}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.countryRegion}
                  />

                  <Dropdown
                    label="State*"
                    name="state"
                    placeholder="Select your state"
                    touched={formik.touched.state}
                    errors={formik.errors.state}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.state}
                  />

                  <InputComponent
                    type="text"
                    name="zip"
                    label="ZIP code*"
                    placeholder="Enter your ZIP code"
                    touched={formik.touched.zip}
                    errors={formik.errors.zip}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.zip}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.containerSubmitOrder}>
          <button
            type="submit"
            className={styles.buttonSubmitOrder}
            disabled={formik.isSubmitting}
          >
            <h5>Submit order</h5>
          </button>
        </div>
      </form>
    </div>
  );
};
