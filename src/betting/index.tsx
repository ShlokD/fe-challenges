import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { EventType, SelectionType, SelectedBets } from "./types";
import { transformEvents } from "./utils";
const Header = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <header className="w-full flex flex-row justify-between relative">
      <Link to="/">
        <img src="/chess.ico" alt="To Home" />
      </Link>
      <nav className="flex flex-row justify-end">
        <button className="right-0" onClick={toggleMenu}>
          <img height="64" width="64" src="/hamburger.png" alt="Open Menu" />
        </button>
      </nav>
    </header>
  );
};

const SelectionInput = ({
  selections,
  marketId,
  selectedBet,
  addToSelected,
  removeFromSelected,
}: {
  selections: SelectionType[];
  marketId: string;
  selectedBet: string;
  addToSelected: ({ marketId, id }: { marketId: string; id: string }) => void;
  removeFromSelected: ({
    marketId,
    id,
  }: {
    marketId: string;
    id: string;
  }) => void;
}) => {
  const [selected, setSelected] = useState<string>(selectedBet);
  const toggleSelected = (id: string) => {
    if (id === selected) {
      setSelected("");
      removeFromSelected?.({ marketId, id });
    } else {
      setSelected(id);
      addToSelected?.({ marketId, id });
    }
  };

  useEffect(() => {
    setSelected(selectedBet);
  }, [selectedBet]);

  return (
    <div className="flex flex-row w-full flex-wrap">
      {selections.map((sel) => {
        const id = `sel-${marketId}-${sel.id}`;
        const isSelected = Boolean(selected === sel.id);
        return (
          <div
            key={id}
            className={`w-2/5 text-center p-4 m-2 border-2 border-black ${
              isSelected ? "bg-green-500 text-white" : "bg-white text-black"
            }`}
          >
            <input
              type="radio"
              className="hidden"
              name={`sel-${marketId}`}
              id={id}
              onClick={() => toggleSelected(sel.id)}
              defaultChecked={isSelected}
            />
            <label htmlFor={id}>
              {sel.name}
              <br />
              {sel.price}
            </label>
          </div>
        );
      })}
    </div>
  );
};

const Betting = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedBets, setSelectedBets] = useState<SelectedBets[]>([]);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const fetchEvents = async () => {
    const res = await fetch("http://www.mocky.io/v2/59f08692310000b4130e9f71");
    const json = await res?.json();
    setEvents(transformEvents(json));
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const addToSelected = ({
    marketId,
    id,
  }: {
    marketId: string;
    id: string;
  }) => {
    setSelectedBets((prev) => {
      const prevBets = prev.filter((p) => p.marketId !== marketId);
      return [...prevBets, { marketId, id }];
    });
  };

  const removeFromSelected = ({
    marketId,
    id,
  }: {
    marketId: string;
    id: string;
  }) => {
    setSelectedBets((prev) =>
      prev.filter((p) => p.marketId !== marketId && p.id !== id)
    );
  };

  const markets = events?.flatMap((ev) => ev.markets);
  const betsToDisplay = selectedBets.map((bet) => {
    const market = markets.find((m) => m.id === bet.marketId);
    const selection = market?.selections.find((sel) => sel.id === bet.id);
    return {
      market: {
        name: market?.name,
        id: market?.id,
      },
      selection,
    };
  });

  const bets: Record<string, string> = selectedBets.reduce((bets, bet) => {
    bets[bet.marketId] = bet.id;
    return bets;
  }, {} as Record<string, string>);

  return (
    <div className="w-full h-screen bg-gray-100 ">
      <Header toggleMenu={toggleMenu} />
      <div className="h-full w-full flex flex-col">
        <div className="flex flex-col h-full w-full items-center">
          {events?.map((evt, idx) => {
            return (
              <div
                key={`event-${idx}`}
                className="mx-4 flex flex-col justify-center w-10/12"
              >
                <div className="w-full text-center">
                  <p className="text-2xl py-8 px-2 font-bold text-center">
                    {evt.name}
                  </p>
                </div>
                <div className="w-full">
                  {evt.markets.map((market, midx) => {
                    return (
                      <div key={`market-${midx}`} className="py-1 px-2">
                        <p className="text-gray-400">{market.name}</p>
                        <SelectionInput
                          selections={market.selections}
                          marketId={market.id}
                          addToSelected={addToSelected}
                          removeFromSelected={removeFromSelected}
                          selectedBet={bets[market?.id] || ""}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={
            "flex flex-col w-4/6 h-full bg-white z-10 absolute right-0 transition-transform duration-300"
          }
          style={{ transform: `translateX(${showMenu ? "0px" : "2000px"})` }}
          aria-hidden={!showMenu}
        >
          <button
            className="absolute right-0 text-5xl p-4 text-gray-400"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            X
          </button>
          <div className="flex flex-col mt-20">
            {betsToDisplay.map((bet) => {
              return (
                <div
                  className="flex flex-col items-center"
                  key={bet?.selection?.id}
                >
                  <p className="text-xl my-2">
                    {bet?.market?.name}: {bet?.selection?.name}
                  </p>
                  <p className="text-xl my-2">{bet?.selection?.price}</p>
                  <button
                    className="bg-black text-white rounded-lg p-4"
                    onClick={() =>
                      removeFromSelected({
                        marketId: bet?.market?.id || "",
                        id: bet?.selection?.id || "",
                      })
                    }
                  >
                    Delete
                  </button>
                  <hr className="w-full border-2 border-black my-2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Betting;
