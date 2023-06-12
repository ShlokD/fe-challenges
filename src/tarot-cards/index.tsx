import { FC, useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

type TarotCard = {
  name: string;
  image: string;
};

type TarotProps = {
  name: string;
  image: string;
  showFace: boolean;
  imageUrl: string;
  imageBackUrl: string;
  index: number;
};

const Tarot: FC<TarotProps> = ({
  name,
  image,
  showFace,
  imageUrl,
  imageBackUrl,
  index,
}) => {
  const [show, setShow] = useState(showFace);

  const url = `${show ? imageUrl + image : imageBackUrl}`;
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    setShow(showFace);
  }, [showFace]);
  const displayName = show ? name : "";
  return (
    <button
      className="w-1/4 border-2 shadow-lg rounded-lg p-2"
      onClick={handleClick}
      aria-label={`tarot-${index}`}
    >
      <img height="288px" src={url} alt={name} />
      <p className="p-2 font-bold text-sm">{displayName}</p>
    </button>
  );
};

const shuffle = (arr: any[]) => {
  const shuffled = [];
  for (let i = 0; i < arr.length; ++i) {
    shuffled.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return shuffled;
};

const TarotCards = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [gameState, setGameState] = useState("START");
  const imagesUrl = useRef("");
  const imagesBackUrl = useRef("");

  const fetchCards = async () => {
    const mod = await import("./tarot.json");
    imagesUrl.current = mod.default.imagesUrl;
    imagesBackUrl.current = mod.default.imageBackCard;
    setCards(shuffle(mod.default.cards));
  };
  useEffect(() => {
    fetchCards();
  }, []);

  const handleShuffle = () => {
    setGameState("HIDDEN");
    setCards((prev) => shuffle(prev));
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <header className="bg-purple-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Tarot Game </h1>
      </header>
      <main className="flex flex-col w-full h-screen my-4 items-center">
        <button
          className={`p-4 ${
            gameState === "HIDDEN" ? "bg-gray-400" : "bg-purple-500"
          } rounded-lg text-white font-bold text-xl`}
          disabled={gameState === "HIDDEN"}
          onClick={handleShuffle}
        >
          Shuffle
        </button>
        <div className="flex flex-row flex-wrap my-4 gap-2 items-start justify-center">
          {cards?.map((card, index) => {
            return (
              <Tarot
                {...card}
                key={`tarot-${index}`}
                showFace={gameState === "START"}
                imageUrl={imagesUrl.current}
                imageBackUrl={imagesBackUrl.current}
                index={index}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TarotCards;
