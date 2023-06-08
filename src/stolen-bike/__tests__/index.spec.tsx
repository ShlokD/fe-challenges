import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import StolenBikes from "..";

global.fetch = vi.fn();

const data = {
  bikes: [
    {
      date_stolen: 1683047554,
      description: null,
      frame_colors: ["Red"],
      frame_model: "Tarmac Expert SL6",
      id: 1513428,
      is_stock_img: false,
      large_img: null,
      location_found: null,
      manufacturer_name: "Specialized",
      external_id: null,
      registry_name: null,
      registry_url: null,
      serial: "Unknown",
      status: "stolen",
      stolen: true,
      stolen_coordinates: [52.55, 13.45],
      stolen_location: "Berlin, 13086, DE",
      thumb: null,
      title: "2018 Specialized Tarmac Expert SL6",
      url: "https://bikeindex.org/bikes/1513428",
      year: 2018,
    },
    {
      date_stolen: 1682521200,
      description:
        '- Applied AMS Basic Frame Protector stickers\r\n- Black RRP Enduro Mud Guard (front)\r\n- Black RRP Proguard Rear Mudguard\r\n- 29" wheels\r\nI replaced one of the tires, so the one has Maxxis in yellow and the other in white',
      frame_colors: ["Black"],
      frame_model: "Strive",
      id: 1510089,
      is_stock_img: false,
      large_img:
        "https://files.bikeindex.org/uploads/Pu/691707/large_BC1B402A-A59F-41DE-898C-DEDE2EDB7C74.jpg",
      location_found: null,
      manufacturer_name: "Canyon bicycles",
      external_id: null,
      registry_name: null,
      registry_url: null,
      serial: "M06501V20K0040",
      status: "stolen",
      stolen: true,
      stolen_coordinates: [52.51, 13.31],
      stolen_location: "Berlin, 10625, DE",
      thumb:
        "https://files.bikeindex.org/uploads/Pu/691707/small_BC1B402A-A59F-41DE-898C-DEDE2EDB7C74.jpg",
      title: "2021 Canyon bicycles Strive",
      url: "https://bikeindex.org/bikes/1510089",
      year: 2021,
    },
  ],
};

function createFetchResponse() {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    headers: {
      get: () => "1",
    },
  };
}

describe("<StolenBikes />", () => {
  it("should render list of stolen bikes", async () => {
    fetch.mockResolvedValue(createFetchResponse());

    render(
      <MemoryRouter>
        <StolenBikes />
      </MemoryRouter>,
    );
    expect(
      await screen.findByText(/2018 Specialized Tarmac Expert SL6/i),
    ).toBeDefined();
    expect(screen.getByRole("textbox", { name: /search/i })).toBeDefined();
    expect(screen.getByText("From")).toBeDefined();
    expect(screen.getByText("To")).toBeDefined();
    expect(screen.getByRole("button", { name: /find/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /prev/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /next/i })).toBeDefined();
    expect(screen.getByText(/5\/2\/2023/i)).toBeDefined();
    expect(screen.getByText(/Berlin, 13086, DE/i)).toBeDefined();
  });
});
