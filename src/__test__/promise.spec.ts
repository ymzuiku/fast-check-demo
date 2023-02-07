import fc from "fast-check";
import { describe, expect, test } from "vitest";

describe("promise example", () => {
  test("use promise in fast-check", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer().filter((v) => v > 0),
        async (v) => {
          const a = await new Promise((res) => {
            setTimeout(() => {
              res(v > 0);
            });
          });
          expect(a).toBeTruthy();
        }
      )
    );
  });
});
