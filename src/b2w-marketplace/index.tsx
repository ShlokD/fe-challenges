import { FC, useEffect, useState } from "react";

import HomeLink from "../home-link";
import { User } from "./types";

type UserCardProps = User & {
  isFollowing: boolean;
  handleFollowClick: ({
    seed,
    follow,
  }: {
    seed: string;
    follow: boolean;
  }) => void;
  handleNextClick: () => void;
};

type FollowingProps = {
  following: User[];
  handleFollowClick: ({
    seed,
    follow,
  }: {
    seed: string;
    follow: boolean;
  }) => void;
};

const initUsers = () => {
  const user = {
    first: "Tiago",
    last: "Aubert",
    city: "Vielleurbanne",
    country: "France",
    email: "tiago.aubert@example.com",
    phone: "03-33-47-80-50",
    dob: "1995-08-12T04:19:04.259Z",
    age: 27,
    picture: "https://randomuser.me/api/portraits/med/men/75.jpg",
    seed: "abc",
    isSelf: true,
    following: [],
  };
  return { [user.seed]: user };
};

const getSuggestions = async () => {
  try {
    const res = await fetch("https://randomuser.me/api?results=5");
    const json = await res.json();
    return json.results.map((r: Record<string, any>) =>
      transformUser(r, Math.random().toString(36).slice(16)),
    );
  } catch (e) {
    return [];
  }
};

const transformUser = (rawUser: Record<string, any>, seed: string) => {
  return {
    first: rawUser?.name?.first || "",
    last: rawUser?.name?.last || "",
    city: rawUser?.location?.city || "",
    country: rawUser?.location?.country || "",
    email: rawUser?.email,
    phone: rawUser?.phone,
    dob: rawUser?.dob?.date,
    age: rawUser?.dob?.age,
    picture: rawUser?.picture?.medium || "",
    seed,
    isSelf: false,
    following: [],
  };
};

