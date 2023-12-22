import { useEffect, useState } from "react";

import HomeLink from "../home-link";

type Event = {
  event: string;
  type: string;
  price: string | number;
  date: string;
};

const getMaxPrice = (events: Event[]) => {
  return Math.max(
    ...events.map((e) => (typeof e.price === "number" ? e.price : 0)),
  );
};

const EventListings = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [price, setPrice] = useState(0);
  const [filters, setFilters] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    const data = (await import("./data.json")).default;
    setEvents(data);
    const maxPrice = getMaxPrice(data);
    setPrice(maxPrice);
  };

  const toggleFilter = (filter: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        [filter]: !prev[filter],
      };
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  let displayEvents = events;
  if (price >= 0) {
    displayEvents = displayEvents.filter(
      (e) => typeof e.price !== "number" || e.price < price,
    );
  }

  if (Object.values(filters).some((v) => v)) {
    displayEvents = displayEvents.filter((event) => filters[event.type]);
  }

  if (searchTerm.length > 0)
    [
      (displayEvents = displayEvents.filter((event) =>
        event.event.toLowerCase().includes(searchTerm),
      )),
    ];

  const maxPrice = getMaxPrice(events);
  const types = [...new Set(events.map((e) => e.type))];
  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-blue-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Event Listings</h1>
      </header>
      <main className="flex flex-col w-screen min-h-screen py-8 px-4 bg-black">
        <div className="flex lg:flex-row flex-col items-baseline">
          <div className="p-4 gap-4 w-11/12 lg:w-1/3 lg:gap-2 self-center lg:self-start border-2 border-green-500 rounded-2xl bg-white flex flex-col">
            <input
              className="border-2 border-gray-500 p-2 text-lg rounded-2xl"
              type="search"
              aria-label="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(ev) => setSearchTerm(ev.target.value.toLowerCase())}
            />
            <div className="flex justify-between gap-1">
              <p className="font-bold">Price</p>
              <label htmlFor="price" className="font-bold text-green-500">
                0-{price}
              </label>
            </div>

            <input
              id="price"
              type="range"
              min={0}
              max={maxPrice}
              value={price}
              onChange={(ev) => setPrice(Number(ev?.target?.value))}
            />
            <p className="font-bold">Event Types</p>
            {types.map((type, i) => {
              const selected = !!filters[type];
              return (
                <div key={`type-${i}`} className="flex p-1 gap-2 items-center">
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={selected}
                    onChange={(ev) => toggleFilter(ev.target.value)}
                  />
                  <label
                    htmlFor={type}
                    className={`${selected ? "font-bold" : ""}`}
                  >
                    {type}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full my-4 lg:flex-row lg:flex-wrap lg:w-2/3 lg:gap-2 items-center lg:items-baseline justify-center">
            {displayEvents.length === 0 && (
              <p className="font-bold text-2xl text-green-500 p-2 w-2/3 self-center text-center">
                No events found
              </p>
            )}
            {displayEvents.map((event, i) => {
              return (
                <div
                  key={`event-${i}`}
                  className="m-2 lg:m-0 overflow-hidden hover:shadow-md hover:shadow-green-500 w-11/12 lg:w-1/4 cursor-pointer rounded-lg flex flex-col gap-4 bg-white event-container"
                >
                  <img
                    src={`https://random.imagecdn.app/v1/image?width=600&height=240&category=${event.type}`}
                    alt={`${event.event} details`}
                    className="w-full rounded-t-lg transition-transform transition-ease-in-out"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                  <p className="font-bold text-2xl text-green-500 p-2 w-2/3 lg:w-11/12 lg:truncate lg:text-lg">
                    {event.event}
                  </p>
                  <p
                    className="text-xl bg-green-500 rounded-full text-center p-2 mx-2 lg:text-sm"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    {event.type}
                  </p>
                  <p className="p-2 font-bold text-lg lg:text-sm">
                    📅 {event.date}
                  </p>
                  <p className="p-2 font-bold text-lg lg:text-sm">
                    {typeof event.price === "number"
                      ? `Rs. ${event.price}`
                      : event.price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventListings;
