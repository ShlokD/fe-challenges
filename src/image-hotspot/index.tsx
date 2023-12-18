import { Fragment, MouseEventHandler, useState } from "react";

import HomeLink from "../home-link";

type Hotspot = {
  x: number;
  y: number;
  message?: string;
  showMessage: boolean;
};

const IMG_URL =
  "https://images.unsplash.com/photo-1517562652858-8d863a9e0931?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZmZ8ZW58MHx8MHx8fDA%3D";

type HotspotLocation = {
  x: number;
  y: number;
};
const ImageHotspot = () => {
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      x: 300,
      y: 400,
      message: "Encyclopedia",
      showMessage: false,
    },
    {
      x: 400,
      y: 250,
      message: "this is a hotspot!s",
      showMessage: false,
    },
  ]);
  const [hotspotForm, setHotspotForm] = useState<HotspotLocation | null>(null);
  const [newHotspotMessage, setNewHotspotMessage] = useState("");

  const handleHotspotClick = (index: number) => {
    setHotspots((prev) => {
      const newHotspots = [...prev];
      newHotspots[index] = {
        ...newHotspots[index],
        showMessage: !newHotspots[index].showMessage,
      };
      return newHotspots;
    });
  };

  const addHotspot: MouseEventHandler<HTMLDivElement> = (ev) => {
    setHotspotForm({
      x: ev.clientX,
      y: ev.clientY,
    });
  };

  const saveHotspot = () => {
    if (newHotspotMessage.length === 0 || !hotspotForm) return;
    const newHotspot = {
      x: hotspotForm.x,
      y: hotspotForm.y,
      message: newHotspotMessage,
      showMessage: false,
    };

    setHotspots((prev) => [...prev, newHotspot]);
    setHotspotForm(null);
    setNewHotspotMessage("");
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-blue-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">Image Hotspot</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen">
        <div
          data-testid="pov-image"
          className="relative w-full min-h-screen"
          style={{
            backgroundImage: `url(${IMG_URL})`,
            backgroundSize: "cover",
          }}
          onClick={addHotspot}
        >
          {hotspots.map((hotspot, i) => {
            return (
              <Fragment key={`hotspot-${i}`}>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleHotspotClick(i);
                  }}
                  aria-label={`Hotspot-${i + 1}`}
                  className="bg-blue-500 hover:bg-blue-600 w-10 h-10 text-white font-bold rounded-full absolute animate-pulse duration-500"
                  style={{
                    top: hotspot.y,
                    left: hotspot.x,
                  }}
                >
                  +
                </button>
                {hotspot.showMessage && (
                  <div
                    className="bg-purple-600 p-8 absolute rounded-lg"
                    style={{
                      top: hotspot.y - 90,
                      left: hotspot.x - 80,
                    }}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {hotspot.message}
                    </h3>
                  </div>
                )}
              </Fragment>
            );
          })}

          {hotspotForm && (
            <div
              className="bg-purple-600 p-8 absolute rounded-lg gap-1 flex flex-col gap-2 items-center"
              style={{
                top: hotspotForm.y - 120,
                left: hotspotForm.x,
              }}
            >
              <input
                aria-label="add message"
                className="p-1 w-full rounded-lg"
                value={newHotspotMessage}
                onChange={(ev) =>
                  setNewHotspotMessage((ev?.target as HTMLInputElement)?.value)
                }
                onClick={(ev) => ev.stopPropagation()}
              ></input>
              <div className="flex gap-1">
                <button
                  className="p-2 bg-blue-500 text-white font-bold rounded-lg"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    saveHotspot();
                  }}
                >
                  Save
                </button>
                <button
                  className="p-2 bg-black text-white font-bold rounded-lg"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setNewHotspotMessage("");
                    setHotspotForm(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageHotspot;
