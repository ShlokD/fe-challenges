import { SyntheticEvent, useState } from "react";

import HomeLink from "../home-link";

type Item = {
  title: string;
  description: string;
  done: boolean;
};
type List = {
  name: string;
  items: Item[];
};

type CheckListItemProps = Item & {
  handleCheck: () => void;
  id: string;
};

const ChecklistItem = (props: CheckListItemProps) => {
  const { done, title, description, id, handleCheck } = props;
  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => setShowDescription((prev) => !prev);
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <div
        className={`flex ${
          done ? "bg-gray-200" : "bg-black"
        } text-white rounded-full px-2 py-4 gap-2 items-center`}
      >
        <input
          type="checkbox"
          className={`w-6 h-6 rounded-full appearance-none ${
            done ? "bg-green-400" : "bg-white"
          }`}
          id={id}
          checked={done}
          onChange={handleCheck}
        ></input>
        <label
          className={`w-10/12 text-white text-xl font-bold ${
            done ? "line-through" : ""
          }`}
          htmlFor={id}
        >
          {title}
        </label>
        <button
          className="text-white font-bold text-xl"
          onClick={toggleDescription}
          aria-label={`Show Description for ${title}`}
          dangerouslySetInnerHTML={{
            __html: showDescription ? "&uArr;" : "&dArr;",
          }}
        ></button>
      </div>
      <div
        className={`px-2 transition-transform transition-ease-in-out ${
          showDescription ? "visible" : "invisible"
        }`}
        style={{
          transform: `scaleY(${showDescription ? "1" : "0"})`,
          transformOrigin: "top center",
          maxHeight: showDescription ? "120px" : "0px",
        }}
      >
        {description}
      </div>
    </div>
  );
};

