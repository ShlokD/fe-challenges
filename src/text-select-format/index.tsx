import { useState } from "react";

import HomeLink from "../home-link";

const text = `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then`;

const generateText = () => {
  return text.split(" ").map((value) => ({ value, styles: new Set<string>() }));
};

type Text = {
  value: string;
  styles: Set<string>;
};

const TextSelectFormat = () => {
  const [currentText, setCurrentText] = useState<Text[]>(generateText());

  const setStyle = (name: string) => {
    const select = document.getSelection();
    if (select) {
      const start = select?.anchorNode?.textContent?.trim?.();
      const end = select?.focusNode?.textContent?.trim?.();
      const startIndex = currentText.findIndex((t) => t.value === start);
      let endIndex = currentText.findIndex((t) => t.value === end);

      if (startIndex !== -1 && endIndex === -1) {
        endIndex = startIndex;
      }

      if (startIndex !== -1) {
        setCurrentText((prev) => {
          const newText = prev.slice();
          for (let i = startIndex; i <= endIndex; ++i) {
            const newStyles = new Set(newText[i].styles);
            newStyles.add(name);
            newText[i] = {
              ...newText[i],
              styles: newStyles,
            };
          }
          return newText;
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-screen">
      <header className="p-4 bg-blue-900 flex flex-row gap-2 justify-center items-center">
        <div className="bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl text-white">
          Text Select and Format
        </h1>
      </header>
      <main className="flex flex-col w-screen min-h-screen p-6 items-center">
        <div className="flex gap-2 my-4">
          <button
            className="px-6 py-4 bg-yellow-400 rounded-2xl"
            onClick={() => setStyle("font-bold")}
          >
            Bold
          </button>
          <button
            className="px-6 py-4 bg-yellow-400 rounded-2xl"
            onClick={() => setStyle("italic")}
          >
            Italic
          </button>
          <button
            className="px-6 py-4 bg-yellow-400 rounded-2xl"
            onClick={() => setStyle("underline")}
          >
            Underline
          </button>
        </div>
        <h2 className="p-2 text-2xl font-bold">
          Select and highlight text to format it
        </h2>
        <div className="p-2 text-lg text-pretty">
          {currentText.map((text, i) => {
            return (
              <span key={`text-${i}`} className={[...text.styles].join(" ")}>
                {text.value}{" "}
              </span>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TextSelectFormat;
