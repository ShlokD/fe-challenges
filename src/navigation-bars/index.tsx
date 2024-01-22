import { useState } from "react";

import HomeLink from "../home-link";

const CommunicationBar = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => setShowPanel((prev) => !prev);

  return (
    <>
      <div
        className={`flex items-center gap-4 w-2/3 ml-auto mt-6 mb-8 pl-4 lg:pl-56 transition-opacity ease-in-out duration-500 ${
          showPanel ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button className="bg-blue-900 w-12 h-12 rounded-full shadow-2xl">
          📞
        </button>
        <button
          className="bg-blue-900 w-12 h-12 rounded-full shadow-2xl"
          style={{
            marginTop: "-40px",
          }}
        >
          ✉️
        </button>
        <button className="bg-blue-900 w-12 h-12 rounded-full shadow-2xl">
          🕑
        </button>
      </div>
      <div className="flex lg:w-2/3 lg:self-center items-center relative justify-evenly bg-white py-8 rounded-b-3xl shadow-2xl">
        <button
          className={`flex flex-col items-center font-bold text-md rounded-full w-20 h-20 flex items-center justify-center  ${
            currentItem === 0 ? "text-cyan-100 bg-blue-900" : ""
          }`}
          onClick={() => setCurrentItem(0)}
        >
          <p className="text-3xl">🛖</p> Home
        </button>
        <div
          className="w-24 h-24 rounded-full bg-yellow-200 absolute flex items-center justify-center"
          style={{
            top: "-25%",
          }}
        >
          <button
            className={`w-16 h-16 rounded-full text-xl font-bold  ${
              showPanel ? "bg-white text-black" : "bg-blue-900 text-cyan-100"
            }`}
            onClick={togglePanel}
          >
            {showPanel ? "X" : "+"}
          </button>
        </div>
        <button
          className={`flex flex-col items-center font-bold text-md flex items-center justify-center rounded-full w-20 h-20 ${
            currentItem === 1 ? "text-cyan-100 bg-blue-900" : ""
          }`}
          onClick={() => setCurrentItem(1)}
        >
          <p className="text-3xl">👤</p> Profile
        </button>
      </div>
    </>
  );
};

const FinTech = () => {
  const [currentItem, setCurrentItem] = useState(0);
  return (
    <div className="flex lg:w-2/3 lg:self-center items-baseline relative justify-around bg-white mt-4 py-8 rounded-b-3xl ">
      <button
        className={`flex flex-col items-center font-bold text-xl  ${
          currentItem === 0 ? "text-purple-600" : ""
        }`}
        onClick={() => setCurrentItem(0)}
      >
        <p className="text-3xl">🛖</p> Dashboard
        {currentItem === 0 && (
          <p className="bg-purple-600 h-2 w-2 rounded-full"></p>
        )}
      </button>
      <button
        className={`flex flex-col items-center font-bold text-xl  ${
          currentItem === 1 ? "text-purple-600" : ""
        }`}
        onClick={() => setCurrentItem(1)}
      >
        <p className="text-3xl">💳</p> Gift-Cards
        {currentItem === 1 && (
          <p className="bg-purple-600 h-2 w-2 rounded-full"></p>
        )}
      </button>

      <button
        className={`flex flex-col items-center font-bold text-xl ${
          currentItem === 2 ? "text-purple-600" : ""
        }`}
        onClick={() => setCurrentItem(2)}
      >
        <p className="text-3xl">📜</p>Transactions
        {currentItem === 2 && (
          <p className="bg-purple-600 h-2 w-2 rounded-full"></p>
        )}
      </button>
      <button
        className={`flex flex-col items-center font-bold text-xl  ${
          currentItem === 3 ? "text-purple-600" : ""
        }`}
        onClick={() => setCurrentItem(3)}
      >
        <p className="text-3xl">⚙️</p> Settings
        {currentItem === 3 && (
          <p className="bg-purple-600 h-2 w-2 rounded-full"></p>
        )}
      </button>
    </div>
  );
};

const MedTech = () => {
  const [currentItem, setCurrentItem] = useState(0);
  return (
    <div className="lg:w-2/3 lg:self-center flex items-center relative justify-around bg-white mt-4 py-8 rounded-b-3xl ">
      <button
        className={`flex flex-col items-center font-bold text-xl  ${
          currentItem === 0 ? "text-green-600" : ""
        }`}
        onClick={() => setCurrentItem(0)}
      >
        <p className="text-3xl">🛖</p> Home
      </button>
      <button
        className={`flex flex-col items-center font-bold text-xl  ${
          currentItem === 1 ? "text-green-600" : ""
        }`}
        onClick={() => setCurrentItem(1)}
      >
        <p className="text-3xl">🔍</p> Search
      </button>

      <div
        className="w-20 h-20 bg-white absolute rounded-full flex items-center justify-center"
        style={{
          top: "-10%",
        }}
      >
        <button className="w-16 h-16 bg-green-600 rounded-full text-2xl">
          📷
        </button>
      </div>

      <button
        className={`flex flex-col items-center font-bold text-xl ${
          currentItem === 2 ? "text-green-600" : ""
        }`}
        onClick={() => setCurrentItem(2)}
      >
        <p className="text-3xl">👤</p>Profile
      </button>
      <button
        className={`flex flex-col items-center font-bold text-xl  ${
          currentItem === 3 ? "text-green-600" : ""
        }`}
        onClick={() => setCurrentItem(3)}
      >
        <p className="text-3xl">🕑</p> History
      </button>
    </div>
  );
};

const ECommerce = () => {
  const [currentItem, setCurrentItem] = useState(0);
  return (
    <div className="lg:w-2/3 lg:self-center flex items-center relative justify-around bg-white mt-4 py-8 rounded-b-3xl ">
      <button
        className={`w-1/5 flex gap-1 justify-center items-center font-bold text-sm p-2 rounded-2xl transition-all  ${
          currentItem === 0 ? "bg-gray-300 shadow-2xl" : ""
        }`}
        onClick={() => setCurrentItem(0)}
      >
        <p className="text-3xl">🛖</p>
        {currentItem === 0 && "Home"}
      </button>
      <button
        className={` w-1/5 flex gap-1 justify-center items-center font-bold text-sm p-2 rounded-2xl transition-all  ${
          currentItem === 1 ? "bg-gray-300 shadow-2xl" : ""
        }`}
        onClick={() => setCurrentItem(1)}
      >
        <p className="text-3xl">🖤</p>
        {currentItem === 1 && "Wishlist"}
      </button>

      <button
        className={` w-1/5 flex gap-1 justify-center items-center font-bold text-sm p-2 rounded-2xl transition-all ${
          currentItem === 2 ? "bg-gray-300 shadow-2xl" : ""
        }`}
        onClick={() => setCurrentItem(2)}
      >
        <p className="text-3xl">🛒</p>
        {currentItem === 2 && "Cart"}
      </button>
      <button
        className={`w-1/5  flex gap-1  justify-center items-center font-bold text-sm p-2 rounded-2xl transition-all ${
          currentItem === 3 ? "bg-gray-300 shadow-2xl" : ""
        }`}
        onClick={() => setCurrentItem(3)}
      >
        <p className="text-3xl">👤</p>
        {currentItem === 3 && "Profile"}
      </button>
    </div>
  );
};

const NavigationBars = () => {
  return (
    <div className="flex flex-col w-full min-h-screen ">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Password Strength</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full bg-yellow-200 p-2">
        <h2 className="text-2xl self-center text-center font-bold">
          Communication
        </h2>
        <CommunicationBar />

        <h2 className="text-2xl self-center text-center font-bold mt-8 mb-2">
          MedTech
        </h2>
        <MedTech />

        <h2 className="text-2xl self-center text-center font-bold mt-8 mb-2">
          FinTech
        </h2>
        <FinTech />

        <h2 className="text-2xl self-center text-center font-bold mt-8 mb-2">
          ECommerce
        </h2>
        <ECommerce />
      </main>
    </div>
  );
};

export default NavigationBars;
