import * as Yup from "yup";

export const validationSchemaShipment = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  apartment: Yup.string().required("Apartment is required"),
  city: Yup.string().required("City is required"),
  countryRegion: Yup.string().required("Country/Region is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("Zip is required"),
});

export const validationSchemaContact = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^\S*$/, "First name cannot contain spaces")
    .min(2, "First name must be minimum 2")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^\S*$/, "Last name cannot contain spaces")
    .min(2, "Last name must be minimum 2")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?\d{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .required("Phone is required"),
});
