import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { twoSum } from "../twoSum";

describe("use fast-check", () => {
  it("two sum", () => {
    fc.assert(
      fc.property(
        fc
          .array(fc.integer().filter((v) => v >= 0))
          .filter((v) => v[0] + v[1] === 10 && !!v[4]),
        fc.integer().filter((v) => v === 10),
        (list, target) => {
          expect(twoSum(list, target)).deep.oneOf([
            [0, 1],
            [1, 0],
          ]);
        }
      ),
      { numRuns: 50 }
    );
  });
});
