import { FC, useEffect, useState } from "react";

import HomeLink from "../home-link";
import { Product, Size } from "./types";

type CardProps = {
  product_id: number;
  saleOnly: boolean;
  quantities?: Record<string, number>;
  onATC?: ({
    id,
    qty,
    sizeIndex,
  }: {
    id: number;
    qty: number;
    sizeIndex: number;
  }) => void;
};

type CartItem = {
  id: number;
  sizeIndex: number;
  qty: number;
};

type ProductCardProps = Product & CardProps;

const generateInitState = (
  sizes?: Size[],
  quantities?: Record<string, number>,
) => {
  if (!sizes) {
    return {} as Record<string, number>;
  }
  return sizes?.reduce((state, size: Size, index: number) => {
    if (size?.size) {
      state[size.size] = quantities?.[index] || 0;
    }
    return state;
  }, {} as Record<string, number>);
};

const ProductCard: FC<ProductCardProps> = (props) => {
  const {
    image,
    name,
    regular_price,
    actual_price,
    sizes,
    on_sale,
    discount_percentage,
    product_id,
    saleOnly,
    quantities,
    onATC,
  } = props;

  const availableSizeIndex = sizes?.findIndex((size: Size) => size.available);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    availableSizeIndex !== -1 ? availableSizeIndex : 0,
  );
  const [qty, setQty] = useState<Record<string, number>>(
    generateInitState(sizes, quantities),
  );

  const toggleSelectedSize = (index: number) => {
    setSelectedSizeIndex(index);
  };

  const increase = () => {
    if (typeof selectedSizeIndex === "undefined") {
      return;
    }
    const qtyKey = sizes?.[selectedSizeIndex].size as string;
    if (!qtyKey) {
      return;
    }

    setQty((prev) => {
      if (key) {
        const original = prev[key];
        return { ...prev, [qtyKey]: original + 1 };
      }
      return prev;
    });
    onATC?.({
      id: product_id,
      sizeIndex: selectedSizeIndex,
      qty: qty[qtyKey] + 1,
    });
  };

  const decrease = () => {
    if (typeof selectedSizeIndex === "undefined") {
      return;
    }
    const qtyKey = sizes?.[selectedSizeIndex].size;
    if (!qtyKey) {
      return;
    }

    setQty((prev) => {
      if (key) {
        const original = prev[key];
        return { ...prev, [key]: original === 0 ? original : original - 1 };
      }
      return prev;
    });
    onATC?.({
      id: product_id,
      sizeIndex: selectedSizeIndex,
      qty: qty[qtyKey] === 0 ? qty[qtyKey] : qty[qtyKey] - 1,
    });
  };
  const key =
    typeof selectedSizeIndex !== "undefined"
      ? sizes?.[selectedSizeIndex]?.size || ""
      : "";

  return (
    <div
      style={{ width: "45%" }}
      className={`p-4 relative shadow my-2 mx-1 ${
        saleOnly && !on_sale ? "hidden" : ""
      }`}
    >
      {on_sale && (
        <p className="p-2 bg-yellow-300 absolute right-0 font-bold rounded-lg px-4">
          Sale
        </p>
      )}
      <img
        src={image}
        alt={name}
        className="h-1/3 m-auto"
        style={{ minHeight: "200px" }}
      />
      <p className="font-bold text-sm truncate my-2 md:text-3xl">{name}</p>
      <div className="mt-2">
        {(discount_percentage?.length || 0) > 0 && (
          <p className="text-gray-300 text-sm line-through md:text-xl">
            {actual_price}
          </p>
        )}
        <p className="text-md md:text-2xl font-bold">{regular_price}</p>
      </div>
      {(discount_percentage?.length || 0) > 0 && (
        <p className="rounded-lg text-xs text-center mt-1 bg-blue-900 text-white font-bold p-1">
          {discount_percentage} OFF
        </p>
      )}
      <div className="flex flex-row flex-wrap mt-4 w-full p-2">
        {sizes?.map((size: Size, i: number) => {
          if (!size.available) {
            return null;
          }
          const checked = i === selectedSizeIndex;
          const id = `${name}-${size.size}`;
          return (
            <div
              key={id}
              className={`text-sm md:text-2xl h-auto my-5 mx-2 text-center`}
            >
              <input
                className="hidden"
                type="radio"
                id={id}
                name="size"
                checked={checked}
                onChange={() => toggleSelectedSize(i)}
                disabled={!size.available}
              />
              <label
                className={`border-4 p-3 md:p-4 rounded-lg ${
                  checked ? "border-black" : "border-gray-100"
                }`}
                htmlFor={id}
              >
                {size.size}
              </label>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-evenly my-4 md:w-full">
        <button
          onClick={decrease}
          disabled={qty[key] === 0}
          className={`h-8 w-8 md:h-16 md:w-16 text-xl md:text-4xl text-white rounded-full font-bold ${
            qty[key] === 0 ? "bg-gray-300" : "bg-blue-500"
          }`}
        >
          -
        </button>
        <p className="mx-2 md:text-4xl">{qty[key]}</p>
        <button
          onClick={increase}
          className="h-8 w-8 md:h-16 md:w-16 text-xl md:text-4xl bg-blue-500 text-white rounded-full font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (_) {
    return null;
  }
};

const loadCartFromLocalStorage = () => {
  try {
    const val = localStorage.getItem("cart");
    if (val) {
      return JSON.parse(val);
    }
    return [];
  } catch (_) {
    return [];
  }
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [saleOnly, setSaleOnly] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>(loadCartFromLocalStorage());
  const [showCart, setShowCart] = useState<boolean>(false);

  const fetchProducts = async () => {
    const res = await import("./products.json");
    setProducts(res.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      console.log("saving", cart);
      saveCartToLocalStorage(cart);
    };
  }, [cart]);

  const onATC = ({
    id,
    qty,
    sizeIndex,
  }: {
    id: number;
    qty: number;
    sizeIndex: number;
  }) => {
    setCart((prev) => {
      if (qty > 0) {
        const index = prev.findIndex(
          (p) => p.id === id && p.sizeIndex === sizeIndex,
        );
        const updated = [...prev];
        if (index > -1) {
          updated[index] = { id, sizeIndex, qty };
          return updated;
        } else {
          return [...prev, { id: id, sizeIndex, qty }];
        }
      } else {
        return prev.filter((p) => p.id !== id);
      }
    });
  };

  const grandTotal = cart?.reduce((total, cartItem) => {
    const product = products[cartItem.id];
    const actual_price = product?.actual_price?.split("R$ ")?.[1];
    const price_string = actual_price?.split(",")?.join(".") || "0";
    const price = isNaN(Number(price_string)) ? 0 : Number(price_string);
    return total + price * cartItem.qty;
  }, 0);

  const cartQuantities = cart.reduce((cartQtys, cartItem) => {
    cartQtys[cartItem.id] = {
      ...cartQtys[cartItem.id],
      [cartItem.sizeIndex]: cartItem.qty || 0,
    };
    return cartQtys;
  }, {} as Record<string, Record<string, number>>);
  return (
    <>
      <div className="flex flex-col w-full p-2">
        <div className="flex flex-row justify-between">
          <HomeLink />
          <button className="p-4" onClick={() => setShowCart((prev) => !prev)}>
            <img src="/cart.png" height="32" width="32" alt="View Cart" />
          </button>
        </div>
        <div className="flex flex-col w-full my-4">
          <h1 className="text-2xl font-bold">Our Collection</h1>
          <div className="flex flex-row text-xl p-2">
            <input
              type="checkbox"
              id="sale-only"
              className="w-6"
              onChange={() => setSaleOnly((prev) => !prev)}
              checked={saleOnly}
            />
            <label htmlFor="sale-only" className="mx-2">
              On Sale
            </label>
          </div>
          <div className="flex flex-row flex-wrap items-stretch justify-center">
            {products?.map((product, index) => (
              <ProductCard
                saleOnly={saleOnly}
                key={`product-${index}`}
                {...product}
                product_id={index}
                quantities={cartQuantities[index]}
                onATC={onATC}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`transition:transform w-3/4  min-h-full bg-gray-50 z-10 absolute top-0 right-0 shadow rounded-sm ${
          showCart ? "" : "hidden"
        }`}
        style={{
          transform: `${showCart ? "translateX(0px)" : "translateX(2000px)"}`,
          height: document.body.clientHeight,
        }}
      >
        <div className="flex flex-col">
          <button
            className="text-4xl p-2 right-0 self-end bg-white rounded-full h-16 w-16 p-2 m-2"
            onClick={() => setShowCart((prev) => !prev)}
          >
            X
          </button>
          <p className="font-bold text-3xl p-2">Cart</p>
          <p className="text-3xl my-2 p-2">R$ {grandTotal.toFixed(2)}</p>{" "}
          <div className="flex flex-col">
            {cart.map((cartItem, idx) => {
              if (cartItem.qty === 0) {
                return null;
              }
              const product = products[cartItem.id];
              if (!product) {
                return null;
              }
              const size = product?.sizes?.[cartItem.sizeIndex];
              return (
                <div key={`cart-${idx}`}>
                  <div className="w-full p-2 my-4 flex flex-row items-center">
                    <img
                      className="w-1/3"
                      style={{ minHeight: "50px" }}
                      src={product.image}
                    />
                    <div className="flex flex-col w-2/3 mx-4">
                      <p className="truncate text-lg md:text-2xl font-bold">
                        {product.name}
                      </p>
                      <p>{size?.size}</p>
                      <p className="text-lg font-bold md:text-2xl">
                        {product.actual_price}
                      </p>
                      <p className="text-lg font-bold">Qty: {cartItem.qty}</p>
                    </div>
                  </div>
                  <hr className="border-2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
