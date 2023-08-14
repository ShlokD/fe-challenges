import { useState } from "react";

import HomeLink from "../home-link";

const checkCommand = (cmd: string) =>
  cmd === "AC" || cmd === "+/-" || cmd === "%";

const checkOperator = (cmd: string) =>
  cmd === "/" || cmd === "X" || cmd === "-" || cmd === "+" || cmd === "=";

const getResult = (a: number, b: number, op: string) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "X":
      return a * b;
    case "/":
      return a / b;
    default:
      return 0;
  }
};

type OpState = {
  num: string;
  sym: string;
};

const Calculator = () => {
  const [value, setValue] = useState("0");
  const [op, setOp] = useState<OpState>({ num: "0", sym: "" });
  const [calcState, setCalcState] = useState("INIT");
  const commands = [
    "AC",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const handleCommandClick = (cmd: string) => {
    if (checkOperator(cmd)) {
      if (!op.sym) {
        setOp({ num: value, sym: cmd === "=" ? "" : cmd });
        setCalcState("OP");
      } else if (calcState !== "OP") {
        const res = getResult(parseFloat(op.num), parseFloat(value), op.sym);
        setOp({ num: `${res}`, sym: cmd === "=" ? "" : cmd });
        setValue(`${res}`);
        setCalcState("OP");
      }
    } else if (checkCommand(cmd)) {
      if (cmd === "+/-") {
        const inverted = 0 - parseFloat(value);
        setValue(`${inverted}`);
      }
      if (cmd === "AC") {
        if (calcState === "CE" || op.num === "0") {
          setValue("0");
          setCalcState("INIT");
          setOp({ num: "0", sym: "" });
        } else if (op.num !== "0" && calcState !== "INIT") {
          setCalcState("CE");
          setValue(op.num);
        }
      }
      if (cmd === "%") {
        setValue((prev) => {
          return (parseFloat(prev) / 100).toFixed(2);
        });
      }
    } else {
      setValue((prev) => {
        if (cmd === "0" && prev === "0") {
          setCalcState("NUM");
          return "0";
        } else if (cmd === ".") {
          setCalcState("NUM");
          return prev + cmd;
        } else if (calcState === "INIT") {
          setCalcState("NUM");
          return cmd;
        } else if (calcState === "NUM") {
          return prev + cmd;
        } else if (calcState === "OP") {
          setCalcState("NUM");
          return cmd;
        }
        return cmd;
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <header className="bg-blue-500 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Calculator </h1>
      </header>
      <main className="flex flex-col w-full items-center my-4 justify-center">
        <div className="flex flex-col w-2/3 items-stretch">
          <p
            className="bg-gray-700 p-8 text-4xl font-bold text-white self-center text-right"
            style={{
              width: "99.5%",
            }}
          >
            {value}
          </p>
          <div className="grid grid-rows-5 grid-cols-4">
            {commands.map((cmd, i) => {
              const isOperator = checkOperator(cmd);
              const isCommand = checkCommand(cmd);
              return (
                <button
                  className={`p-8 ${
                    isOperator ? "bg-orange-400" : "bg-gray-400"
                  } ${isCommand ? "bg-gray-700" : "bg-gray-400"} 
                ${
                  cmd === "0" ? "col-span-2" : ""
                } font-bold text-xl text-white border-2 border-gray-100`}
                  key={`command-${i}`}
                  onClick={() => handleCommandClick(cmd)}
                >
                  {cmd === "/" ? <>{"\u00F7"}</> : cmd}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculator;
