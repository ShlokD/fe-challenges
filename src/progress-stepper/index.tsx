import { useState } from "react";

import HomeLink from "../home-link";

type Step = {
  title: string;
  completed: boolean;
};
const DEFAULT_STEPS: Step[] = [
  {
    title: "Your Basket",
    completed: false,
  },
  {
    title: "Your Details",
    completed: false,
  },
  {
    title: "Payment",
    completed: false,
  },
  {
    title: "Order Completed",
    completed: false,
  },
];
const ProgressStepper = () => {
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const next = () => {
    if (currentStep >= steps.length) {
      return;
    }
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep] = { ...newSteps[currentStep], completed: true };
      return newSteps;
    });
    setCurrentStep((prev) => (prev === steps.length ? prev : prev + 1));
  };

  const done = currentStep === steps.length;
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-yellow-500">
        <HomeLink />
        <h1 className="font-bold text-2xl">Progress Stepper</h1>
      </header>
      <main className="flex flex-col w-full items-center p-8">
        <div className="flex flex-col w-1/2 gap-4 justify-center">
          {steps.map((step, i) => {
            return (
              <div className="flex gap-2 items-center p-4" key={`step-${i}`}>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={step.completed}
                  id={`step-${i}`}
                  readOnly
                />
                <div className="flex flex-col">
                  <div
                    className={`w-8 h-8 rounded-full border-2 text-center py-1 text-sm text-white ${
                      step.completed
                        ? "bg-red-600 border-red-600"
                        : i === currentStep
                        ? "bg-red-400 border-red-400"
                        : "bg-white border-black "
                    }`}
                  >
                    {step.completed ? "✔" : ""}
                  </div>
                  {step.completed && i !== steps.length - 1 && (
                    <hr
                      style={{
                        transform:
                          "rotate(90deg) translate(90%, 0px) scale(2.5, 1.2)",
                      }}
                      className="border-red-600 border-2"
                    />
                  )}
                </div>
                <label className="flex-col flex" htmlFor={`step-${i}`}>
                  <p className="text-sm">Step {i + 1}</p>
                  <p className="font-bold text-2xl">{step.title}</p>
                </label>
              </div>
            );
          })}
          <button
            className={`rounded-lg text-white font-bold p-4 w-1/2 ${
              done ? "bg-gray-500" : "bg-blue-500"
            }`}
            onClick={next}
            disabled={done}
          >
            {done ? "Done" : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProgressStepper;
