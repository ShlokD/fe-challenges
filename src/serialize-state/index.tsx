import { useState } from "react";

import HomeLink from "../home-link";

type Checkbox = {
  title: string;
  checked: boolean;
};
type Radio = {
  title: string;
  checked: boolean;
  checkboxes: Checkbox[];
};
const SerializeState = () => {
  const [radioState, setRadioState] = useState<Record<string, Radio[]>>({
    radios: [
      {
        title: "radio1",
        checked: false,
        checkboxes: [
          {
            title: "checkbox1",
            checked: false,
          },
          {
            title: "checkbox2",
            checked: false,
          },
        ],
      },
      {
        title: "radio2",
        checked: false,
        checkboxes: [
          {
            title: "checkbox3",
            checked: false,
          },
          {
            title: "checkbox4",
            checked: false,
          },
          {
            title: "checkbox5",
            checked: false,
          },
        ],
      },
    ],
  });

  const [text, setText] = useState("");

  const handleRadioClick = (radioIndex: number) => {
    setRadioState((prev) => {
      const newState = { ...prev };
      newState.radios[radioIndex].checked =
        !newState.radios[radioIndex].checked;
      return newState;
    });
  };

  const handleCheckboxClick = (radioIndex: number, checkboxIndex: number) => {
    setRadioState((prev) => {
      const newState = { ...prev };
      newState.radios[radioIndex].checkboxes[checkboxIndex].checked =
        !newState.radios[radioIndex].checkboxes[checkboxIndex].checked;
      return newState;
    });
  };

  const handleSaveState = () => {
    navigator?.clipboard?.writeText(JSON.stringify(radioState));
  };

  const handleSetState = () => {
    try {
      const newState = JSON.parse(text);
      if (!newState.radios || !Array.isArray(newState.radios)) {
        return;
      }

      newState.radios.forEach((radio: Radio) => {
        if (
          !radio.title ||
          !radio.checkboxes ||
          !Array.isArray(radio.checkboxes)
        ) {
          return;
        }
      });

      setRadioState(newState);
      setText("");
    } catch (e) {
      setText("");
      return;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-yellow-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Serialize State</h1>
      </header>
      <main className="flex flex-col w-full p-4">
        <div className="flex flex-row gap-2">
          <input
            className="p-4 border-2 border-black rounded-lg"
            aria-label="Enter state"
            placeholder="Enter state"
            value={text}
            onChange={(ev) => setText((ev?.target as HTMLInputElement)?.value)}
          />
          <button className="p-4 rounded-lg" onClick={handleSetState}>
            Set State
          </button>
          <button className="p-4 rounded-lg" onClick={handleSaveState}>
            Save State
          </button>
        </div>

        <div className="my-4 p-4 flex flex-col gap-4">
          {radioState.radios.map((radio, radioIndex) => {
            return (
              <div key={`radios-${radioIndex}`}>
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    id={radio.title}
                    checked={radio.checked}
                    onChange={() => handleRadioClick(radioIndex)}
                  />
                  <label htmlFor={radio.title}>{radio.title}</label>
                </div>
                {radio.checkboxes.map((cb, cbIndex) => {
                  return (
                    <div
                      key={`checkbox-${radioIndex}-${cbIndex}`}
                      className="flex flex-row gap-4 pl-8"
                    >
                      <input
                        type="checkbox"
                        id={cb.title}
                        checked={cb.checked}
                        disabled={!radio.checked}
                        onChange={() =>
                          handleCheckboxClick(radioIndex, cbIndex)
                        }
                      />
                      <label htmlFor={cb.title}>{cb.title}</label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SerializeState;
