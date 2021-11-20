import React from "react";
import ProductItem from "./ProductItem";

function ProductsList({ products, setModal, setSelectedProduct }) {
  if (!products.length) {
    return <p className="empty">There is no products with your search!</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          product={product}
          key={product.id}
          setModal={setModal}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
}

export default ProductsList;
