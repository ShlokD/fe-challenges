import { ChangeEvent, useState } from "react";

import HomeLink from "../home-link";
import { formatDate } from "../utils";

type DateCount = {
  date: string;
  count: number;
};

const createDates = (date: Date) => {
  return new Array(365)
    .fill(0)
    .map((_, i) => {
      const d = new Date();
      d.setDate(date.getDate() - i);
      return { date: formatDate(d), count: 0 };
    })
    .reverse();
};

const getBackgroundColor = (score: number) => {
  if (score <= 0) {
    return "bg-white";
  }
  if (score <= 2) {
    return "bg-yellow-100";
  }
  if (score <= 4) {
    return "bg-yellow-300";
  }
  if (score <= 6) {
    return "bg-yellow-500";
  }

  if (score >= 8) {
    return "bg-yellow-700";
  }
};
const HeatMap = () => {
  const [days, setDays] = useState<DateCount[]>(createDates(new Date()));
  const [currentDate, setCurrentDate] = useState<number>(days.length - 1);

  const decreaseCount = () => {
    setDays((prev) => {
      const newDays = [...prev];
      const prevVal = newDays[currentDate];
      newDays[currentDate] = {
        ...prevVal,
        count: prevVal.count <= 0 ? 0 : prevVal.count - 1,
      };
      return newDays;
    });
  };

  const increaseCount = () => {
    setDays((prev) => {
      const newDays = [...prev];
      const prevVal = newDays[currentDate];

      newDays[currentDate] = {
        ...prevVal,
        count: prevVal.count >= 12 ? 12 : prevVal.count + 1,
      };
      return newDays;
    });
  };

  const handleDateChange = (ev: ChangeEvent) => {
    const newDate = (ev.target as HTMLInputElement).value;
    const index = days.findIndex((d) => d.date === newDate);
    if (index !== -1) {
      setCurrentDate(index);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center">
      <header className="bg-yellow-400 p-4 flex flex-row justify-center gap-2 items-center w-full">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Heat Map </h1>
      </header>
      <main className="flex flex-col w-full h-full items-center p-4">
        <div
          className="grid gap-1 m-2 bg-purple-200 p-2 w-11/12"
          style={{
            gridTemplateColumns: "repeat(25, 1fr)",
          }}
        >
          {days.map((d, i) => {
            return (
              <button
                key={`day-${i}`}
                className={`${getBackgroundColor(
                  d.count,
                )} w-4 h-4 lg:w-16 lg:h-10 border-1 border-gray-400 shadow-lg`}
                aria-label={`date-${d.date}`}
                onClick={() => setCurrentDate(i)}
              ></button>
            );
          })}
        </div>
        <input
          id="select-date"
          type="date"
          aria-label="Select date"
          value={days[currentDate].date}
          onChange={handleDateChange}
          className="p-2 font-bold"
        />

        <div className="flex gap-6 items-center justify-center self-center w-2/3 my-4">
          <button
            className="font-bold w-8 h-8 rounded-full text-2xl bg-purple-500 text-white"
            aria-label="Decrease count"
            onClick={decreaseCount}
          >
            -
          </button>
          <p className="text-2xl font-bold">{days[currentDate].count}</p>
          <button
            className="font-bold w-8 h-8 rounded-full text-2xl bg-purple-500 text-white"
            aria-label="Increase count"
            onClick={increaseCount}
          >
            +
          </button>
        </div>
      </main>
    </div>
  );
};

export default HeatMap;
