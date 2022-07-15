export const arrayLessThanFillWith = (
  array: any[],
  min: number,
  fill: any
) => (array.length < min ? Array(min).fill(fill) : array);
