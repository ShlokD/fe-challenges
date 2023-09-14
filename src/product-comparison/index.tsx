import { useState } from "react";

import HomeLink from "../home-link";

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

type Header = "id" | "title" | "description" | "price" | "images";
const ProductComparisonTable = ({ products }: { products: Product[] }) => {
  const [skip, setSkip] = useState<Record<string, boolean>>({});
  if (products.length < 2) {
    return null;
  }

  const handleToggle = (header: string) => {
    setSkip((prev) => {
      if (prev[header]) {
        return { ...prev, [header]: false };
      } else;
      {
        return { ...prev, [header]: true };
      }
    });
  };
  const originalHeaders = Object.keys(products[0]).filter(
    (h) =>
      h !== "title" &&
      h !== "stock" &&
      h !== "category" &&
      h !== "thumbnail" &&
      h !== "images" &&
      h !== "id",
  );

  const filteredHeaders = originalHeaders.filter((h) => !skip[h]);
  const headers = ["title", ...filteredHeaders];
  return (
    <div className="flex flex-col">
      <div className="flex">
        {originalHeaders.map((h, i) => {
          return (
            <div className="px-6 py-3 flex flex-wrap gap-2" key={`select-${i}`}>
              <input
                type="checkbox"
                id={`attribute-${i}`}
                checked={!skip[h]}
                onChange={() => handleToggle(h)}
              />
              <label className="text-lg" htmlFor={`attribute-${i}`}>
                {h}
              </label>
            </div>
          );
        })}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((h, i) => {
              return (
                <th scope="col" className="px-6 py-3" key={`header-${i}`}>
                  {h}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={`row-${i}`}
              >
                {headers.map((h, i) => {
                  return (
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white"
                      key={`entry-${i}`}
                    >
                      {p[h as Header]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ProductComparison = () => {
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [errorMsg, setErrorMsg] = useState("Select a category to get started");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [comparison, setComparison] = useState<Record<number, boolean>>({});

  const fetchProducts = async (category: string) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      const json = await res.json();
      setProducts((prev) => {
        return { ...prev, [category]: json?.products || [] };
      });
      setErrorMsg("");
      setComparison({});
    } catch (e) {
      setErrorMsg("No products found");
    }
  };

  const handleCategoryClick = async (i: number) => {
    const category = categories[i];
    if (category) {
      setSelectedCategory(i);
      if (!products[category] || products?.[category]?.length === 0) {
        await fetchProducts(category);
      }
    }
  };

  const handleProductCheck = (id: number) => {
    setComparison((prev) => {
      if (prev[id]) {
        return { ...prev, [id]: false };
      } else {
        return { ...prev, [id]: true };
      }
    });
  };

  const selectedCategoryName = categories[selectedCategory] || "";
  const selectedProducts = products[selectedCategoryName] || [];
  const cProducts = selectedProducts.filter((p) => comparison[p.id]);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Product Comparison</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-4">
        <div className="flex overflow-x-scroll  gap-2">
          {categories.map((category, i) => {
            return (
              <button
                key={`category-${i}`}
                className={`${
                  category === selectedCategoryName ? "font-bold" : ""
                } text-lg py-2 px-4`}
                onClick={() => handleCategoryClick(i)}
              >
                {category}
              </button>
            );
          })}
        </div>
        {errorMsg && selectedProducts.length === 0 && (
          <p className="text-4xl font-bold self-center text-center p-4">
            {errorMsg}
          </p>
        )}
        <ProductComparisonTable products={cProducts} />

        <div className="flex flex-wrap my-8 items-baseline justify-center gap-8">
          {selectedProducts.length > 0 &&
            selectedProducts.map((p, i) => {
              return (
                <div
                  className="flex flex-col lg:w-1/4  w-1/3 "
                  key={`product-${i}`}
                >
                  <input
                    id={`product-${i}`}
                    type="checkbox"
                    className="hidden"
                    onChange={() => handleProductCheck(p.id)}
                  ></input>

                  <label
                    htmlFor={`product-${i}`}
                    className={`${
                      comparison[p.id] ? "bg-purple-600" : ""
                    } flex flex-col p-6 border-2 border-t-0 rounded-lg`}
                  >
                    <img
                      src={p.images[0]}
                      height="160"
                      alt={p.title}
                      className="self-center w-full"
                    />
                    <p className="font-bold text-2xl">{p.title}</p>
                    <p className="text-green-400 font-bold text-xl">
                      ${p.price}
                    </p>
                  </label>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default ProductComparison;
