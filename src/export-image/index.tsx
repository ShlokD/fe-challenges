import { useRef, useState } from "react";

import HomeLink from "../home-link";

const ExportImage = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [format, setFormat] = useState("jpeg");

  const loadUrl = () => {
    try {
      const urlObj = new URL(url);
      const ctx = canvas.current?.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.canvas.style.imageRendering = "auto";
      }

      const img = new Image();
      img.setAttribute("crossorigin", "anonymous");
      img.addEventListener("load", () => {
        if (!canvas.current) {
          return;
        }
        setError(false);
        const ratio = img.naturalWidth / img.naturalHeight;
        const width = canvas.current.width;
        const height = width / ratio;

        ctx?.drawImage(img, 0, 0, width, height);
      });
      img.addEventListener("error", () => {
        setError(true);
      });
      img.src = urlObj.toString();
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const downloadImage = () => {
    if (!canvas.current) {
      return;
    }
    const link = document.createElement("a");
    link.download = `image.${format}`;
    link.href = canvas.current?.toDataURL(`image/${format}`, 1.0);
    link.click();
  };
  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-orange-600 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Export Image</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-2 gap-4 ">
        <div className="flex gap-4">
          <input
            aria-label="Enter image url"
            className={`${
              error ? "border-red-400 border-4" : "border-4"
            }  p-2 text-xl rounded-lg w-2/3`}
            value={url}
            placeholder="Enter image url"
            onChange={(ev) => setUrl((ev?.target as HTMLInputElement)?.value)}
            onPaste={(ev) => setUrl((ev?.target as HTMLInputElement)?.value)}
            aria-errormessage="Invalid image url"
          />
          <button
            className="w-1/3 rounded-lg bg-blue-400 text-white font-bold text-xl"
            onClick={loadUrl}
          >
            Load
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="w-3/4 flex gap-4 items-center">
            <div>
              <label
                className={`border-4 py-2 px-4 border-black rounded-xl cursor-pointer font-bold text-lg ${
                  format === "jpeg" ? "bg-green-400" : ""
                }`}
                htmlFor="jpeg"
              >
                JPEG
              </label>
              <input
                type="radio"
                name="formats"
                value="jpeg"
                id="jpeg"
                className="hidden"
                onChange={() => setFormat("jpeg")}
              />
            </div>
            <div>
              <label
                className={`border-4 py-2 px-4 border-black rounded-xl cursor-pointer font-bold text-lg ${
                  format === "png" ? "bg-green-400" : ""
                }`}
                htmlFor="png"
              >
                PNG
              </label>
              <input
                type="radio"
                value="png"
                name="formats"
                id="png"
                className="hidden"
                onChange={() => setFormat("png")}
              />
            </div>
            <div>
              <label
                className={`border-4 py-2 px-4 border-black rounded-xl cursor-pointer font-bold text-lg ${
                  format === "bmp" ? "bg-green-400" : ""
                }`}
                htmlFor="bmp"
              >
                BMP
              </label>
              <input
                type="radio"
                value="bmp"
                name="formats"
                id="bmp"
                className="hidden"
                onChange={() => setFormat("bmp")}
              />
            </div>
          </div>
          <button
            className="p-4 rounded-lg bg-blue-400 text-white font-bold text-xl"
            disabled={error}
            onClick={downloadImage}
          >
            Export
          </button>
        </div>
        <canvas
          ref={canvas}
          id="image"
          height={window.innerHeight - 10}
          width={window.innerWidth - 10}
          className="border-2"
        />
      </main>
    </div>
  );
};

export default ExportImage;
