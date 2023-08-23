import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const VoiceModulator = () => {
  const recorder = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [url, setAudioURL] = useState("");
  const [rate, setRate] = useState("1");
  const addChunk = (e: BlobEvent) => {
    const bl = new Blob([e.data], { type: "audio/ogg;codecs=opus" });
    const audioURL = window.URL.createObjectURL(bl);
    setAudioURL(audioURL);
  };
  const setupRecorder = async () => {
    if (navigator?.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder.current = new MediaRecorder(stream);
      recorder?.current?.addEventListener("dataavailable", addChunk);
    }
  };
  useEffect(() => {
    if (recorder.current === null) {
      setupRecorder();
    }
  }, []);

  const handleStart = () => {
    if (!recorder.current) {
      return;
    }
    recorder.current.start();
  };

  const handleStop = () => {
    if (!recorder.current) {
      return;
    }
    recorder.current.stop();
  };

  const handleRateChange = (value: string) => {
    setRate(value);

    if (!audioRef.current) {
      return;
    }

    audioRef.current.preservesPitch = false;
    audioRef.current.playbackRate = Number(value);
  };

  const handleClear = () => {
    setAudioURL("");
  };

  useEffect(() => {
    if (url && audioRef.current) {
      audioRef.current.preservesPitch = false;
      audioRef.current.playbackRate = Number(rate);
    }
  }, [url]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-green-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Voice Modulator </h1>
      </header>
      <main className="lg:w-2/3 flex flex-col items-center justify-start my-16 min-h-screen self-center">
        <div className="flex flex-row gap-2 my-4">
          <button
            disabled={recorder?.current?.state === "recording"}
            className="border-2 border-green-900 p-8 bg-green-400 font-bold text-white text-2xl"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="border-2 border-green-900 p-8 bg-red-400 font-bold text-white text-2xl"
            onClick={handleStop}
          >
            Stop
          </button>
          <button
            className="border-2 border-green-900 p-8 bg-blue-400 font-bold text-white text-2xl"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <audio
          controls
          className="my-4 w-full"
          src={url}
          autoPlay
          loop
          aria-label="Recorded Audio"
          ref={(el) => {
            audioRef.current = el;
          }}
        />
        <div className="p-4 flex flex-col items-center w-full">
          <label className="my-4 text-2xl font-bold" htmlFor="volume">
            Set Pitch
          </label>
          <input
            className="px-10 py-2"
            type="range"
            id="volume"
            min="0.2"
            max="4"
            value={rate}
            step="0.1"
            onInput={(ev) =>
              handleRateChange((ev.target as HTMLInputElement)?.value)
            }
          />
        </div>
      </main>
    </div>
  );
};

export default VoiceModulator;
