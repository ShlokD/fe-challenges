import { useCallback, useEffect, useState } from "react";

import HomeLink from "../home-link";

const keys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "@",
  ".",
];

const XRKeyboard = () => {
  const [currentKey, setCurrentKey] = useState(0);
  const [shift, setShift] = useState(false);
  const [value, setValue] = useState("");

  const handleSetShift = () => {
    setShift((prev) => !prev);
  };

  const handleSetInput = (letter: string) => {
    setValue((prev) => prev + letter);
  };

  const handleDel = () => {
    setValue((prev) => (prev.length > 1 ? prev.slice(0, prev.length - 1) : ""));
  };

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.key;
      if (key === "ArrowUp") {
        setCurrentKey((prev) => {
          if (prev >= keys.length) {
            return 20;
          }
          if (prev >= 10) {
            prev -= 10;
            return prev;
          }
          return prev;
        });
        return;
      }
      if (key === "ArrowRight") {
        setCurrentKey((prev) => {
          if (prev < keys.length + 2) {
            prev += 1;
          }
          return prev;
        });
        return;
      }

      if (key === "ArrowLeft") {
        setCurrentKey((prev) => {
          if (prev > 0) {
            prev -= 1;
          }
          return prev;
        });
        return;
      }

      if (key === "ArrowDown") {
        setCurrentKey((prev) => {
          if (prev === 18 || prev === 19) {
            return 20;
          }
          if (prev < 19) {
            prev += 10;
            return prev;
          }
          if (prev >= 20) {
            prev = keys.length + 1;
            return prev;
          }
          return prev;
        });
        return;
      }

      if (key === "Enter") {
        if (currentKey < keys.length) {
          handleSetInput(
            shift ? keys[currentKey].toUpperCase() : keys[currentKey],
          );
        }
        if (currentKey === keys.length) {
          handleSetShift();
        }
        if (currentKey === keys.length + 1) {
          handleSetInput(" ");
        }
        if (currentKey === keys.length + 2) {
          handleDel();
        }
      }

      return;
    },
    [currentKey],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col w-full h-full">
      <header className="bg-purple-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> XR Keyboard </h1>
      </header>
      <main className="flex flex-col w-full h-full">
        <div className="flex flex-col bg-black rounded-lg my-4 mx-2 p-4">
          <div className="w-full h-12 my-4 rounded-lg bg-gray-400 text-xl p-2">
            {value}{" "}
            <span className="text-red-200 blink">{keys[currentKey]}</span>
          </div>
          <div className="grid grid-rows-3 grid-cols-10 gap-1">
            {keys.map((key, index) => {
              return (
                <button
                  className={`p-2 text-white text-lg rounded-lg ${
                    currentKey === index ? "bg-red-200" : "bg-gray-800"
                  }`}
                  onClick={() =>
                    handleSetInput(shift ? key.toUpperCase() : key)
                  }
                  key={`key-${index}`}
                >
                  {shift ? key.toUpperCase() : key}
                </button>
              );
            })}
          </div>
          <div className="flex flex-row gap-1 my-4">
            <button
              className={`p-2 text-white text-lg rounded-lg w-2/12 ${
                currentKey === keys.length || shift
                  ? "bg-red-200"
                  : "bg-gray-800"
              }`}
              onClick={handleSetShift}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  handleSetShift();
                }
              }}
            >
              shift
            </button>
            <button
              className={`p-2 text-white text-lg rounded-lg w-8/12 ${
                currentKey === keys.length + 1 ? "bg-red-200" : "bg-gray-800"
              }`}
              aria-label="space"
              onClick={() => handleSetInput(" ")}
            ></button>
            <button
              className={`p-2 text-white text-lg rounded-lg w-2/12 ${
                currentKey === keys.length + 2 ? "bg-red-200" : "bg-gray-800"
              }`}
              onClick={() => handleDel()}
            >
              del
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default XRKeyboard;
