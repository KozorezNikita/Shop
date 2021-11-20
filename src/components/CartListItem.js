import React from "react";

function CartListItem({ product, removeProduct, addAmount, removeAmount }) {
  const total = product.price * product.amount;
  return (
    <div className="check">
      <div className="image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="information">
        <p className="b">{product.title}</p>
        <p>{"Size: " + product.selectedSize}</p>
        <div className="amount">
          <button
            onClick={() => removeAmount(product.id, product.selectedSize)}
          >
            -
          </button>
          <p>{product.amount}</p>
          <button onClick={() => addAmount(product.id, product.selectedSize)}>
            +
          </button>
        </div>
      </div>

      <div className="price">
        <p className="b">{total.toFixed(2) + " $"}</p>
        <button onClick={() => removeProduct(product.id, product.selectedSize)}>
          X
        </button>
      </div>
    </div>
  );
}

export default CartListItem;
