import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

function CartPayment({ shoppingCart }) {
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(10);
  const sum = total + shipping;

  useEffect(() => {
    setTotal(shoppingCart.reduce((a, v) => (a = a + v.price * v.amount), 0));
  }, [shoppingCart]);

  useEffect(() => {
    if (total > 100) {
      setShipping(0);
    } else {
      setShipping(10);
    }
  }, [total]);

  return (
    <div className="pay">
      <p>Price: {total.toFixed(2) + " $"}</p>
      <p>Shipping: {shipping.toFixed(2) + " $"} </p>
      <p className="b">
        Total: {sum.toFixed(2) + " $"}
      </p>
      <button>Go to checkout</button>
    </div>
  );
}

export default CartPayment;
