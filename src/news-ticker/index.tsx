import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const newsHeadlines = [
  "Local Zoo Welcomes Adorable Baby Panda",
  "City Council Approves Funding for New Park",
  "Scientists Develop Promising New Cancer Treatment",
  "Local Artist Wins Prestigious Award",
  "Sports Team Advances to Championship Game",
  "Experts Predict Economic Growth in Coming Year",
  "New Restaurant Opens in Downtown Area",
  "Community Rallies to Support Family After House Fire",
  "International Summit Focuses on Climate Change",
  "Tech Company Unveils Groundbreaking New Gadget",
];

const ScrollingTicker = () => {
  const headlines = newsHeadlines.join(" | ");
  return (
    <div className="border-2 border-orange-400 rounded-xl flex w-full items-center justify-center gap-2">
      <div className="py-2 px-4 bg-orange-400 rounded-xl text-xl text-white w-1/4 z-10 font-bold text-center">
        Latest News
      </div>
      <div
        className="marquee w-3/4 relative"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <p className="text-lg">{headlines}</p>
      </div>
    </div>
  );
};

const DisappearTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const animateInterval = useRef<number | null>(null);

  useEffect(() => {
    if (!animateInterval.current) {
      animateInterval.current = window.setInterval(() => {
        setAnimating(true);

        setTimeout(() => {
          setCurrentIndex((prev) =>
            prev === newsHeadlines.length - 1 ? 0 : prev + 1,
          );
          setAnimating(false);
        }, 1000);
      }, 2500);
    }
  }, []);

  return (
    <div className="border-2 border-green-400 rounded-xl flex w-full items-center gap-2">
      <div className="py-2 px-4 bg-green-400 rounded-xl text-xl text-white w-1/4 z-10 font-bold text-center">
        Latest News
      </div>
      <p
        className={`text-lg w-3/4 transition-opacity transition-duration-1000 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        {newsHeadlines[currentIndex]}
      </p>
    </div>
  );
};

const VerticalTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animateInterval = useRef<number | null>(null);

  const setPrevHeadline = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? newsHeadlines.length - 1 : prev - 1;
    });
  };

  const setNextHeadline = () => {
    setCurrentIndex((prev) => {
      return prev === newsHeadlines.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (!animateInterval.current) {
      animateInterval.current = window.setInterval(() => {
        setCurrentIndex((prev) =>
          prev === newsHeadlines.length - 1 ? 0 : prev + 1,
        );
      }, 3000);
    }
  }, []);

  return (
    <div className="border-2 border-red-400 rounded-xl flex w-full items-center gap-2">
      <div className="py-2 px-4 bg-red-400 rounded-xl text-xl text-white w-1/4 z-10 font-bold text-center">
        Latest News
      </div>
      <div
        className="w-3/4 overflow-hidden"
        style={{
          height: "30px",
        }}
      >
        {newsHeadlines.map((news, i) => {
          return (
            <p
              key={`headline-${i}`}
              className="text-lg relative w-full"
              style={{
                top: `-${currentIndex * 28}px`,
                transition: "top 200ms ease-in-out",
              }}
            >
              {news}
            </p>
          );
        })}
      </div>
      <button className="text-2xl font-bold p-2" onClick={setPrevHeadline}>
        &uArr;
      </button>
      <button className="text-2xl font-bold p-2" onClick={setNextHeadline}>
        &dArr;
      </button>
    </div>
  );
};

const NewsTicker = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-red-500 text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Password Strength</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center gap-4">
        <h2 className="text-xl font-bold p-4">Scrolling</h2>
        <ScrollingTicker />
        <h2 className="text-xl font-bold p-4">Appear/Disappear</h2>
        <DisappearTicker />
        <h2 className="text-xl font-bold p-4">Vertical</h2>
        <VerticalTicker />
      </main>
    </div>
  );
};

export default NewsTicker;
