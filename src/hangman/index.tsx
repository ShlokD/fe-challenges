import { useEffect, useState } from "react";

import HomeLink from "../home-link";

const alphabets = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
const END = 8;

type Word = {
  letter: string;
  show: boolean;
};

type Round = {
  word: Word[];
  meaning: string;
};
type Letter = {
  letter: string;
  played: boolean;
};
const Hangman = () => {
  const [index, setIndex] = useState(1);
  const [wordList, setWordList] = useState<string[]>([]);
  const [round, setRound] = useState<Round>({ word: [], meaning: "" });
  const [letters, setLetters] = useState<Letter[]>(
    alphabets.map((l) => ({ letter: l, played: false })),
  );
  const setupRound = async (list: string[]) => {
    let meaning;
    while (!meaning) {
      let word;
      while (!word) {
        word = list[Math.floor(Math.random() * list.length)];
      }

      const res2 = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      const json = await res2.json();
      meaning = json?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
      if (meaning) {
        setRound({
          word: word
            .toUpperCase()
            .split("")
            .map((w) => ({ letter: w, show: false })),
          meaning,
        });
      }
    }
  };

  const loadWords = async () => {
    const res = await fetch("/words.txt");
    const words = await res.text();
    const list = words.split("\r\n");
    setWordList(list);
    setupRound(list);
  };

  const playLetter = (letter: string, index: number) => {
    setLetters((prev) => {
      const newLetters = prev.slice();
      newLetters[index].played = true;
      return newLetters;
    });
    const hasLetter = round.word.find((w) => {
      return `${w.letter}` === letter;
    });
    if (hasLetter) {
      setRound((prev) => {
        return {
          ...prev,
          word: prev.word.slice().map((entry) => ({
            ...entry,
            show: entry.show || entry.letter === letter,
          })),
        };
      });
    } else {
      setIndex((prev) => {
        return prev === END ? END : prev + 1;
      });
    }
  };

  const playNewWord = () => {
    setLetters(alphabets.map((l) => ({ letter: l, played: false })));
    setIndex(1);
    setupRound(wordList);
  };
  useEffect(() => {
    loadWords();
  }, []);

  const win = round.word.length > 0 && round.word.every((w) => w.show);
  const atEnd = index === END;
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-green-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">Hangman</h1>
      </header>
      <main className="flex flex-col min-h-screen items-center">
        <img
          className="p-4"
          src={`/hangman${index}.png`}
          height="160"
          width="160"
          alt="Hangman Status"
        />
        <div className="text-8xl flex flex-wrap gap-4 p-8">
          {round.word.map((word, i) => {
            return (
              <p key={`word-${i}`}>
                {word.show || atEnd || win ? word.letter : "_"}
              </p>
            );
          })}
        </div>
        {win && (
          <p className="text-4xl text-blue-800 font-bold">
            You Win!. Tries left: {END - index}{" "}
          </p>
        )}
        {atEnd && !win && (
          <p className="text-4xl text-red-500 font-bold">You Lose!</p>
        )}
        {(atEnd || win) && (
          <button
            className="bg-red-400 p-6 my-2 text-2xl font-bold text-white rounded-lg"
            onClick={playNewWord}
          >
            New Word
          </button>
        )}
        <p className="text-4xl font-bold p-4 text-center">{round.meaning}</p>
        <div className="grid grid-cols-10 gap-4 p-4 place-center">
          {letters.map((l, i) => {
            return (
              <button
                key={`letter-${i}`}
                className={`${
                  l.played ? "bg-gray-400" : "bg-blue-400"
                } h-12 w-12 rounded-full font-bold text-2xl`}
                onClick={() => playLetter(l.letter, i)}
                disabled={l.played || atEnd}
              >
                {l.letter}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Hangman;
