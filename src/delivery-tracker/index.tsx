import { Fragment, useState } from "react";

import HomeLink from "../home-link";

enum DeliveryStates {
  RECEIVED,
  PICKED,
  TRANSIT,
  DELIVERED,
}

const MESSAGES: Record<number, string> = {
  [DeliveryStates.RECEIVED]: "Order Received",
  [DeliveryStates.PICKED]: "Picked up",
  [DeliveryStates.TRANSIT]: "Out for delivery",
  [DeliveryStates.DELIVERED]: "Delivered",
};
const DeliveryTracker = () => {
  const [delivery, setDelivery] = useState<DeliveryStates>(
    DeliveryStates.RECEIVED,
  );

  const next = () => {
    setDelivery((prev) =>
      prev === DeliveryStates.DELIVERED ? DeliveryStates.RECEIVED : prev + 1,
    );
  };

  const states = Object.values(DeliveryStates)
    .filter((value) => !isNaN(Number(value)))
    .map((k) => {
      const key = Number(k);
      return { key, value: DeliveryStates[key] };
    });

  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-orange-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Delivery Tracker</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center justify-center">
        <div className="bg-gray-800 text-white w-2/3 rounded-xl p-2 md:p-4 gap-8 flex flex-col">
          <h2 className="text-4xl font-bold">Ghost Town</h2>
          <p className="text-lg font-bold">Your order is on the way</p>
          <div className="flex gap-4 w-full items-baseline justify-evenly relative">
            {states.map((state, i) => {
              return (
                <Fragment key={`state-${i}`}>
                  <div className="flex flex-col items-center justify-center font-bold gap-2 text-center">
                    <div
                      className={`w-8 h-8 rounded-full border-4 ${
                        state.key <= delivery ? "bg-orange-400" : "bg-gray-800"
                      } ${
                        state.key === delivery && delivery !== states.length - 1
                          ? "animate-pulse md:animate-none"
                          : ""
                      } z-10 border-orange-400 `}
                      style={{
                        transition: "background-color 500ms ease-in-out",
                      }}
                    ></div>

                    <p className="hidden md:inline-block text-xs md:text-sm">
                      {MESSAGES[state.key]}
                    </p>
                  </div>
                  <hr
                    className={`${
                      i === states.length - 1
                        ? ""
                        : "border-2 border-orange-400"
                    } absolute md:inline-block hidden`}
                    style={{
                      transform: "rotate(180deg)",
                      width: i === states.length - 1 ? "0%" : "23%",
                      top: "20%",
                      left: `${i * 25 + 15}%`,
                    }}
                  ></hr>

                  <hr
                    className={`${
                      i === states.length - 1
                        ? ""
                        : "border-2 border-orange-400"
                    } absolute inline-block md:hidden`}
                    style={{
                      transform: "rotate(180deg)",
                      width: i === states.length - 1 ? "0" : "13%",
                      top: "40%",
                      left: `${i * 25 + 18.5}%`,
                    }}
                  ></hr>
                </Fragment>
              );
            })}
          </div>

          <p className="text-lg md:hidden">
            Current Status{" "}
            <span className="text-2xl font-bold text-orange-300">
              {MESSAGES[delivery]}
            </span>
          </p>
          <p className="text-lg">
            Expected Delivery{" "}
            <span className="text-2xl font-bold text-orange-400">7:32 PM</span>
          </p>
          <button
            className="bg-orange-400 text-black font-bold rounded-xl w-1/2 lg:w-1/3 p-4 hover:bg-orange-600"
            onClick={next}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default DeliveryTracker;
