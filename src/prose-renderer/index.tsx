import { FC, useState } from "react";

import HomeLink from "../home-link";

const fonts = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
  "text-8xl",
  "text-9xl",
];

const aligns = [
  {
    name: "Left",
    class: "text-left",
    image: "/align-left.png",
  },
  {
    name: "Right",
    class: "text-right",
    image: "/align-right.png",
  },
  {
    name: "Center",
    class: "text-center",
    image: "/align-center.png",
  },
  {
    name: "Justify",
    class: "text-justify",
    image: "/align-justify.png",
  },
];
const Prose: FC<{
  children: JSX.Element[];
}> = ({ children }) => {
  const [fontIndex, setFontIndex] = useState(2);
  const [alignIndex, setAlignIndex] = useState(0);

  const decreaseFont = () => {
    setFontIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const increaseFont = () => {
    setFontIndex((prev) =>
      prev === fonts.length - 1 ? fonts.length - 1 : prev + 1,
    );
  };

  const handleAlignChange = (index: number) => {
    setAlignIndex(index);
  };

  return (
    <div className={`${fonts[fontIndex]} ${aligns[alignIndex].class}`}>
      <div className="flex flex-row gap-4 items-center justify-center my-2 p-2">
        <button
          className="text-sm font-bold border-2 border-black py-2 px-4"
          onClick={decreaseFont}
          aria-label="Decrease font"
        >
          A
        </button>
        <button
          className="text-xl font-bold border-2 border-black py-2 px-4"
          onClick={increaseFont}
          aria-label="Increase font"
        >
          A
        </button>
      </div>
      <div className="flex flex-row gap-8 items-center justify-center my-2 p-2">
        {aligns.map((_, index) => {
          return (
            <button
              className="px-2"
              key={`align-button-${index}`}
              onClick={() => handleAlignChange(index)}
              aria-label={`${aligns[index].name} align`}
            >
              <img
                src={aligns[index].image}
                height="24"
                width="24"
                alt={`${aligns[index].name} align`}
              />
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
};
const ProseRenderer = () => {
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-500">
        <HomeLink />
        <h1 className="font-bold text-2xl">Prose Renderer</h1>
      </header>
      <div className="flex flex-col w-full p-2">
        <Prose>
          <h2 className="text-xl font-bold">The Adventures of Don Quixote</h2>
          <p className="p-2">Miguel De Cervantes</p>
          <p className="p-2">
            CHAPTER I. Which treats of the quality and manner of life of our
            renowned hero. Down in a village of La Mancha,* the name of which I
            have no desire to recollect, there lived, not long ago, one of those
            gentlemen who usually keep a lance upon a rack, an old buckler, a
            lean horse, and a coursing greyhound.{" "}
          </p>
          <p className="p-2">
            Soup, composed of somewhat more mutton than beef, the fragments
            served up cold on most nights, lentils on Fridays, pains and groans
            on Saturdays, and a pigeon, by way of addition, on Sundays, consumed
            three-fourths of his income; the remainder of it supplied him with a
            cloak of fine cloth, velvet breeches, with slippers of the same for
            holidays, and a suit of the best home-spun, in which he adorned
            himself on week-days. His family consisted of a housekeeper above
            forty, a niece not quite twenty, and a lad, who served him both in
            the field and at home, who could saddle the horse or handle the
            pruning-hook. The age of our gentleman bordered upon fifty years; he
            was of a strong constitution, spare-bodied, of a meagre visage, a
            very early riser, and a lover of the chase. Some pretend to say that
            his sur- name was Quixada, or Quesada, for on this point his
            historians differ; though, from very probable conjectures, we may
            conclude that his name was Quixana. This is, however, of little
            importance to our history; let it suffice that, in relating it, we
            do not swerve a jot from the truth. Be it known, then, that the
            afore-mentioned gentleman, in his leisure moments, which composed
            the greater part of the year, gave himself up with so much ardour to
            the perusal of books of chivalry, that he almost wholly neglected
            the exercise of the chase, and even the regulation of his domestic
            affairs ; indeed, so extra- vagant was his zeal in this pursuit,
            that he sold many acres of Partly in the kingdom of Arragon, and
            partly in Castile.
          </p>
        </Prose>
      </div>
    </div>
  );
};

export default ProseRenderer;
