import { FormEvent, useEffect, useState } from "react";

import HomeLink from "../home-link";

const BASE_URL = "https://dummyjson.com/recipes";
const SEARCH_URL = "https://dummyjson.com/recipes/search";
enum SortOptions {
  NONE = "None",
  COOKLOW = "CookLow",
  COOKHIGH = "CookHigh",
  PREPLOW = "PrepLow",
  PREPHIGH = "PrepHigh",
}

const URLStrings: Record<SortOptions, string> = {
  [SortOptions.NONE]: "",
  [SortOptions.COOKLOW]: "sortBy=cookTimeMinutes&order=asc",
  [SortOptions.COOKHIGH]: "sortBy=cookTimeMinutes&order=desc",
  [SortOptions.PREPLOW]: "sortBy=prepTimeMinutes&order=asc",
  [SortOptions.PREPHIGH]: "sortBy=prepTimeMinutes&order=desc",
};

type Recipe = {
  id: number;
  name: string;
  prep: number;
  cook: number;
  servings: number;
  image: string;
  instructions?: string[];
  ingredients?: string[];
};
const transformRecipes = (recipes: any) => {
  return recipes.map((recipe: any) => {
    return {
      id: recipe.id,
      name: recipe.name,
      prep: recipe.prepTimeMinutes,
      cook: recipe.cookTimeMinutes,
      servings: recipe.servings,
      image: recipe.image,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };
  });
};

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<SortOptions>(SortOptions.NONE);

  const loadRecipes = async (options: string = "", url: string = BASE_URL) => {
    try {
      setLoading(true);
      const res = await fetch(`${url}?${options}`);
      const json = await res.json();
      setRecipes(transformRecipes(json.recipes));
      setLoading(false);
    } catch (_) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      loadRecipes();
    }
  }, [searchTerm]);

  const showRecipe = (index: number) => {
    const selectedRecipe = recipes[index];
    setRecipe(selectedRecipe);
    setShowDetails(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeModal = () => {
    setRecipe(null);
    setShowDetails(false);
    document.body.classList.remove("overflow-hidden");
  };

  const loadNewRecipes = async (value: SortOptions) => {
    const sortString = URLStrings[value];
    setSort(value);
    const optionsString =
      searchTerm.length === 0 ? sortString : `q=${searchTerm}&${sortString}`;
    const url = searchTerm.length === 0 ? BASE_URL : SEARCH_URL;
    await loadRecipes(optionsString, url);
  };

  const searchRecipes = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!searchTerm) {
      return;
    }

    const optionsString = `q=${searchTerm}`;
    await loadRecipes(optionsString, SEARCH_URL);
    setSort(SortOptions.NONE);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Recipes List</h1>
      </header>
      <main className="flex flex-col w-full p-4 min-h-screen text-green-900 relative bg-gray-100">
        <h2 className="font-bold text-4xl">
          Explore our simple healthy recipes
        </h2>
        <p className="my-2">
          Looking for your next kitchen adventure? You've come to the right
          place. Our recipes are designed to inspire, whether you're a beginner
          cook or a seasoned pro. We'll guide you every step of the way, from
          simple weeknight dinners to show-stopping desserts. Get ready to cook
          something amazing!
        </p>
        <hr className="border-green-900 my-2"></hr>
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <div className="flex gap-4 items-center lg:w-1/3">
              <label htmlFor="sort">Sort By</label>
              <select
                id="sort"
                className="p-4 border-2 rounded-xl"
                onChange={(ev) =>
                  loadNewRecipes(ev?.target?.value as SortOptions)
                }
                value={sort}
              >
                <option value={SortOptions.NONE}>Recommended</option>
                <option value={SortOptions.COOKLOW}>
                  Cook Time: Low to High
                </option>
                <option value={SortOptions.PREPLOW}>
                  Prep Time: Low to High
                </option>
                <option value={SortOptions.COOKHIGH}>
                  Cook Time: High to Low
                </option>
                <option value={SortOptions.PREPHIGH}>
                  Prep Time: High to Low
                </option>
              </select>
            </div>
            <form
              id="search-recipe"
              className="lg:w-2/3 w-full"
              onSubmit={searchRecipes}
            >
              <input
                type="search"
                aria-label="Search by name or ingredient"
                placeholder="Search by name or ingredient..."
                className="p-4 border-2 rounded-xl text-lg w-full"
                value={searchTerm}
                autoComplete="off"
                onChange={(ev) =>
                  setSearchTerm(ev?.target?.value.toLowerCase())
                }
              ></input>
            </form>
          </div>
          <hr className="w-full border-green-900 my-4"></hr>
          {loading && <p className="text-xl font-bold">Loading...</p>}
          {!loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {recipes.map((recipe, i: number) => {
                return (
                  <div
                    key={`recipe-${i}`}
                    className="w-full rounded-xl justify-around gap-2 shadow-xl p-4 flex flex-col "
                  >
                    <p className="font-bold text-2xl">{recipe.name}</p>
                    <img src={recipe.image} alt={`${recipe.name}`} />
                    <p className="text-lg font-bold">
                      🍽 {recipe.servings} Servings
                    </p>
                    <p
                      className="text-lg font-bold"
                      style={{ marginLeft: "-4px" }}
                    >
                      🔥 Cook: {recipe.cook} Minutes
                    </p>
                    <p
                      className="text-lg font-bold"
                      style={{ marginLeft: "-2px" }}
                    >
                      🔪 Prep: {recipe.prep} Minutes
                    </p>
                    <button
                      onClick={() => showRecipe(i)}
                      className="bg-green-900 hover:bg-green-800 text-xl text-white rounded-xl font-bold p-4"
                    >
                      View Recipe
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className={`fixed left-0 bottom-0 flex flex-col items-center w-full p-4 z-10 bg-white rounded-xl transition-transform ease-in-out`}
          style={{
            height: "700px",
            transform: `translateY(${showDetails ? "0px" : "900px"})`,
          }}
        >
          <p className="text-2xl font-bold">{recipe?.name}</p>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-bold">Ingredients</p>
            <ul className="list pl-0">
              {recipe?.ingredients?.map((ingredient, i: number) => {
                return <li key={`ingredient-${i}`}>{ingredient}</li>;
              })}
            </ul>
            <p className="text-lg font-bold">Instructions</p>
            <ul className="list pl-0">
              {recipe?.instructions?.map((instruction, i: number) => {
                return <li key={`instruction-${i}`}>{instruction}</li>;
              })}
            </ul>
            <button
              onClick={closeModal}
              className="p-4 bg-green-900 text-white rounded-lg hover:bg-green-800 font-bold text-2xl w-2/3 self-center"
            >
              Close
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipesList;
