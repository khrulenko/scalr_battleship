const isUndefined = (value: any): boolean => typeof value === 'undefined';

const getEmptyField = (size: number) => Array(10).fill(Array(10).fill(0));

const getRandomNumberUntil = (max: number): number =>
  Math.floor(Math.random() * max);

export { isUndefined, getEmptyField, getRandomNumberUntil };
