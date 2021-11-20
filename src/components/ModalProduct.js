import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import MySelect from "./UI/select/MySelect";

function ModalProduct({ products, selectedProduct, setModal, size, setSize }) {
  const { shoppingCart, setShoppingCart } = useContext(ShopContext);
  const product = products[selectedProduct - 1];

  const addProduct = () => {
    const exist = shoppingCart.find(
      (p) => p.id === product.id && p.selectedSize === size
    );
    if (exist) {
      setShoppingCart(
        shoppingCart.map((p) =>
          p.id === product.id && p.selectedSize === size
            ? { ...exist, amount: exist.amount + 1 }
            : p
        )
      );
    } else {
      setShoppingCart(
        shoppingCart.concat([
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            selectedSize: size,
            amount: 1,
          },
        ])
      );
    }
  };

  return (
    <div>
      {selectedProduct !== null ? (
        <div className="modal-product">
          <p> {product.title.slice(0, 15)} </p>
          <img src={product.image} alt={product.title} />

          <MySelect
            value={size}
            onChange={(e) => setSize(e)}
            options={[
              { value: "S", name: "S" },
              { value: "M", name: "M" },
            ]}
            defaultValue="choose a size"
          />
          <button
            disabled={size === ""}
            onClick={() => {
              addProduct();
              setSize("");
              setModal(false);
            }}
          >
            add to a shopping cart
          </button>
          <button onClick={() => setModal(false)}>continue buying</button>
        </div>
      ) : (
        <div>Please, choose some product</div>
      )}
    </div>
  );
}

export default ModalProduct;
