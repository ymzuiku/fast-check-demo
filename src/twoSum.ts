export const twoSum = (list: number[], target: number) => {
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
