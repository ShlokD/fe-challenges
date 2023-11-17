import { useState } from "react";

import HomeLink from "../home-link";

type Comment = {
  id: number;
  content: string;
  avatar: string;
  score: number;
  username: string;
  replies?: Comment[];
};
const comments: Comment[] = [
  {
    id: 1,
    content:
      "As I gaze upon the vast expanse of the cosmos, I am filled with a sense of awe and wonder. The countless stars and galaxies swirling within the depths of space, each with its own unique history and story to tell, remind me of the infinite possibilities that lie beyond our comprehension. I feel an insatiable curiosity to explore the mysteries of the universe, to journey to distant worlds and unravel their secrets. I long to be a part of this grand cosmic ballet, to dance among the stars and leave my mark upon the universe.",
    avatar: "/comments/avatar1.png",
    username: "CosmicWanderer",
    score: 5,
    replies: [
      {
        id: 2,
        content: "This is a reply to the top-level comment.",
        avatar: "/comments/avatar2.png",
        username: "Adventurer",
        score: 2,
        replies: [
          {
            id: 3,
            content: "This is a nested reply to the top-level comment.",
            avatar: "/comments/avatar3.png",
            username: "BookishDreamer",
            score: 0,
          },
        ],
      },
      {
        id: 4,
        content:
          "The cosmos has always held a special allure for me, but it's the technology we've developed that has truly opened up the universe to our exploration. With powerful telescopes and sophisticated probes, we've pushed the boundaries of our knowledge, peering into the depths of space and unveiling the secrets of distant galaxies. Through technological innovation, we've transformed our dreams of cosmic exploration into tangible realities, and I'm eager to see what the future holds for our understanding of the universe.",
        avatar: "/comments/avatar4.png",
        username: "TechWizExtraordinaire",
        score: 9,
      },
    ],
  },
  {
    id: 5,
    content:
      "The cosmos beckons me with its promise of adventure and discovery. I yearn to traverse the vast expanse of space, to set foot on uncharted worlds and unravel their mysteries. I long to encounter alien civilizations, to learn from their wisdom and share our own knowledge. Through exploration and discovery, I hope to bridge the gap between our world and the cosmos, expanding our understanding of the universe and our place within it.",
    avatar: "/comments/avatar3.png",
    username: "BookishDreamer",
    score: 8,
    replies: [],
  },
];

const CommentCard = ({ comment }: { comment: Comment }) => {
  const [score, setScore] = useState(comment.score);

  return (
    <div className="bg-gray-100 p-6 my-2 rounded-lg flex gap-4 border-l-4 border-red-600 ">
      <img
        src={comment.avatar}
        style={{
          height: "64px",
          width: "64px",
        }}
      />
      <div className="flex flex-col">
        <p className="font-bold text-lg">{comment.username}</p>
        <p className="text-sm">{comment.content}</p>
        <div className="flex items-center">
          <button aria-label="Downvote" onClick={() => setScore(score - 1)}>
            <img src="/comments/Down.svg"></img>
          </button>
          <p className="p-2 font-bold">{score}</p>
          <button aria-label="Upvote" onClick={() => setScore(score + 1)}>
            <img src="/comments/Up.svg"></img>
          </button>

          <button className="p-2 font-bold text-sm">Reply</button>
          <button className="p-2 font-bold text-sm">Report</button>
        </div>
        <hr className="border-2" />
        {comment.replies?.map((reply) => {
          return <CommentCard comment={reply} key={reply.id} />;
        })}
      </div>
    </div>
  );
};

const CommentsBox = () => {
  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-red-600">
        <HomeLink />
        <h1 className="font-bold text-2xl">Comments Box</h1>
      </header>
      <main className="flex flex-col w-full p-4">
        <div className="flex flex-col gap-4 lg:w-2/3 self-center">
          {comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.id} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default CommentsBox;
