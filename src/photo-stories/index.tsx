import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const BASE_URL = "https://picsum.photos/1920/1080";

const PhotoStories = () => {
  const [images, setImages] = useState<string[]>(
    new Array(3).fill(0).map((_, i) => `${BASE_URL}?random=${i}`),
  );

  const [showStories, setShowStories] = useState(false);
  const [currentStory, setCurrentStory] = useState(-1);
  const [step, setStep] = useState(1);
  const intervalRef = useRef<number>(0);

  const startScreenshow = (index: number) => {
    setCurrentStory(index);
    setShowStories(true);
    setStep(1);
  };

  const addStory = () => {
    setImages((prev) => {
      return [...prev, `${BASE_URL}?random=${prev.length}`];
    });
  };

  const closeStories = () => {
    setStep(1);
    setCurrentStory(-1);
    setShowStories(false);
  };

  useEffect(() => {
    if (!showStories) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setStep(1);
      }
    } else {
      intervalRef.current = window.setInterval(() => {
        setStep((prev) => {
          if (prev === 3) {
            setCurrentStory((prev) => {
              if (prev === images.length - 1) {
                return 0;
              } else {
                return prev + 1;
              }
            });
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [showStories]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-yellow-400 flex flex-row items-center justify-center gap-2">
        <div className="p-2">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Photo Stories</h1>
      </header>
      <main className="flex flex-col  w-full p-2 w-full min-h-screen">
        <div className="flex gap-4 p-4 border-b-4 border-black w-full flex-wrap">
          <button
            className="w-20 h-20 rounded-full shadow-lg text-4xl font-bold bg-blue-300"
            onClick={addStory}
            aria-label="Add Story"
          >
            +
          </button>
          {images.map((image, i) => {
            return (
              <button
                aria-label={`story-${i + 1}`}
                key={`story-${i}`}
                className={`w-20 h-20 rounded-full shadow-lg text-4xl font-bold border-4 ${
                  currentStory === i ? "border-green-500" : "border-yellow-800"
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                }}
                onClick={() => startScreenshow(i)}
              ></button>
            );
          })}
        </div>
        <div
          className={`flex flex-col transition-opacity w-fullnpm ${
            showStories ? "opacity-100" : "opacity-0 invisible"
          }`}
        >
          <div className="flex">
            {images.map((_, i) => {
              return (
                <progress
                  key={`progress-${i}`}
                  aria-label={`progress-${i + 1}`}
                  value={i === currentStory ? step : 0}
                  max={3}
                  style={{
                    width: `${100 / images.length}%`,
                  }}
                />
              );
            })}
          </div>
          <button
            className="p-4 border-2 border-black w-1/5 rounded-xl shadow font-bold text-lg self-end mt-2"
            onClick={closeStories}
            aria-label="Close"
          >
            X
          </button>

          <div
            className={`flex m-4 transition-opacity duration-300 h-full w-full self-center items-center justify-center`}
            style={{
              backgroundImage: `url(${images[currentStory]})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "90vh",
            }}
          ></div>
        </div>
      </main>
    </div>
  );
};

export default PhotoStories;
