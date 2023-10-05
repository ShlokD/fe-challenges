import { useState } from "react";

import HomeLink from "../home-link";

type Plan = {
  storage: string;
  users: number;
  price: number;
  transfer: string;
  title: string;
};

const PLANS: Record<string, Plan> = {
  BASIC: {
    title: "Basic",
    storage: "500 GB",
    users: 2,
    price: 19.99,
    transfer: "3 GB",
  },
  PROFESSIONAL: {
    title: "Professional",
    storage: "1 TB",
    users: 5,
    price: 24.99,
    transfer: "10 GB",
  },
  MASTER: {
    title: "Master",
    storage: "2 TB",
    users: 50,
    price: 39.99,
    transfer: "20 GB",
  },
};
const PricingToggle = () => {
  const [monthly, setMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("PROFESSIONAL");
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-blue-500">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">Pricing Toggle</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full">
        <div className="flex items-center justify-center p-4 gap-2">
          <p className="text-2xl font-bold">Annual</p>
          <div className="flex relative">
            <input
              id="frequency"
              className="hidden"
              type="checkbox"
              checked={monthly}
              aria-label="Change frequency"
              onChange={() => setMonthly((prev) => !prev)}
            />
            <label
              htmlFor="frequency"
              className={`px-12 py-6 rounded-3xl ${
                monthly ? "bg-blue-600" : "bg-yellow-400"
              }`}
            >
              {" "}
              <div
                className={`absolute top-0 right-0 bottom-0 bg-white border-4 rounded-full h-12 w-12`}
                style={{
                  left: monthly ? "50%" : "0",
                  transition: "left 0.2s ease-in-out",
                }}
              ></div>
            </label>
          </div>
          <p className="text-2xl font-bold">Monthly</p>
        </div>
        <div className="flex items-center gap-2 self-center">
          {Object.keys(PLANS).map((planKey, i) => {
            const plan = PLANS[planKey];
            const price = plan.price * (monthly ? 1 : 11);
            const selected = planKey === selectedPlan;
            return (
              <div className="flex flex-col" key={`plan-${i}`}>
                <input
                  type="radio"
                  name="plan"
                  id={planKey}
                  className="hidden"
                  checked={selected}
                  aria-label={planKey}
                  onChange={(ev) =>
                    setSelectedPlan((ev?.target as HTMLInputElement)?.value)
                  }
                  value={planKey}
                />
                <label htmlFor={planKey}>
                  <div
                    className={`flex flex-col gap-12 w-full items-center justify-evenly rounded-lg shadow-xl border-2 ${
                      selected
                        ? "bg-purple-600 text-white px-12 py-8"
                        : "bg-white px-8 py-2"
                    }`}
                  >
                    <h2 className="font-bold text-xl p-2">{plan.title}</h2>
                    <p className="font-bold text-6xl p-4 border-b-2 border-gray-100">
                      $ {price.toFixed(2)}
                    </p>
                    <p className="font-bold text-lg border-b-2 border-gray-100">
                      {plan.storage} Storage
                    </p>
                    <p className="font-bold text-lg border-b-2 border-gray-100">
                      {plan.users} users allowed
                    </p>
                    <p className="font-bold text-lg border-b-2 border-gray-100">
                      Send upto {plan.transfer}
                    </p>
                    <button
                      className={`${
                        selected
                          ? "bg-white text-purple-600 "
                          : "bg-purple-600 text-white"
                      } text-lg font-bold p-4 rounded-lg`}
                    >
                      Learn More
                    </button>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PricingToggle;
