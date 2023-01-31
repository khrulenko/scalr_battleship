import { useState } from 'react';
import { styled } from '@mui/material';
import MUITableCell from '@mui/material/TableCell';
import { createCellStyles } from './styles';

export interface TableCellProps {
  isShipCell: boolean;
}

export interface CellProps {
  wasHit: boolean;
}

const Cell = styled(MUITableCell)(createCellStyles);

const TableCell = ({ isShipCell }: TableCellProps) => {
  const [wasHit, wasHitSet] = useState(false);

  return (
    <Cell
      isShipCell={isShipCell}
      wasHit={wasHit}
      onClick={() => wasHitSet((prev) => !prev)}
    />
  );
};

export default TableCell;
