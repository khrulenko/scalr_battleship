import { Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  checkPlacement,
  getRandomShipStart,
  placeShip,
} from './common/helpers';
import MainLayout from './components/MainLayout';
import { Field } from './common/types';
import { getEmptyField } from './common/utils';
import Table from './components/Table';
import TableCell from './components/TableCell';

const emptyField: Field = getEmptyField(10);
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

const App = () => {
  const [field, fieldSet] = useState<Field>(emptyField);
  const [justRefreshed, justRefreshedSet] = useState<boolean>(false);

  const placeShips = () => {
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
    justRefreshedSet(true);
  };

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
          {field.map((row, ri) => {
            return (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <TableCell
                    key={`${ci}` + `${ri}`}
                    isShipCell={!!cell}
                    wasFieldRefreshed={justRefreshed}
                    wasFieldRefreshedSet={justRefreshedSet}
                  />
                ))}
              </tr>
            );
          })}
        </Table>
      </Paper>

      <Button onClick={placeShips} variant="contained" size="large">
        REFRESH SHIPS
      </Button>
    </MainLayout>
  );
};

export default App;
