import { useRef, useState } from "react";

import HomeLink from "../home-link";

type Item = {
  title: string;
};
const VerticalSpinner = () => {
  const [items, setItems] = useState<Item[]>([
    {
      title: "1",
    },
    {
      title: "2",
    },
    {
      title: "3",
    },
  ]);

  const [itemText, setItemText] = useState("");
  const [currentSpin, setCurrentSpin] = useState(-1);
  const [isSpinning, setIsSpinning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const loopRef = useRef<number>(0);

  const add = () => {
    if (itemText.length === 0) return;

    setItems((prev) => [...prev, { title: itemText }]);
    setItemText("");
  };

  const deleteItem = (index: number) => {
    setItems((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  const spin = () => {
    if (items.length === 0) {
      return;
    }
    setCurrentSpin(0);
    setIsSpinning(true);
    const spinDuration = items.length * 2 + Math.floor(Math.random() * 10);
    intervalRef.current = window.setInterval(() => {
      if (loopRef.current === spinDuration) {
        if (intervalRef?.current) {
          clearInterval(intervalRef.current);
        }
        loopRef.current = 0;
        setIsSpinning(false);
        return;
      }
      loopRef.current = loopRef.current + 1;
      setCurrentSpin((prev) => {
        return prev === items.length - 1 ? 0 : prev + 1;
      });
    }, 200);
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-blue-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Vertical Spinner </h1>
      </header>
      <main className="flex flex-col p-2 w-full min-h-screen">
        <div className="flex gap-1 justify-center">
          <input
            aria-label="Item title"
            className="w-2/3 p-2 rounded-lg border-2 border-black"
            value={itemText}
            onChange={(ev) =>
              setItemText((ev?.target as HTMLInputElement)?.value)
            }
          />
          <button
            onClick={add}
            disabled={itemText === ""}
            className={`${
              itemText === "" ? "bg-gray-400" : "bg-blue-500"
            } py-4 px-8 rounded-lg font-bold text-2xl text-white`}
          >
            Add
          </button>
        </div>
        <button
          className="my-4 w-1/3 self-center py-4 px-8 bg-blue-500 rounded-lg font-bold text-2xl text-white"
          onClick={spin}
        >
          Spin
        </button>
        {items.length === 0 && (
          <p className="p-2 self-center text-xl">Add an item to get started</p>
        )}
        <div className="flex flex-col gap-2 items-center">
          {items.map((item, i) => {
            return (
              <button
                key={`item-${i}`}
                onClick={() => deleteItem(i)}
                disabled={isSpinning}
                className={`${
                  i === currentSpin
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 text-black"
                } p-4 w-full lg:w-2/3 text-center border-4 border-black font-bold text-4xl rounded-2xl`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default VerticalSpinner;
