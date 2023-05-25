import { useEffect } from "react";

const Products = () => {
  const fetchProducts = async () => {
    const res = await import("./products.json");
    console.log(res.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return <h1>Products</h1>;
};

export default Products;
