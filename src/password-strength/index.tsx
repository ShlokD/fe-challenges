import { useState } from "react";

import HomeLink from "../home-link";

enum Score {
  INIT = 0,
  LOW = 1,
  MID = 2,
  STRONG = 3,
}

const COLORS: Record<Score, string> = {
  [Score.INIT]: "blue-400",
  [Score.LOW]: "red-400",
  [Score.MID]: "yellow-400",
  [Score.STRONG]: "green-400",
};
const getScore = (password: string, conditions: Record<string, boolean>) => {
  const numConditions = Object.keys(conditions).filter(
    (c) => conditions[c],
  )?.length;
  if (password.length === 0) {
    return Score.INIT;
  }
  if (password.length < 4) {
    return Score.LOW;
  }
  if (password.length < 8) {
    return Score.MID;
  }
  if (password.length > 8) {
    if (numConditions === Object.keys(conditions).length) {
      return Score.STRONG;
    } else if (numConditions < 2) {
      return Score.LOW;
    } else {
      return Score.MID;
    }
  }
  return Score.INIT;
};

const INIT_CONDITIONS: Record<string, boolean> = {
  A: false,
  a: false,
  $: false,
  "0-9": false,
};
const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [conditions, setConditions] = useState(INIT_CONDITIONS);
  const [preview, setPreview] = useState(false);
  const score = getScore(password, conditions);

  const handleChange = (value: string) => {
    setPassword(value);
    const letters = value.split("");
    const hasUpper = letters.find((l) => l.toUpperCase() === l);
    const hasLower = letters.find((l) => l.toLowerCase() === l);
    const hasNum = letters.find((l) => !isNaN(Number(l)));
    const hasSpecial = letters.find((l) => !l.match(/^[a-zA-Z0-9 ]+$/));
    setConditions(() => {
      return {
        A: Boolean(hasUpper),
        a: Boolean(hasLower),
        "0-9": Boolean(hasNum),
        $: Boolean(hasSpecial),
      };
    });
  };

  const handlePreview = () => setPreview((prev) => !prev);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Password Strength</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center">
        <div className="flex flex-col items-center justify-center p-4">
          <label className="text-xl font-bold" htmlFor="password-input">
            Enter password
          </label>
          <div className="flex my-2 items-center">
            <div className={`h-16 w-16 bg-${COLORS[score]}`}></div>
            <input
              id="password-input"
              className="my-8 p-4 text-xl font-bold border-2 border-l-0 border-black rounded-lg rounded-l-none"
              type={preview ? "text" : "password"}
              maxLength={32}
              value={password}
              aria-label="enter password"
              onChange={(ev) =>
                handleChange((ev?.target as HTMLInputElement)?.value)
              }
            ></input>
            <button
              onClick={handlePreview}
              className="h-16 w-16 border-2 border-black rounded-lg text-center flex items-center justify-center"
            >
              <img src="/eye.png" alt="" height="36" width="36" />
            </button>
          </div>
        </div>
        <div
          className={`flex items-baseline p-4 my-2 text-2xl font-bold text-${COLORS[score]}`}
          style={{
            letterSpacing: "4px",
          }}
        >
          <p>8...</p>
          <p className="text-4xl">{password.length}</p>
          <p>...32</p>
        </div>
        <div className="flex flex-row">
          {Object.keys(conditions).map((condition, i) => {
            return (
              <div key={`condition-${i}`}>
                <input
                  className="hidden"
                  type="checkbox"
                  checked={conditions[condition]}
                  readOnly
                  id={`condition-${i}`}
                />
                <label
                  className={`${
                    conditions[condition] ? "bg-green-600" : "bg-red-400"
                  } p-4 font-bold text-lg text-white border-2 border-black`}
                  htmlFor={`condition-${i}`}
                >
                  {condition}
                </label>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PasswordStrength;
