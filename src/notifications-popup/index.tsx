import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const NType: Record<string, string> = {
  SUCCESS: "Success",
  INFO: "Info",
  WARN: "Warning",
  ERROR: "Error",
};

const NOTIFY_COLORS: Record<string, string> = {
  SUCCESS: "green-400",
  INFO: "blue-400",
  ERROR: "orange-400",
  WARN: "red-400",
};

type Notify = {
  id: string;
  ntype: string;
  message: string;
};

const NotificationsPopup = () => {
  const [nList, setNList] = useState<Notify[]>([]);
  const deleteInterval = useRef<number | null>(null);

  const addNotification = (ntype: string) => {
    const notification = {
      id: crypto.randomUUID(),
      ntype,
      message: `${NType[ntype]} notification triggered`,
    };
    setNList((prev) => [...prev, notification]);
  };

  const deleteNotification = (id: string) => {
    setNList((prev) => {
      return [...prev].filter((n) => n.id !== id);
    });
  };

  useEffect(() => {
    deleteInterval.current = window.setInterval(() => {
      if (nList.length > 0) {
        deleteNotification(nList[0].id);
      }
    }, 5000);

    return () => {
      if (deleteInterval?.current) {
        clearInterval(deleteInterval?.current);
      }
    };
  }, [nList]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <header className="p-4 bg-orange-400 text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Notifications Popup</h1>
      </header>
      <main className="flex flex-col p-2 lg:justify-center lg:items-center w-full min-h-screen">
        <p className="self-center text-xl my-2">Click to Toggle Notification</p>

        <div className="flex lg:flex-col flex-wrap z-10 lg:items-center lg:justify-center gap-12 bg-white rounded-xl shadow-xl w-11/12 justify-center mx-4 p-8 self-center items-center">
          {Object.keys({ ...NType }).map((ntype, i) => {
            return (
              <button
                key={`notify-${i}`}
                onClick={() => addNotification(ntype)}
                className={`md:w-11/12  bg-${NOTIFY_COLORS[ntype]} md:text-xl text-white font-bold py-4 px-4 rounded-xl text-sm`}
              >
                {NType[ntype]}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-0 lg:top-[120px] lg:right-0 lg:w-1/3 lg:mr-4 mb-4 w-full gap-4 flex flex-col items-center">
          {nList.map((notification, i) => {
            return (
              <button
                key={`notification-${i}`}
                className={`bg-white border-l-8 border-${
                  NOTIFY_COLORS[notification.ntype]
                } rounded-lg p-4 self-center text-md w-4/5 lg:w-full`}
                onClick={() => deleteNotification(notification.id)}
              >
                {notification.message}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default NotificationsPopup;
