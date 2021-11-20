import React from "react";
import { useHistory } from "react-router-dom";

function ProductItem({ product, setModal, setSelectedProduct }) {
  const router = useHistory();

  return (
    <div className="product-item">
      <img
        src={product.image}
        alt={product.title}
        onClick={() => router.push(`/shop/${product.id}`)}
      />

      <p>{product.title.slice(0, 15)}</p>
      <p className="price">{product.price.toFixed(2) + " $"}</p>
      <button
        className="hidden"
        onClick={() => {
          setModal(true);
          setSelectedProduct(product.id);
        }}
      >
        + add to cart
      </button>
    </div>
  );
}

export default ProductItem;
