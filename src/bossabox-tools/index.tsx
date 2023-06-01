import { FC, useRef, useState } from "react";

import HomeLink from "../home-link";
import { tools as dbTools } from "./db.json";
import { Tool } from "./types";

type Payload = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

type ToolFormProps = {
  showForm: boolean;
  onFormSubmit: (payload: Payload) => void;
};
const ToolForm: FC<ToolFormProps> = (props) => {
  const { showForm, onFormSubmit } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [validation, setValidation] = useState({
    title: true,
    tags: true,
  });
  const titleRef = useRef(null);
  const tagsRef = useRef(null);

  const handleAdd = () => {
    if (title.length === 0) {
      setValidation({
        ...validation,
        title: false,
      });
      (titleRef?.current as unknown as HTMLInputElement)?.reportValidity();
      return;
    }

    if (tags.length === 0) {
      setValidation({
        title: true,
        tags: false,
      });
      (tagsRef?.current as unknown as HTMLInputElement)?.reportValidity();
      return;
    }

    setTitle("");
    setDescription("");
    setTags("");
    setLink("");
    setValidation({
      title: true,
      tags: true,
    });

    onFormSubmit({
      title,
      description,
      tags: tags.split(" "),
      link,
    });
  };

  return (
    <div
      className={`bg-green-200 flex flex-col justify-center py-2 w-full h-full text-black ${
        showForm ? "" : "hidden"
      }`}
    >
      <input
        placeholder="Title"
        aria-label="Tool Title"
        className={`${
          validation.title ? "border-black" : "border-red-500"
        } border-2 m-2 p-1 text-lg rounded-sm`}
        value={title}
        required
        ref={titleRef}
        onChange={(ev) => setTitle((ev?.target as HTMLInputElement)?.value)}
      />
      <input
        placeholder="Tool Link"
        aria-label="Tool Link"
        className={`border-black border-2 m-2 p-1 text-lg rounded-sm`}
        value={link}
        onChange={(ev) => setLink((ev?.target as HTMLInputElement)?.value)}
      />

      <textarea
        cols={28}
        rows={6}
        placeholder="Description"
        aria-label="Tool Description"
        className="border-2 border-black m-2 p-1 rounded-sm text-lg"
        value={description}
        onChange={(ev) =>
          setDescription((ev?.target as HTMLTextAreaElement)?.value)
        }
      />
      <input
        placeholder="Enter tags separated by space"
        aria-label="Tool Tags"
        className={`${
          validation.tags ? "border-black" : "border-red-500"
        } border-2 m-2 p-1 text-lg rounded-sm`}
        value={tags}
        required
        ref={tagsRef}
        onChange={(ev) => setTags((ev?.target as HTMLInputElement)?.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-green-900 w-1/2 text-lg self-center p-2 rounded-sm text-white"
      >
        Add Tool
      </button>
    </div>
  );
};

const Tools = () => {
  const [tagsSearch, setTagsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [tools, setTools] = useState<Tool[]>(dbTools);

  const onFormSubmit = (payload: Payload) => {
    const newTool = { ...payload, id: tools.length };
    setTools((prev) => [...prev, newTool]);
    setShowForm(false);
  };

  let displayTools = tools;

  if (search.length > 0) {
    if (tagsSearch) {
      displayTools = tools.filter((tool) =>
        tool.tags.includes(search.toLowerCase()),
      );
    } else {
      displayTools = tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(search) ||
          tool.description.toLowerCase().includes(search),
      );
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <header className="flex flex-col p-2 w-full h-full bg-green-700 text-white">
        <HomeLink />
        <h1 className="text-4xl py-2 font-bold">VUTTR</h1>
        <p className="text-xl py-2">Very useful tools to remember</p>
        <div className="flex flex-row justify-center items-center">
          <input
            placeholder="Search..."
            className="px-2 py-2 my-2 text-black"
            aria-label="Search for tools"
            value={search}
            onChange={(ev) =>
              setSearch((ev?.target as HTMLInputElement)?.value.toLowerCase())
            }
          />
          <input
            className="ml-2"
            type="checkbox"
            id="tags-search"
            defaultChecked={tagsSearch}
            onClick={() => setTagsSearch(!tagsSearch)}
          />
          <label htmlFor="tags-search" className="p-2 text-sm">
            Search tags only
          </label>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="self-center my-2 p-4 bg-green-900 rounded-lg text-xl"
        >
          {showForm ? "Close" : "Add"}
        </button>
        <ToolForm showForm={showForm} onFormSubmit={onFormSubmit} />
      </header>
      <main className="flex flex-col w-full my-4 mx-2">
        {displayTools.map((tool, i: number) => {
          return (
            <div key={`tool-${i}`} className="flex flex-col border-2 p-2">
              <a
                href={
                  tool.link?.length && tool?.link?.length > 0 ? tool.link : "#"
                }
                target="_blank"
                rel="noreferer noopener"
              >
                <p className="font-bold text-2xl p-2">{tool.title}</p>
                <p className="text-lg p-2">{tool.description}</p>
                <div className="flex flex-row flex-wrap">
                  {tool.tags.map((tag, index: number) => (
                    <p
                      key={`tag-${index}`}
                      className="m-1 bg-green-300 text-black px-2 py-1 rounded-lg"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </a>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Tools;
