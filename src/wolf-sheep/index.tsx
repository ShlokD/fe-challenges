import { useState } from "react";

import HomeLink from "../home-link";

type Game = {
  source: string[];
  boat: string[];
  destination: string[];
  isOver: boolean;
  isWin: boolean;
};

const WolfSheep = () => {
  const [count, setCount] = useState(3);
  const [game, setGame] = useState<Game>({
    source: new Array(count * 2)
      .fill(0)
      .map((_, i) => (i % 2 === 0 ? "🐺" : "🐑")),
    boat: [],
    destination: [],
    isOver: false,
    isWin: false,
  });

  const [showInstructions, setShowInstructions] = useState(false);
  const [boatLocation, setBoatLocation] = useState("SOURCE");
  const toggleInstructions = () => setShowInstructions((prev) => !prev);

  const moveToBoat = ({
    index,
    isSource,
  }: {
    index: number;
    isSource: boolean;
  }) => {
    setGame((prev) => {
      const newGame = { ...prev };
      if (isSource) {
        newGame.boat.push(newGame.source[index]);
        newGame.source = newGame.source.filter((_, i) => i !== index);
        return newGame;
      } else {
        newGame.boat.push(newGame.destination[index]);
        newGame.destination = newGame.destination.filter((_, i) => i !== index);
        return newGame;
      }
    });
  };

  const calculateNextState = () => {
    setGame((prev) => {
      const srcSheep = prev.source.filter((s) => s === "🐑").length;
      const srcWolf = prev.source.filter((s) => s === "🐺").length;
      if (srcSheep !== 0 && srcWolf !== 0 && srcWolf > srcSheep) {
        return { ...prev, isOver: true };
      }

      const dSheep = prev.destination.filter((s) => s === "🐑").length;
      const dWolf = prev.destination.filter((s) => s === "🐺").length;
      if (dSheep !== 0 && dWolf !== 0 && dWolf > dSheep) {
        return { ...prev, isOver: true };
      }

      if (dSheep === count && dWolf === count) {
        return { ...prev, isOver: true, isWin: true };
      }
      return { ...prev };
    });
  };

  const setSail = () => {
    setBoatLocation((prev) => (prev === "SOURCE" ? "DESTINATION" : "SOURCE"));
    setTimeout(() => calculateNextState(), 1000);
  };

  const addPair = () => {
    const newCount = count + 1;
    setCount(newCount);

    setGame({
      source: new Array(newCount * 2)
        .fill(0)
        .map((_, i) => (i % 2 === 0 ? "🐺" : "🐑")),
      boat: [],
      destination: [],
      isOver: false,
      isWin: false,
    });
  };

  const restart = () => {
    setGame({
      source: new Array(count * 2)
        .fill(0)
        .map((_, i) => (i % 2 === 0 ? "🐺" : "🐑")),
      boat: [],
      destination: [],
      isOver: false,
      isWin: false,
    });
    setBoatLocation("SOURCE");
  };

  const moveFromBoat = (index: number) => {
    setGame((prev) => {
      const newGame = { ...prev };
      if (boatLocation === "SOURCE") {
        newGame.source.push(newGame.boat[index]);
      } else {
        newGame.destination.push(newGame.boat[index]);
      }

      newGame.boat = newGame.boat.filter((_, i) => i !== index);
      return newGame;
    });
    if (boatLocation === "DESTINATION") {
      calculateNextState();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-blue-500">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">Wolf Sheep</h1>
      </header>
      <main className="flex flex-col w-full items-center gap-4 p-2 relative lg:w-2/3 self-center">
        <div className="flex gap-2">
          <button
            className="bg-orange-500 py-4 px-2 rounded-xl text-xl font-bold"
            onClick={toggleInstructions}
          >
            {showInstructions ? "Close" : "Show Instructions"}
          </button>
          <button
            className="bg-white border-black border-2 py-4 px-2 rounded-xl text-xl font-bold"
            onClick={addPair}
          >
            Add Pair
          </button>
        </div>

        <div
          className="flex flex-col gap-1 transition-transform ease-in-out duration-300 text-xs"
          style={{
            transform: `scale(${showInstructions ? "1" : "0"})`,
          }}
        >
          <p className="text-center">Help all the animals cross the island</p>
          <p className="text-center">
            You can only carry 2 animals in the boat
          </p>
          <p className="text-center">
            On land, if the wolves outnumber the sheep, they'll eat them and the
            game is over
          </p>
        </div>

        {game.isOver && (
          <div
            style={{ top: "33%" }}
            className="border-2 absolute py-4 rounded-2xl px-12 bg-white gap-2 flex flex-col items-center justify-center"
          >
            <h3 className="font-bold text-2xl">
              {game.isWin ? "You Won" : "You Lost"}
            </h3>
            <button
              className="font-bold bg-orange-500 rounded-xl p-4"
              onClick={restart}
            >
              Try Again
            </button>
          </div>
        )}

        <div
          className="bg-green-500 w-full p-8 grid grid-cols-3 rounded-2xl"
          style={{
            minHeight: "200px",
          }}
        >
          {game.source.map((item, i) => {
            return (
              <button
                className="text-4xl"
                key={`source-${i}`}
                disabled={game.boat.length === 2}
                onClick={() => moveToBoat({ index: i, isSource: true })}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div
          className="bg-blue-600 w-full pt-2 flex flex-col"
          style={{
            height: "250px",
          }}
        >
          <button
            className={`${
              game.boat.length === 0 ? "bg-gray-400" : "bg-white"
            } text-lg p-4 self-center rounded-2xl font-bold`}
            onClick={setSail}
            disabled={game.boat.length === 0}
          >
            Sail
          </button>
          <div
            className="flex gap-2 self-center mt-2 transition-transform ease-in-out duration-750"
            style={{
              transform: `translateY(${
                boatLocation === "SOURCE" ? "0" : "100%"
              })`,
            }}
          >
            {game.boat.map((item, i) => {
              return (
                <button
                  className="text-6xl"
                  key={`destination-${i}`}
                  onClick={() => moveFromBoat(i)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="bg-green-700 w-full p-8 grid grid-cols-3 rounded-2xl"
          style={{
            height: "200px",
          }}
        >
          {game.destination.map((item, i) => {
            return (
              <button
                className="text-6xl"
                key={`destination-${i}`}
                disabled={game.boat.length === 2}
                onClick={() => moveToBoat({ index: i, isSource: false })}
              >
                {item}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default WolfSheep;
