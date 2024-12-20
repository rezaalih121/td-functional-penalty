import { expect, test, beforeEach } from "bun:test";
import { increment } from "../src/functional-core/functions";
test("increment should return 2 when counter = 1", () => {
  const counter: number = 1;
  expect(increment(counter)).toEqual(2);
});
