import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import MUITableCell from '@mui/material/TableCell';
import {
  createCellStyles,
  createHorisontalCoordStyles,
  createVerticalCoordStyles,
} from './styles';
import { AnyFunction, CellCoords } from '../../common/types';
import { getLetterByIndx } from '../../common/utils';

interface CommonProps {
  isShipCell: boolean;
}

interface TableCell {
  coords: CellCoords;
  wasFieldRefreshed: boolean;
  wasFieldRefreshedSet: AnyFunction;
}

interface Cell {
  wasHit: boolean;
}

export type TableCellProps = TableCell & CommonProps;
export type CellProps = Cell & CommonProps;

const HorisontalCoord = styled('div')(createHorisontalCoordStyles);
const VerticalCoord = styled('div')(createVerticalCoordStyles);
const Cell = styled(MUITableCell)(createCellStyles);

const TableCell = ({
  coords,
  isShipCell,
  wasFieldRefreshed,
  wasFieldRefreshedSet,
}: TableCellProps) => {
  const [wasHit, wasHitSet] = useState(false);

  const [cellIndex, rowIndex] = coords;
  const isFirstRow = rowIndex === 0;
  const isFirstCell = cellIndex === 0;

  useEffect(() => {
    wasHitSet(false);
    wasFieldRefreshedSet(false);
  }, [wasFieldRefreshed]);

  return (
    <Cell
      isShipCell={isShipCell}
      wasHit={wasHit}
      onClick={() => wasHitSet((prev) => !prev)}
    >
      {isFirstRow && <HorisontalCoord>{cellIndex + 1}</HorisontalCoord>}

      {isFirstCell && (
        <VerticalCoord>{getLetterByIndx(rowIndex)}</VerticalCoord>
      )}
    </Cell>
  );
};

export default TableCell;
