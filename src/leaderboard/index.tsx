import HomeLink from "../home-link";

const IMAGE_API = `https://api.dicebear.com/9.x/lorelei/svg?seed=`;

type Ranking = {
  name: string;
  points: number;
};
const rankings: Ranking[] = [
  { name: "John Doe", points: 1000 },
  { name: "Jane Smith", points: 950 },
  { name: "Alice Johnson", points: 900 },
  { name: "Bob Williams", points: 850 },
  { name: "Emily Davis", points: 800 },
  { name: "Michael Brown", points: 750 },
  { name: "Olivia Jones", points: 700 },
  { name: "Noah Wilson", points: 650 },
  { name: "Ava Miller", points: 600 },
  { name: "William Davis", points: 550 },
  { name: "Sophia Carter", points: 500 },
  { name: "Ethan Taylor", points: 450 },
  { name: "Emma Thomas", points: 400 },
  { name: "Jacob Martin", points: 350 },
  { name: "Isabella Clark", points: 300 },
  { name: "Logan Turner", points: 250 },
  { name: "Charlotte Lee", points: 200 },
  { name: "Benjamin Hall", points: 150 },
  { name: "Amelia Walker", points: 100 },
  { name: "David Hill", points: 50 },
];

const Leaderboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">Leaderboard</h1>
      </header>
      <main className="flex flex-col min-h-screen relative p-2">
        <div
          className="flex gap-4 justify-between"
          style={{ minHeight: "250px" }}
        >
          <div className="flex flex-col w-1/3 items-center bg-green-200 shadow-xl rounded-t-xl border-2 mt-8">
            <img
              src={`${IMAGE_API}1`}
              height="100"
              width="100"
              className="shadow-xl shadow-green-400 rounded-full"
            ></img>
            <p className="bg-green-400 text-white text-center text-lg font-bold pt-1 mt-1 border-2 border-green-500 rounded-full w-10 h-10">
              2
            </p>
            <p className="text-xl font-bold mt-4">{rankings[1].name}</p>
            <p className="text-gray-400">{rankings[1].points} Points</p>
          </div>
          <div className="flex flex-col w-1/2 items-center bg-yellow-200 shadow-xl rounded-t-xl border-2 mt-4">
            <img
              src={`${IMAGE_API}0`}
              height="120"
              width="120"
              className="shadow-xl shadow-yellow-400 rounded-full"
            ></img>
            <p className="bg-yellow-400 text-white text-center text-lg font-bold pt-1 mt-1 border-2 border-yellow-500 rounded-full w-10 h-10">
              1
            </p>
            <p className="text-xl font-bold mt-4">{rankings[0].name}</p>
            <p className="text-gray-400 ">{rankings[0].points} Points</p>
          </div>
          <div className="flex flex-col w-1/3 items-center bg-purple-200 shadow-xl rounded-t-xl border-2 mt-12">
            <img
              src={`${IMAGE_API}2`}
              height="90"
              width="90"
              className="shadow-xl shadow-purple-400 rounded-full"
            ></img>
            <p className="bg-purple-400 text-white text-center text-lg font-bold pt-1 mt-1 border-2 border-purple-500 rounded-full w-10 h-10">
              3
            </p>
            <p className="text-lg font-bold mt-4">{rankings[2].name}</p>
            <p className="text-gray-400">{rankings[2].points} Points</p>
          </div>
        </div>
        <div className="flex flex-col bg-gray-100 shadow">
          {rankings.slice(3, rankings.length).map((ranking, i) => {
            return (
              <div
                key={`ranking-${i + 4}`}
                className="flex p-6 border-b-2 border-gray-200  items-center"
              >
                <p className="font-bold text-2xl text-gray-400">{i + 4}</p>
                <img
                  src={`${IMAGE_API}${i + 4}`}
                  height="80"
                  width="80"
                  className="shadow rounded-full ml-8"
                ></img>
                <div className="flex flex-col ml-10">
                  <p className="text-3xl font-bold">{ranking.name}</p>
                  <p className="text-gray-400 text-sm">
                    {ranking.points} Points
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
