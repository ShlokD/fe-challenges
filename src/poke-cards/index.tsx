import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";
import { shuffle } from "../utils";

enum Game {
  LOAD,
  INIT,
  PLAYER_ONE,
  PLAYER_TWO,
  SHUFFLE,
  OVER,
}

type PokeCard = {
  name: string;
  url: string;
};

type Stat = {
  name: string;
  value: number;
};

type PokeCardDetailed = {
  name: string;
  image: string;
  stats: Stat[];
};

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const LENGTH = 40;
const processPokeData = (rawJSON: any) => {
  return {
    name: rawJSON?.name,
    image: rawJSON?.sprites?.front_default,
    stats: rawJSON?.stats?.map((stat: any) => ({
      name: stat?.stat.name,
      value: stat?.base_stat,
    })),
  };
};

type Score = {
  one: number;
  two: number;
};
const PokeCards = () => {
  const cards = useRef<PokeCard[][]>();
  const [game, setGame] = useState<Game>(Game.LOAD);
  const [score, setScore] = useState<Score>({ one: 0, two: 0 });
  const [play, setPlay] = useState<PokeCardDetailed[]>([]);
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [error, setError] = useState(false);

  const loadCards = async () => {
    try {
      const randomOffset = Math.floor(Math.random() * 1000);
      const url = `${BASE_URL}?limit=${LENGTH}&offset=${randomOffset}`;
      const res = await fetch(url);
      const json = await res.json();
      setError(false);
      const fetchedCards = shuffle(
        json?.results?.map((result: any) => ({
          url: result?.url,
          name: result?.name,
        })),
      );
      cards.current = [
        fetchedCards.slice(0, LENGTH / 2),
        fetchedCards.slice(LENGTH / 2),
      ];
      setGame(Game.INIT);
    } catch (_) {
      setError(true);
    }
  };

  const fetchNewCard = async (cards?: PokeCard[]) => {
    if (!cards) {
      return;
    }
    try {
      const cardIndex = Math.floor(Math.random() * cards.length);
      const card = cards[cardIndex];
      const res = await fetch(`${card.url}`);
      const json = await res.json();
      setError(false);
      return processPokeData(json);
    } catch (_) {
      setError(true);
    }
  };

  const nextCard = async () => {
    const data = await fetchNewCard(cards?.current?.[0]);
    if (!data) {
      setError(true);
      return;
    }

    setPlay((prev) => {
      const newPlay = [...prev];
      newPlay[0] = data;
      return newPlay;
    });

    setGame(Game.PLAYER_ONE);
  };

  const newGame = async () => {
    await loadCards();
    setScore({ one: 0, two: 0 });
    setPlay([]);
    setSelectedStat(null);
    setError(false);
  };

  const selectStat = async (stat: Stat) => {
    const data = await fetchNewCard(cards?.current?.[1]);

    if (!data) {
      return;
    }
    setSelectedStat(stat);

    setPlay((prev) => {
      const newPlay = [...prev];
      newPlay[1] = data;
      return newPlay;
    });

    const playerTwoStat = data.stats.find((s: Stat) => s.name === stat.name);

    setGame(Game.PLAYER_TWO);
    let over = false;
    if (playerTwoStat.value > stat.value) {
      setScore((prev) => {
        return { ...prev, two: prev.two + 10 };
      });

      const newCards = [...(cards?.current || [])].map((e) => e.slice());
      newCards[0] = newCards[0].filter((card) => card.name !== play[0]?.name);
      if (newCards[0].length === 0) {
        over = true;
      }
      cards.current = newCards;
    } else if (playerTwoStat.value < stat.value) {
      setScore((prev) => {
        return { ...prev, one: prev.one + 10 };
      });
      const newCards = [...(cards?.current || [])].map((e) => e.slice());
      newCards[1] = newCards[1].filter((card) => card.name !== data?.name);
      if (newCards[1].length === 0) {
        over = true;
      }
      cards.current = newCards;
    } else {
      setScore((prev) => {
        return { one: prev.one + 5, two: prev.two + 5 };
      });
    }
    setTimeout(() => {
      if (!over) {
        setGame(Game.SHUFFLE);
        setSelectedStat(null);
      } else {
        setGame(Game.OVER);
      }
    }, 2000);
    setTimeout(() => {
      if (!over) {
        nextCard();
      }
    }, 3000);
  };

  useEffect(() => {
    loadCards();
  }, []);

  const finalScoreOne = score.one + (cards?.current?.[0]?.length || 0) * 10;
  const finalScoreTwo = score.two + (cards?.current?.[1]?.length || 0) * 10;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Pokemon Cards</h1>
      </header>
      <main className="flex flex-col w-full p-2 w-full min-h-screen">
        {game === Game.INIT && (
          <>
            <h2 className="font-bold text-2xl p-4 text-center">
              Select a Pokemon Stat on your card <br />
              The one with the higher stat wins points
            </h2>
            <button
              onClick={nextCard}
              disabled={cards?.current?.length === 0 || !cards?.current}
              className="border-4 border-black hover:bg-black hover:text-white rounded-2xl text-4xl font-bold self-center px-4 py-6 w-2/3"
            >
              Start
            </button>
          </>
        )}
        {(game === Game.PLAYER_ONE ||
          game === Game.PLAYER_TWO ||
          game === Game.SHUFFLE) && (
          <div className="flex w-full lg:p-4 flex-col lg:flex-row min-h-screen gap-2 items-stretch justify-start lg:justify-center my-4">
            <div className="w-full lg:w-1/2 flex flex-col grow-1 shrink-0">
              <p className="font-bold text-2xl self-center text-center">
                Score {score.one}
              </p>

              <p className="font-bold text-2xl self-center text-center">
                Cards left {cards?.current?.[0].length}
              </p>

              {game === Game.SHUFFLE && (
                <div className="flex flex-col grow-1 shrink-0 border-2 border-black p-20 w-full bg-black rounded-xl shadow w-2/3 self-center"></div>
              )}

              {(game === Game.PLAYER_ONE || game === Game.PLAYER_TWO) && (
                <div className="flex lg:flex-col items-center gap-4 w-full border-2 border-black p-2 rounded-xl shadow bg-white self-center">
                  <div className="w-1/3 lg:w-full flex flex-col">
                    <img className="self-center" src={play[0]?.image} />
                    <p className="text-center font-bold text-xl">
                      {play[0]?.name}
                    </p>
                  </div>
                  <div className="w-2/3 lg:w-full flex flex-col items-center">
                    {play[0]?.stats.map((stat, i) => {
                      const selected = selectedStat?.name === stat.name;
                      return (
                        <button
                          key={`stat-${i}`}
                          onClick={() => selectStat(stat)}
                          disabled={selectedStat !== null}
                          className={`${
                            selected ? "bg-blue-400" : ""
                          } w-full cursor-pointer flex text-sm lg:text-xl text-start border-2 border-black rounded-xl my-1 p-2 lg:hover:bg-blue-500`}
                        >
                          <p className="border-r-2 w-2/3 font-bold">
                            {" "}
                            {stat.name}
                          </p>
                          <p className="w-1/3 text-center">{stat.value}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <hr className="border-2 lg:hidden border-black w-full" />
            <div className="w-full lg:w-1/2 flex flex-col grow-1 shrink-0">
              <p className="font-bold text-2xl self-center text-center">
                Score {score.two}
              </p>

              <p className="font-bold text-2xl self-center text-center">
                Cards left {cards?.current?.[1].length}
              </p>

              {(game === Game.PLAYER_ONE || game === Game.SHUFFLE) && (
                <div className="flex flex-col grow-1 shrink-0 border-2 border-black p-20 w-full bg-black rounded-xl shadow w-2/3 self-center"></div>
              )}

              {game === Game.PLAYER_TWO && (
                <>
                  <div className="flex lg:flex-col items-center gap-4 w-full border-2 border-black p-2 rounded-xl shadow bg-white self-center">
                    <div className="w-1/3 lg:w-full flex flex-col">
                      <img className="self-center" src={play[1]?.image} />
                      <p className="text-center font-bold text-xl">
                        {play[1]?.name}
                      </p>
                    </div>
                    <div className="w-2/3 lg:w-full flex flex-col items-center">
                      {play[1]?.stats.map((stat, i) => {
                        const selected = selectedStat?.name === stat.name;
                        const isGreater =
                          selected && selectedStat?.value < stat.value;
                        return (
                          <div
                            key={`stat-${i}`}
                            className={`${
                              isGreater
                                ? "bg-green-400"
                                : selected
                                ? "bg-red-400"
                                : ""
                            } w-full cursor-pointer flex text-sm lg:text-xl text-start border-2 border-black rounded-xl my-1 p-2 lg:hover:bg-blue-500`}
                          >
                            <p className="border-r-2 w-2/3 font-bold">
                              {stat.name}
                            </p>
                            <p className="w-1/3 text-center">{stat.value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {game === Game.OVER && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl p-4 text-center">
              {finalScoreOne === finalScoreTwo ? "It's a Tie" : ""}
              {finalScoreOne > finalScoreTwo && finalScoreOne !== finalScoreTwo
                ? "Player Wins"
                : "CPU Wins"}
            </h2>
            <p className="text-center font-bold text-xl">
              Player {finalScoreOne}
            </p>
            <p className="text-center font-bold text-xl">CPU {finalScoreTwo}</p>
            <button
              onClick={newGame}
              disabled={cards?.current?.length === 0}
              className="border-4 border-black hover:bg-black hover:text-white rounded-2xl text-4xl font-bold self-center px-4 py-6 w-2/3"
            >
              Restart
            </button>
          </div>
        )}
        {error && (
          <p className="self-center text-center text-4xl font-bold">
            Something went wrong. Please try again
          </p>
        )}
      </main>
    </div>
  );
};

export default PokeCards;
