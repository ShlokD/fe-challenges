import { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import UAParser from "ua-parser-js";

import HomeLink from "../home-link";

type IPDetails = {
  ip?: string | null;
  location?: string | null;
  isp?: string | null;
};

const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? "Mobile"
    : "Desktop";

const IPLookup = () => {
  const [ipDetails, setIPDetails] = useState<IPDetails>({});
  const [fetchState, setFetchState] = useState("DONE");

  const loadIPDetails = async () => {
    try {
      setFetchState("LOADING");
      const res = await fetch("https://ipapi.co/json");
      const json = await res.json();
      setIPDetails({
        ip: json?.ip,
        location: `${json?.city},${json.country_name}`,
        isp: `${json?.org}`,
      });
      setFetchState("DONE");
    } catch (e) {
      setFetchState("ERROR");
      setIPDetails({
        ip: null,
        location: null,
        isp: null,
      });
    }
  };

  useEffect(() => {
    loadIPDetails();
  }, []);

  const device = detectDeviceType();
  const browser = new UAParser(window.navigator.userAgent).getBrowser();
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-yellow-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">IP Address Lookup</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full p-2 bg-gray-200 items-center justify-center">
        {fetchState === "ERROR" && (
          <p className="text-2xl">
            Error loading IP details. Please enable cookies and try again
          </p>
        )}
        {fetchState === "LOADING" && <SpinnerDotted className="self-center" />}
        {fetchState === "DONE" && ipDetails.ip && (
          <div className="flex flex-col bg-white p-4 lg:p-8 gap-4 shadow-xl rounded-xl">
            <p className="text-sm md:text-md lg:text-lg text-gray-300">
              Your public ip address
            </p>
            <h2 className="text-md md:text-lg lg:text-2xl font-bold">
              {ipDetails.ip}
            </h2>
            <hr className="w-full" />
            <p className="text-md md:text-lg lg:text-2xl py-4">
              🌐 {ipDetails.location}
            </p>
            <hr className="w-full" />
            <p className="text-md md:text-lg lg:text-2xl py-4">
              🏢 {ipDetails.isp}
            </p>

            <hr className="w-full" />

            <div className="flex items-center gap-2">
              <p className="text-sm md:text-md lg:text-lg text-gray-300">
                Device
              </p>
              <p className="text-4xl flex items-center py-4">
                {device === "Mobile" ? "📱" : "💻"}{" "}
              </p>
            </div>

            <hr className="w-full" />
            <div className="flex items-center gap-2">
              <p className="text-sm md:text-md lg:text-lg text-gray-300">
                Browser
              </p>
              <p className="text-md md:text-lg lg:text-2xl flex items-center py-4">
                {browser.name}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default IPLookup;
