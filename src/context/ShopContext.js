import { useState, createContext } from "react";

export const ShopContext = createContext(null);

const ShopProvider = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  return (
    <ShopContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
