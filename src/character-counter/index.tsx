import { ChangeEvent, useState } from "react";

import HomeLink from "../home-link";

type Count = {
  ch: number;
  words: number;
};

type ChangeArgs = Count & { index: number };

const calculateDensity = (text: string) => {
  const densityMap = text
    .toUpperCase()
    .split("")
    .reduce((density, char) => {
      if (char !== " ") {
        if (density[char]) {
          density[char] += 1;
        } else {
          density[char] = 1;
        }
      }
      return density;
    }, {} as Record<string, number>);

  const density = [];
  for (let key in densityMap) {
    density.push([key, `${densityMap[key]}`]);
  }

  return density.sort((a, b) => Number(b[1]) - Number(a[1])).slice(0, 5);
};

type CounterProps = {
  index: number;
  title: string;
  onChange: (changeArgs: ChangeArgs) => void;
};

const Counter = ({ title, index, onChange }: CounterProps) => {
  const [text, setText] = useState("");
  const [count, setCount] = useState<Count>({ ch: 0, words: 0 });
  const [density, setDensity] = useState<Array<Array<string>>>([]);

  const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value;
    const newWordCount = value.trim().split(" ").length;
    setCount(() => ({
      ch: value.length,
      words: newWordCount,
    }));
    onChange({ index, ch: value.length, words: newWordCount });
    setText(value);
    setDensity(calculateDensity(value));
  };

  const densitySum = density.reduce((sum, val) => (sum += Number(val[1])), 0);
  return (
    <div className="flex flex-col w-full p-4 border-b-2">
      <label htmlFor={`text-${title}`} className="font-bold text-xl">
        {title}
      </label>
      <textarea
        id={`text-${title}`}
        className="shadow-xl bg-gray-700 rounded-2xl text-white text-xl p-2"
        value={text}
        onChange={handleTextChange}
        rows={12}
      ></textarea>

      <div className="flex gap-2 w-full my-8">
        <div className="flex flex-col w-1/2">
          <p className="font-bold text-xl">Characters</p>
          <p className="bg-gray-700 py-4 px-2 rounded-2xl shadow-2xl text-white font-bold text-lg">
            {count.ch}
          </p>
        </div>
        <div className="flex flex-col w-1/2">
          <p className="font-bold text-xl">Words</p>
          <p className="bg-gray-700 py-4 px-2 rounded-2xl  shadow-2xl text-white font-bold text-lg">
            {count.words}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold">Character Density</p>
        {density.map((charDensity, i) => {
          const charCount = Number(charDensity[1]);
          const percentage = (charCount / count.ch) * 100;
          return (
            <div
              className="flex gap-4 items-center"
              key={`density-${index}-${i}`}
            >
              <span className="font-bold text-lg">{charDensity[0]}</span>
              <progress
                id={`density-${index}-${i}`}
                value={charCount}
                max={densitySum}
                className="w-1/2"
              />
              <label className="text-lg" htmlFor={`density-${index}-${i}`}>
                {charCount} ({percentage.toFixed(2)}%)
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type CountState = {
  elements: Count[];
} & Count;

const CharacterCounter = () => {
  const [counters, setCounters] = useState([1]);
  const [count, setCount] = useState<CountState>({
    elements: [],
    ch: 0,
    words: 0,
  });
  const handleChange = ({
    index,
    ch,
    words,
  }: {
    index: number;
    ch: number;
    words: number;
  }) => {
    setCount((prev) => {
      const newCount = { ...prev };
      newCount.elements[index] = {
        ch,
        words,
      };
      newCount.ch = newCount.elements.reduce(
        (sum, elem) => (sum += elem.ch),
        0,
      );
      newCount.words = newCount.elements.reduce(
        (sum, elem) => (sum += elem.words),
        0,
      );
      return newCount;
    });
  };

  const addCounter = () => {
    setCounters((prev) => {
      return [...prev, prev.length + 1];
    });
    setCount((prev) => {
      return { ...prev, elements: [...prev.elements, { ch: 0, words: 0 }] };
    });
  };

  const deleteCounter = () => {
    setCounters((prev) => {
      prev.pop();
      return [...prev];
    });
    setCount((prev) => {
      const newCount = { ...prev };
      newCount.elements.pop();
      newCount.ch = newCount.elements.reduce(
        (sum, elem) => (sum += elem.ch),
        0,
      );
      newCount.words = newCount.elements.reduce(
        (sum, elem) => (sum += elem.words),
        0,
      );
      return newCount;
    });
  };
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <header className="bg-orange-500 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Character Counter </h1>
      </header>
      <main className="flex flex-col w-full p-2 items-center justify-center">
        <div className="flex gap-2 w-full my-8 items-center lg:w-2/3">
          <div className="flex flex-col w-1/2">
            <p className="font-bold text-3xl">Characters</p>
            <p className="bg-gray-700 py-8 px-4 rounded-2xl shadow-2xl text-white font-bold text-2xl">
              {count.ch}
            </p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="font-bold text-3xl">Words</p>
            <p className="bg-gray-700 py-8 px-4 rounded-2xl  shadow-2xl text-white font-bold text-2xl">
              {count.words}
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full items-center lg:w-2/3">
          <button
            onClick={addCounter}
            className="bg-green-400 hover:bg-green-500 w-1/2 border-2 border-black rounded-lg shadow-2xl text-2xl font-bold py-6 px-2 text-white"
          >
            Add Counter
          </button>

          <button
            onClick={deleteCounter}
            disabled={counters.length === 0}
            className="bg-red-400 hover:bg-red-500 w-1/2 border-2 border-black rounded-lg shadow-2xl text-2xl font-bold py-6 px-2 text-white"
          >
            Delete Last Counter
          </button>
        </div>

        <div className="flex flex-col my-2 gap-4 w-full items-center lg:w-2/3">
          {counters.map((_, i) => {
            return (
              <Counter
                key={`counter-${i}`}
                title={`Counter-${i + 1}`}
                index={i}
                onChange={handleChange}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CharacterCounter;
