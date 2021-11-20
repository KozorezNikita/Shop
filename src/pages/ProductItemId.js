import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../components/UI/Loader/MyLoader";
import ProductsService from "../API/ProductsService";

function ProductItemId() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [fetchProductsById, isLoading] = useFetching(async (id) => {
    const response = await ProductsService.getById(id);
    setProduct(response);
  });

  useEffect(() => {
    fetchProductsById(params.id);
  }, []);

  return (
    <div>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div className="product-id">
          <div className="hidden">
            <p className="b">{product.title}</p>
            <p>{product.category}</p>
          </div>

          <img src={product.image} alt={product.title} />

          <div className="product-info">
            <p className="b hidden">{product.title}</p>
            <p className="hidden">{product.category}</p>
            <p className="b">{product.price + "$"}</p>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItemId;
