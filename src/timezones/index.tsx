import { useEffect, useState } from "react";

import HomeLink from "../home-link";

const BASE_API = "https://geocoding-api.open-meteo.com/v1";

function throttle(fn: (...args: any[]) => any, time = 300) {
  let pause = false;

  return function (...args: any[]) {
    if (pause) {
      return;
    }
    pause = true;
    const res = fn(...args);
    setTimeout(() => {
      pause = false;
    }, time);
    return res;
  };
}

const fetchResults = async (term: string) => {
  const url = `${BASE_API}/search?name=${term}&language=en&format=json`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.results;
  } catch (_) {
    return [];
  }
};

const throttledFetch = throttle(fetchResults, 500);

const transformSearchResults = (results: any[]): Location[] => {
  return results.map((result) => {
    return {
      id: result.id,
      timezone: result.timezone,
      name: `${result.name}, ${result.country}`,
    };
  });
};

type Location = {
  id: number;
  timezone: string;
  name: string;
  time?: string;
  date?: string;
};

const getCurrentTime = (timeZone: string): { time: string; date: string } => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString("en-US", { timeZone }),
    date: now.toLocaleDateString("en-US", { timeZone }),
  };
};

const Timezones = () => {
  const [locations, setLocations] = useState<Record<number, Location>>({});
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const handleSearchChange = async (value: string) => {
    setSearchTerm(value);
    if (value.length >= 3) {
      const results = await throttledFetch(value);
      if (results?.length > 0) {
        setSearchResults(transformSearchResults(results));
      }
    } else {
      setSearchResults([]);
    }
  };

  const addToLocations = (location: Location) => {
    setLocations((prev) => {
      if (!prev[location.id]) {
        const newLocations = { ...prev };
        const { time, date } = getCurrentTime(location.timezone);
        newLocations[location.id] = { ...location, time, date };
        return newLocations;
      }
      return prev;
    });
    setShowForm(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (Object.values(locations).length > 0) {
      setInterval(() => {
        setLocations((prev) => {
          const newLocations = { ...prev };
          for (const key in newLocations) {
            const location = newLocations[key];
            const { time, date } = getCurrentTime(location.timezone);
            newLocations[location.id] = { ...location, time, date };
          }
          return newLocations;
        });
      }, 1000);
    }
  }, [locations]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-red-400 flex flex-row gap-2 justify-center items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">Timezones</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full">
        <div className="w-full p-4 flex items-center justify-center border-b-2 border-black">
          <button
            className="bg-blue-400 text-2xl rounded-xl shadow hover:bg-blue-500 w-1/3 p-4 font-bold text-white self-center"
            onClick={() => setShowForm(true)}
          >
            Add
          </button>
        </div>
        <div
          className={`${
            showForm ? "" : "hidden"
          } absolute z-10 bg-gray-100 p-8 w-2/3 flex flex-col border-2 border-black rounded-lg self-center overflow-y-scroll`}
          style={{
            transform: "translate(0%, 20%)",
            height: "600px",
          }}
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(ev) => handleSearchChange(ev?.target?.value)}
            className="p-4 border-2 border-black shadow text-xl rounded-lg"
            placeholder="Search..."
          />
          <div className="flex flex-col">
            {searchResults.map((result, i) => {
              return (
                <button
                  key={`result-${i}`}
                  onClick={() => addToLocations(result)}
                  className="w-full p-4 border-2 bg-white text-xl shadow rounded-lg font-bold hover:bg-blue-100 border-black my-2"
                >
                  {result.name}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="flex w-full"
          style={{
            flexGrow: "1",
          }}
        >
          {Object.values(locations).map((location, i) => {
            const { time, date } = location;
            const isEve =
              Number(time?.substring(0, 1)) > 5 && time?.endsWith("PM");
            return (
              <div
                key={`location-${i}`}
                className={`flex flex-col gap-8 p-4 justify-center items-center border-2 border-white text-white font-bold ${
                  isEve ? "bg-blue-900" : "bg-orange-500"
                }`}
                style={{
                  flex: "1 0 auto",
                }}
              >
                <p className="text-2xl">{time}</p>
                <p className="text-2xl">{date}</p>
                <p className="text-2xl">{location.name}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Timezones;
