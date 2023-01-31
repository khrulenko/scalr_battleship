import { CellCoords } from './types';

const isUndefined = (value: any): boolean => typeof value === 'undefined';

const getEmptyField = (size: number) => Array(10).fill(Array(10).fill(0));

const getRandomNumberUntil = (max: number): number =>
  Math.floor(Math.random() * max);

const isCoordOnField = (coord: number): boolean => coord >= 0 && coord <= 9;

const isCellOnField = ([cellXCoord, cellYCoord]: CellCoords): boolean =>
  isCoordOnField(cellXCoord) && isCoordOnField(cellYCoord);

export { isUndefined, getEmptyField, getRandomNumberUntil, isCellOnField };
