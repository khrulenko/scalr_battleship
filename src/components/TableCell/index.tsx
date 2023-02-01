import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import MUITableCell from '@mui/material/TableCell';
import { createCellStyles } from './styles';
import { AnyFunction } from '../../common/types';

interface CommonProps {
  isShipCell: boolean;
}

interface TableCell {
  wasFieldRefreshed: boolean;
  wasFieldRefreshedSet: AnyFunction;
}

interface Cell {
  wasHit: boolean;
}

export type TableCellProps = TableCell & CommonProps;
export type CellProps = Cell & CommonProps;

const Cell = styled(MUITableCell)(createCellStyles);

const TableCell = ({
  isShipCell,
  wasFieldRefreshed,
  wasFieldRefreshedSet,
}: TableCellProps) => {
  const [wasHit, wasHitSet] = useState(false);

  useEffect(() => {
    wasHitSet(false);
    wasFieldRefreshedSet(false);
  }, [wasFieldRefreshed]);

  return (
    <Cell
      isShipCell={isShipCell}
      wasHit={wasHit}
      onClick={() => wasHitSet((prev) => !prev)}
    />
  );
};

export default TableCell;
