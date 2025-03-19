import DOMPurify from "dompurify";
import { marked } from "marked";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import HomeLink from "../home-link";
import "./index.css";

const purify = DOMPurify(window);

const MarkdownEditor = () => {
  const [text, setText] = useState("");
  const html = purify.sanitize(marked.parse(text) as string);
  const isBigScreen = useMediaQuery({ minWidth: 772 });

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-green-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Masonry Layout</h1>
      </header>
      <main className="flex flex-col w-full p-2">
        <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-start lg:justify-center">
          <div
            className="flex flex-col gap-4 lg:w-1/2"
            style={{
              height: isBigScreen ? "82.2vh" : "45vh",
            }}
          >
            <label htmlFor="markdown-input" className="text-lg font-bold">
              Enter Markdown
            </label>
            <textarea
              id="markdown-input"
              cols={12}
              rows={12}
              className="bg-gray-200 rounded-lg p-2 text-lg border-2 border-black h-full"
              value={text}
              onChange={(ev) => setText(ev?.target?.value)}
            />
          </div>
          <div
            className="flex flex-col gap-4 overflow-scroll lg:w-1/2"
            style={{
              height: isBigScreen ? "90vh" : "45vh",
            }}
          >
            <p className="text-lg font-bold">Output</p>
            <div
              className="border-2 border-black h-full rounded-lg text-lg overflow-scroll p-6"
              id="markdown-output"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
            <button
              onClick={() => navigator.clipboard.writeText(html)}
              className="w-1/3 p-4 self-end bg-green-400 rounded-lg text-white font-bold text-lg"
            >
              Copy HTML
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarkdownEditor;
