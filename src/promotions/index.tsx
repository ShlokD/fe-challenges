import { useEffect, useState } from "react";

import HomeLink from "../home-link";
import { PromotionType } from "./types";

const PromoCard = (props: PromotionType) => {
  if (!props || !props.id) {
    return null;
  }

  const { name, description, termsAndConditionsButtonText, joinNowButtonText } =
    props;

  return (
    <div className="w-full lg:w-1/2 flex flex-col py-4">
      <picture>
        <img
          style={{ height: "300px" }}
          className="w-full"
          src={"https://fakeimg.pl/800x300"}
          alt={name}
        ></img>
      </picture>
      <div className="h-50">
        <p className="p-4 text-center font-bold text-xl">{name}</p>
        <p className="my-2 text-lg text-center">{description}</p>
        <div className="flex flex-row items-center justify-evenly w-full my-4">
          <button className="px-4 py-2 bg-gray-100 text-xl rounded">
            {termsAndConditionsButtonText}
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white text-xl rounded">
            {joinNowButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Promotions = () => {
  const [promos, setPromos] = useState<PromotionType[]>([]);
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const activeClasses = "text-gray-900 border-b-4 border-blue-500 font-bold";
  const inactiveClasses = "text-gray-400";

  const fetchPromos = async () => {
    const res = await fetch("https://www.mocky.io/v2/5bc3b9cc30000012007586b7");
    const json = await res?.json();
    setPromos(json);
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  let displayPromos = promos?.sort((a, b) => b.sequence - a.sequence);
  if (currentFilter !== "ALL") {
    displayPromos = displayPromos?.filter((p) => p.onlyNewCustomers);
  }

  return (
    <div className="flex flex-col w-full px-3">
      <HomeLink />
      <div className="flex flex-row w-full justify-center  py-8">
        <div className="w-50">
          <input
            className="hidden"
            type="radio"
            id="all-promos"
            name="promo-selector"
            onChange={() => setCurrentFilter("ALL")}
            checked={currentFilter === ""}
          />
          <label
            htmlFor="all-promos"
            className={`text-lg p-3 ${
              currentFilter === "ALL" ? activeClasses : inactiveClasses
            }`}
          >
            All Promotions
          </label>
        </div>
        <div className="w-50">
          <input
            className="hidden"
            type="radio"
            id="new-promos"
            name="promo-selector"
            onChange={() => setCurrentFilter("NEW")}
            checked={currentFilter === ""}
          />
          <label
            htmlFor="new-promos"
            className={`text-lg p-3 ${
              currentFilter === "NEW" ? activeClasses : inactiveClasses
            }`}
          >
            New Customers
          </label>
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        {displayPromos?.map((promo) => {
          return <PromoCard {...promo} key={promo.id} />;
        })}
      </div>
    </div>
  );
};
export default Promotions;
