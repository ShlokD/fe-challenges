import { FormEvent, useEffect, useState } from "react";

import HomeLink from "../home-link";

type Status = "DONE" | "OPEN";

type ListItem = {
  url: string;
  title: string;
  status: Status;
};

const getTitleFromURL = (pathname: string) => {
  const title = pathname?.split("/").find((elem) => elem.length > 0);
  if (title) {
    return title.split("-").join(" ");
  }
  return null;
};

const Wishlist = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [url, setUrl] = useState("");

  const saveToLocalStorage = () => {
    window.localStorage.setItem("wishlist-db", JSON.stringify(list));
  };

  const readFromLocalStorage = () => {
    const rawList = window.localStorage.getItem("wishlist-db");
    if (rawList) {
      try {
        setList(JSON.parse(rawList));
      } catch (e) {
        return;
      }
    }
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    let urlObj = {} as URL;
    try {
      urlObj = new URL(url);
    } catch (e) {
      setUrl("");
      return;
    }

    if (urlObj) {
      const title = getTitleFromURL(urlObj?.pathname) || urlObj?.hostname;

      setList((prev) => {
        return [...prev, { url, title, status: "OPEN" }];
      });
    }
    setUrl("");
  };

  const markDone = (index: number) => {
    setList((prev) => {
      const newList = prev.slice();
      newList[index] = { ...newList[index], status: "DONE" };
      return newList;
    });
  };

  const deleteItem = (index: number) => {
    setList((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [list]);

  useEffect(() => {
    readFromLocalStorage();
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <header className="bg-orange-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> WishIt! &#10024; </h1>
      </header>
      <main className="lg:w-2/3 flex flex-col items-center justify-center self-center">
        <form
          className="flex flex-row p-4 gap-2 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col p-2">
            <label className="font-bold" htmlFor="url-input">
              Product Url
            </label>
            <input
              type="url"
              className="border-2 border-black p-2 text-lg"
              id="url-input"
              required
              autoComplete="off"
              value={url}
              onChange={(ev) => setUrl((ev?.target as HTMLInputElement)?.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 mt-6 text-white text-lg rounded-lg font-bold bg-orange-800"
          >
            Add
          </button>
        </form>

        <h2 className="font-bold text-2xl">Items on your list</h2>

        <div className="flex flex-col border-2 items-center p-2 m-2 w-4/5 gap-4">
          {list.length === 0 && (
            <p className="w-1/2 text-center">
              Your wishlist is empty. Add some urls to get started
            </p>
          )}
          {list.length > 0 &&
            list.map((listItem, i) => {
              return (
                <div
                  key={`wishlist-${i}`}
                  className="flex flex-row gap-2 items-center"
                >
                  <a
                    className={`${
                      listItem.status === "OPEN"
                        ? "text-black"
                        : "line-through text-gray-200"
                    } font-bold w-full text-center`}
                    href={listItem.url}
                    target="_blank"
                    rel="noreferrer noorigin"
                  >
                    {listItem.title}
                  </a>
                  <button
                    className="border-2 p-2 border-transparent bg-red-700 text-white"
                    aria-label={`delete product ${i}`}
                    onClick={() => deleteItem(i)}
                  >
                    X
                  </button>
                  <button
                    className="border-2 p-2 border-transparent bg-green-700 text-white"
                    aria-label={`mark as done product ${i}`}
                    onClick={() => markDone(i)}
                  >
                    &#x2713;
                  </button>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
