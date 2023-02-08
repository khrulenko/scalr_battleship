import { MouseEvent } from 'react';
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
  wasHit: boolean;
}

interface TableCell {
  coords: CellCoords;
  addHitCell: AnyFunction;
  deleteHitCell: AnyFunction;
}

//TODO: think whether this interface is needed
interface Cell {}

export type TableCellProps = TableCell & CommonProps;
export type CellProps = Cell & CommonProps;

const HorisontalCoord = styled('div')(createHorisontalCoordStyles);
const VerticalCoord = styled('div')(createVerticalCoordStyles);
const Cell = styled(MUITableCell)(createCellStyles);

const TableCell = ({
  coords,
  wasHit,
  isShipCell,
  addHitCell,
  deleteHitCell,
}: TableCellProps) => {
  const [cellIndex, rowIndex] = coords;
  const isFirstRow = rowIndex === 0;
  const isFirstCell = cellIndex === 0;

  const handler = wasHit ? deleteHitCell : addHitCell;
  const onClickHandler = isShipCell ? () => handler(coords) : undefined;

  const stopEventPropagation = (event: MouseEvent<HTMLElement>) =>
    event.stopPropagation();

  return (
    <Cell isShipCell={isShipCell} wasHit={wasHit} onClick={onClickHandler}>
      {isFirstRow && (
        <HorisontalCoord onClick={stopEventPropagation}>
          {cellIndex + 1}
        </HorisontalCoord>
      )}

      {isFirstCell && (
        <VerticalCoord onClick={stopEventPropagation}>
          {getLetterByIndx(rowIndex)}
        </VerticalCoord>
      )}
    </Cell>
  );
};

export default TableCell;
