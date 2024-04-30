import { FormEvent, useState } from "react";

import HomeLink from "../home-link";

type Transaction = {
  type: string;
  amount: number;
  date: string;
};
const InvestmentAccount = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionType, setTransactionType] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [tValue, setTValue] = useState(0);
  const [filterType, setFilterType] = useState("A");

  const addTransaction = (type: string) => {
    setShowForm(true);
    setTransactionType(type);
  };

  const submitTransaction = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const entry = {
      type: transactionType,
      amount: tValue,
      date: new Date().toLocaleDateString(),
    };

    setTransactions((prev) => [...prev, entry]);
    setShowForm(false);
    setTValue(0);
    setTransactionType("");
  };

  const hideForm = () => {
    setShowForm(false);
    setTValue(0);
    setTransactionType("");
  };

  const balance = transactions.reduce((total, t) => {
    if (t.type === "D") {
      total += t.amount;
    } else {
      total -= t.amount;
    }
    return total;
  }, 0);
  const nilBalance = balance <= 0;
  const disableSubmit =
    tValue === 0 || (tValue > balance && transactionType === "W");

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">Investment Account</h1>
      </header>

      <main className="flex flex-col min-h-screen w-full items-center bg-blue-100">
        <div className="bg-white rounded-xl mt-4 flex flex-col gap-2 p-4 w-2/3">
          <p className="text-lg">Total Balance</p>
          <p className="font-bold text-4xl">Rs. {balance.toFixed(2)}</p>

          <div className="mt-4 flex gap-2 w-full">
            <button
              className="bg-green-400 rounded-lg font-bold w-1/2 p-4"
              onClick={() => addTransaction("D")}
            >
              Deposit
            </button>
            <button
              className={`${
                nilBalance ? "bg-gray-400" : "bg-red-400"
              } rounded-lg font-bold w-1/2 p-4`}
              onClick={() => addTransaction("W")}
              disabled={nilBalance}
            >
              Withdraw
            </button>
          </div>
        </div>

        {transactions.length > 0 && (
          <>
            <div className="flex gap-2 my-4">
              <label
                htmlFor="all"
                className={`text-xl cursor-pointer font-bold p-4 rounded-xl border-2 border-black ${
                  filterType === "A" ? "bg-blue-800 text-white" : ""
                }`}
              >
                All
              </label>
              <input
                className="hidden"
                type="radio"
                name="t-type"
                id="all"
                checked={filterType === "A"}
                value="A"
                onChange={(ev) => setFilterType(ev?.target?.value)}
              ></input>
              <label
                htmlFor="deposit"
                className={`text-xl cursor-pointer font-bold p-4 rounded-xl border-2 border-black ${
                  filterType === "D" ? "bg-blue-800 text-white" : ""
                }`}
              >
                Deposits
              </label>
              <input
                className="hidden"
                type="radio"
                name="t-type"
                id="deposit"
                checked={filterType === "D"}
                value="D"
                onChange={(ev) => setFilterType(ev?.target?.value)}
              ></input>
              <label
                htmlFor="withdraw"
                className={`text-xl cursor-pointer font-bold p-4 rounded-xl border-2 border-black ${
                  filterType === "W" ? "bg-blue-800 text-white" : ""
                }`}
              >
                Withdrawal
              </label>
              <input
                className="hidden"
                type="radio"
                name="t-type"
                id="withdraw"
                checked={filterType === "W"}
                value="W"
                onChange={(ev) => setFilterType(ev?.target?.value)}
              ></input>
            </div>

            <table className="flex flex-col w-3/4 bg-white my-4">
              <thead>
                <tr className="flex gap-8 justify-between  p-4 bg-blue-800 text-white text-2xl border-y-4 border-black">
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="flex flex-col">
                {transactions.map((t, i) => {
                  if (
                    (filterType === "W" && t.type === "D") ||
                    (filterType === "D" && t.type === "W")
                  ) {
                    return null;
                  }
                  return (
                    <tr
                      key={`transaction-${i}`}
                      className={`flex gap-8 justify-between w-full p-4 text-xl text-center border-b-2 border-black ${
                        t.type === "D" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <td>Rs. {t.amount}</td>
                      <td>{t.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {transactions.length === 0 && (
          <p className="p-12 text-lg font-bold">No transactions found</p>
        )}

        <div
          className={`bg-white fixed bottom-0 rounded-t-xl duration-300 flex flex-col items-center justify-center transition-transform gap-2 p-8 w-full ${
            showForm ? "visible" : "invisible"
          }`}
          style={{
            transform: `translateY(${showForm ? "0" : "300px"})`,
          }}
        >
          <button
            className="self-end text-xl font-bold bg-black text-white p-4 rounded-lg"
            onClick={hideForm}
          >
            X
          </button>
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={submitTransaction}
          >
            <input
              placeholder="Amount"
              aria-label="Amount"
              className={`text-2xl p-4 border-4 rounded-lg shadow ${
                disableSubmit
                  ? "border-red-400 focus:border-red-400"
                  : "border-black"
              }`}
              type="number"
              max={transactionType === "W" ? balance : Infinity}
              value={tValue === 0 ? "" : tValue}
              onChange={(ev) => setTValue(Number(ev?.target?.value))}
            />
            <button
              type="submit"
              className={`p-4 ${
                disableSubmit ? "bg-gray-400" : "bg-blue-400"
              } font-bold text-white w-full rounded-lg`}
              disabled={disableSubmit}
              value={tValue}
            >
              Done
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InvestmentAccount;
