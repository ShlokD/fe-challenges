import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { SpinnerRomb } from "spinners-react";

import HomeLink from "../home-link";

const ERROR_MSG: Record<string, string> = {
  INVALID_FILE:
    "Invalid file extension. Please use .png, .jpg, .jpeg or .gif only",
  LARGE_FILE: "File Size Too Large",
};

const TWO_MB = 2e6;
const ImageUpload = () => {
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const reader = useRef<FileReader>(new FileReader());
  const [loading, setLoading] = useState(false);

  const loadImageFile = (file?: File) => {
    if (!file) {
      return;
    }
    if (file.size > TWO_MB) {
      setError("LARGE_FILE");
      setImage(null);
      return;
    }
    setLoading(true);
    reader.current.readAsDataURL(file);
  };

  const startFileUpload = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!reader) {
      return;
    }
    const uploadInput = ev.target;
    const file = uploadInput?.files?.[0];
    loadImageFile(file);
  };

  const loadImage = (e: ProgressEvent) => {
    if (!(e?.target as FileReader)?.result) {
      return;
    }
    const result = (e.target as FileReader).result?.toString();
    if (!result) {
      return;
    }
    setImage(result);
    setLoading(false);
    setError("");
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = e.dataTransfer;
    const file = data?.files?.[0];
    loadImageFile(file);
  };

  useEffect(() => {
    if (reader.current) {
      reader.current.addEventListener("load", loadImage);
    }
  }, [reader.current]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-blue-500 text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Image Upload</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center gap-2">
        <div
          className="w-2/3 my-4 bg-blue-100 flex flex-col items-center justify-center shadow rounded-2xl"
          style={{
            height: "40vh",
          }}
          draggable
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            accept="image/png,image/gif,image/jpeg,image/jpg"
            className="hidden"
            onChange={startFileUpload}
          />
          <p className="text-xl">
            Drag a file to upload or &nbsp;
            <label
              htmlFor="file-upload"
              className="text-blue-500 font-bold hover:underline"
            >
              browse files
            </label>
          </p>

          <p className="text-lg">JPG,PNG or GIF. Max size 2MB</p>
        </div>

        {image !== null && (
          <div className="flex flex-col self-center items-center gap-2 my-4">
            <a
              href={image}
              download="image"
              className="bg-blue-500 self-center p-4 rounded-xl text-white font-bold text-xl no-underline"
            >
              Download
            </a>
            <img src={image} height="50%" width="50%" alt="uploaded" />
          </div>
        )}
        {error && (
          <p className="text-red-400 text-4xl font-bold">
            {ERROR_MSG[error] || ""}
          </p>
        )}

        {loading && <SpinnerRomb size={200} />}
      </main>
    </div>
  );
};

export default ImageUpload;
