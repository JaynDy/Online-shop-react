import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  countryRegion: "",
  state: "",
  zip: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },

    clearForm(state) {
      return initialState;
    },
  },
});
