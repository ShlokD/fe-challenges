import { ChangeEvent, useState } from "react";

import HomeLink from "../home-link";

type Count = {
  ch: number;
  words: number;
};
type CounterProps = {
  title: string;
  onChange: (countArgs: Count) => void;
};

const Counter = ({ title, onChange }: CounterProps) => {
  const [text, setText] = useState("");
  const [count, setCount] = useState<Count>({ ch: 0, words: 0 });

  const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value;
    const deltaLength = value.length - text.length;
    const wordCount = text.split(" ").length;
    const newWordCount = value.split(" ").length;
    const deltaWords = newWordCount - wordCount;
    setCount((prev) => ({
      ch: prev.ch + deltaLength,
      words: prev.words + deltaWords,
    }));
    onChange({ ch: deltaLength, words: deltaWords });
    setText(value);
  };

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
    </div>
  );
};

const CharacterCounter = () => {
  const [counters, setCounters] = useState([1]);
  const [count, setCount] = useState<Count>({ ch: 0, words: 0 });
  const handleChange = ({ ch, words }: { ch: number; words: number }) => {
    setCount((prev) => ({
      ch: prev.ch + ch,
      words: prev.words + words,
    }));
  };

  const addCounter = () => {
    setCounters((prev) => {
      return [...prev, prev.length + 1];
    });
  };

  const deleteCounter = () => {
    setCounters((prev) => {
      prev.pop();
      return [...prev];
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