import { MouseEvent, useRef, useState } from "react";

import HomeLink from "../home-link";

const OFFSET_WIDTH = 80;
const OFFSET_HEIGHT = 80;

type Params = {
  width: number;
  height: number;
  x: number;
  y: number;
};
const ImageZoom = () => {
  const [showZoom, setShowZoom] = useState(false);
  const [params, setParams] = useState<Params>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const zoom = useRef<HTMLDivElement | null>(null);

  const doZoom = (ev: MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !zoom.current) {
      return;
    }
    setShowZoom(true);
    const width = zoom.current.offsetWidth / OFFSET_WIDTH;
    const height = zoom.current.offsetHeight / OFFSET_HEIGHT;
    const rect = imageRef?.current?.getBoundingClientRect();
    let x = ev.pageX - rect.left - window.pageXOffset;
    let y = ev.pageY - rect.top - window.pageYOffset;
    if (x > imageRef.current.width) {
      x = imageRef.current.width;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > imageRef.current.height) {
      y = imageRef.current.height;
    }
    if (y < 0) {
      y = 0;
    }
    setParams({
      height,
      width,
      x,
      y,
    });
  };

  const handleLeave = () => {
    setShowZoom(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-green-500 text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Image Zoom</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center gap-4 p-4">
        <div className="flex w-full my-4 justify-center">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfDB8MHx8fDA%3D"
            alt="Featured Product"
            onMouseMove={doZoom}
            onMouseLeave={handleLeave}
            className="cursor-pointer"
            ref={(ref) => (imageRef.current = ref)}
          />
          {imageRef.current && (
            <div
              style={{
                width: "300px",
                backgroundImage: showZoom
                  ? "url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfDB8MHx8fDA%3D)"
                  : "",
                backgroundSize: `${
                  imageRef?.current?.width * params?.width
                }px ${imageRef?.current?.height * params?.height}px`,
                backgroundPosition: `-${params?.x * params?.width}px -${
                  params?.y * params?.height
                }px`,
                backgroundRepeat: "no-repeat",
              }}
              ref={(ref) => (zoom.current = ref)}
            ></div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageZoom;