const Following: FC<FollowingProps> = (props) => {
  const { following, handleFollowClick } = props;
  const [showList, setShowList] = useState(false);
  const toggleList = () => setShowList((prev) => !prev);
  useEffect(() => {
    if (following.length === 0) {
      setShowList(false);
    }
  }, [following.length]);
  return (
    <div className="flex flex-row relative justify-center items-center text-white text-2xl p-2">
      Following {following.length}
      {following.length > 0 && (
        <button className="mx-2 text-4xl leading-snug" onClick={toggleList}>
          &darr;
        </button>
      )}
      <div
        className={`${
          showList
            ? "h-auto w-full flex flex-col bg-purple-300 top-2 absolute shadow-lg rounded-sm"
            : "hidden"
        }`}
      >
        <button
          className="text-4xl p-2 self-end text-black"
          onClick={toggleList}
        >
          x
        </button>
        <hr className="border-2 border-black" />
        {following.map((f, i) => {
          return (
            <div key={`user-${i}`}>
              <div className="flex flex-row items-center p-2">
                <div className="w-1/3">
                  <img
                    className="rounded-full"
                    src={f.picture}
                    height={48}
                    width={48}
                  />
                </div>
                <div className="w-2/3 text-center">
                  <p className="text-sm text-black font-bold">
                    {f.first} {f.last}
                  </p>
                  <button
                    className="text-sm p-2 bg-yellow-400 my-2 font-bold text-black"
                    onClick={() =>
                      handleFollowClick({ seed: f.seed, follow: false })
                    }
                  >
                    Unfollow
                  </button>
                </div>
              </div>
              <hr className="border-2 border-black w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UserCard: FC<UserCardProps> = (props) => {
  const {
    picture,
    first,
    last,
    city,
    country,
    isSelf,
    isFollowing,
    dob,
    age,
    email,
    phone,
    seed,
    handleFollowClick,
    handleNextClick,
  } = props;
  const [following, setFollowing] = useState<boolean>(Boolean(isFollowing));

  const toggleFollow = () => {
    setFollowing((prev) => !prev);
    handleFollowClick({ seed, follow: !following });
  };

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  return (
    <div className="flex flex-col w-full h-full p-2 gap-1">
      <div className="border-2 border-black flex flex-col w-full h-full items-center justify-center">
        <div className="h-1/2 p-2 bg-purple-300 w-full flex items-center justify-center m-auto">
          <img
            src={picture}
            height={128}
            width={128}
            className="rounded-full border-4"
          />
        </div>
        <div className="h-1/2 my-2 text-center">
          <p className="text-4xl font-bold p-1">
            {first} {last}
          </p>
          <p className="text-xl font-bold p-1">
            {city}, {country}
          </p>
          {!isSelf && (
            <button
              className={`${
                following ? "bg-yellow-400" : "bg-purple-800"
              } text-white p-4 font-bold mx-2`}
              onClick={toggleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </button>
          )}
          <button
            className="bg-gray-800 p-4 font-bold text-white"
            onClick={handleNextClick}
          >
            Try the next one
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 lg:flex-row items-center">
        <div className="w-full lg:w-1/2 lg:my-2 border-2 border-black text-center">
          <p className="p-1 font-bold text-xl">
            {new Date(dob).toLocaleDateString()}
          </p>
          <p className="p-1 font-bold text-xl">Age: {age}</p>
        </div>
        <div className="w-full lg:w-1/2 border-2 border-black text-center my-2">
          <p className="p-1 font-bold text-xl">{email}</p>
          <p className="p-1 font-bold text-xl">{phone}</p>
        </div>
      </div>
    </div>
  );
};

type SuggestionsProps = {
  suggestions: User[];
};

const Suggestions: FC<SuggestionsProps> = (props) => {
  const { suggestions } = props;
  if (!suggestions) return null;
  return (
    <>
      <h2 className="p-2 font-bold text-xl">Suggestions</h2>

      <div className="flex flex-row flex-wrap gap-2 m-2">
        {suggestions?.map((suggestion, i: number) => {
          return (
            <div
              key={`suggestion-${i}`}
              className="w-1/6 p-2 flex flex-col items-center border-2"
            >
              <img
                className="rounded-full"
                src={suggestion.picture}
                width={48}
                height={48}
              ></img>
              <p className="font-bold text-sm text-center">
                {suggestion.first} {suggestion.last}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
const UserProfile = () => {
  const [users, setUsers] = useState<Record<string, User>>(initUsers());
  const [selectedSeed, setSelectedSeed] = useState("abc");
  const [suggestions, setSuggestions] = useState([]);
  const user = users[selectedSeed];
  const self = users["abc"];
  const following = self.following.map((f: string) => users[f]);
  const isFollowing = !user.isSelf && self.following.includes(user.seed);

  const handleFollowClick = ({
    seed,
    follow,
  }: {
    seed: string;
    follow: boolean;
  }) => {
    const self = users["abc"];
    if (follow) {
      self.following.push(seed);
    } else {
      self.following = self.following.filter((s: string) => s !== seed);
    }
    setUsers({
      ...users,
      [self.seed]: self,
    });
  };

  const handleNextClick = async () => {
    try {
      const res = await fetch("https://randomuser.me/api");
      const json = await res.json();
      const newUser = transformUser(json.results[0], json?.info?.seed);
      setUsers({
        ...users,
        [newUser.seed]: newUser,
      });
      setSelectedSeed(newUser.seed);
      const newSuggestions = await getSuggestions();
      setSuggestions(newSuggestions);
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="flex flex-col">
      <header className="bg-purple-800 p-2 flex items-center justify-between">
        <HomeLink />
        <Following
          following={following}
          handleFollowClick={handleFollowClick}
        />
      </header>
      <UserCard
        {...user}
        isFollowing={isFollowing}
        handleFollowClick={handleFollowClick}
        handleNextClick={handleNextClick}
      />
      {!user.isSelf && <Suggestions suggestions={suggestions} />}
    </div>
  );
};

export default UserProfile;
