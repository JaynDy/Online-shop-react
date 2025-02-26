import styles from "./MainPage.module.css";
import { Header } from "../Header/Header";
import { ProductsList } from "../ProductsList/ProductsList";

export const MainPage = ({
  products,
  onAddItemInCart,
  itemsCart,
  totalQuantity,
}) => {
  // console.log("MainPage = ({ products })", products);

  return (
    <div>
      <Header totalQuantity={totalQuantity} />
      <ProductsList
        products={products}
        itemsCart={itemsCart}
        onAddItemInCart={onAddItemInCart}
      />
    </div>
  );
};
