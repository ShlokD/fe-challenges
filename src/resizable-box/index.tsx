import { MouseEvent, useEffect, useState } from "react";

import HomeLink from "../home-link";

const RATIO = 9 / 16;

let startX: number;

const MAX_WIDTH = window.innerWidth - 50;
const MIN_WIDTH = 240;

type Dims = {
  width: number;
  height: number;
};

const ResizableBox = () => {
  const [dims, setDims] = useState<Dims>({ width: 240, height: 135 });
  const [resizing, setResizing] = useState(false);

  const handleMouseDown = (ev: MouseEvent<HTMLDivElement>) => {
    setResizing(true);
    startX = ev.clientX;
  };

  const handleMouseUp = () => {
    if (resizing) {
      setResizing(false);
    }
  };

  const handleDocumentMouseUp = () => {
    if (resizing) {
      setResizing(false);
    }
  };

  const handleMouseMove = (ev: MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (!resizing) return;
    const offset = ev.clientX - startX;
    if (offset + dims.width <= MIN_WIDTH) {
      return;
    }
    const newWidth = Math.min(offset + dims.width, MAX_WIDTH);
    const newHeight = RATIO * newWidth;
    setDims({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  });
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Resizable Box</h1>
      </header>
      <main className="flex flex-col w-full p-4 bg-gray-600 min-h-screen items-center justify-center">
        <div
          className={`p-2 bg-gray-800 shadow-xl rounded-lg text-xs text-white cursor-ew-resize ${
            resizing ? "border-r-4 border-purple-500" : ""
          }`}
          style={{ ...dims, transition: "all ease-in-out 0.2s" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <p
            style={{
              userSelect: "none",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            pellentesque, libero nec vulputate egestas, lorem dui fringilla dui,
            quis tempor magna augue molestie sem.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResizableBox;
