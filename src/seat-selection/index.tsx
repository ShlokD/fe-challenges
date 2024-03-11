import { useState } from "react";

import HomeLink from "../home-link";

const rows = "ABCDEFGHIJKLMNO".split("");
const columns = 20;
type Seat = {
  id: string;
  disabled: boolean;
  available: boolean;
};
const generateSeats = () => {
  let seats = [];
  for (let i = 0; i < rows.length; ++i) {
    const row = [];
    for (let j = 1; j < columns; ++j) {
      const seat = {
        id: `${rows[i]}${j}`,
        disabled:
          i < 10 && (j === 4 || j === 5 || j === 6 || j === 15 || j === 16),
        available: Math.floor(Math.random() * 10) < 8,
      };
      row.push(seat);
    }
    seats.push(row);
  }
  return seats;
};

const getPrice = (row: number) => {
  if (row < 4) {
    return 500;
  } else if (row < 8) {
    return 300;
  } else if (row < 12) {
    return 150;
  } else {
    return 100;
  }
};

type Cart = {
  id: string;
  row: number;
  col: number;
  price: number;
};

const SeatSelection = () => {
  const [seats, setSeats] = useState<Seat[][]>(generateSeats());
  const [cart, setCart] = useState<Cart[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const sections: Record<number, boolean> = { 4: true, 8: true, 12: true };

  const addToCart = (row: number, col: number) => {
    const seat = seats[row][col];
    const isSelected = selected[seat.id];
    if (isSelected) {
      setCart((prev) => {
        return prev.filter((item) => item.id !== seats[row][col].id);
      });
      setSelected((prev) => {
        const newSelection = { ...prev };
        newSelection[seat.id] = false;
        return newSelection;
      });
    } else {
      setCart((prev) => {
        return [
          ...prev,
          { id: seats[row][col].id, row, col, price: getPrice(row) },
        ];
      });
      setSelected((prev) => {
        const newSelection = { ...prev };
        newSelection[seat.id] = true;
        return newSelection;
      });
    }
  };

  const buySeats = () => {
    setSelected({});
    setSeats((prev) => {
      const newSeats = [...prev].map((row) => row.slice());
      cart.forEach((item) => {
        newSeats[item.row][item.col].available = false;
      });
      setCart([]);
      return newSeats;
    });
  };

  const total = cart.reduce((sum, item) => (sum += item.price), 0);

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-blue-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Seat Selection</h1>
      </header>
      <main className="flex flex-col w-full p-4">
        <div className="p-16 bg-gray-600 text-center font-bold text-9xl my-2">
          STAGE
        </div>
        <div className={`flex flex-col gap-1 items-center justify-center my-2`}>
          <p className="font-bold text-4xl">Rs.{total}</p>
          <button
            disabled={cart.length === 0}
            className={`${
              cart.length === 0
                ? "bg-gray-400 hover:bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded-full  font-bold text-white w-1/4 p-4`}
            onClick={buySeats}
          >
            Buy
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center my-12">
          {seats.map((row, i) => {
            return (
              <div
                className={`flex gap-1 items-center justify-center ${
                  sections[i] ? "mt-8" : ""
                }`}
                key={`row-${i}`}
              >
                {row.map((seat, j) => {
                  return seat.disabled ? (
                    <div
                      key={`seat-${j}`}
                      className="bg-transparent p-2 border-2 border-transparent"
                    ></div>
                  ) : (
                    <button
                      className={`p-2 text-sm ${
                        seat.available ? "bg-green-400" : "bg-black"
                      } ${
                        selected[seat.id] ? "bg-yellow-500" : ""
                      } border-2 shadow text-white font-bold`}
                      key={`seat-${j}`}
                      aria-label={`Seat: ${seat.id}`}
                      disabled={!seat.available}
                      onClick={() => addToCart(i, j)}
                    ></button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SeatSelection;
