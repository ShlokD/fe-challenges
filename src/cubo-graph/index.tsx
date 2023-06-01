import { FC, useState } from "react";

import HomeLink from "../home-link";

type Participation = {
  firstName: string;
  lastName: string;
  participation: number;
  color: string;
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const initialData: Participation[] = [
  {
    firstName: "Carlos",
    lastName: "Moura",
    participation: 10,
    color: randomColor(),
  },
  {
    firstName: "Fenranda",
    lastName: "Oliveira",
    participation: 30,
    color: randomColor(),
  },
  {
    firstName: "Hugo",
    lastName: "Silva",
    participation: 40,
    color: randomColor(),
  },
  {
    firstName: "Eliza",
    lastName: "Souza",
    participation: 40,
    color: randomColor(),
  },
  {
    firstName: "Anderson",
    lastName: "Santos",
    participation: 80,
    color: randomColor(),
  },
];

type ParticipationGraphProps = {
  data: Participation[];
};

const ParticipationGraph: FC<ParticipationGraphProps> = (props) => {
  const { data } = props;
  let sum = 0;
  return (
    <svg
      className="self-center my-4"
      height="300"
      width="300"
      viewBox="0 0 64 64"
    >
      {data?.map?.((d, i: number) => {
        const elem = (
          <circle
            key={`graph-${i}`}
            r="25%"
            cx="50%"
            cy="50%"
            fill="none"
            strokeWidth="32px"
            style={{
              strokeDasharray: `${d.participation} 100`,
              strokeDashoffset: `${0 - sum}`,
              stroke: d.color,
            }}
          />
        );
        sum += d.participation;
        return elem;
      })}
    </svg>
  );
};

type TableParticipation = Participation & { id: number };

type ParticipationTableProps = {
  data: Array<TableParticipation>;
  headers: string[];
};

const ParticipationTable: FC<ParticipationTableProps> = ({ data, headers }) => {
  let displayHeaders = headers;
  const dataHeaders = Object.keys(data[0]);
  if (headers.length < dataHeaders.length) {
    displayHeaders = [
      ...headers,
      ...dataHeaders.slice(dataHeaders.length - headers.length + 1),
    ];
  }

  if (headers.length > dataHeaders.length) {
    displayHeaders = headers.slice(0, dataHeaders.length);
  }

  return (
    <table className="p-2 w-11/12">
      <caption className="font-bold text-2xl">Participation Table</caption>
      <thead>
        <tr className="border-2 border-gray-400 text-xl p-2 w-full">
          {displayHeaders.map((header, i: number) => {
            return (
              <th className="border-2 border-gray-200" key={`header-${i}`}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((elem, i: number) => {
          return (
            <tr
              className="border-2 border-gray-400 text-center"
              key={`data-row-${i}`}
            >
              <td className="border-2 border-gray-200">{elem.id}</td>
              <td className="border-2 border-gray-200">{elem.firstName}</td>
              <td className="border-2 border-gray-200">{elem.lastName}</td>
              <td className="border-2 border-gray-200">
                {elem.participation}%
              </td>
              <td
                className="border-2 border-gray-200"
                style={{ backgroundColor: elem.color }}
              ></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
const ParticipationChart = () => {
  const [pizzaData, setPizzaData] = useState<Participation[]>(initialData);
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    participation: 0,
  });

  const handleSubmit = () => {
    if (
      formInput.firstName.length === 0 ||
      formInput.lastName.length === 0 ||
      formInput.participation === 0
    ) {
      return;
    }

    setPizzaData([...pizzaData, { ...formInput, color: randomColor() }]);
    setFormInput({
      firstName: "",
      lastName: "",
      participation: 0,
    });
  };

  const totalPart = pizzaData.reduce((t, p) => {
    return t + p.participation;
  }, 0);
  const tableData = pizzaData.map((p, index) => {
    return {
      id: index + 1,
      ...p,
      participation: Math.round((p.participation / totalPart) * 100),
    };
  });

  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-blue-400">
        <HomeLink />
      </header>

      <main className="flex flex-col w-screen">
        <div className="flex lg:flex-row flex-col w-full h-full my-4">
          <div className="flex flex-col lg:w-1/2 w-11/12 items-center justify-evenly p-4 mx-2">
            <input
              className="border-2 my-2 w-full p-1"
              id="first-name"
              placeholder="First name"
              aria-label="First name"
              value={formInput.firstName}
              onChange={(ev) =>
                setFormInput({
                  ...formInput,
                  firstName: (ev?.target as HTMLInputElement)?.value,
                })
              }
            />
            <input
              className="border-2 my-2 w-full p-1"
              id="last-name"
              placeholder="Last name"
              aria-label="Last name"
              value={formInput.lastName}
              onChange={(ev) =>
                setFormInput({
                  ...formInput,
                  lastName: (ev?.target as HTMLInputElement)?.value,
                })
              }
            />
            <input
              className="border-2 my-2 w-full p-1"
              id="participation"
              placeholder="Pizzas Delivered"
              aria-label="Pizzas Delivered"
              type="number"
              min="0"
              value={formInput.participation}
              onChange={(ev) =>
                setFormInput({
                  ...formInput,
                  participation: parseInt(
                    (ev?.target as HTMLInputElement)?.value,
                  ),
                })
              }
            />
            <button
              className="bg-blue-900 text-white w-1/3 p-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="lg:w-1/2 w-full mx-3 my-4 lg:my-0 p-3">
            <ParticipationTable
              data={tableData}
              headers={[
                "Id",
                "First name",
                "Last name",
                "Participation",
                "Color",
              ]}
            />
          </div>
        </div>
        <ParticipationGraph data={tableData} />
      </main>
    </div>
  );
};

export default ParticipationChart;
