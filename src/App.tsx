import { useEffect, useState } from 'react';
import {
  checkPlacement,
  getRandomShipStart,
  placeShip,
} from './common/helpers';
import { Field } from './common/types';
import { getEmptyField } from './common/utils';

const emptyField: Field = getEmptyField(10);
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

const App = () => {
  const [field, fieldSet] = useState<Field>(emptyField);

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
  };

  useEffect(() => {
    placeShips();
  }, []);

  return (
    <div>
      <button onClick={placeShips}>PLACE SHIPS</button>

      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {field.map((row, ri) => {
            return (
              <>
                {/* потім видалити */}
                {!ri && (
                  <tr key={'ri'}>
                    {Array(11)
                      .fill('')
                      .map((cell, i) => (
                        <td key={i}>{i - 1}</td>
                      ))}
                  </tr>
                )}
                {/* потім видалити */}

                <tr key={ri}>
                  {row.map((cell, ci) => {
                    return (
                      <>
                        {/* потім видалити */}
                        {!ci && <td key={'ci'}>{ri}</td>}
                        {/* потім видалити */}

                        <td
                          key={`${ci}` + `${ri}`}
                          style={{
                            width: '48px',
                            height: '48px',

                            border: `1px solid ${cell ? 'white' : 'black'}`,
                            backgroundColor: cell ? 'black' : 'white',
                          }}
                        ></td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
