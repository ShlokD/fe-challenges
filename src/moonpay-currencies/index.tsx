import { useCallback, useEffect, useState } from "react";

import HomeLink from "../home-link";

type Currency = {
  name: string;
  code: string;
  allowedUS: boolean;
  test: boolean;
};
const transformResponse = (results: any[]) => {
  return results.map((result) => {
    return {
      name: result?.name,
      code: result?.code,
      allowedUS: Boolean(result?.isSupportedInUS),
      test: Boolean(result?.supportsTestMode),
    };
  });
};

const shuffle = (arr: any[]) => {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const MoonpayCurrencies = () => {
  const [currency, setCurrency] = useState<Currency[]>([]);
  const [showNonUS, setShowNonUS] = useState(false);
  const [showNonTest, setShowNonTest] = useState(false);

  const fetchCurrency = async () => {
    const res = await fetch("https://api.moonpay.com/v3/currencies");
    const json = await res.json();
    setCurrency(transformResponse(json));
  };
  useEffect(() => {
    fetchCurrency();
  }, []);

  const handleSort = useCallback((type: string) => {
    if (type === "name") {
      setCurrency((prev) =>
        prev.slice().sort((a, b) => a.name.localeCompare(b.name)),
      );
    }
    if (type === "code") {
      setCurrency((prev) =>
        prev.slice().sort((a, b) => a.code.localeCompare(b.code)),
      );
    }
    if (type === "random") {
      setCurrency((prev) => shuffle(prev));
    }
  }, []);

  let displayCurrencies = [...currency];
  if (showNonUS) {
    displayCurrencies = displayCurrencies.filter((curr) => !curr.allowedUS);
  }
  if (showNonTest) {
    displayCurrencies = displayCurrencies.filter((curr) => !curr.test);
  }
  return (
    <div className="flex flex-col w-full">
      <header className="p-4 bg-yellow-400 flex flex-row items-center justify-center gap-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Moonpay Currencies</h1>
      </header>
      <main className="flex flex-col w-full">
        <div className="flex flex-row gap-4 items-center justify-center my-4">
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="us-only"
              className="w-6"
              defaultChecked={showNonUS}
              onChange={() => setShowNonUS((prev) => !prev)}
            ></input>
            <label htmlFor="us-only" className="text-2xl">
              Non-US Only
            </label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="test-only"
              className="w-6"
              defaultChecked={showNonTest}
              onChange={() => setShowNonTest((prev) => !prev)}
            ></input>
            <label htmlFor="test-only" className="text-2xl">
              Non-Test Only
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-2 my-4 justify-center text-lg font-bold">
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-white p-4 rounded-lg shadow-lg"
            onClick={() => handleSort("name")}
          >
            Sort by Name
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-white p-4 rounded-lg shadow-lg"
            onClick={() => handleSort("code")}
          >
            Sort by Code
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-white p-4 rounded-lg shadow-lg"
            onClick={() => handleSort("random")}
          >
            Random
          </button>
        </div>
        <div className="flex md:flex-row flex-col gap-2 flex-wrap my-4 items-center justify-center">
          {displayCurrencies.map((curr, i) => {
            return (
              <div
                key={`curr-${i}`}
                className={`${
                  curr.test ? "bg-green-100" : "bg-gray-100"
                } w-11/12 text-lg text-center md:w-1/3 lg:w-1/3 p-4  shadow-sm rounded-lg`}
              >
                {curr.name} - {curr.code}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MoonpayCurrencies;
