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
const LiftSimulator = React.lazy(() => import("./lift-simulator"));
const Hangman = React.lazy(() => import("./hangman"));
const Stopwatch = React.lazy(() => import("./stopwatch"));
const SmartFilters = React.lazy(() => import("./smart-filters"));
const PasswordStrength = React.lazy(() => import("./password-strength"));
const VideoMenu = React.lazy(() => import("./video-menu"));
const WhackHog = React.lazy(() => import("./whack-hog"));
const Puzzle15 = React.lazy(() => import("./puzzle-15"));
const Waves = React.lazy(() => import("./waves"));
const PricingToggle = React.lazy(() => import("./pricing-toggle"));
const HoverBoard = React.lazy(() => import("./hover-board"));
const HandCricket = React.lazy(() => import("./hand-cricket"));
const ProgressStepper = React.lazy(() => import("./progress-stepper"));
const WordScramble = React.lazy(() => import("./word-scramble"));
const BonsaiPricing = React.lazy(() => import("./bonsai-pricing"));
const CommentsBox = React.lazy(() => import("./comments-box"));
const Metronome = React.lazy(() => import("./metronome"));
const DeepBreathing = React.lazy(() => import("./deep-breathing"));
const RestaurantSim = React.lazy(() => import("./restaurant-sim"));
const ImageHotspot = React.lazy(() => import("./image-hotspot"));
const VerticalSpinner = React.lazy(() => import("./vertical-spinner"));
const BeforeAfter = React.lazy(() => import("./before-after"));
const GridCountdown = React.lazy(() => import("./grid-countdown"));
const EventListings = React.lazy(() => import("./event-listings"));
const ProductGrid = React.lazy(() => import("./product-grid"));
const NewsTicker = React.lazy(() => import("./news-ticker"));
const ImageZoom = React.lazy(() => import("./image-zoom"));
const Othello = React.lazy(() => import("./othello"));
const RPSMatchup = React.lazy(() => import("./rps-matchup"));
const Wator = React.lazy(() => import("./wator"));
const Checklist = React.lazy(() => import("./checklist"));
const NavigationBars = React.lazy(() => import("./navigation-bars"));
const CharacterCounter = React.lazy(() => import("./character-counter"));
const FeedbackWidget = React.lazy(() => import("./feedback-widget"));
const WolfSheep = React.lazy(() => import("./wolf-sheep"));
const HeroWidget = React.lazy(() => import("./hero-widget"));
const TextSelectFormat = React.lazy(() => import("./text-select-format"));
const IPLookup = React.lazy(() => import("./ip-lookup"));

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
  {
    path: "/lift-simulator",
    element: <LiftSimulator />,
  },
  {
    path: "/hangman",
    element: <Hangman />,
  },
  {
    path: "/stopwatch",
    element: <Stopwatch />,
  },
  {
    path: "/smart-filters",
    element: <SmartFilters />,
  },
  {
    path: "/password-strength",
    element: <PasswordStrength />,
  },
  {
    path: "/video-menu",
    element: <VideoMenu />,
  },
  {
    path: "/whack-hog",
    element: <WhackHog />,
  },
  {
    path: "/puzzle-15",
    element: <Puzzle15 />,
  },
  {
    path: "/waves",
    element: <Waves />,
  },
  {
    path: "/pricing-toggle",
    element: <PricingToggle />,
  },
  {
    path: "/hover-board",
    element: <HoverBoard />,
  },
  {
    path: "/hand-cricket",
    element: <HandCricket />,
  },
  {
    path: "/progress-stepper",
    element: <ProgressStepper />,
  },
  {
    path: "/word-scramble",
    element: <WordScramble />,
  },
  {
    path: "/bonsai-pricing",
    element: <BonsaiPricing />,
  },
  {
    path: "/comments-box",
    element: <CommentsBox />,
  },
  {
    path: "/metronome",
    element: <Metronome />,
  },
  {
    path: "/deep-breathing",
    element: <DeepBreathing />,
  },
  {
    path: "/restaurant-sim",
    element: <RestaurantSim />,
  },
  {
    path: "/image-hotspot",
    element: <ImageHotspot />,
  },
  {
    path: "/vertical-spinner",
    element: <VerticalSpinner />,
  },
  {
    path: "/before-after",
    element: <BeforeAfter />,
  },
  {
    path: "/grid-countdown",
    element: <GridCountdown />,
  },
  {
    path: "/event-listings",
    element: <EventListings />,
  },
  {
    path: "/product-grid",
    element: <ProductGrid />,
  },
  {
    path: "/news-ticker",
    element: <NewsTicker />,
  },
  {
    path: "/image-zoom",
    element: <ImageZoom />,
  },
  {
    path: "/othello",
    element: <Othello />,
  },
  {
    path: "/rps-matchup",
    element: <RPSMatchup />,
  },
  {
    path: "/wa-tor",
    element: <Wator />,
  },
  {
    path: "/checklist",
    element: <Checklist />,
  },
  {
    path: "/navigation-bars",
    element: <NavigationBars />,
  },
  {
    path: "/character-counter",
    element: <CharacterCounter />,
  },
  {
    path: "/feedback-widget",
    element: <FeedbackWidget />,
  },
  {
    path: "/wolf-sheep",
    element: <WolfSheep />,
  },
  {
    path: "/hero-widget",
    element: <HeroWidget />,
  },
  {
    path: "/text-select-format",
    element: <TextSelectFormat />,
  },
  {
    path: "/ip-lookup",
    element: <IPLookup />,
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