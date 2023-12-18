import { useEffect, useState } from "react";

import HomeLink from "../home-link";

type Order = {
  orderId: string;
  time: number;
  customerId: string;
};

type Customer = {
  customerId: string;
  state: string;
};

const id = () => crypto.randomUUID();

const customerArrivedEvent = (customer: Customer) => {
  return new CustomEvent("customer-arrived", {
    detail: { customer },
  });
};

const orderReadyEvent = (order: Order) => {
  return new CustomEvent("order-ready", {
    detail: { order },
  });
};

const RestaurantSim = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cooks, setCooks] = useState(new Array(1).fill("0"));

  const startSim = () => {
    const newCustomer = { customerId: id(), state: "WAITING" };
    setCustomers((prev) => {
      const newCustomers = [...prev, newCustomer];
      document.dispatchEvent(customerArrivedEvent(newCustomer));
      return newCustomers;
    });
  };

  const addCook = () => {
    setCooks((prev) => [...prev, "0"]);

    if (orders.length > 0) {
      prepNextOrder();
    }
  };

  const assignToFreeCook = (order: Order) => {
    setCooks((prev) => {
      const freeCookIndex = prev.findIndex((c) => c === "0");
      if (freeCookIndex === -1) {
        return prev;
      }
      const newCooks = [...prev];
      newCooks[freeCookIndex] = order.orderId;
      setTimeout(
        () => document.dispatchEvent(orderReadyEvent(order)),
        order.time,
      );
      return newCooks;
    });
  };

  const prepNextOrder = () => {
    setOrders((prev) => {
      if (prev.length === 0) {
        return [];
      }
      const nextOrder = prev.shift();
      if (!nextOrder) {
        return [];
      }
      assignToFreeCook(nextOrder);
      if (prev.length > 0) {
        return [...prev];
      } else {
        return [];
      }
    });
  };

  const handleCustomerArrival = (e: CustomEvent) => {
    setTimeout(() => {
      setCustomers((prev) => {
        const index = prev.findIndex(
          (c) => c.customerId === e.detail.customer.customerId,
        );
        prev[index] = { ...prev[index], state: "ORDERED" };
        return prev;
      });
      const newOrder = {
        orderId: id(),
        customerId: e.detail.customer.customerId,
        time: 2000 + Math.random() * 5000,
      };
      setOrders((prev) => {
        return [...prev, newOrder];
      });
    }, 1000 + Math.random() * 2000);
  };

  const handleOrderReady = (e: CustomEvent) => {
    const customerId = e.detail.order.customerId;
    const orderId = e.detail.order.orderId;
    setCooks((prev) => {
      const cookIndex = prev.findIndex((c) => c === orderId);
      if (cookIndex === -1) {
        return prev;
      }
      const newCooks = [...prev];
      newCooks[cookIndex] = "0";
      return newCooks;
    });
    setCustomers((prev) => prev.filter((c) => c.customerId !== customerId));
    prepNextOrder();
  };

  useEffect(() => {
    const cooksAvailable = cooks.some((cook) => cook === "0");
    if (orders.length === 1 && cooksAvailable) {
      prepNextOrder();
    }
  }, [orders, cooks]);

  useEffect(() => {
    document.addEventListener(
      "customer-arrived",
      handleCustomerArrival as EventListener,
    );
    document.addEventListener("order-ready", handleOrderReady as EventListener);

    return () =>
      document.removeEventListener(
        "customer-arrived",
        handleCustomerArrival as EventListener,
      );
    document.removeEventListener(
      "order-ready",
      handleOrderReady as EventListener,
    );
  }, []);

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-yellow-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Restaurant Simulator</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-4">
        <button
          onClick={startSim}
          className="bg-blue-300 p-4 w-1/4 self-center text-2xl font-bold text-white my-4"
        >
          Add Customer
        </button>
        <hr className="border-4 border-dashed w-full border-black" />
        <div
          className="flex flex-col items-center"
          style={{
            height: "500px",
          }}
        >
          <h2 className="text-3xl font-bold">Restaurant</h2>
          <div className="flex flex-wrap w-2/3 gap-2 items-center justify-center">
            {customers.map((c, i) => {
              return (
                <p
                  key={`customer-${i}`}
                  className={`${
                    c.state === "WAITING" ? "bg-black" : "bg-blue-400"
                  } w-10 h-10 rounded-full text-white font-bold text-center block flex items-center justify-center`}
                >
                  {c.state === "WAITING" ? "W" : "O"}
                </p>
              );
            })}
          </div>
        </div>
        <hr className="border-4 border-dashed w-full border-black" />
        <div
          className="flex flex-col items-center bg-gray-200 my-2"
          style={{
            height: "500px",
          }}
        >
          <h2 className="text-3xl font-bold">Kitchen</h2>
          <h3 className="p-1 text-2xl font-bold">
            Available cooks: {cooks.length}
          </h3>
          <div className="flex  gap-2">
            <button
              aria-label="Add cook"
              className="p-4 text-2xl font-bold bg-black text-white rounded-lg"
              disabled={cooks.length === 8}
              onClick={addCook}
            >
              +
            </button>
          </div>
          {cooks.map((cook, i) => {
            if (cook === "0") {
              return (
                <p className="text-xl p-2" key={`cook-${i}`}>
                  Cook {i + 1} idle
                </p>
              );
            }
            return (
              <p className="text-xl p-2" key={`cook-${i}`}>
                Cook {i + 1} working on order {cook}
              </p>
            );
          })}

          <p className="p-2 text-2xl font-bold my-12">
            Orders in queue {orders.length}
          </p>
        </div>
      </main>
    </div>
  );
};

export default RestaurantSim;
