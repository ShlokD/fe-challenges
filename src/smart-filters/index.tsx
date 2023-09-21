import { useEffect, useState } from "react";

import HomeLink from "../home-link";

type SelectedFilter = {
  filter?: string;
  typeFilter?: string;
  value?: string;
  type?: string;
  options?: string[];
};

const filters: SelectedFilter[] = [
  {
    filter: "Title",
    type: "string",
  },
  {
    filter: "Status",
    type: "string",
  },
  {
    filter: "Revenue",
    type: "number",
  },
  {
    filter: "Clickthrough Rate",
    type: "number",
  },
  {
    filter: "Kind",
    type: "option",
    options: ["Black", "Brown", "Blue", "White"],
  },
  {
    filter: "Expired",
    type: "boolean",
  },
];

const typeOptions: Record<string, string[]> = {
  string: ["is", "is not"],
  boolean: ["yes", "no"],
  number: [
    "is",
    "is not",
    "more than",
    "less than",
    "more than or equal to",
    "less than or equal to",
  ],
};

const FilterInput: React.FC<{
  type?: string;
  options?: string[];
  handleValueChange: (value: string) => void;
}> = ({ type, options, handleValueChange }) => {
  const [value, setValue] = useState(options?.[0] || "");
  const sendValue = () => {
    if (value === "") {
      return;
    }
    handleValueChange(value);
  };
  const Add = () => {
    return (
      <button
        className="text-white bg-blue-400 font-bold rounded-full w-12 h-12"
        onClick={sendValue}
      >
        +
      </button>
    );
  };
  useEffect(() => {
    setValue(options?.[0] || "");
  }, [type]);

  if (type === "string" || type === "number") {
    return (
      <div className="flex items-center gap-2">
        <input
          className="p-4"
          type={type === "number" ? "number" : "text"}
          value={value}
          onChange={(ev) => setValue((ev?.target as HTMLInputElement)?.value)}
          aria-label="Enter value"
          placeholder="Enter value"
        />
        <Add />
      </div>
    );
  }
  if (type === "option") {
    return (
      <div className="flex items-center gap-2">
        <select
          className="text-2xl p-4"
          defaultValue={value}
          onChange={(ev) => setValue((ev?.target as HTMLSelectElement)?.value)}
        >
          {options?.map((opt, i) => {
            return (
              <option value={opt} key={`value-${i}`}>
                {opt}
              </option>
            );
          })}
        </select>
        <Add />
      </div>
    );
  }
  return null;
};

const SmartFilters = () => {
  const [addedFilters, setAddedFilters] = useState<SelectedFilter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilter>({
    filter: "None",
  });

  const handleFilterSelect = (name: string) => {
    const filter = filters.find((f) => f.filter === name);
    const typeOption = filter?.type ? typeOptions[filter?.type] : [];

    setSelectedFilter({ ...filter, typeFilter: typeOption[0], value: "" });
  };

  const handleTypeSelect = (type: string) => {
    setSelectedFilter((prev) => {
      return { ...prev, typeFilter: type };
    });
  };

  const handleValueChange = (value: string) => {
    const filterToAdd = { ...selectedFilter, value };
    setAddedFilters((prev) => [...prev, filterToAdd]);
    setSelectedFilter({ filter: "None" });
  };

  const removeFilter = (index: number) => {
    setAddedFilters((addedFilters) => {
      return addedFilters.filter((_, i) => i !== index);
    });
  };
  const typeOption = selectedFilter?.type
    ? typeOptions[selectedFilter?.type]
    : [];
  return (
    <div className="flex flex-col w-full">
      <header className="bg-blue-600 p-4 flex justify-center gap-4 items-center">
        <HomeLink />
        <h1 className="text-white font-bold self-center text-2xl">
          Smart Filters
        </h1>
      </header>
      <main className="flex flex-col w-full min-h-screen">
        <div className="flex flex-col self-center my-8 items-center justify-center w-11/12 p-8 rounded-lg bg-gray-100 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <img src="/filter.png" height="48" width="48" alt=""></img>
            <p className="text-4xl font-bold">Add a filter</p>
          </div>
          <div className="flex items-center justify-start gap-2 my-4">
            <select
              className="text-2xl p-4"
              value={selectedFilter?.filter}
              onChange={(ev) => handleFilterSelect(ev?.target?.value)}
              aria-label="Select filter name"
            >
              <option value="None">Select an option</option>
              {filters.map((filter, i) => {
                return (
                  <option key={`filter-${i}`} value={filter.filter}>
                    {filter.filter}
                  </option>
                );
              })}
            </select>
            {typeOption?.length > 0 && (
              <select
                className="text-2xl p-4"
                defaultValue={typeOption[0]}
                onChange={(ev) =>
                  handleTypeSelect((ev?.target as HTMLSelectElement)?.value)
                }
              >
                {typeOption.map((tOption, i) => {
                  return (
                    <option value={tOption} key={`type-option-${i}`}>
                      {tOption}
                    </option>
                  );
                })}
              </select>
            )}
            {selectedFilter?.filter !== "None" && (
              <FilterInput
                type={selectedFilter?.type}
                options={selectedFilter?.options}
                handleValueChange={handleValueChange}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-2/3 self-center">
          {addedFilters.map((addedFilter, i) => {
            return (
              <div
                key={`added-filter-${i}`}
                className="flex gap-2 items-center justify-center p-4"
              >
                <button
                  className="bg-gray-200 p-4 rounded-lg"
                  onClick={() => removeFilter(i)}
                >
                  {addedFilter.filter} {String.fromCharCode(10007)}
                </button>
                <p>{addedFilter.typeFilter}</p>
                <p className="font-bold">{addedFilter.value}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SmartFilters;
