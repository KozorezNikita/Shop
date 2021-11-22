import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useProducts } from "../hooks/useProducts";
import { useFetching } from "../hooks/useFetching";
import ProductsService from "../API/ProductsService";
import MyModal from "../components/UI/Modal/MyModal";
import ModalProduct from "../components/ModalProduct";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ selectedSort: "", selectedText: "" });
  const [size, setSize] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fetchProducts, isProductsLoading, productError] = useFetching(async () => {
    const products = await ProductsService.getAll();
    setTotalCount(products.data.length);
    setProducts(products.data.slice(0, 8 * page));
    
  });
  const sortedAndSearchedProducts = useProducts(
    products,
    search.selectedSort,
    search.selectedText
  );
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page ]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [isProductsLoading]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        20 &&
      products.length < totalCount
    ) {
      setPage(page + 1);
    }
  };

  return (
    <div className="shop">
      <SearchBar products={products} search={search} setSearch={setSearch} />
      <MyModal visible={modal} setVisible={setModal}>
        <ModalProduct
          products={products}
          selectedProduct={selectedProduct}
          setModal={setModal}
          size={size}
          setSize={setSize}
        />
      </MyModal>
      {productError ?
            <h1 className="empty">Произошла ошибка ${productError}</h1> :
            
      <ProductList
        products={sortedAndSearchedProducts}
        setModal={setModal}
        setSelectedProduct={setSelectedProduct}
      />}
      {isProductsLoading && <MyLoader />}
    </div>
  );
}

