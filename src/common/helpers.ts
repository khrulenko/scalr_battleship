import { AnyFunction, CellCoords, Field, ShipStart, Vectors } from './types';
import { getRandomNumberUntil, isCellOnField } from './utils';

const getTopCoordsFrom = ([x, y]: CellCoords) => [x, y - 1];
const getBottomCoordsFrom = ([x, y]: CellCoords) => [x, y + 1];
const getRightCoordsFrom = ([x, y]: CellCoords) => [x + 1, y];
const getLeftCoordsFrom = ([x, y]: CellCoords) => [x - 1, y];

const getTopRightCoordsFrom = ([x, y]: CellCoords) =>
  getRightCoordsFrom(getTopCoordsFrom([x, y]));

const getTopLeftCoordsFrom = ([x, y]: CellCoords) =>
  getLeftCoordsFrom(getTopCoordsFrom([x, y]));

const getBottomRightCoordsFrom = ([x, y]: CellCoords) =>
  getRightCoordsFrom(getBottomCoordsFrom([x, y]));

const getBottomLeftCoordsFrom = ([x, y]: CellCoords) =>
  getLeftCoordsFrom(getBottomCoordsFrom([x, y]));

const getValueByCoords = ([x, y]: CellCoords, field: Field) => field[y][x];

const isCellValid = (cellCoords: CellCoords, field: Field) => {
  const surroundingCellsCoords = [
    getTopCoordsFrom,
    getBottomCoordsFrom,
    getRightCoordsFrom,
    getLeftCoordsFrom,
    getTopRightCoordsFrom,
    getTopLeftCoordsFrom,
    getBottomRightCoordsFrom,
    getBottomLeftCoordsFrom,
  ].map((callback) => callback(cellCoords));

  return surroundingCellsCoords.every((cellCoords) => {
    if (!isCellOnField(cellCoords)) return true;

    return getValueByCoords(cellCoords, field) === 0;
  });
};

const getRandomShipStart = (): ShipStart => {
  const vectors: Vectors = ['up', 'down', 'right', 'left'];
  const vectorIndex = Math.floor(Math.random() * 3);

  return [
    getRandomNumberUntil(9),
    getRandomNumberUntil(9),
    vectors[vectorIndex],
  ];
};

const createRangeCheckers = ([x, y]: CellCoords, shipLength: number) => {
  const cellsAfterStart = shipLength - 1;

  const checkIfInDownRange = (index: number): boolean =>
    index >= y && index <= y + cellsAfterStart;

  const checkIfInUpRange = (index: number): boolean =>
    index <= y && index >= y - cellsAfterStart;

  const checkIfInRightRange = (index: number): boolean =>
    index >= x && index <= x + cellsAfterStart;

  const checkIfInLeftRange = (index: number): boolean =>
    index <= x && index >= x - cellsAfterStart;

  return {
    checkIfInDownRange,
    checkIfInUpRange,
    checkIfInRightRange,
    checkIfInLeftRange,
  };
};

const checkPlacement = (
  [x, y, vector]: ShipStart,
  shipLength: number,
  field: Field
): boolean => {
  const isCellOccupied = getValueByCoords([x, y], field) === 1;

  if (isCellOccupied) return false;

  const cellsAfterStart = shipLength - 1;

  const {
    checkIfInDownRange,
    checkIfInUpRange,
    checkIfInRightRange,
    checkIfInLeftRange,
  } = createRangeCheckers([x, y], shipLength);

  const checkHorisontal = (checkIfInRange: AnyFunction): boolean =>
    field.every((row, rowIndx) =>
      checkIfInRange(rowIndx) ? isCellValid([x, rowIndx], field) : true
    );

  const checkVertical = (checkIfInRange: AnyFunction): boolean =>
    field.every((row, ri) =>
      ri === y
        ? row.every((cell, ci) =>
            checkIfInRange(ci) ? isCellValid([ci, y], field) : true
          )
        : true
    );

  // checks
  if (vector === 'down') {
    if (y + cellsAfterStart > 9) return false;

    return checkHorisontal(checkIfInDownRange);
  }

  if (vector === 'up') {
    if (y - cellsAfterStart < 0) return false;

    return checkHorisontal(checkIfInUpRange);
  }

  if (vector === 'right') {
    if (x + cellsAfterStart > 9) return false;

    return checkVertical(checkIfInRightRange);
  }

  if (x - cellsAfterStart < 0) return false;

  return checkVertical(checkIfInLeftRange);
};

const placeShip = (
  [x, y, vector]: ShipStart,
  shipLength: number,
  field: Field
) => {
  const {
    checkIfInDownRange,
    checkIfInUpRange,
    checkIfInRightRange,
    checkIfInLeftRange,
  } = createRangeCheckers([x, y], shipLength);

  const placeVertically = (checkIfInRange: AnyFunction) => {
    const newField = field.map((row, ri) => {
      if (checkIfInRange(ri)) {
        const newRow = [...row];
        newRow[x] = 1;

        return newRow;
      }

      return row;
    });

    return newField;
  };

  const placeHorisontally = (checkIfInRange: AnyFunction) => {
    const newField = field.map((row, ri) => {
      if (ri === y) {
        return row.map((cell, ci) => (checkIfInRange(ci) ? 1 : cell));
      }

      return row;
    });

    return newField;
  };

  if (vector === 'down') return placeVertically(checkIfInDownRange);

  if (vector === 'up') return placeVertically(checkIfInUpRange);

  if (vector === 'right') return placeHorisontally(checkIfInRightRange);

  return placeHorisontally(checkIfInLeftRange);
};

export {
  getValueByCoords,
  isCellValid,
  getRandomShipStart,
  createRangeCheckers,
  checkPlacement,
  placeShip,
};
