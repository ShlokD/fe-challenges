import { useState } from "react";
import { SpinnerDiamond } from "spinners-react";

import HomeLink from "../home-link";

const productNames = [
  "Wireless Noise-Cancelling Headphones",
  "Fast-Charging Power Bank",
  "Ergonomic Wireless Mouse",
  "Portable Bluetooth Speaker",
  "Waterproof Fitness Tracker",
  "4K Smart TV with Voice Control",
  "Immersive Virtual Reality Headset",
  "Smart Home LED Light Bulbs",
  "Robot Vacuum Cleaner with Mapping",
  "Air Fryer with Digital Display",
  "Coffee Maker with Grinder",
  "Cast Iron Skillet with Lid",
  "Soft Cotton Bath Towels",
  "Memory Foam Pillow",
  "Silky Duvet Cover Set",
  "Stainless Steel Water Bottle",
];

const months = [
  "January 2023",
  "February 2023",
  "March 2023",
  "April 2023",
  "May 2023",
  "June 2023",
  "July 2023",
  "August 2023",
  "September 2023",
  "October 2023",
  "November 2023",
  "December 2023",
  "January 2024",
  "February 2024",
  "March 2024",
  "April 2024",
  "May 2024",
];

const ProductGrid = () => {
  const [images, setImages] = useState(0);
  const showImages = () => {
    setImages((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-red-600">
        <HomeLink />
        <h1 className="font-bold text-2xl">Product Grid</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full">
        {images < 18 && (
          <SpinnerDiamond size={800} className="self-center my-20" />
        )}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 ${
            images >= 18 ? "visible" : "invisible"
          }`}
        >
          {productNames.map((product, i) => {
            return (
              <div
                key={`product-${i}`}
                className="flex product-image-container cursor-pointer relative bg-black text-center items-center justify-center"
              >
                <img
                  src={`https://random.imagecdn.app/v1/image?width=600&height=600&category=${product}`}
                  alt={`${product}-${months[i]}`}
                  onLoad={() => showImages()}
                  className="relative transition-opacity transition-ease-in-out duration-1000"
                />
                <div
                  className="absolute font-bold text-white text-xl lg:text-3xl opacity-0 product-info transition-opacity transition-ease-in-out duration-1000"
                  style={{
                    top: "40%",
                  }}
                >
                  {product}
                  <br />
                  {months[i]}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProductGrid;
