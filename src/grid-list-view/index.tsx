import { useEffect, useState } from "react";

import HomeLink from "../home-link";

const BASE_URL = "https://rickandmortyapi.com/api/character";

type Character = {
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
  location: string;
};

const transformResults = (results: any[]) => {
  return results.map((result) => ({
    name: result.name,
    species: result.species,
    gender: result.gender,
    status: result.status,
    location: result.location.name,
    image: result.image,
  }));
};

const GridListView = () => {
  const [list, setList] = useState<Character[]>([]);
  const [isGrid, setIsGrid] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(BASE_URL);
      const json = await res.json();
      setList(transformResults(json?.results));
    } catch (_) {
      setList([]);
    }
  };

  const toggleView = (grid: boolean) => {
    setIsGrid(grid);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-blue-500">
        <HomeLink />
        <h1 className="font-bold text-2xl">Grid List View</h1>
      </header>
      <main className="flex flex-col w-full p-8 bg-gray-800 min-h-screen">
        <div className="flex gap-2 self-end items-end">
          <button
            className={`p-6 rounded-xl text-2xl ${
              isGrid ? "bg-orange-200" : "bg-white"
            }`}
            aria-label="Grid View"
            disabled={isGrid}
            onClick={() => toggleView(true)}
          >
            <img src="/grid.png" height={32} width={32} alt="" />
          </button>

          <button
            className={`p-6 rounded-xl text-2xl ${
              !isGrid ? "bg-orange-200" : "bg-white"
            }`}
            aria-label="List View"
            disabled={!isGrid}
            onClick={() => toggleView(false)}
          >
            <img src="/list.png" alt="" height={32} width={32} />
          </button>
        </div>
        <div
          className={`${
            isGrid ? "grid grid-cols-2 lg:grid-cols-4" : "flex flex-col"
          } gap-4 text-white my-8`}
        >
          {list.map((listItem, i) => {
            return (
              <div
                key={`list-item-${i}`}
                className={`${
                  isGrid ? "flex-col" : "w-full"
                } flex hover:bg-orange-600 cursor-pointer items-center gap-8 shadow-md border-2 border-cyan-200 shadow-cyan-500 rounded-2xl p-8`}
              >
                <img
                  src={listItem.image}
                  alt={listItem.name}
                  height={90}
                  width={90}
                  className="rounded-full"
                />
                <div className="flex flex-col w-full gap-2">
                  <p className="font-bold text-2xl pl-1">{listItem.name}</p>
                  <p className="font-bold text-sm pl-1">{listItem.species}</p>

                  <p className="font-bold  text-sm pl-1">{listItem.gender}</p>

                  <hr className="w-full border-2 border-cyan-200 my-1" />
                  <div className="font-bold flex items-center gap-2 pl-1">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        listItem.status === "Alive"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    {listItem.status}
                  </div>
                  <p className="font-bold text-xs">🌐 {listItem.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default GridListView;
