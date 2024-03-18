import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";
import { pickRandom } from "../utils";

const createUtterance = (text: string) => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.volume = 1;
  utterance.rate = 0.1;
  utterance.pitch = 2;
  utterance.text = text;
  utterance.lang = "en";
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices?.[0];
  return utterance;
};
const SpellingBee = () => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [current, setCurrent] = useState({ word: "", order: 0 });
  const [input, setInput] = useState("");
  const [stats, setStats] = useState(0);
  const [animate, setAnimate] = useState("NONE");
  const speaker = useRef<SpeechSynthesisUtterance | null>(null);

  const loadWords = async () => {
    const res = await fetch("/words.txt");
    const words = await res.text();
    const list = words.split("\r\n").filter((w) => w.length > 6);
    setWordList(list);
    const word = pickRandom(list);
    speaker.current = createUtterance(word);

    setCurrent({ word, order: 0 });
  };

  const checkWord = () => {
    const isCorrect = input.toLowerCase() === current.word.toLowerCase();
    if (isCorrect) {
      setStats((prev) => prev + 1);
      setAnimate("CORRECT");
      setTimeout(() => {
        const word = pickRandom(wordList);
        speaker.current = createUtterance(word);

        setCurrent((prev) => ({
          word,
          order: prev.order + 1,
        }));
        setAnimate("NONE");
        setInput("");
      }, 1000);
    } else {
      setAnimate("INCORRECT");
      setTimeout(() => {
        setAnimate("NONE");
        setInput("");
      }, 1000);
    }
  };

  const rejectWord = () => {
    setAnimate("INCORRECT");
    setTimeout(() => {
      setInput(current.word);
    }, 200);
    setTimeout(() => {
      const word = pickRandom(wordList);
      speaker.current = createUtterance(word);
      setCurrent((prev) => ({
        word,
        order: prev.order + 1,
      }));
      setAnimate("NONE");
      setInput("");
    }, 1000);
  };

  const playWord = () => {
    if (speaker.current && window?.speechSynthesis) {
      window.speechSynthesis.speak(speaker.current);
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  useEffect(() => {
    if (speaker.current) {
      playWord();
    }
  }, [current.word, speaker.current]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-blue-600 p-4 flex items-center text-center justify-center w-full gap-2">
        <HomeLink />
        <h1 className="text-white font-bold self-center">Spelling Bee</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-2 items-center my-8">
        <button
          onClick={playWord}
          aria-label="Play word"
          className="w-20 h-20 rounded-full text-4xl font-bold bg-blue-400 my-4 text-center text-white shadow-lg"
        >
          &rArr;
        </button>
        <p className="text-lg font-bold p-4">Score {stats}</p>
        <input
          className={`w-2/3 p-4 text-xl lg:text-4xl shadow-2xl rounded-lg  ${
            animate === "NONE"
              ? "border-2 border-gray-100"
              : animate === "CORRECT"
              ? "border-4 border-green-400 animate-pulse duration-150"
              : "border-4 border-red-400 animate-pulse duration-150"
          }`}
          placeholder="Enter spelling"
          aria-label="Enter spelling"
          value={input.toUpperCase()}
          onChange={(ev) => setInput(ev?.target?.value)}
        />
        <button
          className="bg-blue-500 p-4 w-2/3 font-bold text-white my-4"
          onClick={checkWord}
        >
          Submit
        </button>
        <button
          className="bg-red-500 p-4 w-2/3 font-bold text-white my-4"
          onClick={rejectWord}
        >
          Give Up
        </button>
      </main>
    </div>
  );
};

export default SpellingBee;