interface AddFormData {
  title: { value: string };
  description: { value: string };
}
const Checklist = () => {
  const [lists, setLists] = useState<List[]>([
    {
      name: "Books",
      items: [
        {
          title: "The Robot Who Dreamed of Being Human",
          done: false,
          description:
            "A heartwarming tale about a robot who longs to experience the world like a human and embarks on a quest to understand emotions and relationships.",
        },
        {
          title: "The Lost City of Atlantis",
          done: false,
          description:
            "A thrilling underwater adventure to uncover the secrets of a legendary lost civilization.",
        },
        {
          title: "Adventures in the Land of Talking Animals",
          done: false,
          description:
            "A whimsical journey through a fantastical world where animals can speak and humans are the exotic creatures.",
        },
        {
          title: "The Curious Case of the Missing Cookies",
          done: false,
          description:
            "A delightful mystery about a baker who loses his prized cookie recipe and must enlist the help of a quirky detective to find it.",
        },
        {
          title: "Cosmic Capers with Captain Comet",
          done: false,
          description:
            "A hilarious space opera about a bumbling astronaut who accidentally becomes a superhero and must save the galaxy from a mischievous alien villain.",
        },
      ],
    },
    {
      name: "TV Shows",
      items: [
        {
          title: "The Secret Recipe for Interstellar Travel",
          done: false,
          description:
            "A mind-bending journey through the cosmos as a group of scientists unlock the secrets of faster-than-light travel and embark on a daring mission to explore uncharted galaxies.",
        },
        {
          title: "The Time Traveling Tourist",
          done: false,
          description:
            "A quirky romp through history as a bumbling tourist accidentally activates a time machine and ends up on a series of hilarious misadventures in different eras.",
        },
        {
          title: "The Haunted House of 1000 Ghosts",
          done: false,
          description:
            "A spooky tale of a group of friends who dare to spend the night in a legendary haunted house and encounter a cast of mischievous spirits, spine-tingling surprises, and chilling secrets.",
        },
        {
          title: "The Mythical Creature Club",
          done: false,
          description:
            "A heartwarming adventure about a group of misfits who discover a hidden world of mythical creatures and must protect them from a ruthless organization that seeks to exploit their powers.",
        },
        {
          title: "The School for Extraordinary Minds",
          done: false,
          description:
            "A captivating story about a hidden school where students with extraordinary abilities learn to control their powers and become the heroes the world needs.",
        },
      ],
    },
  ]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [currentList, setCurrentList] = useState(0);
  const [newListName, setNewListName] = useState("");

  const handleCheck = (index: number) => {
    setLists((prev) => {
      const newLists = [...prev];
      const item = newLists[currentList].items[index];
      newLists[currentList].items[index] = {
        ...item,
        done: !item.done,
      };
      return newLists;
    });
  };

  const handleItemSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const target = ev.target as typeof ev.target & AddFormData;
    const { title, description } = target;
    if (!title.value || !description.value) {
      return;
    }
    const vTitle = title.value;
    const vDescription = description.value;
    target.title.value = "";
    target.description.value = "";
    setShowAddItemForm(false);
    setLists((prev) => {
      const newLists = [...prev];
      newLists[currentList].items = [
        ...newLists[currentList].items,
        {
          title: vTitle,
          description: vDescription,
          done: false,
        },
      ];
      return newLists;
    });
  };

  const toggleForm = () => setShowAddItemForm((prev) => !prev);

  const saveList = () => {
    setLists((prev) => {
      const newLists = [...prev, { name: newListName, items: [] }];
      return newLists;
    });
    setNewListName("");
  };

  const addNewList = currentList === lists.length;
  return (
    <div className="flex flex-col w-full">
      <header className="bg-red-600 text-white flex p-4 justify-center items-center gap-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Checklist</h1>
      </header>
      <main className="flex flex-col w-full p-4 min-h-screen">
        <div className="flex justify-evenly w-full">
          <button
            className="font-bold text-xl w-1/6"
            disabled={currentList === 0}
            aria-label="Previous List"
            onClick={() => setCurrentList((prev) => prev - 1)}
          >
            &larr;
          </button>
          {addNewList ? (
            <input
              className="font-bold text-4xl w-2/3 text-center"
              placeholder="New List"
              value={newListName}
              aria-label="Previous List"
              onChange={(ev) => setNewListName(ev?.target?.value)}
            ></input>
          ) : (
            <h2 className="font-bold text-4xl w-2/3 text-center">
              {lists[currentList]?.name}
            </h2>
          )}
          {addNewList ? (
            <button
              className="font-bold text-xl w-1/6"
              disabled={newListName.length === 0}
              onClick={saveList}
            >
              Save
            </button>
          ) : (
            <button
              className="font-bold text-xl w-1/6"
              disabled={currentList === lists.length}
              aria-label="Next List"
              onClick={() => setCurrentList((prev) => prev + 1)}
            >
              &rarr;
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 my-8 lg:w-1/2 self-center">
          {!addNewList &&
            lists[currentList].items.map((item, i) => {
              return (
                <ChecklistItem
                  {...item}
                  key={`item-${i}`}
                  id={`item-${i}`}
                  handleCheck={() => handleCheck(i)}
                ></ChecklistItem>
              );
            })}
          <button
            onClick={toggleForm}
            disabled={addNewList}
            className={`${
              addNewList ? "bg-gray-200" : "bg-black"
            } self-center text-white w-12 h-12 rounded-full text-4xl`}
            aria-label={showAddItemForm ? "Close Form" : "Add New Item"}
          >
            {showAddItemForm ? "X" : "+"}
          </button>
          {showAddItemForm && (
            <form
              className="border-2 rounded-xl absolute z-10 bg-white p-4 flex flex-col gap-4"
              style={{
                top: "30%",
                left: "40%",
              }}
              onSubmit={handleItemSubmit}
            >
              <input
                name="title"
                required
                placeholder="Title..."
                aria-label="Title"
                className="p-2 border-2 border-black rounded-lg"
              ></input>
              <textarea
                name="description"
                placeholder="Description..."
                aria-label="Description"
                className="p-2 border-2 border-black rounded-lg"
              ></textarea>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 border-0 rounded-xl p-2 text-white"
                >
                  Done
                </button>
                <button
                  className="w-1/2 bg-red-500 border-0 rounded-xl p-2 text-white"
                  onClick={() => setShowAddItemForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checklist;
