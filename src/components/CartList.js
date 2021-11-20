import React from "react";
import CartListItem from "./CartListItem";

function CartList({ shoppingCart, removeProduct, addAmount, removeAmount }) {
  return (
    <>
      {shoppingCart.map((product) => (
        <CartListItem
          key ={product.title}
          product={product}
          removeProduct={removeProduct}
          removeAmount={removeAmount}
          addAmount={addAmount}
        />
      ))}
    </>
  );
}

export default CartList;
