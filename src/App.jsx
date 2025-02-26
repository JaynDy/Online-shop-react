import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageCart } from "./components/PageCart/PageCart";
import { PageContactInformation } from "./components/PageContactInformation/PageContactInformation";
import { PageShipmentInformation } from "./components/PageShipmentInformation/PageShipmentInformation";
import { PageCompletedOrder } from "./components/PageCompletedOrder/PageCompletedOrder";
import { MainPage } from "./components/MainPage/MainPage";
import { cartSlice } from "./reducer/CartSlice";
const { addItem, decreaseItem, deleteItem, clearCart } = cartSlice.actions;
import { formSlice } from "./reducer/FormSlice";
const { updateFormData, clearForm } = formSlice.actions;
import { productSlice } from "./reducer/ProductSlice";
const { setProducts } = productSlice.actions;
import { AppRoutes } from "./AppRoutes";

export default function App() {
  const dispatch = useDispatch();
  const itemsCart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.products);
  const form = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [formSubmitted] = useState();

  // console.log("App() products", products);
  console.log("form", form);
  console.log("App() itemsCart", itemsCart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const fetchProducts = () => async (dispatch) => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      dispatch(setProducts(data.products));
      // console.log("fetchProducts setProducts(data.products)", data.products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleAddItemInCart = (product) => {
    if (product) {
      dispatch(addItem({ product }));
      // console.log("handleAddItemInCart product", product);
    }
    return;
  };

  const handlDecreaseItemInCart = (itemId) => {
    if (itemId) {
      dispatch(decreaseItem(itemId));
      // console.log("handleRemoveItemInCart itemId", itemId);
    }
    return;
  };

  const handlDeleteItemInCart = (item) => {
    if (item) {
      dispatch(deleteItem(item.product.id));
      // console.log("handleRemoveItemInCart itemId", item);
    }
    return;
  };

  const totalQuantity = useMemo(() => {
    console.log(itemsCart);
    if (itemsCart && itemsCart.items) {
      return itemsCart.items.length;
    }
    return 0;
  }, [itemsCart]);

  console.log("totalQuantity", totalQuantity);

  const handleClearPagesData = () => {
    dispatch(clearCart());
    dispatch(clearForm());
    console.log(clearForm());
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (itemsCart.items.length > 0) {
      navigate(`${AppRoutes.ContactInformation}`, {
        state: { orderItems: itemsCart.items },
      });
    }
  };

  const handleNextStepClick = (e) => {
    if (!formSubmitted) {
      e.preventDefault();
    }
  };

  const handleFormChange = (form) => {
    dispatch(updateFormData(form));
    console.log("form", form);
  };

  return (
    <>
      <div className="app">
        <Routes>
          <Route
            path={AppRoutes.Home}
            element={
              <MainPage
                itemsCart={itemsCart}
                totalQuantity={totalQuantity}
                products={products}
                onAddItemInCart={handleAddItemInCart}
              />
            }
          ></Route>
          <Route
            path={AppRoutes.Cart}
            element={
              <PageCart
                itemsCart={itemsCart}
                totalQuantity={totalQuantity}
                onAddItemInCart={handleAddItemInCart}
                onDecreaseItemInCart={handlDecreaseItemInCart}
                onDeleteItemInCart={handlDeleteItemInCart}
                onHandleNextStep={handleNextStep}
                onNextStepClick={handleNextStepClick}
              />
            }
          ></Route>
          <Route
            path={AppRoutes.ContactInformation}
            element={
              <PageContactInformation
                itemsCart={itemsCart}
                totalQuantity={totalQuantity}
                onFormChange={handleFormChange}
                onNextStepClick={handleNextStepClick}
              />
            }
          ></Route>
          <Route
            path={AppRoutes.ShipmentInformation}
            element={
              <PageShipmentInformation
                itemsCart={itemsCart}
                totalQuantity={totalQuantity}
                onFormChange={handleFormChange}
                onNextStepClick={handleNextStepClick}
              />
            }
          ></Route>
          <Route
            path={AppRoutes.CompletedOrder}
            element={
              <PageCompletedOrder
                itemsCart={itemsCart}
                totalQuantity={totalQuantity}
                onClearPagesData={handleClearPagesData}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}
