import { useState } from "react";

import HomeLink from "../home-link";

const TIME_IN_MS = 1200;

type LiftState = {
  motion: string;
  floor: number;
  diff: number;
  queue: number[];
};

const LiftSimulator = () => {
  const [floorLength, setFloorLength] = useState(7);
  const [liftState, setLiftState] = useState<LiftState>({
    motion: "IDLE",
    floor: 0,
    diff: 1,
    queue: [],
  });

  const floors = new Array(floorLength)
    .fill(0)
    .map((_, i) => floorLength - 1 - i);

  const moveNext = () => {
    setLiftState((prev) => {
      if (prev.queue.length === 0) {
        return { ...prev, motion: "IDLE" };
      }
      const nextFloor = prev.queue.shift();
      if (typeof nextFloor === "undefined") {
        return { ...prev, motion: "IDLE" };
      }
      if (nextFloor > prev.floor) {
        setTimeout(() => moveUp(nextFloor), 1000);
      } else {
        setTimeout(() => moveDown(nextFloor), 1000);
      }
      return { ...prev, motion: "IDLE" };
    });
  };

  const moveUp = (floor: number) => {
    setLiftState((prev) => {
      if (prev.motion === "IDLE") {
        const diff = Math.abs(prev.floor - floor);
        setTimeout(() => {
          moveNext();
        }, diff * TIME_IN_MS);
        return {
          motion: "UP",
          floor,
          diff: Math.abs(prev.floor - floor),
          queue: prev.queue,
        };
      } else {
        return {
          ...prev,
          queue: [...prev.queue, floor],
        };
      }
    });
  };

  const moveDown = (floor: number) => {
    setLiftState((prev) => {
      if (prev.motion === "IDLE") {
        const diff = Math.abs(prev.floor - floor);
        setTimeout(() => {
          moveNext();
        }, diff * TIME_IN_MS);
        return {
          motion: "DOWN",
          floor,
          diff: Math.abs(prev.floor - floor),
          queue: prev.queue,
        };
      } else {
        return {
          ...prev,
          queue: [...prev.queue, floor],
        };
      }
    });
  };

  const addFloor = () => {
    setFloorLength((prev) => prev + 1);
  };
  const removeFloor = () => {
    if (floorLength === 2) {
      return;
    }
    setFloorLength((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-red-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">Lift Simulator</h1>
      </header>
      <main className="flex flex-col min-h-screen relative">
        <div className="flex gap-4 justify-center my-4">
          <button
            className="p-4 bg-purple-400 font-bold text-white rounded-lg"
            onClick={addFloor}
          >
            Add Floor
          </button>
          <button
            className="p-4 bg-red-400 font-bold text-white rounded-lg"
            onClick={removeFloor}
          >
            Remove Floor
          </button>
        </div>
        <p className="self-center font-bold">Next Floor {liftState.floor}</p>
        <div className="flex flex-col items-center my-6 min-h-screen">
          {floors.map((floor, i) => {
            return (
              <div
                className="flex w-2/3 bg-blue-300 border-2 border-black h-20 gap-4 items-center p-4"
                key={`floor-${i}`}
              >
                <p className="text-white font-bold">Floor {floor}</p>
                {floor !== floors.length - 1 && (
                  <button
                    className="bg-green-400 p-4 ml-4 text-white font-bold"
                    onClick={() => moveUp(floor)}
                  >
                    Up
                  </button>
                )}
                {floor !== 0 && (
                  <button
                    className="bg-yellow-400 ml-4 p-4 text-white font-bold"
                    onClick={() => moveDown(floor)}
                  >
                    Down
                  </button>
                )}
              </div>
            );
          })}
          <div
            style={{
              transform: `translate(100px, calc(${
                -5 * (liftState.floor + 1)
              }rem + 10px)`,
              transition: `transform ${
                liftState.diff * TIME_IN_MS
              }ms ease-in-out`,
            }}
            className="h-16 w-10 bg-black"
          ></div>
        </div>
      </main>
    </div>
  );
};

export default LiftSimulator;
