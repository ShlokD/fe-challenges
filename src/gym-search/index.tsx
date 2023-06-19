import { useEffect, useState } from "react";

import HomeLink from "../home-link";

type Schedule = {
  weekdays: string;
  hour: string;
};
type Gym = {
  title: string;
  content: string;
  opened: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules: Schedule[];
};

const images: Record<string, Record<string, string>> = {
  mask: {
    required: "/required-mask.png",
    recommended: "./recommended-mask.png",
  },
  towel: {
    required: "/required-towel.png",
    recommended: "/recommended-towel.png",
  },
  fountain: {
    partial: "/partial-fountain.png",
    not_allowed: "/forbidden-fountain.png",
  },
  locker_room: {
    allowed: "/required-lockerroom.png",
    partial: "/partial-lockerroom.png",
    closed: "/forbidden-lockerroom.png",
  },
};

const times: Record<string, Record<string, number>> = {
  MORNING: {
    start: 360,
    end: 720,
  },
  AFTERNOON: {
    start: 721,
    end: 1080,
  },
  NIGHT: {
    start: 1081,
    end: 1380,
  },
};
const transformGymResponse = (json: any) => {
  return json.locations.map((result: any) => ({
    title: result.title,
    content: result.content,
    opened: result.content,
    mask: result.mask,
    towel: result.towel,
    fountain: result.fountain,
    locker_room: result.locker_room,
    schedules: result.schedules,
  }));
};
const GymSearch = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [displayClosedGyms, setDisplayClosedGyms] = useState(false);
  const [time, setTime] = useState("");
  const day = new Date().getDay();
  const isSaturday = day === 5;
  const isSunday = day === 6;

  const fetchGyms = async () => {
    const res = await fetch(
      "https://test-frontend-developer.s3.amazonaws.com/data/locations.json",
    );
    const json = await res.json();
    setGyms(transformGymResponse(json));
  };
  useEffect(() => {
    fetchGyms();
  }, []);

  const handleClear = () => {
    setTime("");
    setDisplayClosedGyms(false);
  };

  let gymsToDisplay = gyms;

  if (time) {
    const slots = times[time];
    gymsToDisplay = gymsToDisplay.filter((gym) => {
      if (!gym.schedules) {
        return false;
      }
      const schedule = gym.schedules.find((schedule) => {
        if (isSaturday) {
          return schedule.weekdays === "Sáb.";
        } else if (isSunday) {
          return schedule.weekdays === "Dom.";
        } else {
          return schedule.weekdays === "Seg. à Sex.";
        }
      });
      if (!schedule || !schedule.hour) {
        return false;
      }
      const timings = schedule.hour.split("às");
      const start = timings[0].split("h")[0];
      const end = timings[timings.length - 1].split("h")[0];
      return (
        parseInt(start) * 60 >= slots.start || parseInt(end) * 60 <= slots.end
      );
    });
  }
  if (!displayClosedGyms) {
    gymsToDisplay = gymsToDisplay.filter((gym) => gym.opened);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <header className="bg-black text-white p-4 flex flex-row justify-center gap-2 items-center">
        <div className="bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl text-white"> Smart Fit </h1>
      </header>
      <main className="flex flex-col w-full my-4 px-4 pt-4 pb-12">
        <div className="flex flex-col w-full">
          <h2 className="text-5xl w-1/2 py-8 text-gray-800 font-bold">
            SMART FIT REOPENING
          </h2>
          <hr className="w-2/3 border-4 border-gray-800" />
          <p className="text-xl py-8 text-gray-600 w-10/12">
            The opening hours of our gyms are following the decrees of each
            municipality. So, check here if your gym is open and the security
            measures we are following.
          </p>
        </div>
        <div className="shadow rounded-lg flex flex-col border-2 p-4">
          <div className="flex flex-row items-center justify-center gap-4">
            <img src="/icon-hour.png" alt="" height="24" width="24" />
            <p className="text-lg font-bold">
              What period do you want to train?
            </p>
          </div>

          <hr className="w-full my-2" />
          <div className="flex flex-row gap-2 relative py-2 ">
            <input
              type="radio"
              name="hours"
              value="MORNING"
              id="morning"
              checked={time === "MORNING"}
              onChange={(ev) =>
                setTime((ev?.target as HTMLInputElement)?.value)
              }
            />
            <label htmlFor="morning" className="text-lg text-gray-600">
              Morning <p className="inline right-1 absolute">06:00 to 12:00</p>
            </label>
          </div>
          <hr className="w-full my-2" />

          <div className="flex flex-row gap-2 relative py-2">
            <input
              type="radio"
              name="hours"
              value="AFTERNOON"
              id="afternoon"
              checked={time === "AFTERNOON"}
              onChange={(ev) =>
                setTime((ev?.target as HTMLInputElement)?.value)
              }
            />
            <label htmlFor="afternoon" className="text-lg text-gray-600">
              Afternoon{" "}
              <p className="inline right-1 absolute">12:01 to 18:00</p>
            </label>
          </div>
          <hr className="w-full my-2" />

          <div className="flex flex-row gap-2 relative py-2">
            <input
              type="radio"
              name="hours"
              value="NIGHT"
              id="night"
              checked={time === "NIGHT"}
              onChange={(ev) =>
                setTime((ev?.target as HTMLInputElement)?.value)
              }
            />
            <label htmlFor="night" className="text-lg text-gray-600">
              Night <p className="inline right-1 absolute">18:01 to 23:00</p>
            </label>
          </div>
          <hr className="w-full my-2" />

          <div className="py-4 text-xl flex flex-row gap-4 justify-center">
            <input
              type="checkbox"
              name="closed"
              id="closed-check"
              checked={displayClosedGyms}
              onChange={() => setDisplayClosedGyms(!displayClosedGyms)}
            />
            <label htmlFor="closed-check">Display Closed Gyms</label>
          </div>

          <p className="p-4 text-center font-bold text-xl">
            Results found: {gymsToDisplay.length}
          </p>

          <button
            className="bg-gray-300 font-bold text-xl p-4 rounded-lg w-full"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <div className="shadow rounded-lg flex flex-col lg:flex-row border-2 p-4 my-4 items-center justify-center lg: justify-evenly gap-4 w-full">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-2xl">Mask</p>
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="w-1/2">
                <img
                  src="/required-mask.png"
                  alt="Required mask"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Required</p>
              </div>

              <div className="w-1/2">
                <img
                  src="/recommended-mask.png"
                  alt="Recommended mask"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Recommended</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-2xl">Towel</p>
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="w-1/2">
                <img
                  src="/required-towel.png"
                  alt="Required towel"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Required</p>
              </div>

              <div className="w-1/2">
                <img
                  src="/recommended-towel.png"
                  alt="Recommended towel"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Recommended</p>
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-2xl">Fountain</p>
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="w-1/2">
                <img
                  src="/partial-fountain.png"
                  alt="Partial bottle"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Partial</p>
              </div>

              <div className="w-1/2">
                <img
                  src="/forbidden-fountain.png"
                  alt="Recommended mask"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Forbidden</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-2xl text-center">Locker Room Access</p>
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="w-1/3">
                <img
                  src="/required-lockerroom.png"
                  alt="Required lockerroom"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Required</p>
              </div>

              <div className="w-1/3">
                <img
                  src="/partial-lockerroom.png"
                  alt="partial lockerroom"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Partial</p>
              </div>

              <div className="w-1/3">
                <img
                  src="/forbidden-lockerroom.png"
                  alt="Forbidden lockerroom"
                  height="64"
                  width="64"
                  className="m-auto"
                ></img>
                <p className="text-sm text-center">Forbidden</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-4 lg:justify-center">
          {gymsToDisplay?.map((gym, index) => {
            return (
              <div
                key={`gym-${index}`}
                className="flex flex-col items-center rounded-lg p-4 border-2 w-full lg:w-5/12"
              >
                <p
                  className={`${
                    gym.opened ? "text-green-400" : "text-red-400"
                  } text-lg font-bold`}
                >
                  {gym.opened ? "Open" : "Closed"}
                </p>
                <p className="font-bold text-2xl">{gym?.title}</p>
                <p dangerouslySetInnerHTML={{ __html: gym.content }}></p>
                <hr className="w-full my-2" />

                <div className="flex flex-row justify-center w-full lg:gap-4">
                  {gym.mask && (
                    <img
                      src={images.mask[gym.mask]}
                      height="64"
                      width="64"
                      alt={`${gym.mask} mask`}
                    />
                  )}
                  {gym.towel && (
                    <img
                      src={images.towel[gym.towel]}
                      height="64"
                      width="64"
                      alt={`${gym.towel} towel`}
                    />
                  )}
                  {gym.fountain && (
                    <img
                      src={images.fountain[gym.fountain]}
                      height="64"
                      width="64"
                      alt={`${gym.fountain} fountain`}
                    />
                  )}
                  {gym.locker_room && (
                    <img
                      src={images.locker_room[gym.locker_room]}
                      height="64"
                      width="64"
                      alt={`${gym.locker_room} lockerroom`}
                    />
                  )}
                </div>

                <div className="flex flex-row flex-wrap lg:flex-nowrap my-4 gap-2 lg:gap-4">
                  {gym.schedules?.map((schedule, i) => {
                    return (
                      <div key={`schedule-${i}`} className="p-2">
                        <p className="font-bold text-xl">{schedule.weekdays}</p>
                        <p className="textxl">{schedule.hour}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="bg-gray-800 bottom-0 fixed w-full text-white p-4 text-white justify-center items-center text-center">
        <h2 className="font-bold">&copy; Smart Fit</h2>
      </footer>
    </div>
  );
};

export default GymSearch;
