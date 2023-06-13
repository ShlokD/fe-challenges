import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

type BikeResults = {
  image: string;
  title: string;
  location: string;
  description: string;
  date: number;
};

const STOCK =
  "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80";

const transformBikes = (rawBikes: any[]) => {
  return rawBikes.map((bike) => {
    return {
      image: bike?.thumb || bike?.large_img || STOCK,
      title: bike?.title,
      location: bike?.stolen_location,
      description: bike?.description || "",
      date: bike?.date_stolen * 1000,
    };
  });
};

const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

type CaseState = {
  currentResults: Record<number, BikeResults[]>;
  displayResults: BikeResults[];
};
const StolenBikes = () => {
  const [appState, setAppState] = useState("READY");
  const [cases, setCases] = useState<CaseState>({
    currentResults: {},
    displayResults: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showClearButton, setShowClearButton] = useState(false);
  const today = formatDate(new Date());

  const page = useRef(1);

  const fetchCases = async () => {
    if (cases?.currentResults[page.current]?.length > 0) {
      setCases({
        ...cases,
        displayResults: cases?.currentResults[page.current],
      });
      return;
    }
    setAppState("LOADING");
    const query = `https://bikeindex.org:443/api/v3/search?page=${page.current}&per_page=10&location=Berlin&distance=10&stolenness=proximity`;
    const res = await fetch(query);
    const json = await res.json();
    if (json?.bikes.length === 0) {
      setAppState("EMPTY");
      setCases({
        currentResults: {},
        displayResults: [],
      });
      return;
    }
    const results = transformBikes(json?.bikes);

    setCases({
      currentResults: { ...cases.currentResults, [page.current]: results },
      displayResults: results,
    });
    setAppState("READY");
  };

  useEffect(() => {
    if (appState === "READY") {
      fetchCases();
    }
  }, []);

  const filterCases = () => {
    if (searchQuery === "" && startDate === null && endDate === null) {
      setCases({
        ...cases,
        displayResults: cases?.currentResults[page.current],
      });
    }

    const allResults = Object.values(cases?.currentResults).reduce(
      (all, result) => {
        return [...all, ...result];
      },
      [],
    );

    let filteredResults = allResults;
    if (searchQuery !== "") {
      filteredResults = filteredResults.filter((result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    const startMs = startDate?.getTime();
    const endMs = endDate?.getTime();

    if (startMs) {
      if (endMs) {
        filteredResults = filteredResults.filter(
          (result) => result.date >= startMs && result.date <= endMs,
        );
      } else {
        filteredResults = filteredResults.filter(
          (result) => result.date >= startMs,
        );
      }
    }

    if (endMs) {
      filteredResults = filteredResults.filter(
        (result) => result.date <= endMs,
      );
    }

    setCases({
      ...cases,
      displayResults: filteredResults,
    });
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
    setShowClearButton(true);
  };

  const handleClearClick = () => {
    setShowClearButton(false);
    setCases({
      ...cases,
      displayResults: cases?.currentResults[page.current],
    });
  };

  const setPage = (val: number) => {
    window.scrollTo(0, 0);
    page.current = val;
    fetchCases();
  };

  const startDateStr = formatDate(startDate);
  const endDateStr = formatDate(endDate);

  return (
    <div className="flex flex-col w-full">
      <header className="bg-yellow-600 p-2 flex flex-col">
        <HomeLink />
        <h1 className="text-white font-bold self-center">
          Berlin Police Stolen Bikes
        </h1>
      </header>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center bg-gray-100 p-4 w-full">
          <input
            className="border-2 p-2"
            aria-label="Search description"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Search bikes"
            value={searchQuery}
            max={today}
            onChange={(ev) =>
              setSearchQuery((ev?.target as HTMLInputElement)?.value)
            }
          />
          <div className="flex flex-row mt-2 items-center">
            <label htmlFor="from-search">From </label>
            <input
              className="border-2 p-2 mx-2 text-sm"
              type="date"
              id="from-search"
              value={startDateStr}
              max={endDateStr || today}
              onChange={(ev) => setStartDate(new Date(ev?.target?.value))}
            ></input>
            <label htmlFor="to-search">To </label>
            <input
              className="border-2 p-2 mx-2 text-sm"
              type="date"
              id="to-search"
              value={endDateStr}
              onChange={(ev) => {
                const newEndDate = new Date(ev?.target.value);
                if (
                  startDate &&
                  startDate?.getTime?.() > newEndDate.getTime()
                ) {
                  setStartDate(newEndDate);
                }
                setEndDate(newEndDate);
              }}
            ></input>
          </div>
          <button
            onClick={filterCases}
            className="bg-purple-500 py-2 px-6 my-2 text-white text-bold self-center rounded-lg"
          >
            Find
          </button>
          <button
            onClick={handleClearClick}
            className={`${
              showClearButton ? "block" : "hidden"
            } bg-gray-500 py-2 px-6 my-2 text-white text-bold self-center rounded-lg`}
          >
            Clear
          </button>
        </div>
        <div className="flex flex-col w-full gap-4 p-2">
          {appState === "LOADING" && (
            <p className="text-xl self-center font-bold">Loading...</p>
          )}
          {appState === "EMPTY" && <p>No Results Found</p>}
          <p className="self-end p-4 font-bold text-xl">Page: {page.current}</p>

          {appState === "READY" &&
            cases?.displayResults?.map((result, index) => {
              return (
                <div
                  key={`bike-${index}`}
                  className="w-full flex flex-row border-2 border-black "
                >
                  <img
                    className="w-1/3"
                    alt={result?.title}
                    src={result?.image}
                  ></img>
                  <div className="flex flex-col p-2">
                    <p className="text-xl font-bold">{result?.title}</p>
                    <p className="text-lg my-2">{result?.description}</p>
                    <time>{new Date(result?.date).toLocaleDateString()}</time>
                    <p>{result?.location}</p>
                  </div>
                </div>
              );
            })}
          <div className="flex flex-row gap-2 items-center justify-center my-2">
            <button
              className={`p-4 ${
                page.current === 1 ? "bg-gray-400" : "bg-yellow-400"
              } text-white font-bold text-xl`}
              disabled={page.current === 1}
              onClick={() => setPage(page.current - 1)}
            >
              Prev
            </button>
            <button
              className="p-4 bg-yellow-400 text-white font-bold text-xl"
              onClick={() => setPage(page.current + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StolenBikes;
