import { useState } from "react";

import HomeLink from "../home-link";

const InterestRate = () => {
  const [amount, setAmount] = useState<number | undefined>(0);
  const [interest, setInterest] = useState<number | undefined>(0);
  const [interestDuration, setInterestDuration] = useState("Y");
  const [time, setTime] = useState<number | undefined>(0);
  const [interestAmount, setInterestAmount] = useState(0);

  const calculateInterest = () => {
    let interestFactor = 1;
    if (interestDuration === "M") {
      interestFactor = 12;
    } else if (interestDuration === "D") {
      interestFactor = 365;
    }

    const rate = (interest || 0) / 100;

    const newInterestAmount =
      (amount || 0) *
      Math.pow(1 + rate / interestFactor, interestFactor * (time || 0));
    setInterestAmount(newInterestAmount);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <header className="flex flex-row items-center justify-center p-2 w-full h-full bg-blue-500 text-white">
        <HomeLink />
        <h1 className="text-4xl py-2 font-bold">Interest Calculator</h1>
      </header>
      <main className="flex flex-col w-full justify-center items-center my-4">
        <div className="flex flex-col items-center justify-center w-full my-2 p-2">
          <label className="text-lg font-bold mx-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="border-2 border-black p-1"
            id="amount"
            type="number"
            value={amount}
            onChange={(ev) => {
              const val = parseFloat((ev?.target as HTMLInputElement)?.value);
              setAmount(isNaN(val) ? undefined : val);
            }}
          ></input>
        </div>
        <div className="my-2 flex flex-col items-center justify-center items-center w-full">
          <label className="text-lg font-bold mx-2" htmlFor="interest">
            Interest Rate
          </label>
          <input
            className="border-2 border-black p-1"
            id="interest"
            type="number"
            value={interest}
            onChange={(ev) => {
              const val = parseFloat((ev?.target as HTMLInputElement)?.value);
              setInterest(isNaN(val) ? undefined : val);
            }}
          ></input>
          <select
            className="p-4 my-1"
            id="duration"
            aria-label="Interest Compounding Duration"
            value={interestDuration}
            onChange={(ev) =>
              setInterestDuration((ev?.target as HTMLSelectElement)?.value)
            }
          >
            <option value="Y">Per Year</option>
            <option value="M">Per Month</option>
            <option value="D">Per Day</option>
          </select>
        </div>
        <div className="my-2 flex flex-col items-center justify-center w-full">
          <label className="text-xl font-bold mx-2" htmlFor="time">
            Years
          </label>
          <input
            className="border-2 border-black p-1"
            id="time"
            type="number"
            value={time}
            onChange={(ev) => {
              const val = parseFloat((ev?.target as HTMLInputElement)?.value);
              setTime(isNaN(val) ? undefined : val);
            }}
          ></input>
        </div>
        <button
          className="bg-blue-900 text-white p-4 rounded-full text-xl"
          onClick={calculateInterest}
        >
          Calculate
        </button>
        {interestAmount > 0 && (
          <div className="flex flex-col p-4 text-xl">
            <p className="my-1">
              Interest: {(interestAmount - (amount || 0)).toFixed(2)}
            </p>
            <p>Final Amount: {interestAmount.toFixed(2)}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default InterestRate;
