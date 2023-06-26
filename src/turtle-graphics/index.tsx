import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const CMDS: Record<string, string> = {
  FORWARD: "FORWARD",
  BACKWARD: "BACKWARD",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
};

const toRadian = (val: number) => {
  return (val / 180) * Math.PI;
};

type Position = {
  x: number;
  y: number;
  angle: number;
};
const TurtleGraphics = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [command, setCommand] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: 200,
    y: 200,
    angle: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const moveForward = (val: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas?.getContext("2d");
    if (!context) {
      return;
    }

    const cos = Math.cos(currentPosition.angle);
    const sin = Math.sin(currentPosition.angle);
    let newX = currentPosition.x + sin * val;
    let newY = currentPosition.y + cos * val;

    if (newX >= canvas.width) {
      newX = canvas.width;
    }

    if (newX <= 0) {
      newX = 0;
    }

    if (newY >= canvas.height) {
      newY = canvas.height;
    }

    if (newY <= 0) {
      newY = 0;
    }

    context?.lineTo(newX, newY);
    context.lineWidth = 4;
    context?.stroke();
    setCurrentPosition({ ...currentPosition, x: newX, y: newY });
  };

  const handleSubmit = () => {
    const parsed = command.split(" ");
    setCommand("");
    const [cmd, num] = parsed;
    const val = parseInt(num);
    if (!cmd || CMDS[cmd] === undefined || !val || isNaN(val)) {
      setCommand("");
      return;
    }

    if (cmd === "FORWARD") {
      moveForward(val);
    }

    if (cmd === "BACKWARD") {
      moveForward(-val);
    }

    if (cmd === "RIGHT") {
      setCurrentPosition((prev) => ({
        ...prev,
        angle: prev.angle + toRadian(val),
      }));
    }

    if (cmd === "LEFT") {
      setCurrentPosition((prev) => ({
        ...prev,
        angle: prev.angle - toRadian(val),
      }));
    }

    setCommands((prev) => {
      return [...prev, command];
    });
    setCommand("");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = "#fefefe";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.moveTo(currentPosition.x, currentPosition.y);
    context?.arc(
      currentPosition.x,
      currentPosition.y,
      1,
      0,
      2 * Math.PI,
      false,
    );
    context.fillStyle = "green";
    context?.fill();
  }, []);

  return (
    <div className="flex flex-col w-full h-full items-center">
      <header className="bg-green-800 p-4 flex flex-row justify-center gap-2 items-center w-full">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Turtle Graphics </h1>
      </header>
      <main className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col p-4 my-2 text-center">
          <p>Commands</p>
          <p>FORWARD number</p>
          <p>RIGHT number</p>
          <p>LEFT number</p>
          <p>BACKWARD number</p>
        </div>

        <div className="flex gap-2 my-4">
          <input
            className="p-4 border-2 text-xl font-bold"
            value={command}
            onChange={(ev) =>
              setCommand((ev?.target as HTMLInputElement)?.value.toUpperCase())
            }
          ></input>
          <button
            className="p-4 rounded-lg bg-yellow-300 font-bold text-xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <canvas
          className="border-2 my-4"
          width={400}
          height={400}
          ref={canvasRef}
        ></canvas>
        {commands.length > 0 && (
          <div className="flex flex-col rounded-lg p-4 border-2 w-1/2 text-center text-lg">
            {commands.map((cmd, i) => {
              return (
                <p className="p-2" key={`cmd-${i}`}>
                  {cmd}
                </p>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default TurtleGraphics;
