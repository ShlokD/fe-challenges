import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import HomeLink from "../home-link";

type Potion = {
  id: number;
  image: string;
  ingredients: string[];
  name: string;
  price: number;
  effect: string;
  quantity: number;
};

type PotionsModalProps = {
  selectedPotion?: Potion | null;
  showModal?: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleAddToCart: ({ id, qty }: { id: number; qty: number }) => void;
};

type CartProps = {
  cartItems?: Potion[] | null;
  showCart?: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
};

const PotionsModal: FC<PotionsModalProps> = ({
  selectedPotion,
  showModal,
  setShowModal,
  handleAddToCart,
}) => {
  const [qty, setQty] = useState(
    selectedPotion?.quantity && selectedPotion?.quantity > 0
      ? selectedPotion.quantity
      : 1,
  );
  const quantities = new Array(10).fill(0).map((_, i) => i + 1);

  useEffect(() => {
    setQty(
      selectedPotion?.quantity && selectedPotion?.quantity > 0
        ? selectedPotion.quantity
        : 1,
    );
  }, [selectedPotion?.id]);

  if (!selectedPotion) {
    return null;
  }

  const doAddToCart = () => {
    handleAddToCart({ id: selectedPotion.id, qty });
    setShowModal(false);
  };
  return (
    <div
      id="modal"
      className={`${
        showModal ? "flex flex-col" : "hidden"
      } fixed z-10 w-10/12 h-auto bg-white rounded-lg border-2 border-black p-2`}
      style={{
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%",
      }}
    >
      <button
        className="self-end p-4 text-xl font-bold"
        onClick={() => setShowModal(false)}
      >
        X
      </button>

      <div className="flex flex-col lg:flex-row">
        <img
          className="lg:w-1/2"
          src={selectedPotion.image}
          alt={selectedPotion.name}
        />
        <div className="lg:w-1/2">
          <p className="text-lg font-bold">{selectedPotion.name}</p>
          <p className="text-lg font-bold mt-4">Use/Effect</p>
          <p className="text-md font-bold mt-2">{selectedPotion.effect}</p>
          <p className="text-lg font-bold mt-4">Ingredients</p>
          {selectedPotion.ingredients.map((ing, i) => (
            <p className="text-md font-bold" key={`ingredient-${i}`}>
              {ing}
            </p>
          ))}
          <p className="text-lg font-bold mt-4">Price</p>

          <p className="text-md font-bold text-red-400">
            {selectedPotion.price}
          </p>
          <div className="flex flex-row items-center justify-center gap-4">
            <select
              className="border-2 border-black p-4"
              defaultValue={qty}
              onChange={(ev) =>
                setQty(parseInt((ev?.target as HTMLSelectElement)?.value))
              }
            >
              {quantities.map((quantity, i: number) => {
                return (
                  <option key={`quantity-${i}`} value={quantity}>
                    {quantity}
                  </option>
                );
              })}
            </select>
            <button
              onClick={doAddToCart}
              className="p-4 bg-orange-400 text-white font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart: FC<CartProps> = ({ cartItems, showCart, setShowCart }) => {
  const total = cartItems?.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.quantity);
  }, 0);
  return (
    <div
      id="cart"
      className={`${
        showCart ? "flex flex-col" : "hidden"
      } fixed z-10 w-10/12 h-auto bg-white rounded-lg border-2 border-black p-2`}
      style={{
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%",
      }}
    >
      <button className="self-end" onClick={() => setShowCart(false)}>
        X
      </button>
      <h2 className="self-center text-2xl font-bold">Your Cart</h2>
      <div className="flex flex-col">
        {cartItems?.map((cartItem, i) => {
          return (
            <div
              className="flex flex-row border-2 p-4 border-black gap-4 items-center my-2"
              key={`cart-item-${i}`}
            >
              <img
                src={cartItem?.image}
                alt={cartItem?.name}
                className="w-1/5"
              />
              <div className="w-2/3 flex flex-col">
                <p className="text-xl font-bold">{cartItem?.name}</p>
                <div className="flex flex-row gap-2">
                  <p>{cartItem?.price}</p>

                  <p>Qty: {cartItem?.quantity}</p>
                </div>
              </div>
            </div>
          );
        })}
        {cartItems && cartItems?.length === 0 && (
          <p className="p-2 self-center">Your cart is empty</p>
        )}

        {!!total && total > 0 && (
          <p className="p-2 self-center text-xl font-bold">
            Total: ${total?.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

const PotionsStore = () => {
  const [potions, setPotions] = useState<Potion[]>([]);
  const [selectedPotionIndex, setSelectedPotionIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState<Record<number, Potion>>({});
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const fetchPotions = async () => {
    const mod = await import("./potions.json");
    setPotions(Object.values(mod.potions).map((p) => ({ ...p, quantity: 0 })));
  };
  useEffect(() => {
    fetchPotions();
  }, []);

  const handlePotionClick = (index: number) => {
    setSelectedPotionIndex(index);
    setShowModal(true);
  };

  const handleEmailSubmitClick = () => {
    setEmail("");
  };

  const handleAddToCart = ({ id, qty }: { id: number; qty: number }) => {
    const potionIndex = potions.findIndex((p) => p.id === id);
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id]) {
        newCart[id] = { ...newCart[id], quantity: qty };
      } else {
        newCart[id] = { ...potions[potionIndex], quantity: qty };
      }
      return newCart;
    });
    setPotions((prev) => {
      const newPotions = prev.slice();
      newPotions[potionIndex].quantity = qty;
      return newPotions;
    });
  };

  const selectedPotion =
    selectedPotionIndex >= 0 ? potions[selectedPotionIndex] : null;

  let displayPotions = potions;
  if (search) {
    displayPotions = displayPotions.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const cartItems = Object.values(cart);

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row items-center justify-evenly lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <button className="lg:hidden block" onClick={() => setShowMenu(true)}>
          <img src="/hamburger.png" height={30} width={30} alt="Open Menus" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-orange-500 text-center">
            Merlin's Potions
          </h1>
          <div className="flex flex-row items-center">
            <hr className="border-2 border-purple-900 w-8" />
            <p className="text-purple-900 mx-2 text-sm">
              fine potions since 1026
            </p>
            <hr className="border-2 border-purple-900 w-8" />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button onClick={() => setShowCart(true)}>
            <img src="/cart.png" height={30} width={30} alt="Open Cart" />
          </button>
          <p className="bg-purple-400 w-10 h-10 rounded-full text-white text-lg font-bold px-3 py-2 text-center">
            {cartItems.length}
          </p>
        </div>
      </header>
      <main className="flex flex-col w-full ">
        <nav
          className={`${
            showMenu ? "flex flex-col" : "hidden lg:flex flex-col"
          } w-full`}
        >
          <div className="flex flex-row my-2 items-center justify-center">
            <button
              className="p-2 text-purple-900 font-bold lg:hidden"
              aria-label="Close Menu"
              onClick={() => setShowMenu(false)}
            >
              X
            </button>
            <input
              aria-label="Search our stock"
              placeholder="Search our stock"
              className="border-2 border-black p-2"
              onChange={(ev) =>
                setSearch((ev?.target as HTMLInputElement)?.value)
              }
              value={search}
            ></input>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 justify-evenly  bg-purple-800 hover:bg-purple-900- text-white">
            <button className="border-white border-b-2 bg-purple-800 hover:bg-purple-900 lg:border-0 p-4">
              Potions
            </button>
            <button className="border-white border-b-2 bg-purple-800 lg:border-0 hover:bg-purple-900 p-4">
              Ingredients
            </button>
            <button className="border-white border-b-2 bg-purple-800 lg:border-0 hover:bg-purple-900 p-4">
              Books
            </button>
            <button className="border-white border-b-2 bg-purple-800 lg:border-0 hover:bg-purple-900 p-4">
              Supplies
            </button>
            <button className="border-white border-b-2 bg-purple-800 lg:border-0 hover:bg-purple-900 p-4">
              Charms
            </button>
            <button className="border-white border-b-2 bg-purple-800 lg:border-0 hover:bg-purple-900 p-4">
              Clearance!
            </button>
          </div>
        </nav>
        <p className="bg-gray-300 p-4 text-center italic">
          Free shipping on orders above $50
        </p>

        <h2 className="text-center p-2 font-bold text-4xl">Potions</h2>

        <div className="flex flex-row flex-wrap items-center justify-center my-4">
          {displayPotions?.map((potion, i) => {
            return (
              <button
                key={`potion-${i}`}
                className="w-1/2 flex flex-col items-center"
                onClick={() => handlePotionClick(i)}
              >
                <img src={potion.image} alt={potion.name} className="w-1/2" />
                <div className="flex flex-row items-center justify-center">
                  <p className="text-sm font-bold">{potion.name}</p> -{" "}
                  <p className="text-sm font-bold text-red-700 py-5">
                    ${potion.price}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <PotionsModal
          selectedPotion={selectedPotion}
          showModal={showModal}
          setShowModal={setShowModal}
          handleAddToCart={handleAddToCart}
        />
        <Cart
          cartItems={cartItems}
          showCart={showCart}
          setShowCart={setShowCart}
        />
      </main>
      <footer className="bg-gray-300 flex flex-col items-center">
        <div className="my-2 mx-4 p-2 bg-white rounded-lg">
          <p className="text-xl italic my-4">Sign up for our newsletter</p>
          <p>Sign up for our newsletter and get exclusive discounts</p>
          <div className="flex flex-row gap-2 my-2">
            <input
              type="email"
              className="border-2 p-2 border-black"
              placeholder="Enter your email"
              aria-label="Enter your email"
              value={email}
              onChange={(ev) =>
                setEmail((ev?.target as HTMLInputElement)?.value)
              }
            ></input>
            <button
              className="text-white bg-orange-400 p-4"
              onClick={handleEmailSubmitClick}
            >
              SUBMIT
            </button>
          </div>
        </div>
        <p className="text-md p-4">
          &copy; 2015 Merlin's Potions. All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default PotionsStore;
