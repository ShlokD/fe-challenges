import { FormEvent, useState } from "react";

import HomeLink from "../home-link";

type Skill = {
  name: string;
  minutes: number;
};
const DEFAULT_SKILLS = [
  {
    name: "Spanish",
    minutes: 4812,
  },
  {
    name: "Drums",
    minutes: 8212,
  },
  {
    name: "Yoga",
    minutes: 1221,
  },
];

const toHours = (minutes: number) => {
  return Math.floor(minutes / 60);
};

const HoursTracker = () => {
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [newSkill, setNewSkill] = useState<string>("");
  const [currentSkill, setCurrentSkill] = useState(-1);
  const [minutes, setMinutes] = useState<number | string>(0);

  const handleNewSkill = (ev: FormEvent) => {
    ev.preventDefault();
    setSkills((prev) => {
      return [
        ...prev,
        {
          name: newSkill,
          minutes: 0,
        },
      ];
    });

    setNewSkill("");
  };

  const handleSkillMinutesSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setSkills((prev) => {
      const newSkills = prev.slice();
      const newMinutes =
        typeof minutes === "string" ? parseInt(minutes) : minutes;
      newSkills[currentSkill] = {
        ...newSkills[currentSkill],
        minutes: newSkills[currentSkill].minutes + newMinutes,
      };
      return newSkills;
    });
    setMinutes(0);
    setCurrentSkill(-1);
  };

  const handleClosePractice = (ev: FormEvent) => {
    ev.preventDefault();
    setMinutes(0);
    setCurrentSkill(-1);
  };

  const showSkill = (index: number) => {
    setCurrentSkill(index);
    setMinutes(0);
  };
  return (
    <div className="flex flex-col w-full h-full items-center">
      <header className="bg-orange-400 p-4 flex flex-row justify-center gap-2 items-center w-full">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Hours Tracker </h1>
      </header>
      <main className="flex flex-col w-full h-full items-center p-4">
        <form className="flex gap-2 items-center" onSubmit={handleNewSkill}>
          <input
            className="border b-2 border-black p-2 rounded-lg"
            name="new-skill"
            id="new-skill"
            placeholder="Enter new skill..."
            aria-label="Enter new skill"
            value={newSkill}
            onChange={(ev) => setNewSkill(ev?.target?.value)}
          ></input>
          <button
            className="bg-blue-400 text-white font-bold p-4 rounded-lg"
            type="submit"
          >
            Add
          </button>
        </form>
        {currentSkill !== -1 && (
          <div className="p-4 flex flex-col gap-2 w-full items-center mt-4 rounded border-4 border-green-400">
            <p className="text-2xl font-bold">{skills[currentSkill].name}</p>
            <form
              id="update-skill"
              className="flex flex-col gap-2 items-center w-full"
              onSubmit={handleSkillMinutesSubmit}
            >
              <div className="flex gap-2 items-center">
                <label htmlFor="current-skill">Enter minutes practiced</label>
                <input
                  className="border b-2 border-black p-2 rounded-lg"
                  name="current-skill"
                  id="current-skill"
                  type="number"
                  value={minutes}
                  onChange={(ev) => {
                    const num = parseInt(ev.target.value);
                    if (!isNaN(num)) {
                      setMinutes(num);
                    } else {
                      setMinutes("");
                    }
                  }}
                ></input>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-400 p-4 text-white font-bold"
                >
                  Done
                </button>
                <button
                  className="rounded-xl bg-gray-400 p-4 text-white font-bold"
                  onClick={handleClosePractice}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex gap-4 items-center justify-center mt-4 w-full">
          {skills.map((skill, i) => {
            return (
              <button
                className="border b-2 border-cyan-600 p-4 rounded-lg w-1/4 flex flex-col items-center"
                key={`skill-${i}`}
                onClick={() => showSkill(i)}
              >
                <span className="font-bold text-xl">{skill.name}</span>
                <span>
                  <span className="text-lg font-semibold">
                    {toHours(skill.minutes)}
                  </span>
                  h
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HoursTracker;
