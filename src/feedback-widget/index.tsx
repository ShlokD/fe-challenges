import { FormEvent, useState } from "react";

import HomeLink from "../home-link";

const FEEDBACK_TYPES = [
  {
    id: "PROBLEM",
    text: "Problems",
    icon: "💢",
  },
  {
    id: "IDEA",
    text: "Ideas",
    icon: "💡",
  },
  {
    id: "QUESTIONS",
    text: "Questions",
    icon: "❓",
  },
];

const FeedbackWidget = () => {
  const [formState, setFormState] = useState("INIT");
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const setFeedback = (value: string) => {
    setFormState("INPUT");
    setFeedbackType(value);
  };

  const goToInit = () => {
    setFeedbackType("");
    setFormState("INIT");
    setFeedbackText("");
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setFormState("DONE");
    setFeedbackText("");
  };

  const selectedFeedbackType = FEEDBACK_TYPES.find(
    (f) => f.id === feedbackType,
  );

  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-yellow-600 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Feedback Widget</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-2 justify-center">
        <div className="flex flex-col lg:w-2/3 w-full p-8 bg-gray-900 rounded-2xl my-2 text-white self-center">
          {formState === "INIT" && (
            <>
              <h2 className="font-bold self-center text-center text-xl">
                Please share your feedback
              </h2>
              <div className="flex gap-2 my-4">
                {FEEDBACK_TYPES.map((type, i) => {
                  return (
                    <button
                      key={`feedback-type-${i}`}
                      onClick={() => setFeedback(type.id)}
                      className="w-1/3 text-3xl font-bold rounded-3xl bg-gray-400 hover:bg-gray-200 hover:text-black flex flex-col items-center justify-center py-20 px-6"
                    >
                      <p className="text-6xl">{type.icon}</p>
                      {type.text}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {formState === "INPUT" && (
            <div className="flex flex-col gap-2 my-4">
              <div className="flex items-center justify-center w-full gap-20s">
                <button
                  className="text-3xl font-bold w-1/12"
                  onClick={goToInit}
                >
                  &lArr;
                </button>
                <h2 className="self-center text-center font-bold text-xl w-11/12">
                  {selectedFeedbackType?.icon} {selectedFeedbackType?.text}
                </h2>
              </div>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <label
                  htmlFor="feedback-form"
                  className="py-2 text-lg font-bold"
                >
                  Share
                </label>
                <textarea
                  rows={12}
                  id="feedback-form"
                  className="bg-gray-200 text-black rounded-2xl p-2"
                  value={feedbackText}
                  onChange={(ev) => setFeedbackText(ev?.target?.value)}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-900 font-bold shadow py-4 px-2 rounded-2xl w-2/3 text-2xl self-center my-2"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {formState === "DONE" && (
            <div className="flex flex-col items-center justify-center gap-8">
              <p className="text-6xl">✅</p>
              <h2 className="font-bold text-xl">
                Your feedback has been received
              </h2>
              <button
                className="bg-gray-500 hover:bg-gray-700 py-4 px-2 rounded-xl text-2xl font-bold"
                onClick={goToInit}
              >
                Share Another
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FeedbackWidget;
