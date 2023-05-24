import { it, describe } from "vitest";
import { transformEvents } from "../utils";

describe("utility methods", () => {
  it("transformEvents should delete empty markets", () => {
    const events = [
      {
        id: "a",
        name: "b",
        markets: [{ id: "mkt1" }],
      },
      {
        id: "v",
        name: "d",
        markets: [],
      },
    ];
    expect(transformEvents(events)).toEqual([
      {
        id: "a",
        name: "b",
        markets: [
          {
            id: "mkt1",
          },
        ],
      },
    ]);
  });
});
