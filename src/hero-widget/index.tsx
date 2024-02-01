import { useState } from "react";

import HomeLink from "../home-link";

const courses = [
  {
    title: "Computer Programming",
    modules: 48,
    image: `https://picsum.photos/480/480?random=${Math.random()}`,
  },
  {
    title: "Fashion Design",
    modules: 22,
    image: `https://picsum.photos/480/480?random=${Math.random()}`,
  },
  {
    title: "Digital Marketing",
    modules: 19,
    image: `https://picsum.photos/480/480?random=${Math.random()}`,
  },
  {
    title: "Social Media Strategy",
    modules: 73,
    image: `https://picsum.photos/480/480?random=${Math.random()}`,
  },
];

const HeroWidget = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-yellow-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">Hero Widget</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full p-8 justify-center items-center">
        <div className="flex items-center gap-8 w-full items-stretch justify-center">
          <div
            className="w-1/3 flex flex-col gap-8 justify-evenly"
            style={{
              minHeight: "480px",
            }}
          >
            <h2 className="font-bold text-4xl lg:text-6xl">
              Take your learning to the next level
            </h2>
            <p className="text-lg lg:text-xl">
              Discover courses from our diverse and highly experienced tutors
            </p>
            <button className="bg-green-800 text-yellow-100 py-4 px-6 shadow-lg font-bold">
              Get Started
            </button>
          </div>
          <div className="w-2/3 flex gap-8 justify-center">
            {courses.map((course, i) => {
              const selected = selectedIndex === i;
              return (
                <button
                  key={`image-${i}`}
                  className="flex w-1/4 grow-1 shrink-1 flex-col transition-transform duration-500 items-center justify-end shadow-2xl rounded-2xl"
                  style={{
                    backgroundImage: `url(${course.image})`,
                    backgroundSize: "cover",
                    transform: `scale(${selected ? "1.1" : "1"})`,
                  }}
                  onClick={() => setSelectedIndex(i)}
                >
                  <p
                    className={`${
                      selected ? "rotate-0" : "-rotate-90"
                    } font-bold text-white transition-transform duration-500 drop-shadow text-2xl w-11/12 p-4`}
                    style={{
                      marginBottom: selected ? "0px" : "90px",
                    }}
                  >
                    {course.title}
                  </p>
                  <p
                    className={`${
                      selected ? "opacity-100" : "opacity-0"
                    } font-bold text-white text-center p-4 transition-opacity duration-500 drop-shadow text-2xl`}
                  >
                    {course.modules} modules
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroWidget;
