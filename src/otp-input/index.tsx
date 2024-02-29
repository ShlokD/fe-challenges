import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const OTPInput = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [time, setTime] = useState(0);
  const timer = useRef<number | null>(null);
  const inputRefs = useRef<HTMLInputElement[] | null[]>(
    new Array(6).fill(null),
  );

  const handleInput = (i: number, v: string) => {
    const num = Number(v);
    if (isNaN(num) || v.length === 0) {
      return;
    } else {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[i] = v;
        return newOtp;
      });
      if (i < otp.length - 1 && inputRefs?.current?.[i + 1]) {
        inputRefs?.current[i + 1]?.focus?.();
      }
    }
  };

  const handleRequest = () => {
    setTime(60);
    timer.current = window.setInterval(() => {
      let done = false;
      setTime((prev) => {
        if (prev === 0) {
          done = true;
          return 0;
        } else {
          return prev - 1;
        }
      });
      if (done) {
        if (timer?.current) {
          clearInterval(timer?.current);
        }
      }
    }, 1000);
  };

  const waitRequest = time !== 0;
  const verifyReady = otp.filter((o) => o === "").length === 0;
  useEffect(() => {
    if (inputRefs?.current?.[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">OTP Input</h1>
      </header>
      <main className="flex flex-col w-full p-2 w-full min-h-screen items-center">
        <h2 className="text-2xl font-bold p-2 mt-8">Verify</h2>
        <p className="text-lg p-2">Your code was sent to via SMS</p>
        <div className="flex gap-2">
          {otp.map((entry, i) => {
            return (
              <input
                className="w-20 h-20 border-2 focus:border-black p-2 text-4xl appearance-none text-center"
                defaultValue={entry}
                key={`entry-${i}`}
                ref={(el) => (inputRefs.current[i] = el)}
                maxLength={1}
                onChange={(ev) => handleInput(i, ev?.target?.value)}
                aria-label={`Otp Digit ${i + 1}`}
              ></input>
            );
          })}
        </div>

        <button
          className={`${
            verifyReady ? "bg-black" : "bg-gray-400"
          } text-white font-bold px-2 py-4 rounded-lg my-4`}
          disabled={!verifyReady}
        >
          Verify
        </button>
        {waitRequest && <p>Request new code in {time} seconds</p>}
        <p className="p-4">
          Didn't receive code?
          <button
            className="text-blue-500 underline p-1"
            disabled={waitRequest}
            onClick={handleRequest}
          >
            Request Again
          </button>
        </p>
      </main>
    </div>
  );
};

export default OTPInput;
