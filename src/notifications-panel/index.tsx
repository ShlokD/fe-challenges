import { useState } from "react";

import HomeLink from "../home-link";

type Notification = {
  id: number;
  title: string;
  body: string;
  isRead: boolean;
};
const DEFAULT_DATA: Notification[] = [
  {
    id: 1,
    title: "New message from John",
    body: "Hey! How are you doing?",
    isRead: false,
  },
  {
    id: 2,
    title: "Your order has shipped!",
    body: "Your order number 123456 has shipped and is on its way!",
    isRead: true,
  },
  {
    id: 3,
    title: "Meeting reminder",
    body: "Don't forget about your meeting at 2 PM today!",
    isRead: false,
  },
  {
    id: 4,
    title: "System update available",
    body: "A new update for your device is available. Please download and install.",
    isRead: true,
  },
  {
    id: 5,
    title: "Social media notification",
    body: "You've got a new like on your post!",
    isRead: false,
  },
  {
    id: 6,
    title: "Low battery warning",
    body: "Your device battery is low. Please connect to a charger.",
    isRead: true,
  },
  {
    id: 7,
    title: "Calendar event reminder",
    body: "Upcoming birthday for Sarah tomorrow!",
    isRead: false,
  },
  {
    id: 8,
    title: "News update",
    body: "Breaking news: Major development in [topic of interest].",
    isRead: true,
  },
  {
    id: 9,
    title: "App update available",
    body: "[App name] has a new update available with exciting new features!",
    isRead: false,
  },
  {
    id: 10,
    title: "Reminder: Download important document",
    body: "Don't forget to download the document for your upcoming meeting.",
    isRead: true,
  },
];

const Notifications = () => {
  const [data, setData] = useState<Notification[]>(DEFAULT_DATA);
  data.sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));

  const markRead = (index: number) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index].isRead = true;
      return newData;
    });
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-orange-500 flex flex-row items-center justify-center gap-2">
        <div className="p-2">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Notifications Panel</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full p-2">
        <div className="flex flex-col w-full overflow-scroll gap-4">
          {data.map((notification, i) => {
            const { isRead, id, title, body } = notification;
            return (
              <label
                className={`flex py-4 cursor-pointer px-8 border-2 border-blue-400 transition-all duration-300 rounded-xl w-full items-center justify-between shadow-xl ${
                  isRead ? "bg-white" : "bg-blue-200"
                }`}
                htmlFor={`notify-${id}`}
                key={`notify-${i}`}
              >
                <input
                  type="checkbox"
                  id={`notify-${id}`}
                  checked={isRead}
                  className="hidden"
                  onChange={() => markRead(i)}
                />
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-xl">{title}</p>
                  <p className="text-lg">{body}</p>
                </div>
                {!isRead && <p className="w-4 h-4 bg-red-500 rounded-full"></p>}
              </label>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
