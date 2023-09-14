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
const StolenBikes = React.lazy(() => import("./stolen-bike"));
const DonationsWidget = React.lazy(() => import("./loktra-donations"));
const TarotCards = React.lazy(() => import("./tarot-cards"));
const AudioPlayer = React.lazy(() => import("./audio-player"));
const MultiCounter = React.lazy(() => import("./multi-counter"));
const TodoList = React.lazy(() => import("./todo-list"));
const GymSearch = React.lazy(() => import("./gym-search"));
const AccountWizard = React.lazy(() => import("./account-wizard"));
const CarCarousel = React.lazy(() => import("./car-carousel"));
const SerializeState = React.lazy(() => import("./serialize-state"));
const MasonryLayout = React.lazy(() => import("./masonry-layout"));
const ColorGame = React.lazy(() => import("./color-game"));
const TurtleGraphics = React.lazy(() => import("./turtle-graphics"));
const XRKeyboard = React.lazy(() => import("./xr-keyboard"));
const MoonpayCurrencies = React.lazy(() => import("./moonpay-currencies"));
const MicrowaveApp = React.lazy(() => import("./microwave-app"));
const ProseRenderer = React.lazy(() => import("./prose-renderer"));
const GroceryBingo = React.lazy(() => import("./grocery-bingo"));
const WishlistApp = React.lazy(() => import("./wishlist-app"));
const Calculator = React.lazy(() => import("./calculator"));
const VoiceModulator = React.lazy(() => import("./voice-modulator"));
const Randomizer = React.lazy(() => import("./randomizer"));
const Patatap = React.lazy(() => import("./patatap-clone"));
const ProductComparison = React.lazy(() => import("./product-comparison"));

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
  {
    path: "/stolen-bikes",
    element: <StolenBikes />,
  },
  {
    path: "/donations-widget",
    element: <DonationsWidget />,
  },
  {
    path: "/tarot-cards",
    element: <TarotCards />,
  },
  {
    path: "/audio-player",
    element: <AudioPlayer />,
  },
  {
    path: "/multi-counter",
    element: <MultiCounter />,
  },
  {
    path: "/todo-list",
    element: <TodoList />,
  },
  {
    path: "/gym-search",
    element: <GymSearch />,
  },
  {
    path: "/account-wizard",
    element: <AccountWizard />,
  },
  {
    path: "/car-carousel",
    element: <CarCarousel />,
  },
  {
    path: "/serialize-state",
    element: <SerializeState />,
  },
  {
    path: "/masonry-layout",
    element: <MasonryLayout />,
  },
  {
    path: "/color-game",
    element: <ColorGame />,
  },
  {
    path: "/turtle-graphics",
    element: <TurtleGraphics />,
  },
  {
    path: "/xr-keyboard",
    element: <XRKeyboard />,
  },
  {
    path: "/moonpay-currency",
    element: <MoonpayCurrencies />,
  },
  {
    path: "/microwave-app",
    element: <MicrowaveApp />,
  },
  {
    path: "/prose-renderer",
    element: <ProseRenderer />,
  },
  {
    path: "/grocery-bingo",
    element: <GroceryBingo />,
  },
  {
    path: "/wishlist-app",
    element: <WishlistApp />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
  {
    path: "/voice-modulator",
    element: <VoiceModulator />,
  },
  {
    path: "/randomizer",
    element: <Randomizer />,
  },
  {
    path: "/patatap-clone",
    element: <Patatap />,
  },
  {
    path: "/product-comparison",
    element: <ProductComparison />,
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
