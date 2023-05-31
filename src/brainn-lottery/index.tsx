import { useState } from "react";

import HomeLink from "../home-link";
import "./index.css";

const LOTTOS = [
  "MEGA-SENA",
  "QUINA",
  "LOCAFACIL",
  "LOTOMANIA",
  "TIMEMANIA",
  "DIA DE SORTE",
];

const BG_COLORS: Record<string, string> = {
  "MEGA-SENA": "bg-green-300",
  QUINA: "bg-purple-700",
  LOCAFACIL: "bg-pink-400",
  LOTOMANIA: "bg-orange-700",
  TIMEMANIA: "bg-green-900",
  "DIA DE SORTE": "bg-yellow-400",
};
const generateNumbers = () => {
  const numbers: Record<string, number[]> = {};
  LOTTOS.forEach((lotto) => {
    numbers[lotto] = new Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100));
  });

  return numbers;
};

const lotteryNumbers = generateNumbers();

const Lottery = () => {
  const [selectedLotto, setSelectedLotto] = useState(LOTTOS[0]);
  const numbers = lotteryNumbers[selectedLotto];
  const bgColor = BG_COLORS[selectedLotto];

  return (
    <div className="flex flex-col w-full h-full h-screen bg-gray-100">
      <HomeLink />
      <div className="flex flex-col w-full lg:flex-row lg:h-full my-2 z-10 items-center lg:justify-center">
        <div
          className={`w-full lg:w-1/2 lg:h-full box p-2 overflow-x-hidden flex items-center justify-center ${bgColor}`}
        >
          <select
            name="lotto-select"
            aria-label="Select a lotto"
            onChange={(ev) =>
              setSelectedLotto((ev?.target as HTMLSelectElement)?.value)
            }
            value={selectedLotto}
            className="p-4  text-center"
          >
            {LOTTOS.map((lotto) => {
              return (
                <option key={lotto} value={lotto}>
                  {lotto}
                </option>
              );
            })}
          </select>
        </div>
        <div
          data-testid="lottery-numbers"
          className="h-50 z-10 lg:w-1/2 lg:h-full rounded-t-full flex flex-row flex-wrap justify-center my-16"
        >
          {numbers.map((n, i) => {
            return (
              <div
                key={`num-${i}`}
                className="bg-white m-3 p-6 text-4xl lg:p-3 lg:text-2xl font-bold rounded-full lg:self-center"
              >
                {n > 9 ? n : `0${n}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Lottery;
