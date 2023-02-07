import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { twoSum } from "../twoSum";

const realTwoSum = (list: number[], target: number) => {
  const cache: Record<number, number> = {};
  for (let i = 0; i < list.length; i++) {
    const v = list[i];
    if (cache[target - v] !== void 0) {
      return [i, cache[target - v]];
    }
    cache[v] = i;
  }
  return [];
};

describe("how to create success test property", () => {
  it("should two sum success", () => {
    fc.assert(
      fc.property(
        // create some number[], the list length / 2 and length / 3 is sum of length * 2
        fc.array(fc.integer().filter((v) => v >= 0)).filter((list) => {
          // need has success result
          if (list.length < 2) {
            return false;
          }
          const a = ~~(list.length / 2);
          const b = ~~(list.length / 3);
          const target = list.length * 2;
          if (a === b) {
            return false;
          }

          // get success indexs
          const result = realTwoSum(list, target);
          return (
            (result[0] === a && result[1] === b) ||
            (result[1] === a && result[0] === b)
          );
        }),
        (list) => {
          const target = list.length * 2;

          expect(twoSum(list, target)).deep.oneOf([
            [~~(list.length / 2), ~~(list.length / 3)],
            [~~(list.length / 2), ~~(list.length / 3)].reverse(),
          ]);
        }
      ),
      { numRuns: 50 }
    );
  });
});
