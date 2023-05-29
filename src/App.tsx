import { Link } from "react-router-dom";

function App() {
  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-bold text-center text-4xl underline">
        FE Challenges
      </h1>
      <p className="text-lg text-center p-2">
        A collection of solved front-end challenges
      </p>
      <ul className="flex flex-col items-center justify-center p-3 w-full">
        <li className="text-2xl w-10/12 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/betting`}>Addison Global - Betting Site</Link>
        </li>
        <li className="text-2xl w-10/12 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/promotions`}>Addison Global - Promotions</Link>
        </li>
        <li className="text-2xl w-10/12 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/amaro-products`}>Amaro Products</Link>
        </li>
        <li className="text-2xl w-10/12 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/brainn-lottery`}>Brainn Lottery</Link>
        </li>
        <li className="text-2xl w-10/12 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/apiki-blog`}>Apiki Blog</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
