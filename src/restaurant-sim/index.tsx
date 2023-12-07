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
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const startSim = () => {
    const newCustomer = { customerId: id(), state: "WAITING" };
    setCustomers((prev) => {
      const newCustomers = [...prev, newCustomer];
      document.dispatchEvent(customerArrivedEvent(newCustomer));
      return newCustomers;
    });
  };

  const prepNextOrder = () => {
    setOrders((prev) => {
      if (prev.length === 0) {
        setCurrentOrder(null);
        return [];
      }
      const nextOrder = prev.shift();
      if (!nextOrder) {
        setCurrentOrder(null);
        return [];
      }
      setCurrentOrder(nextOrder);
      setTimeout(
        () => document.dispatchEvent(orderReadyEvent(nextOrder)),
        nextOrder.time,
      );
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

    setCustomers((prev) => prev.filter((c) => c.customerId !== customerId));
    prepNextOrder();
  };

  useEffect(() => {
    if (orders.length === 1 && !currentOrder) {
      prepNextOrder();
    }
  }, [orders, currentOrder]);

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

          {currentOrder ? (
            <p className="p-2 text-2xl font-bold">
              Currently processing: {currentOrder?.orderId}
            </p>
          ) : (
            <p className="p-2 text-4xl font-bold my-12">Kitchen idle</p>
          )}

          <p className="p-2 text-2xl font-bold my-12">
            Orders in queue {orders.length}
          </p>
        </div>
      </main>
    </div>
  );
};

export default RestaurantSim;
