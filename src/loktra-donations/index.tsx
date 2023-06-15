import { FC, JSX, ReactNode, useState } from "react";

import HomeLink from "../home-link";

const Dialog: FC<{ onClose: () => void; children?: ReactNode }> = ({
  onClose,
  children,
}) => {
  return (
    <div
      className="absolute w-1/2 border-2 border-black left-1/2 top-1/2 flex flex-col items-center justify-center z-10 rounded-lg shadow-lg bg-white"
      style={{ transform: `translate(-50%,-50%)` }}
      role="dialog"
    >
      <button
        className="self-end p-6 text-2xl font-bold"
        onClick={onClose}
        aria-label="close dialog"
      >
        X
      </button>
      {children}
    </div>
  );
};

const SaveDialog = () => (
  <div className="text-xl text-black p-8 font-bold">Saved!</div>
);

const DIALOGS: Record<string, () => JSX.Element> = {
  SAVE: SaveDialog,
};

const DonationsWidget = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [total, setTotal] = useState(200);
  const [amount, setAmount] = useState(50);
  const [currentDialog, setCurrentDialog] = useState("");

  const handleSaveForLater = () => {
    setCurrentDialog("SAVE");
    setShowDialog(true);
  };

  const handleShare = () => {
    setCurrentDialog("SHARE");
    setShowDialog(true);
  };

  const handleClose = () => {
    setCurrentDialog("");
    setShowDialog(false);
  };

  const handleGiveNow = () => {
    if (amount + total > 1000) {
      setTotal(1000);
    }
    if (amount > 0) {
      setTotal((prev) => prev + amount);
      setAmount(50);
    }
  };

  const text = `I donated $${amount}`;

  const ShareDialog = () => {
    return (
      <div className="flex flex-row p-4 gap-4">
        <a
          className="border-2 p-4 rounded-lg"
          href={`https://twitter.com/intent/tweet?text=${text}`}
          data-size="large"
        >
          Tweet
        </a>
      </div>
    );
  };

  DIALOGS["SHARE"] = ShareDialog;

  const DialogChild: () => JSX.Element | null = DIALOGS[currentDialog] || null;

  return (
    <div className="flex flex-col w-full h-full ">
      <header className="bg-orange-300 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl"> Donate today </h1>
      </header>
      <main className="flex flex-col w-full h-screen my-4 items-center">
        <div className="w-2/3 bg-black text-white font-bold text-center p-4 mb-2">
          Only ${1000 - total} still needed for this project
        </div>
        <progress
          id="loktra-progress"
          value={total}
          className="border-t-2 border-r-2 border-l-2 border-black w-2/3 h-8 flex justify-center bg-white"
          max="1000"
        />
        <div className="flex flex-col items-center justify-center w-2/3 border-2 border-black p-6">
          <div>
            <p className="text-lg">
              <span className="text-orange-500 font-bold">
                Only 3 days left
              </span>{" "}
              to fund this project
            </p>
            <p className="text-gray-400 my-2">
              Join the other <span className="font-bold">42</span> donors who
              have already supported this project. Every dollar helps.
            </p>
            <div className="flex flex-row justify-center gap-4 my-4">
              <div className="w-1/2 relative">
                <input
                  type="number"
                  className="border-2 border-black py-4 text-2xl font-bold w-full pl-6"
                  value={amount}
                  min="0"
                  max={1000 - total}
                  onChange={(ev) => setAmount(parseInt(ev?.target?.value))}
                  aria-label="Amount"
                />
                <div className="absolute top-0 block pt-5 px-2 text-xl font-bold text-gray-500">
                  $
                </div>
              </div>
              <button
                className={`${
                  total >= 1000 ? "bg-gray-500" : "bg-green-400"
                } text-white w-1/2 p-4 font-bold text-2xl`}
                disabled={total >= 1000}
                onClick={handleGiveNow}
              >
                Give now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8 my-2 w-2/3">
          <button
            className="shadow-lg w-1/2 text-gray-500 font-bold text-sm rounded-lg p-4 border-2 border-gray-300"
            onClick={handleSaveForLater}
          >
            Save For Later
          </button>
          <button
            className="shadow-lg w-1/2 text-gray-500 font-bold text-sm rounded-lg p-4 border-2 border-gray-300"
            onClick={handleShare}
          >
            Tell your friends
          </button>
        </div>
        {showDialog && (
          <Dialog onClose={handleClose}>
            <DialogChild />
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default DonationsWidget;
