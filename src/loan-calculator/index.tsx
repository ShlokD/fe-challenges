import { useState } from "react";

import HomeLink from "../home-link";

const LoanCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [interest, setInterest] = useState(6.5);
  const [years, setYears] = useState(5);

  const n = years * 12;

  const interestFactor = interest / 12 / 100;
  const interestMultiplier = (1 + interestFactor) ** n;
  const interestAmount = interestMultiplier / (interestMultiplier - 1);
  const monthly = amount * interestFactor * interestAmount;
  const total = monthly * n;

  return (
    <div className="flex flex-col w-full h-full ">
      <header className="bg-green-300 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl">Loan Calculator</h1>
      </header>
      <main className="flex flex-col w-full h-screen my-4 items-center justify-center">
        <div className="flex flex-col lg:flex-row w-full p-4">
          <div className="w-full lg:w-1/2 bg-green-100 p-4 flex flex-col rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none shadow">
            <label htmlFor="amount" className="my-2 text-sm font-bold">
              Loan Amount
            </label>
            <div className="flex w-full gap-1 items-center">
              <p className="bg-green-900 text-white p-2">Rs.</p>
              <input
                id="amount"
                type="number"
                className="w-2/3 p-2 text-xl font-bold"
                step="1"
                value={amount}
                onChange={(ev) => setAmount(Number(ev?.target?.value))}
              />
            </div>
            <label htmlFor="term" className="my-2 text-sm font-bold">
              Years
            </label>
            <div className="flex w-full gap-1 items-center">
              <input
                id="term"
                type="number"
                className="w-2/3 p-2 text-xl font-bold"
                step="1"
                value={years}
                onChange={(ev) => setYears(Number(ev?.target?.value))}
              />
              <p className="bg-green-900 text-white p-2">years</p>
            </div>
            <label htmlFor="interest" className="my-2 text-sm font-bold">
              Interest Rate
            </label>
            <div className="flex w-full gap-1 items-center">
              <input
                id="interest"
                type="number"
                step="0.25"
                className="w-2/3 p-2 text-xl font-bold"
                value={interest}
                onChange={(ev) => setInterest(Number(ev?.target?.value))}
              />
              <p className="bg-green-900 text-white p-2">%</p>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2 bg-green-900 text-white flex flex-col gap-2 p-4 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl"
            style={{
              minHeight: "40vh",
            }}
          >
            <p className="text-4xl">Your Results</p>

            <div className="flex flex-col border-t-4 border-yellow-500 px-2 py-8 shadow-2xl rounded-b-xl">
              <p className="text-gray-400 text-sm font-bold ml-1">
                Monthly EMI
              </p>
              <p className="font-bold text-yellow-500 text-6xl">
                Rs. {monthly.toFixed(2)}
              </p>
            </div>
            <hr className="w-full border-white" />
            <div className="flex flex-col py-6  px-2 shadow-2xl rounded-b-xl my-4">
              <p className="text-gray-400 text-sm font-bold">
                Total amount repaid
              </p>
              <p className="font-bold text-3xl">Rs. {total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanCalculator;
