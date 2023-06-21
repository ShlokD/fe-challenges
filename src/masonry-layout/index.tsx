import { useEffect, useState } from "react";

import HomeLink from "../home-link";

type Photo = {
  _id?: string;
  index: number;
  name: string;
  src: string;
};

const MasonryLayout = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    const mod = await import("./data.json");
    setPhotos(mod.default);
  };
  useEffect(() => {
    fetchPhotos();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-green-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Masonry Layout</h1>
      </header>
      <main className="flex flex-col w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4 p-2 lg:w-1/2 self-center">
          <div className="grid gap-2">
            {photos.slice(0, 24)?.map((photo, index) => {
              return (
                <div key={`photo-${index}`}>
                  <img
                    loading="lazy"
                    className="rounded-lg h-auto max-w-full"
                    src={photo.src}
                    alt={photo.name}
                  />
                </div>
              );
            })}
          </div>

          <div className="grid gap-2">
            {photos?.slice(24, 48)?.map((photo, index) => {
              return (
                <div key={`photo-${index}`}>
                  <img
                    loading="lazy"
                    className="rounded-lg h-auto max-w-full"
                    src={photo.src}
                    alt={photo.name}
                  />
                </div>
              );
            })}
          </div>

          <div className="grid gap-2">
            {photos.slice(48, 72)?.map((photo, index) => {
              return (
                <div key={`photo-${index}`}>
                  <img
                    loading="lazy"
                    className="rounded-lg h-auto max-w-full"
                    src={photo.src}
                    alt={photo.name}
                  />
                </div>
              );
            })}
          </div>

          <div className="grid gap-2">
            {photos.slice(73, photos.length)?.map((photo, index) => {
              return (
                <div key={`photo-${index}`}>
                  <img
                    loading="lazy"
                    className="rounded-lg h-auto max-w-full"
                    src={photo.src}
                    alt={photo.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MasonryLayout;
