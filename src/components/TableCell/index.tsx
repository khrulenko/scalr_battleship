import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import MUITableCell from '@mui/material/TableCell';
import { createCellStyles } from './styles';
import { AnyFunction } from '../../common/types';

export interface TableCellProps {
  isShipCell: boolean;
  wasFieldRefreshed: boolean;
  wasFieldRefreshedSet: AnyFunction;
}

export interface CellProps {
  isShipCell: boolean;
  wasHit: boolean;
}

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
