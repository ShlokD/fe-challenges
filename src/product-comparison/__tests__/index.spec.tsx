import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

import ProductComparison from "..";

global.fetch = vi.fn();

const data = [
  {
    id: 11,
    title: "perfume Oil",
    description:
      "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
    price: 13,
    discountPercentage: 8.4,
    rating: 4.26,
    stock: 65,
    brand: "Impression of Acqua Di Gio",
    category: "fragrances",
    thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/11/1.jpg",
      "https://i.dummyjson.com/data/products/11/2.jpg",
      "https://i.dummyjson.com/data/products/11/3.jpg",
      "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
    ],
  },
  {
    id: 12,
    title: "Brown Perfume",
    description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
    price: 40,
    discountPercentage: 15.66,
    rating: 4,
    stock: 52,
    brand: "Royal_Mirage",
    category: "fragrances",
    thumbnail: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/12/1.jpg",
      "https://i.dummyjson.com/data/products/12/2.jpg",
      "https://i.dummyjson.com/data/products/12/3.png",
      "https://i.dummyjson.com/data/products/12/4.jpg",
      "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
    ],
  },
  {
    id: 13,
    title: "Fog Scent Xpressio Perfume",
    description:
      "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
    price: 13,
    discountPercentage: 8.14,
    rating: 4.59,
    stock: 61,
    brand: "Fog Scent Xpressio",
    category: "fragrances",
    thumbnail: "https://i.dummyjson.com/data/products/13/thumbnail.webp",
    images: [
      "https://i.dummyjson.com/data/products/13/1.jpg",
      "https://i.dummyjson.com/data/products/13/2.png",
      "https://i.dummyjson.com/data/products/13/3.jpg",
      "https://i.dummyjson.com/data/products/13/4.jpg",
      "https://i.dummyjson.com/data/products/13/thumbnail.webp",
    ],
  },
  {
    id: 14,
    title: "Non-Alcoholic Concentrated Perfume Oil",
    description:
      "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
    price: 120,
    discountPercentage: 15.6,
    rating: 4.21,
    stock: 114,
    brand: "Al Munakh",
    category: "fragrances",
    thumbnail: "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/14/1.jpg",
      "https://i.dummyjson.com/data/products/14/2.jpg",
      "https://i.dummyjson.com/data/products/14/3.jpg",
      "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
    ],
  },
  {
    id: 15,
    title: "Eau De Perfume Spray",
    description:
      "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
    price: 30,
    discountPercentage: 10.99,
    rating: 4.7,
    stock: 105,
    brand: "Lord - Al-Rehab",
    category: "fragrances",
    thumbnail: "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/15/1.jpg",
      "https://i.dummyjson.com/data/products/15/2.jpg",
      "https://i.dummyjson.com/data/products/15/3.jpg",
      "https://i.dummyjson.com/data/products/15/4.jpg",
      "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
    ],
  },
];

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve({ products: data })) };
}

beforeEach(() => {
  fetch.mockResolvedValue(createFetchResponse());
  render(
    <MemoryRouter>
      <ProductComparison />
    </MemoryRouter>,
  );
});

describe("<Promotions />", () => {
  it("should render list of categories", async () => {
    expect(
      await screen.findByRole("button", { name: /smartphones/i }),
    ).toBeDefined();
  });

  it("should show products", async () => {
    expect(
      await screen.getByRole("button", { name: /smartphones/i }),
    ).toBeDefined();
    const fragrances = screen.getByRole("button", { name: /fragrances/i });
    expect(fragrances).toBeDefined();
    const noProducts = screen.getByText(/select a category/i);

    fireEvent.click(fragrances);
    waitForElementToBeRemoved(noProducts);

    const p1 = await screen.findByRole("checkbox", {
      name: /Eau De Perfume Spray/i,
    });
    const p2 = await screen.findByRole("checkbox", {
      name: /Non-Alcoholic Concentrated Perfume Oil/i,
    });
    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
    fireEvent.click(p1);
    fireEvent.click(p2);
    expect(await screen.findByRole("table")).toBeDefined();
    expect(
      screen.getByText(/Original Al Munakh® by Mahal Al Musk/i),
    ).toBeDefined();
    const desc = screen.getByRole("checkbox", { name: /description/i });

    expect(desc).toBeDefined();
    fireEvent.click(desc);
    expect(
      screen.queryByText(/Original Al Munakh® by Mahal Al Musk/i),
    ).toBeNull();
  });
});
