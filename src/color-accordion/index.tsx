import { MouseEvent, useState } from "react";

import HomeLink from "../home-link";

const MESSAGE =
  "Cras ullamcorper erat non ex dignissim laoreet. Donec imperdiet, ante quis bibendum imperdiet, sem purus tincidunt est, quis tristique mauris enim nec ipsum. Sed sodales urna ut tellus auctor, sit amet varius libero convallis. Sed eget dolor orci. Fusce euismod quam bibendum, accumsan magna placerat, lacinia est.";

const Accordion = ({ title, message }: { title: string; message: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = (ev: MouseEvent<HTMLDetailsElement>) => {
    ev.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <details
      className={`cursor-pointer w-full border-2 p-4 border-black rounded-xl cursor-pointer bg-gradient-to-b transition-all duration-500 ${
        open ? "bg-green-200" : "bg-white"
      }`}
      onClick={toggleOpen}
      open={open}
    >
      <summary className="list-none w-full flex justify-between items-center text-2xl font-bold transition-all duration-500 ">
        {title}
        <p className="text-4xl font-bold">{open ? "-" : "+"}</p>
      </summary>
      <p className="my-4 text-lg">{message}</p>
    </details>
  );
};

const ColorAccordion = () => {
  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-blue-500 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Color Accordion</h1>
      </header>

      <main className="flex flex-col w-screen min-h-screen items-center py-8 px-4 gap-12">
        {new Array(4).fill(1).map((num, i) => {
          return (
            <Accordion
              key={`Accordion-${i}`}
              title={`Title ${num + i}`}
              message={`${MESSAGE} ${num + i}`}
            />
          );
        })}
      </main>
    </div>
  );
};

export default ColorAccordion;