export default Shop;
/*

/// try to fetch by 8









/// weird working dynamic pagination (infinite scroll)


import React, { useEffect, useState, useMemo, useRef } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useProducts } from "../hooks/useProducts";
import { useFetching } from "../hooks/useFetching";
import ProductsService from "../API/ProductsService";
import MyModal from "../components/UI/Modal/MyModal";
import ModalProduct from "../components/ModalProduct";

function Shop() {


  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ selectedSort: "", selectedText: "" });
  const [size, setSize] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fetchProducts, isProductsLoading] = useFetching(async () => {
    const response = await ProductsService.getAll();
    
    setProducts(response.data.slice(0, 8 * page));
  });
  const sortedAndSearchedProducts = useProducts(
    products,
    search.selectedSort,
    search.selectedText
  );
  const [page, setPage] = useState(1);
  
  const lastElement = useRef();
  const observer = useRef();


  



  

  useEffect(() => {
    fetchProducts();
  }, [page]);


  useEffect(() => {
    if (isProductsLoading) return;
    if (observer.current) observer.current.disconnect();
  var callback = function(entries, observer) {
   
      if (entries[0].isIntersecting && page < 4 ) {
       
        setPage(page + 1)
      
        
      
      
    }
};
observer.current = new IntersectionObserver(callback);
observer.current.observe(lastElement.current)
}, [isProductsLoading])










return (
  <div className="shop">
    <p>{page}</p>
    <SearchBar products={products} search={search} setSearch={setSearch} />
    <MyModal visible={modal} setVisible={setModal}>
      <ModalProduct
        products={products}
        selectedProduct={selectedProduct}
        setModal={setModal}
        size={size}
        setSize={setSize}
      />
    </MyModal>
    <ProductList
        products={sortedAndSearchedProducts}
        setModal={setModal}
        setSelectedProduct={setSelectedProduct}
        
      />
      <div ref={lastElement} className="observer">Hello there!</div>
    {isProductsLoading && <MyLoader />
    
      
      
       
      
      
    } 
  </div>
);
}

export default Shop;







/// pagination LIMIT AND PAGE
import React, { useEffect, useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useProducts } from "../hooks/useProducts";
import { useFetching } from "../hooks/useFetching";
import ProductsService from "../API/ProductsService";
import MyModal from "../components/UI/Modal/MyModal";
import ModalProduct from "../components/ModalProduct";



import { getPageCount, getPagesArray } from "../utils/page";

function Shop() {

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);




  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ selectedSort: "", selectedText: "" });
  const [size, setSize] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  let pagesArray = getPagesArray(totalPages);

  

  const [fetchProducts, isProductsLoading] = useFetching(async (limit, page) => {
    const response = await ProductsService.getAll(limit, page);
    setProducts(response.data);
    console.log(response.headers["x-total-count"])
    setTotalCount(response.headers["x-total-count"])
    console.log(response.data.slice(0,10))
    const totalCount = response.data.length;
    setTotalPages(getPageCount(totalCount, limit))

  });
  const sortedAndSearchedProducts = useProducts(
    products,
    search.selectedSort,
    search.selectedText
  );


  







  

  useEffect(() => {
    fetchProducts(limit, page);
  }, []);



 const changePage = (page) =>  {
   setPage(page);
   fetchProducts(limit, page)
 }








  return (
    <div className="shop">
      <SearchBar products={products} search={search} setSearch={setSearch} />
      <MyModal visible={modal} setVisible={setModal}>
        <ModalProduct
          products={products}
          selectedProduct={selectedProduct}
          setModal={setModal}
          size={size}
          setSize={setSize}
        />
      </MyModal>
      {isProductsLoading ? (
        <MyLoader />
      ) : (
        <>
        <ProductList
          products={sortedAndSearchedProducts}
          setModal={setModal}
          setSelectedProduct={setSelectedProduct}
          
        />
        {pagesArray.map(p => <span onClick={() => changePage(p)} className={page === p ? "Lyon" : ""}>p</span>)}
        </>
        
      )}
    </div>
  );
}

export default Shop;




/// Pagination
import Pagination from "../components/UI/Pagination/Pagination";
import React, { useEffect, useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useProducts } from "../hooks/useProducts";
import { useFetching } from "../hooks/useFetching";
import ProductsService from "../API/ProductsService";
import MyModal from "../components/UI/Modal/MyModal";
import ModalProduct from "../components/ModalProduct";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ selectedSort: "", selectedText: "" });
  const [size, setSize] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fetchProducts, isProductsLoading] = useFetching(async () => {
    const products = await ProductsService.getAll();
    setProducts(products);
    
  });
  const sortedAndSearchedProducts = useProducts(
    products,
    search.selectedSort,
    search.selectedText
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);

  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage; 
  const currentProduct = sortedAndSearchedProducts.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
}




  useEffect(() => {
    fetchProducts();
  }, []);



 








  return (
    <div className="shop">
      <SearchBar products={products} search={search} setSearch={setSearch} />
      <MyModal visible={modal} setVisible={setModal}>
        <ModalProduct
          products={products}
          selectedProduct={selectedProduct}
          setModal={setModal}
          size={size}
          setSize={setSize}
        />
      </MyModal>
      {isProductsLoading ? (
        <MyLoader />
      ) : (
        <>
        <ProductList
          products={currentProduct}
          setModal={setModal}
          setSelectedProduct={setSelectedProduct}
          
        />
        {products.length ? <div><div className="fofo">Hello there!</div><Pagination currentPage={currentPage} productPerPage={productPerPage}  totalProducts={products.length} paginate={paginate}/></div> : null }
        </>
        
      )}
    </div>
  );
}

export default Shop;






/// SHOP WITHOUT ANY PAGINATION OR SCROLL

  import React, { useEffect, useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useProducts } from "../hooks/useProducts";
import { useFetching } from "../hooks/useFetching";
import ProductsService from "../API/ProductsService";
import MyModal from "../components/UI/Modal/MyModal";
import ModalProduct from "../components/ModalProduct";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState({ selectedSort: "", selectedText: "" });
  const [size, setSize] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fetchProducts, isProductsLoading] = useFetching(async () => {
    const products = await ProductsService.getAll();
    setProducts(products);
    
  });
  const sortedAndSearchedProducts = useProducts(
    products,
    search.selectedSort,
    search.selectedText
  );



  

  useEffect(() => {
    fetchProducts();
  }, []);



 








  return (
    <div className="shop">
      <SearchBar products={products} search={search} setSearch={setSearch} />
      <MyModal visible={modal} setVisible={setModal}>
        <ModalProduct
          products={products}
          selectedProduct={selectedProduct}
          setModal={setModal}
          size={size}
          setSize={setSize}
        />
      </MyModal>
      {isProductsLoading ? (
        <MyLoader />
      ) : (
        
        <ProductList
          products={sortedAndSearchedProducts}
          setModal={setModal}
          setSelectedProduct={setSelectedProduct}
          
        />
        
        
      )}
    </div>
  );
}

export default Shop;







































  */
