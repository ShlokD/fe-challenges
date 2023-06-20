import { createRef, useEffect, useState } from "react";

import HomeLink from "../home-link";

type Cars = {
  id: string;
  modelName: string;
  modelType: string;
  bodyType: string;
  imageUrl: string;
};

const CarCarousel = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const [dots, setDots] = useState<number[]>([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [carRefs, setCarRefs] = useState<
    React.MutableRefObject<HTMLDivElement | null>[]
  >([]);
  const [bodyType, setBodyType] = useState("ALL");

  const fetchCars = async () => {
    const mod = await import("./cars.json");
    setCars(mod.default);
    setDots(new Array(mod.default.length).fill(0));
    const refs = new Array(mod.default.length).fill(0).map(() => createRef());
    setCarRefs(refs as unknown as React.MutableRefObject<HTMLDivElement>[]);
  };

  const handleSelectCarClick = (index: number) => {
    setSelectedCarIndex(index);
    if (carRefs[index].current) {
      carRefs[index]?.current?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }
  };

  const handleFilter = (bodyType: string) => {
    let newCars = cars;
    if (bodyType !== "ALL") {
      newCars = newCars.filter((car) => car.bodyType === bodyType);
    }
    setBodyType(bodyType);
    setDots(new Array(newCars.length).fill(0));
    setSelectedCarIndex(0);
    const refs = new Array(newCars.length).fill(0).map(() => createRef());
    setCarRefs(refs as unknown as React.MutableRefObject<HTMLDivElement>[]);
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const bodyTypes = new Set(cars.map((car) => car.bodyType));

  let displayCars: Cars[] = cars;
  if (bodyType !== "ALL") {
    displayCars = displayCars.filter((car) => car.bodyType === bodyType);
  }

  return (
    <div className="flex flex-col w-full">
      <header className="bg-gray-200 flex p-4 justify-center items-center gap-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Shop Cars</h1>
      </header>
      <main className="flex flex-col w-full p-4">
        <select
          className="self-center text-2xl"
          id="body-type"
          aria-label="Select Body Type"
          onChange={(ev) =>
            handleFilter((ev.target as HTMLSelectElement)?.value)
          }
        >
          <option value="ALL">ALL</option>
          {[...bodyTypes].map((bodyType: string, i: number) => {
            return (
              <option key={`filter-${i}`} value={bodyType}>
                {bodyType}
              </option>
            );
          })}
        </select>
        <div className="flex flex-col">
          <div className="flex flex-row overflow-hidden  w-full gap-4">
            {displayCars.map((car, i: number) => {
              return (
                <div
                  key={`car-${i}`}
                  className="w-10/12 h-auto p-4"
                  ref={(el) => (carRefs[i].current = el)}
                >
                  <p className="text-xl text-gray-400 font-bold my-2">
                    {car.bodyType}
                  </p>
                  <p className="text-2xl font-bold my-2">{car.modelName}</p>
                  <p className="text-md text-gray-400 font-bold my-2">
                    {car.modelType}
                  </p>
                  <img
                    style={{
                      minWidth: "340px",
                      scrollSnapAlign: "none",
                      scrollSnapType: "x mandatory",
                    }}
                    height="300"
                    width="400"
                    src={car.imageUrl}
                    alt={car.modelName}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-row items-center self-center my-6 gap-4">
            {dots.map((_, i: number) => {
              const selected = selectedCarIndex === i;
              return (
                <button
                  className={`h-4 w-4 rounded-full self-center my-4 ${
                    selected ? "bg-black" : "bg-gray-200"
                  }`}
                  key={`select-car-${i}`}
                  onClick={() => handleSelectCarClick(i)}
                ></button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarCarousel;
