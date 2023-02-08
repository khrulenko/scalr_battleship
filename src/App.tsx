import { Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  areCoordsEqual,
  checkPlacement,
  getRandomShipStart,
  placeShip,
} from './common/helpers';
import MainLayout from './components/MainLayout';
import { Field, CellCoords } from './common/types';
import { getEmptyField } from './common/utils';
import Table from './components/Table';
import TableCell from './components/TableCell';

const emptyField: Field = getEmptyField(10);
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

const App = () => {
  const [field, fieldSet] = useState<Field>(emptyField);
  const [hitCells, hitCellsSet] = useState<CellCoords[]>([]);

  const placeShips = () => {
    hitCellsSet([]);

    let newfield = emptyField;

    ships.forEach((ship) => {
      let isRandomPlacementValid = false;

      do {
        const randomPlacement = getRandomShipStart();
        isRandomPlacementValid = checkPlacement(
          randomPlacement,
          ship,
          newfield
        );

        if (isRandomPlacementValid) {
          newfield = placeShip(randomPlacement, ship, newfield);
        }
      } while (!isRandomPlacementValid);
    });

    fieldSet(newfield);
  };

  const addHitCell = (coords: CellCoords) =>
    hitCellsSet((currentHitCells) => {
      const newHitCells = [...currentHitCells];
      newHitCells.push(coords);

      return newHitCells;
    });

  const deleteHitCell = (coords: CellCoords) =>
    hitCellsSet((currentHitCells) =>
      currentHitCells.filter((hitCell) => !areCoordsEqual(hitCell, coords))
    );

  useEffect(() => {
    placeShips();
  }, []);

  return (
    <MainLayout>
      <Typography variant="h1" fontSize="72px">
        Battleship
      </Typography>

      <Paper>
        <Table>
          {field.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => {
                const wasHit = hitCells.some((coords) =>
                  areCoordsEqual(coords, [ci, ri])
                );

                return (
                  <TableCell
                    key={`${ci}` + `${ri}`}
                    coords={[ci, ri]}
                    wasHit={wasHit}
                    isShipCell={!!cell}
                    addHitCell={addHitCell}
                    deleteHitCell={deleteHitCell}
                  />
                );
              })}
            </tr>
          ))}
        </Table>
      </Paper>

      <Button onClick={placeShips} variant="contained" size="large">
        REFRESH SHIPS
      </Button>
    </MainLayout>
  );
};

export default App;
