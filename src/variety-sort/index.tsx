import { useState } from "react";

import HomeLink from "../home-link";

type Element = {
  title: string;
  lastAccess: number;
  count: number;
};

export enum SortTypes {
  DEFAULT = "DEFAULT",
  MOST_VISIT = "MOST_VISIT",
  RECENT_VISIT = "RECENT_VISIT",
}
const SortOptions: Record<SortTypes, string> = {
  [SortTypes.DEFAULT]: "Default",
  [SortTypes.RECENT_VISIT]: "Recently Visited",
  [SortTypes.MOST_VISIT]: "Most Visited",
};

const DUMMY_DATA = [
  {
    title: "La Roche-sur-Yon",
    lastAccess: 1749493800000,
    count: 5,
  },
  {
    title: "Oakland",
    lastAccess: 1744914600000,
    count: 8,
  },
  {
    title: "Pacucha",
    lastAccess: 1731609000000,
    count: 6,
  },
  {
    title: "Huilongshan",
    lastAccess: 1741113000000,
    count: 7,
  },
  {
    title: "Makoko",
    lastAccess: 1756492200000,
    count: 5,
  },
  {
    title: "Kangping",
    lastAccess: 1732645800000,
    count: 5,
  },
  {
    title: "Kazlų Rūda",
    lastAccess: 1750098600000,
    count: 1,
  },
  {
    title: "Ostravice",
    lastAccess: 1743013800000,
    count: 1,
  },
  {
    title: "Sheffield",
    lastAccess: 1733423400000,
    count: 1,
  },
  {
    title: "Tāndo Mittha Khān",
    lastAccess: 1758911400000,
    count: 9,
  },
];

const VarietySort = () => {
  const [elements, setElements] = useState<Element[]>(
    DUMMY_DATA.sort((a, b) => a.title.localeCompare(b.title)),
  );
  const [currentSort, setCurrentSort] = useState(SortTypes.DEFAULT);

  const sortByType = (sort: SortTypes) => {
    setElements((prev) => {
      const cElements = prev.slice();
      switch (sort) {
        case SortTypes.MOST_VISIT:
          return cElements.sort((a, b) => b.count - a.count);
        case SortTypes.RECENT_VISIT:
          return cElements.sort((a, b) => b.lastAccess - a.lastAccess);
        case SortTypes.DEFAULT:
        default:
          return cElements.sort((a, b) => a.title.localeCompare(b.title));
      }
    });
  };

  const handleSort = (sort: SortTypes) => {
    setCurrentSort(sort);
    sortByType(sort);
  };

  const handleElementUpdate = (index: number) => {
    setElements((prev) => {
      const newElements = prev.slice();
      const prevElem = newElements[index];

      newElements[index] = {
        ...prevElem,
        lastAccess: new Date().getTime(),
        count: prevElem.count + 1,
      };

      return newElements;
    });
    sortByType(currentSort);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-blue-500 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Variety Sort </h1>
      </header>
      <main className="flex flex-col p-2 w-full min-h-screen">
        <div className="flex gap-4 items-center justify-center p-8 text-2xl font-bold w-full">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            className="border-2 border-black rounded-lg p-6 shadow"
            value={currentSort}
            onChange={(ev) => handleSort(ev.target.value as SortTypes)}
          >
            {Object.values(SortTypes).map((sortType, i) => {
              return (
                <option key={`sort-type-${i}`} value={sortType}>
                  {SortOptions[sortType]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          {elements.map((e: Element, i: number) => {
            return (
              <button
                key={`element-${i}`}
                onClick={() => handleElementUpdate(i)}
                className="w-full flex flex-col text-white p-8 gap-4 rounded-lg border-4 border-black border-dotted bg-orange-500 hover:bg-orange-600"
              >
                <span className="flex items-center justify-around gap-4">
                  <span className="text-4xl font-bold">{e.title}</span>
                  <span className="w-20 h-20 text-4xl font-bold rounded-full pt-4 bg-black">
                    {e.count}
                  </span>
                </span>
                <span className="text-3xl font-bold self-start pl-4 text-gray-100">
                  {new Date(e.lastAccess).toLocaleDateString()}
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default VarietySort;
