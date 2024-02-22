import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import HomeLink from "../home-link";

type MTimes = {
  year: string;
  month: string;
  milestone: string;
};

const DEFAULT_TIMES: MTimes[] = [
  {
    year: "2020",
    month: "JUNE",
    milestone: "Founded in Ahmedabad, India",
  },
  {
    year: "2020",
    month: "AUGUST",
    milestone: "Secure initial funding of $100,000",
  },
  {
    year: "2020",
    month: "NOVEMBER",
    milestone: "Launch beta version of the app to 1,000 users",
  },
  {
    year: "2021",
    month: "APRIL",
    milestone: "Achieve 10,000 active users and a 4.5-star rating",
  },
  {
    year: "2021",
    month: "DECEMBER",
    milestone: "Secure Series A funding of $5 million",
  },
  {
    year: "2022",
    month: "MAY",
    milestone: "Expand to 5 new languages and reach 100,000 active users",
  },
  {
    year: "2023",
    month: "OCTOBER",
    milestone:
      "Partner with major educational institutions and become profitable",
  },
];

const preloadImages = (count: number) => {
  const images = new Array(count);
  for (let i = 0; i < count; ++i) {
    images[i] = new Image();
    images[i].src = `https://picsum.photos/640?random=${i}`;
  }
};

const Timeline = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 566 });
  const isBigScreen = useMediaQuery({ maxWidth: 772 });
  const isDesktop = useMediaQuery({ maxWidth: 1439 });

  const handleSelect = (i: number) => {
    setSelectedIndex(i);
    if (scrollContainerRef.current) {
      scrollContainerRef?.current?.scrollTo?.({
        top: 0,
        left: i * ((buttonRef?.current?.clientWidth || 45) - 45),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    preloadImages(DEFAULT_TIMES.length);
  }, []);

  const selectedEntry = DEFAULT_TIMES[selectedIndex];

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <header className="p-4 bg-blue-900 flex flex-row gap-2 justify-center items-center">
        <div className="bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl text-white">Timeline</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full">
        <div
          className="flex flex-col w-full relative justify-center overflow-hidden"
          style={{
            height: "66vh",
          }}
        >
          <p
            className="absolute text-cyan-100 font-bold self-center overflow-hidden"
            style={{
              zIndex: "-1",
              fontSize: "18rem",
            }}
          >
            {selectedEntry.year}
          </p>
          <img
            src={`https://picsum.photos/640?random=${selectedIndex}`}
            className="self-center z-10 ml-4 lg:ml-0 rounded-2xl"
            height="640"
            width="640"
            style={{
              transform: "rotate(-25deg)",
              maxWidth: isMobile
                ? "45%"
                : isBigScreen
                ? "34%"
                : isDesktop
                ? "25%"
                : "14%",
              height: "auto",
            }}
          />
          <div className="flex gap-2 self-end absolute bottom-2 m-4">
            <button
              onClick={() => handleSelect(selectedIndex - 1)}
              disabled={selectedIndex === 0}
              aria-label="Previous"
              className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 text-xl lg:text-4xl font-bold shadow ${
                selectedIndex === 0 ? "text-gray-400" : "text-blue-700"
              }`}
            >
              &lArr;
            </button>
            <button
              onClick={() => handleSelect(selectedIndex + 1)}
              disabled={selectedIndex === DEFAULT_TIMES.length - 1}
              aria-label="Next"
              className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 text-xl lg:text-4xl font-bold shadow ${
                selectedIndex === DEFAULT_TIMES.length - 1
                  ? "text-gray-400"
                  : "text-blue-700"
              }`}
            >
              &rArr;
            </button>
          </div>

          <p
            className="text-md lg:text-4xl w-1/3 lg:w-1/4 font-bold self-start absolute left-1 block py-12 mx-4"
            style={{
              bottom: "20px",
            }}
          >
            {selectedEntry.milestone}
          </p>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-auto shadow border-2 border-black"
        >
          {DEFAULT_TIMES.map((time, i) => {
            const selected = selectedIndex === i;
            return (
              <button
                key={`time-${i}`}
                className={`w-2/5 lg:w-1/3 grow-1 shrink-0 py-4 px-2 lg:py-8 lg:px-4 flex flex-col border-r-2 border-black ${
                  selected ? "text-blue-400" : "text-black"
                }`}
                onClick={() => handleSelect(i)}
                ref={i === 0 ? buttonRef : null}
              >
                <p className="text-3xl lg:text-5xl font-bold">{time.year}</p>
                <p className="text-md lg:text-xl">{time.month}</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Timeline;
