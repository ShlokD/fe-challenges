import { Link } from "react-router-dom";

function App() {
  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-bold text-center text-4xl underline">
        Web Mini Apps
      </h1>
      <p className="text-lg text-center p-2">
        A collection of web mini-apps and widgets
      </p>
      <ul className="flex flex-row gap-2 items-stretch justify-center p-1 w-full flex-wrap">
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/betting`}>Addison Global - Betting Site</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/promotions`}>Addison Global - Promotions</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/amaro-products`}>Amaro Products</Link>
        </li>
        <li className="text-lg w-1/4 text-center flex flex-col justify-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/brainn-lottery`}>Brainn Lottery</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 flex flex-col justify-center bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/apiki-blog`}>Apiki Blog</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/b2w-marketplace`}>B2W Marketplace</Link>
        </li>
        <li className="text-lg w-1/4 text-center flex flex-col justify-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/bossabox-tools`}>Bossabox - Useful Tools</Link>
        </li>
        <li className="text-lg w-1/4 text-center flex flex-col justify-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/ciclic-interest-rate`}>Ciclic - Interest Calculator</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/creditas-insurance`}>
            Creditas - Insurance Calculator
          </Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/cubo-graph`}>Cubo - Participation Graph</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/merlins-potions`}>ENext - Merlin's Potions</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/stolen-bikes`}>Joincom - Stolen Bike Index</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/donations-widget`}>Loktra - Donations Widget</Link>
        </li>
        <li className="text-lg w-1/4 text-center flex flex-col justify-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/tarot-cards`}>Personare - Tarot App</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/audio-player`}>Significa - Audio Player</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/multi-counter`}>SitePoint - Multi Counter</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/todo-list`}>SizeBay - ToDo List</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/gym-search`}>Smartfit - Gym List</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/account-wizard`}>Storecast - Account Wizard</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/car-carousel`}>Volvo - Car Carousel</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/serialize-state`}>Zepl - Serialize State</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/masonry-layout`}>Wiredcraft - Masonry Layout</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/color-game`}>Color Game</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/turtle-graphics`}>Turtle Graphics</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/xr-keyboard`}>XR Keyboard</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/moonpay-currency`}>Moonpay Currencies</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/microwave-app`}>Microwave App</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/prose-renderer`}>Prose Renderer</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/grocery-bingo`}>Grocery Bingo</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/wishlist-app`}>Wishlist App</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/calculator`}>Calculator App</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/voice-modulator`}>Voice Modulator</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/randomizer`}>Randomizer</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/patatap-clone`}>Patatap Clone</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/product-comparison`}>Product Comparison</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/lift-simulator`}>Lift Simulator</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/hangman`}>Hangman</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/stopwatch`}>Stopwatch</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/smart-filters`}>Smart Filters</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/password-strength`}>Password Strength</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/video-menu`}>Video Menu</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/whack-hog`}>Whack a Hedgehog</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/puzzle-15`}>Puzzle 15</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/waves`}>Waves</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/pricing-toggle`}>Pricing Toggle</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/hover-board`}>Hover Board</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/hand-cricket`}>Hand Cricket</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/progress-stepper`}>Progress Stepper</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/word-scramble`}>Word Scramble</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/bonsai-pricing`}>Bonsai Pricing</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/comments-box`}>Comments Box</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/metronome`}>Metronome</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/deep-breathing`}>Deep Breathing</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/restaurant-sim`}>Restaurant Simulator</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/image-hotspot`}>Image Hotspot</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/vertical-spinner`}>Vertical Spinner</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/before-after`}>Before After</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/grid-countdown`}>Grid Countdown</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/event-listings`}>Event Listings</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/product-grid`}>Product Grid</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/news-ticker`}>News Ticker</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/image-zoom`}>Image Zoom</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/othello`}>Othello</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/rps-matchup`}>Rock Paper Scissors Matchup</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/wa-tor`}>Wa-Tor</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/checklist`}>Checklist</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/navigation-bars`}>Navigation Bars</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/character-counter`}>Character Counter</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/feedback-widget`}>Feedback Widget</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/wolf-sheep`}>Wolves and Sheep Game</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/hero-widget`}>Hero Widget</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/text-select-format`}>Text Select and Format</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/ip-lookup`}>IP Address Lookup</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/survey-app`}>Survey App</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/swiper`}>Swiper App</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/poke-cards`}>Pokemon Cards</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/timeline`}>Timeline</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/image-upload`}>Image Upload</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/markdown-editor`}>Markdown Editor</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/multi-progress`}>Multi Progress</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/otp-input`}>OTP Input</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/heat-map`}>Heat Map</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/sortable-list`}>Sortable List</Link>
        </li>
        <li className="text-lg w-1/4 text-center my-2 bg-blue-500 text-white p-2 rounded-lg">
          <Link to={`/multi-search-select`}>Multi Search Select</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
