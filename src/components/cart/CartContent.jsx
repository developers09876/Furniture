import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";

const CartContent = () => {
  const { cart } = useContext(CartContext);
  return (
    <>
      {cart.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.images[0]}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            unit={item.unit}
            categorz={item.categorz}
            selectedDimension={item.selectedDimension}
            thickness={item.thickness}
          />
        );
      })}
    </>
  );
};

export default CartContent;
