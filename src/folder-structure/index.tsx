// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createContext, useContext, useState } from "react";

import HomeLink from "../home-link";

const INIT_FOLDERS = {
  a: {
    folders: ["aa"],
    files: ["a.js", "a.css", "a.html"],
    isBase: true,
  },
  aa: {
    folders: ["aaa"],
    files: ["aa.js", "aa.css"],
  },
  b: {
    folders: ["bb"],
    files: [],
    isBase: true,
  },
  c: {
    folders: [],
    files: ["c.html"],
    isBase: true,
  },
  aaa: {
    folders: [],
    files: ["aaa.js"],
  },
  bb: {
    folders: [],
    files: ["bb.css"],
  },
};

const createFolderState = (folders) => {
  const sFolders = { ...folders };
  for (const k in sFolders) {
    sFolders[k] = { ...sFolders[k], title: k };
  }
  return sFolders;
};

const FolderContext = createContext({
  folders: [],
  setFolders: () => null,
});

const useFolderContext = () => useContext(FolderContext);

const Folder = ({
  title,
  files,
  isBase,
  parent = "",
  handleDragEndForParent,
}) => {
  const { folders, setFolders } = useFolderContext();

  const getSubfolders = () => {
    const names = folders[title].folders;
    return names.map((name) => folders[name]);
  };

  const [isOpen, setIsOpen] = useState(false);
  const sub = getSubfolders();
  const [subFolders, setSubFolders] = useState(sub);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleDrop = (ev, dest) => {
    ev.preventDefault();
    ev.dataTransfer.effectAllowed = "move";
    const data = ev.dataTransfer.getData("text/plain");
    const { source, name, type } = JSON.parse(data);
    setFolders((prev) => {
      const newFolders = { ...prev };

      if (type === "file") {
        newFolders[source].files = newFolders[source].files.filter(
          (f) => f !== name,
        );
        newFolders[dest].files = [...newFolders[dest].files, name];
      }
      if (type === "folder") {
        newFolders[source].folders = newFolders[source].folders.filter(
          (f) => f !== name,
        );
        newFolders[dest].folders = [...newFolders[dest].folders, name];
      }
      return newFolders;
    });
    setSubFolders(getSubfolders());
  };

  const handleDragStart = (ev, payload) => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text/plain", JSON.stringify(payload));
  };

  const handleDragEnd = (ev) => {
    ev.preventDefault();
    setSubFolders(getSubfolders());
  };

  return (
    <div className="flex flex-col gap-2 items-start ml-4">
      <button
        className="text-xl py-6 flex"
        onClick={toggleOpen}
        draggable={!isBase}
        onDrop={(ev) => handleDrop(ev, title)}
        onDragOver={(ev) => ev.preventDefault()}
        onDragStart={(ev) =>
          handleDragStart(ev, { source: parent, name: title, type: "folder" })
        }
        onDragEnd={(ev) => handleDragEndForParent(ev)}
      >
        📁 {title}
      </button>
      {isOpen && (
        <div className="flex flex-col">
          {subFolders.map((folder, i) => {
            return (
              <Folder
                key={`${title}-folder-${i}`}
                {...folder}
                parent={title}
                handleDragEndForParent={handleDragEnd}
              />
            );
          })}
          {files.map((file, i) => {
            return (
              <button
                key={`${title}-${file}-${i}`}
                className="text-xl flex py-6"
                draggable
                onDragStart={(ev) =>
                  handleDragStart(ev, {
                    source: title,
                    name: file,
                    type: "file",
                  })
                }
              >
                📃 {file}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
const FolderStructure = () => {
  const [folders, setFolders] = useState(createFolderState(INIT_FOLDERS));

  return (
    <FolderContext.Provider value={{ folders, setFolders }}>
      <div className="flex flex-col w-screen h-full">
        <header className="bg-red-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
          <HomeLink />
          <h1 className="text-2xl font-bold">Folder Structure</h1>
        </header>

        <main className="flex flex-col w-full min-h-screen py-8 px-4">
          {Object.values(folders)
            .filter((f) => f.isBase)
            .map((folder, i) => {
              return <Folder key={`base-folder-${i}`} {...folder} />;
            })}
        </main>
      </div>
    </FolderContext.Provider>
  );
};

export default FolderStructure;
