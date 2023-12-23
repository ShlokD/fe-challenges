import { useRef, useState } from "react";

import HomeLink from "../home-link";

const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

const getDateDiff = (date: Date) => {
  const current = new Date();
  const diffTime = Math.abs(current.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const weeks = Math.floor(diffDays / 7 - months * 4);
  const days = diffDays - months * 30;

  const seconds = diffTime / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
    months,
  };
};

type Diff = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
};

const GridCountdown = () => {
  const [futureDate, setFutureDate] = useState(new Date());
  const [diff, setDiff] = useState<Diff | null>(null);
  const intervalRef = useRef<number | null>(null);

  const handleDateChange = (date: string) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const newDate = new Date(date);
    intervalRef.current = window.setInterval(() => {
      setDiff(getDateDiff(newDate));
    }, 1000);
  };

  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-yellow-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Grid Countdown</h1>
      </header>

      <main className="flex flex-col w-screen min-h-screen items-center py-8 px-4">
        <div className="flex items-center gap-2">
          <label htmlFor="date-input" className="font-bold">
            Select Date
          </label>
          <input
            className="text-xl border-2 shadow-xl rounded-2xl p-2"
            id="date-input"
            type="date"
            min={formatDate(new Date())}
            value={formatDate(futureDate)}
            onChange={(ev) => handleDateChange(ev.target.value)}
          />
        </div>
        {diff && (
          <div className="grid grid-cols-3 mt-4">
            <div className="p-4 lg:p-16 border-2 shadow-lg border-black bg-red-400 text-white font-bold text-4xl text-center">
              {diff["months"].toFixed(0)} Months
            </div>
            <div className="p-4 lg:p-16 border-2 shadow-lg border-black bg-blue-400 text-white font-bold text-4xl text-center">
              {diff["weeks"].toFixed(0)} Weeks
            </div>
            <div className="p-4 lg:p-16 border-2 shadow-lg border-black bg-green-400 text-white font-bold text-4xl text-center">
              {diff["days"].toFixed(0)} Days
            </div>
            <div className="p-4 lg:p-16 border-2 shadow-lg border-black bg-black text-white font-bold text-4xl text-center">
              {diff["hours"].toFixed(0)} Hours
            </div>
            <div className="p-4 lg:p-16 border-2 shadow-lg border-black bg-purple-400 text-white font-bold text-4xl text-center">
              {diff["minutes"].toFixed(0)} Minutes
            </div>
            <div className="p-4 lg:p-16 border-2 shadow-lg border-black bg-orange-400 text-white font-bold text-4xl text-center">
              {diff["seconds"].toFixed(0)} Seconds
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GridCountdown;
