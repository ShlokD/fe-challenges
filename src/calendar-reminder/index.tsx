import { FormEvent, useState } from "react";

import HomeLink from "../home-link";
import { formatDate } from "../utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDaysForMonth = (month: number, year: number) => {
  if (month === 2) {
    if (year % 100 === 0) {
      return year % 4 === 0 ? 29 : 28;
    }

    return year % 4 === 0 ? 29 : 28;
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }
  return 31;
};

type Reminder = {
  id: string;
  date: Date;
  message: string;
};
const CalendarReminder = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [reminderDate, setReminderDate] = useState(new Date(date.valueOf()));
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showReminderForm, setShowReminderForm] = useState<boolean>(false);
  const [reminderId, setReminderId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const month = date.getMonth();
  const year = date.getFullYear();
  const mDays = getDaysForMonth(month + 1, year);

  const firstDate = new Date(date);
  const lastDate = new Date(date);
  firstDate.setDate(1);
  lastDate.setDate(mDays);
  const firstDay = firstDate.getDay();
  const blankDays = firstDay % 7;
  const years = new Array(100).fill(year).map((y, i) => y + i);
  const prevDays = getDaysForMonth(month, year);
  const blanks = new Array(blankDays)
    .fill(1)
    .map((_, i) => prevDays - i)
    .reverse();
  const days = new Array(mDays).fill(1).map((d, i) => d + i);
  const lastDay = lastDate.getDay();
  const nextMonthDays = new Array(6 - lastDay).fill(1).map((d, i) => d + i);

  const setMonth = (month: string) => {
    setDate((prev) => {
      const newDate = new Date(prev.valueOf());
      newDate.setMonth(Number(month));
      return newDate;
    });
  };

  const setYear = (year: string) => {
    setDate((prev) => {
      const newDate = new Date(prev.valueOf());
      newDate.setFullYear(Number(year));
      return newDate;
    });
  };

  const toggleForm = () => {
    if (!showReminderForm) {
      setMessage("");
    }
    setShowReminderForm((prev) => !prev);
  };

  const handleFormSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (message.length !== 0) {
      if (reminderId !== "") {
        setReminders((prev) => {
          const index = prev.findIndex((r) => r.id === reminderId);
          const newReminders = prev.slice();
          newReminders[index] = {
            ...newReminders[index],
            message,
          };
          return newReminders;
        });
        setMessage("");
        setReminderId("");
      } else {
        const reminder = {
          id: crypto.randomUUID(),
          date: new Date(
            Date.UTC(
              reminderDate.getFullYear(),
              reminderDate.getMonth(),
              reminderDate.getDate(),
            ),
          ),
          message,
        };
        setReminders((prev) => [...prev, reminder]);
      }
    }
    setShowReminderForm(false);
    setMessage("");
  };

  const addReminder = (day: number) => {
    setMessage("");
    setReminderDate((prev) => {
      const newDate = new Date(
        new Date(Date.UTC(prev.getFullYear(), prev.getMonth(), day)),
      );
      return newDate;
    });
    setShowReminderForm(true);
  };

  const editReminder = (reminder: Reminder) => {
    setReminderId(reminder.id);
    setMessage(reminder.message);
  };

  const deleteReminder = (reminder: Reminder) => {
    setReminders((prev) => prev.slice().filter((p) => p.id !== reminder.id));
  };

  const todayReminders = reminders.filter(
    (reminder) => reminder.date.valueOf() === reminderDate.valueOf(),
  );
  return (
    <div className="flex flex-col w-full">
      <header className="bg-yellow-200 flex p-4 justify-center items-center gap-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Calendar Reminder</h1>
      </header>
      <main className="flex flex-col w-full p-4">
        <div className="flex gap-2 items-center justify-center w-full my-4 text-xl">
          <select
            className="w-1/2 text-center"
            value={month}
            aria-label="Choose Month"
            onChange={(ev) => setMonth(ev.target.value)}
          >
            {MONTHS.map((month, i) => {
              return (
                <option value={i} key={`month-${i}`}>
                  {month}
                </option>
              );
            })}
          </select>
          <select
            className="w-1/2 text-center"
            value={year}
            aria-label="Choose Year"
            onChange={(ev) => setYear(ev.target.value)}
          >
            {years.map((year, i) => {
              return (
                <option value={year} key={`month-${i}`}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={toggleForm}
          className="self-center w-2/3 p-4 my-3 bg-blue-400 text-white font-bold rounded-xl shadow"
        >
          Add Reminder
        </button>
        <div className="grid grid-cols-7 align-center text-center w-full items-center justify-center">
          {DAYS.map((weekday, i: number) => {
            return (
              <div className="font-bold text-lg" key={`weekday-${i}`}>
                {weekday}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((d, i: number) => {
            return (
              <div className="bg-gray-100 p-4 text-center" key={`blank-${i}`}>
                {d}
              </div>
            );
          })}
          {days.map((day, i: number) => {
            const dayDate = new Date(
              Date.UTC(date.getFullYear(), date.getMonth(), day),
            );
            const dailyReminder = reminders.filter(
              (reminder) => reminder.date.valueOf() === dayDate.valueOf(),
            );

            return (
              <button
                className={`${
                  dailyReminder.length === 0 ? "bg-blue-100" : "bg-green-200"
                } p-4 overflow-scroll`}
                key={`day-${i}`}
                aria-label={`${day}-${dayDate.getMonth()}-${year}`}
                onClick={() => addReminder(day)}
              >
                {day}
              </button>
            );
          })}
          {nextMonthDays.map((d, i: number) => {
            return (
              <div
                className="bg-gray-100 p-4 text-center"
                key={`next-month-${i}`}
              >
                {d}
              </div>
            );
          })}
        </div>
        <div
          className={`bg-white bottom-0 flex flex-col gap-4 p-4 border-2 rounded-lg absolute z-10 w-11/12 self-center transition-transform ease-in-out duration-[150] ${
            showReminderForm ? "visible" : "invisible"
          }`}
          style={{
            height: "300px",
            transform: `translateY(${showReminderForm ? "0px" : "300px"})`,
          }}
        >
          <h2 className="text-xl font-bold">Reminders</h2>
          <div className="flex gap-10">
            <form className="w-2/3 flex flex-col" onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <label htmlFor="message" className="font-bold">
                  Message
                </label>
                <input
                  id="message"
                  className="border-2 border-black p-2 rounded-xl shadow text-md"
                  maxLength={30}
                  placeholder="Message(30 chars max)"
                  onChange={(ev) => setMessage(ev.target.value)}
                  autoComplete="off"
                  value={message}
                ></input>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="date" className="font-bold">
                  Date
                </label>
                <input
                  id="date"
                  className="border-2 border-black p-2 rounded-xl shadow text-md bg-gray-200 font-bold"
                  type="date"
                  value={formatDate(reminderDate)}
                  placeholder="Date"
                  disabled
                ></input>
              </div>
              <button
                type="submit"
                className="self-center w-2/3 bg-blue-400 my-4 rounded-xl text-white font-bold p-4"
              >
                Done
              </button>
            </form>

            <div className="flex flex-col w-1/3 overflow-scroll my-2">
              {todayReminders.map((reminder, i) => {
                return (
                  <div
                    className="flex"
                    key={`dr-${reminderDate.valueOf()}-${i}`}
                  >
                    <button
                      className="bg-green-200 p-2 w-3/4"
                      onClick={() => editReminder(reminder)}
                    >
                      {reminder.message}
                    </button>
                    <button
                      className="bg-red-400 w-1/4 text-white font-bold"
                      onClick={() => deleteReminder(reminder)}
                      aria-label={`Delete ${reminder.message}`}
                    >
                      Del
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarReminder;
