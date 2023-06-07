import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

const Betting = React.lazy(() => import("./betting"));
const Promotions = React.lazy(() => import("./promotions"));
const Products = React.lazy(() => import("./amaro-products"));
const Lottery = React.lazy(() => import("./brainn-lottery"));
const ApikiBlog = React.lazy(() => import("./apiki-blog"));
const UserProfile = React.lazy(() => import("./b2w-marketplace"));
const Tools = React.lazy(() => import("./bossabox-tools"));
const InterestRate = React.lazy(() => import("./ciclic-interest"));
const Installments = React.lazy(() => import("./creditas-insurance"));
const ParticipationChart = React.lazy(() => import("./cubo-graph"));
const PotionsStore = React.lazy(() => import("./merlins-potions"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/betting",
    element: <Betting />,
  },
  {
    path: "/promotions",
    element: <Promotions />,
  },
  {
    path: "/amaro-products",
    element: <Products />,
  },
  {
    path: "/brainn-lottery",
    element: <Lottery />,
  },
  {
    path: "/apiki-blog",
    element: <ApikiBlog />,
  },
  {
    path: "/b2w-marketplace",
    element: <UserProfile />,
  },
  {
    path: "/bossabox-tools",
    element: <Tools />,
  },
  {
    path: "/ciclic-interest-rate",
    element: <InterestRate />,
  },
  {
    path: "/creditas-insurance",
    element: <Installments />,
  },
  {
    path: "/cubo-graph",
    element: <ParticipationChart />,
  },
  {
    path: "/merlins-potions",
    element: <PotionsStore />,
  },
]);

export const Main = (
  <React.Suspense>
    <RouterProvider router={router} />
  </React.Suspense>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  Main,
);
