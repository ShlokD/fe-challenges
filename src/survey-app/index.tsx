import { FormEvent, useState } from "react";

import HomeLink from "../home-link";

type Option = {
  name: string;
  votes: number;
};

type Survey = {
  title: string;
  options: Option[];
};

const DEFAULT_SURVEYS = [
  {
    title: "Recommended JS Framework",
    options: [
      {
        name: "React",
        votes: 12,
      },
      {
        name: "Vue",
        votes: 9,
      },
      {
        name: "Angular",
        votes: 2,
      },
      {
        name: "Svelte",
        votes: 5,
      },
    ],
  },
  {
    title: "Best Movie 2023",
    options: [
      {
        name: "Oppenheimer",
        votes: 18,
      },
      {
        name: "Barbie",
        votes: 7,
      },
      {
        name: "Poor Things",
        votes: 11,
      },
      {
        name: "Maestro",
        votes: 4,
      },
    ],
  },
];

type AddSurveyPayload = {
  title: string;
  options: string[];
};

type AddSurveyFormProps = {
  onSubmit: (payload: AddSurveyPayload) => void;
  onClose: () => void;
};

const AddSurveyForm = ({ onSubmit, onClose }: AddSurveyFormProps) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>([""]);

  const handleCloseForm = () => {
    setTitle("");
    setOptions([""]);
    onClose();
  };

  const doSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const filteredOptions = options.filter((o) => o.length !== 0);
    if (!title || filteredOptions.length === 0) return;
    onSubmit({
      title,
      options: filteredOptions,
    });
    handleCloseForm();
  };

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const setOptionValue = (index: number, value: string) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const removeLastOption = () => {
    setOptions((prev) => {
      return prev.slice(0, -1);
    });
  };
  return (
    <div className="p-2 flex flex-col items-center gap-4 border-2 rounded-2xl shadow-2xl p-4">
      <form onSubmit={doSubmit} className="flex flex-col gap-4 items-center">
        <input
          className="p-2 border-2 rounded-2xl text-lg"
          value={title}
          onChange={(ev) => setTitle(ev?.target?.value)}
          placeholder="Survey title"
          aria-label="Survey title"
          required
        />
        <hr className="w-full"></hr>
        <p className="font-bold">Options</p>
        <div className="flex gap-2">
          <button
            className="h-10 w-10 rounded-full bg-green-600 text-white font-bold text-xl"
            onClick={addOption}
            type="button"
          >
            +
          </button>
          <button
            className="h-10 w-10 rounded-full bg-green-600 text-white font-bold text-xl"
            onClick={removeLastOption}
            type="button"
          >
            -
          </button>
        </div>
        {options.map((option, i) => {
          return (
            <input
              key={`Option-${i}`}
              className="p-2 border-2 rounded-2xl text-lg"
              value={option}
              onChange={(ev) => setOptionValue(i, ev?.target?.value)}
              placeholder={`survey option ${i + 1}`}
              aria-label={`survey option ${i + 1}`}
              required={i === 0}
            />
          );
        })}

        <button
          className="p-4 rounded-full bg-green-600 text-white font-bold text-xl my-4"
          type="submit"
        >
          Done
        </button>
      </form>
      <button
        className="py-4 px-6 font-bold text-white text-xl bg-green-400"
        onClick={handleCloseForm}
      >
        Close
      </button>
    </div>
  );
};

type SurveyItemProps = Survey & {
  handleVote: (index: number) => void;
  onClose: () => void;
};

const SurveyItem = (props: SurveyItemProps) => {
  const [appState, setAppState] = useState("VOTE");

  const { title, options, handleVote, onClose } = props;

  if (!title) {
    return null;
  }

  const addVote = (index: number) => {
    handleVote(index);
    setAppState("RESULTS");
  };

  const handleClose = () => {
    setAppState("VOTE");
    onClose();
  };

  return (
    <div className="p-2 flex flex-col items-center gap-4 border-2 rounded-2xl shadow-2xl p-4 items-center w-2/3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div
        className={`${
          appState === "VOTE" ? "flex flex-col gap-2 w-full" : "hidden"
        }`}
      >
        {options?.map((option, i) => {
          return (
            <button
              key={`vote-${i}`}
              className="px-6 py-8 bg-green-400 font-bold text-2xl w-full"
              onClick={() => addVote(i)}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      <div
        className={`${
          appState === "RESULTS" ? "flex flex-col gap-2 w-full" : "hidden"
        }`}
      >
        {options.map((option, i) => {
          const dots = new Array(option.votes).fill(0);
          return (
            <div
              key={`results-${i}`}
              className="flex gap-2 items-center justify-center w-full"
            >
              <p className="font-bold w-1/6 text-xl">
                {option.name} - {option.votes}
              </p>
              <div className="flex gap-1 flex-wrap border-2 p-4 border-black w-3/6">
                {dots.map((_, i) => (
                  <span
                    key={`dot-${i}`}
                    className="h-6 w-6 rounded-full bg-green-600"
                  ></span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="py-4 px-6 font-bold text-white text-xl bg-green-400"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

const SurveyApp = () => {
  const [surveys, setSurveys] = useState<Survey[]>(DEFAULT_SURVEYS);
  const [selectedSurveyIndex, setSelectedSurveyIndex] = useState(-1);
  const [appState, setAppState] = useState("INIT");

  const handleSurveySelect = (index: number) => {
    setAppState("SURVEY");
    setSelectedSurveyIndex(index);
  };

  const showSurveyForm = () => {
    setAppState("SURVEY_FORM");
  };

  const closeForm = () => {
    setAppState("INIT");
  };

  const handleSubmit = (payload: AddSurveyPayload) => {
    const { title, options } = payload;
    const newSurvey = {
      title,
      options: options.map((name) => ({ name, votes: 0 })),
    };
    setSurveys((prev) => [...prev, newSurvey]);
  };

  const addVote = (optionIndex: number) => {
    setSurveys((prev) => {
      const newSurveys = [...prev];
      const newOptions = [...newSurveys[selectedSurveyIndex].options];
      newOptions[optionIndex].votes += 1;
      newSurveys[selectedSurveyIndex] = {
        ...newSurveys[selectedSurveyIndex],
        options: newOptions,
      };
      return newSurveys;
    });
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <header className="bg-green-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Survey App </h1>
      </header>
      <main className="flex flex-col w-full h-screen p-2">
        <div className="flex gap-2 items-center justify-center">
          {surveys.map((survey, i) => {
            return (
              <button
                key={`survey-${i}`}
                className="p-4 text-xl text-center border-2 border-black font-bold"
                onClick={() => handleSurveySelect(i)}
              >
                {survey.title}
              </button>
            );
          })}
          <button
            className="p-4 text-xl text-center border-2 border-black  font-bold"
            onClick={showSurveyForm}
          >
            +
          </button>
        </div>

        <div
          className={`${
            appState === "SURVEY" ? "flex flex-col my-4 items-center" : "hidden"
          }`}
        >
          <SurveyItem
            {...surveys[selectedSurveyIndex]}
            handleVote={(index) => addVote(index)}
            onClose={closeForm}
          />
        </div>

        <div
          className={`${
            appState === "SURVEY_FORM"
              ? "flex flex-col my-4 self-center"
              : "hidden"
          }`}
        >
          <AddSurveyForm onSubmit={handleSubmit} onClose={closeForm} />
        </div>
      </main>
    </div>
  );
};

export default SurveyApp;
