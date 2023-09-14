import { useEffect, useRef, useState } from "react";
import { SpinnerCircular } from "spinners-react";

import HomeLink from "../home-link";

const letters = "ZYXWVUTSRQPONMLKJIHGFEDCBA".split("");

const Patatap = () => {
  const soundRef = useRef(
    letters.map((letter) => new Audio(`/sounds/beat${letter}.mp3`)),
  );
  const sounds = soundRef.current;
  const readyRef = useRef<number[]>([]);
  const [play, setPlay] = useState(false);
  const playSound = (index: number) => {
    sounds?.[index]?.play();
  };

  const handleKeyDown = (ev: KeyboardEvent) => {
    const keyCode = ev.key;
    const index = letters.indexOf(keyCode.toUpperCase());
    playSound(index);
  };

  const canPlay = (i: number) => {
    readyRef.current.push(i);
    if (readyRef.current.length === 26) {
      setPlay(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const frag = new DocumentFragment();
    letters.forEach((letter) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "preload");
      link.setAttribute("as", "audio");
      link.setAttribute("href", `/sounds/beat${letter}.mp3`);
      frag.appendChild(link);
    });
    document.head.appendChild(frag);
    sounds.forEach((sound, index) => {
      sound.addEventListener("canplaythrough", () => canPlay(index));
    });
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Patatap Clone</h1>
      </header>
      <main className="flex flex-col w-full bg-gray-600">
        {!play && (
          <div className="absolute" style={{ top: "40%", left: "40%" }}>
            <SpinnerCircular title="loader" size="100%" enabled={!play} />
          </div>
        )}

        <div className="grid grid-cols-3" style={{ minHeight: "92.5vh" }}>
          {letters.map((letter, i) => {
            return (
              <button
                key={`sound-${i}`}
                className={`${
                  !play ? "hidden" : ""
                } hover:bg-gray-800 animate-button focus:border-none p-4`}
                disabled={!play}
                onClick={() => playSound(i)}
                aria-label={`beat-${letter}`}
              ></button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Patatap;
