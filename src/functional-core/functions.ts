type NumberToNumberFn = (x: number) => number;

const increment: NumberToNumberFn = (x: number) => x + 1;

export { increment, type NumberToNumberFn };
