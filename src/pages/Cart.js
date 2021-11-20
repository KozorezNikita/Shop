import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import CartList from "../components/CartList";
import CartPayment from "../components/CartPayment";

function Cart() {
  const { shoppingCart, setShoppingCart } = useContext(ShopContext);

  useEffect(() => {
    shoppingCart.map((product) => {
      if (product.amount === 0) {
        removeProduct(product.id, product.selectedSize);
      }
      return product;
    });
  }, [shoppingCart]);

  const removeProduct = (id, size) => {
    let remainingProducts = shoppingCart.filter(
      (product) => id !== product.id || product.selectedSize !== size
    );
    setShoppingCart(remainingProducts);
  };

  const addAmount = (id, size) => {
    const newProduct = shoppingCart.map((product) => {
      let amount = product.amount;
      if (id === product.id && product.selectedSize === size) {
        return { ...product, amount: amount + 1 };
      }
      return product;
    });
    setShoppingCart(newProduct);
  };

  const removeAmount = (id, size) => {
    const newProduct = shoppingCart.map((product) => {
      let amount = product.amount;
      if (id === product.id && product.selectedSize === size) {
        return { ...product, amount: amount - 1 };
      }
      return product;
    });
    setShoppingCart(newProduct);
  };

  return (
    <>
      {shoppingCart.length ? (
        <div className="cart">
          <div className="row1">
            <CartList
              shoppingCart={shoppingCart}
              removeProduct={removeProduct}
              removeAmount={removeAmount}
              addAmount={addAmount}
            />
          </div>
          <div className="row2">
            <CartPayment shoppingCart={shoppingCart} />
          </div>
        </div>
      ) : (
        <p className="empty">Your cart is empty!</p>
      )}
    </>
  );
}

export default Cart;
