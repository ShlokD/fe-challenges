import { Fragment, useState } from "react";

import HomeLink from "../home-link";

type Noun = {
  noun: string;
  description: string;
  video: string;
};
const nouns: Noun[] = [
  {
    noun: "Animal",
    description: "The cat sat on the mat and watched the birds fly by",
    video:
      "https://v3.cdnpk.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4",
  },
  {
    noun: "Book",
    description: "The old woman sat on the porch and rocked in her chair",
    video:
      "https://v3.cdnpk.net/videvo_files/video/premium/video0243/large_watermarked/07_Kreslo_fireplace_10_hot_tea_book_preview.mp4",
  },
  {
    noun: "Computer",
    description:
      "The children played in the park while their parents watched from the sidelines.",
    video:
      "https://v3.cdnpk.net/videvo_files/video/free/2016-12/large_watermarked/Code_flythough_loop_01_Videvo_preview.mp4",
  },
  {
    noun: "Door",
    description:
      "The train chugged along the tracks, carrying passengers to their destinations",
    video:
      "https://v1.cdnpk.net/videvo_files/video/premium/video0293/large_watermarked/_Vol.2Horror56_preview.mp4",
  },
  {
    noun: "Flower",
    description: "The waves crashed against the shore as the storm raged on",
    video:
      "https://v1.cdnpk.net/videvo_files/video/premium/video0031/large_watermarked/512_512-0032_preview.mp4",
  },
  {
    noun: "House",
    description:
      "The robot walked down the street, its metallic limbs gleaming in the sunlight",
    video:
      "https://v1.cdnpk.net/videvo_files/video/premium/video0314/large_watermarked/601-2_601-8873_preview.mp4",
  },
  {
    noun: "Mountain",
    description:
      "The spaceship landed on the alien planet, its crew eager to explore",
    video:
      "https://v5.cdnpk.net/videvo_files/video/premium/video0519/large_watermarked/CAPE%20TOWN_CAPETOWN_AERIAL_00098_preview.mp4",
  },
  {
    noun: "Ocean",
    description:
      "The wizard cast a spell, and the castle disappeared in a puff of smoke",
    video:
      "https://v3.cdnpk.net/videvo_files/video/free/2020-05/large_watermarked/3d_ocean_1590675653_preview.mp4",
  },
  {
    noun: "River",
    description:
      "The dragon soared through the sky, its wings casting a shadow on the ground below",
    video:
      "https://v3.cdnpk.net/videvo_files/video/premium/video0238/large_watermarked/06_day_part_II_725_lednik_S_handheld_preview.mp4",
  },
  {
    noun: "Star",
    description:
      "The family loved and cared for each other, creating a strong and supportive bond",

    video:
      "https://v1.cdnpk.net/videvo_files/video/premium/video0042/large_watermarked/900-2_900-6186-PD2_preview.mp4",
  },
  {
    noun: "Tree",
    description:
      "The doctor worked tirelessly to care for their patients, providing them with the best possible medical care",
    video:
      "https://v3.cdnpk.net/videvo_files/video/free/2022-01/large_watermarked/220114_01_Drone_4k_019_preview.mp4",
  },
  {
    noun: "Fire",
    description:
      "The scientist peered into the microscope, hoping to make a breakthrough discovery",
    video:
      "https://v6.cdnpk.net/videvo_files/video/premium/video0003/large_watermarked/301_301-0154_preview.mp4",
  },
];

const VideoMenu = () => {
  const [selectedItem, setSelectedItem] = useState(-1);
  const [page, setPage] = useState(-1);

  const handleHover = (index: number) => {
    setSelectedItem(index);
  };

  const handleClick = (index: number) => {
    setPage(index);
  };

  const selected = nouns?.[page] || {};

  return (
    <div id="video-menu-app" className="flex flex-col w-full min-h-screen">
      <header className="bg-orange-400 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Video Menu </h1>
      </header>
      <main
        className={`flex flex-col w-full min-h-screen items-center justify-center relative ${
          selectedItem === -1 ? "bg-white" : "bg-black"
        }`}
      >
        {page === -1 && (
          <div
            id="video-menu"
            className="flex flex-col overflow-y-scroll items-center ml-auto w-full"
            style={{
              height: "70vh",
            }}
          >
            {nouns.map((noun, i) => {
              return (
                <Fragment key={`menu-item-${i}`}>
                  <video
                    src={noun.video}
                    loop
                    muted
                    playsInline
                    autoPlay
                    className={`${
                      selectedItem === i ? "opacity-100" : "opacity-0"
                    } h-full w-full absolute top-0 left-0`}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <button
                    className={`${
                      selectedItem === i
                        ? "text-white"
                        : selectedItem === -1
                        ? "text-black"
                        : "text-gray-600"
                    } text-8xl w-full py-16 pr-16 text-left font-bold`}
                    style={{
                      zIndex: 2,
                      paddingLeft: "20%",
                    }}
                    onMouseEnter={() => handleHover(i)}
                    onMouseLeave={() => handleHover(-1)}
                    onClick={() => handleClick(i)}
                  >
                    {noun.noun}
                  </button>
                </Fragment>
              );
            })}
          </div>
        )}
        {page !== -1 && (
          <div className="w-full min-h-screen">
            <video
              src={selected.video}
              loop
              muted
              playsInline
              autoPlay
              className={"opacity-100 h-full w-full absolute top-0 left-0"}
              style={{
                objectFit: "cover",
              }}
            />
            <button
              className="text-white text-8xl w-full py-16 pr-16 relative text-left font-bold"
              style={{
                zIndex: 2,
                paddingLeft: "20%",
              }}
              onClick={() => handleClick(-1)}
            >
              {selected.noun}
            </button>
            <p
              className="text-white w-2/3 break-words bg-black bg-opacity-50 text-4xl py-8 pr-16 relative text-left font-bold"
              style={{
                zIndex: 2,
                paddingLeft: "20%",
              }}
            >
              {selected.description}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoMenu;
