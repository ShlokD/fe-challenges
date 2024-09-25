import { useState } from "react";

import HomeLink from "../home-link";

const FIXED = [1, 2, 3];
const DonationPage = () => {
  const [value, setValue] = useState(1);

  const amount = value * 200;
  const fixedValue = FIXED.some((v) => v === value);
  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-green-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Donation Page</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center justify-center">
        <div className="bg-green-100 rounded-xl shadow flex flex-col px-16 py-8 gap-12">
          <h2 className="font-bold text-center text-3xl">Buy X A Coffee</h2>
          <div className="flex gap-4 items-center">
            <img src="/coffee.png" alt="Coffee" height={60} width={60} />
            <p>X</p>
            {FIXED.map((val, i) => {
              const selected = value === val;
              return (
                <div key={`coffee-${i}`} className="flex flex-col w-1/4">
                  <label
                    htmlFor={`coffee-${i}`}
                    className={`text-xl w-10 h-10 rounded-full cursor-pointer text-center border-2 border-black pt-1 ${
                      selected
                        ? "font-bold bg-yellow-400 border-yellow-700"
                        : "bg-white"
                    }`}
                  >
                    {val}
                  </label>
                  <input
                    id={`coffee-${i}`}
                    type="radio"
                    name="coffees"
                    className="hidden"
                    value={val}
                    checked={selected}
                    onChange={(ev) => setValue(Number(ev?.target?.value))}
                  />
                </div>
              );
            })}
            <input
              type="number"
              value={fixedValue ? "" : value}
              placeholder="4"
              min={4}
              aria-label="Number of coffees"
              className={`p-2 border-2 border-black w-1/4 text-xl rounded-xl ${
                fixedValue ? "bg-gray-100" : ""
              }`}
              onChange={(ev) => setValue(Number(ev?.target?.value))}
            />
          </div>
          <button className="bg-green-400 shadow text-white font-bold text-2xl rounded-lg p-4">
            Support for Rs.{amount}
          </button>
        </div>
      </main>
    </div>
  );
};

export default DonationPage;
