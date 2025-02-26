import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./reducer/ProductSlice";
import { cartSlice } from "./reducer/CartSlice";
import { formSlice } from "./reducer/FormSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    form: formSlice.reducer,
  },
});
