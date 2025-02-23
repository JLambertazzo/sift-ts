import sift, { Siftable, Sifter } from "./basic";

describe("sift function correctly identifies matches to given item", () => {
  it.each<Sifter<Siftable>>([
    { a: 1 },
    { [2]: "a certain value" },
    { [Symbol.for("key3")]: true },
    {},
    { a: 1, [Symbol.for("key3")]: true },
  ])("identifies that the sifter does match the given item", (sifter) => {
    const item = {
      a: 1,
      [2]: "a certain value",
      [Symbol.for("key3")]: true,
    } as const;

    expect(sift(sifter)(item)).toStrictEqual(true)
  });
});
