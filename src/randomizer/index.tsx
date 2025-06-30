import { useState } from "react";

import HomeLink from "../home-link";

const Randomizer = () => {
  const [coins, setCoins] = useState(["H", "T"]);
  const [dice, setDice] = useState([6]);
  const [animateCoins, setAnimateCoins] = useState(false);
  const [animateDice, setAnimateDice] = useState(false);

  const flipCoins = () => {
    setAnimateCoins(true);

    setTimeout(() => {
      setCoins(
        new Array(coins.length)
          .fill(0)
          .map(() => (Math.random() <= 0.5 ? "H" : "T")),
      );
      setAnimateCoins(false);
    }, 1000);
  };

  const rollDie = () => {
    setAnimateDice(true);

    setTimeout(() => {
      setDice(
        new Array(dice.length)
          .fill(0)
          .map(() => Math.floor(Math.random() * 6) + 1),
      );
      setAnimateDice(false);
    }, 1000);
  };

  const addCoin = () => {
    setCoins((prev) => {
      const val = Math.random() <= 0.5 ? "H" : "T";
      return [...prev, val];
    });
  };

  const addDie = () => {
    setDice((prev) => {
      const val = Math.floor(Math.random() * 6) + 1;
      return [...prev, val];
    });
  };

  const deleteCoin = (index: number) => {
    setCoins((prev) => prev.filter((_, i) => index !== i));
  };

  const deleteDie = (index: number) => {
    setDice((prev) => prev.filter((_, i) => index !== i));
  };

  return (
    <>
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-red-500">
        <HomeLink />
        <h1 className="font-bold text-2xl">Randomizer</h1>
      </header>
      <main className="flex flex-col w-full p-4 items-center">
        <div className="flex flex-col p-4 relative">
          <div className="flex flex-col">
            <div className="flex items-center my-2 justify-center gap-4">
              <h2 className="font-bold text-4xl p-2">Coins</h2>
              <button
                onClick={addCoin}
                className="py-4 px-6 text-xl font-bold bg-red-600 text-white rounded-xl"
              >
                Add Coin
              </button>
            </div>
            <div className="flex flex-wrap my-4 p-2 gap-4">
              {coins.map((coin, i) => {
                return (
                  <button
                    key={`coin-${i}`}
                    onClick={() => deleteCoin(i)}
                    className={`coin ${
                      coin === "H" ? "bg-black" : "bg-green-600"
                    } ${
                      animateCoins ? "bg-yellow-400 animate-coin" : ""
                    }  rounded-full text-white font-bold text-center pt-1`}
                  >
                    {animateCoins ? "" : coin}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={flipCoins}
            className="self-center py-4 px-6 text-xl font-bold bg-red-600 rounded-xl text-white"
          >
            Flip All
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex my-4 p-2 gap-4">
            <div className="flex items-center my-4 gap-4">
              <h2 className="font-bold text-4xl p-2">Dice</h2>
              <button
                onClick={addDie}
                className="py-4 px-6 text-xl font-bold bg-red-600 text-white rounded-xl"
              >
                Add Die
              </button>
            </div>
          </div>
          <div className="flex flex-wrap my-4 p-2 gap-4">
            {dice.map((die, i) => {
              return (
                <button
                  key={`die-${i}`}
                  onClick={() => deleteDie(i)}
                  className={`die bg-green-600 ${
                    animateDice ? "bg-yellow-400 animate-die" : ""
                  }  rounded-lg text-white text-2xl font-bold text-center pt-1`}
                >
                  {animateDice ? "" : die}
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={rollDie}
          className="py-4 px-6 text-xl font-bold bg-red-600 rounded-xl text-white"
        >
          Roll All
        </button>
      </main>
    </>
  );
};

export default Randomizer;
