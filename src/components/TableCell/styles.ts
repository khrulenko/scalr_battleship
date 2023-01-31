import { TableCellProps as MUITableCellProps } from '@mui/material';
import { CellProps, TableCellProps } from '.';
import { StyleFunction } from '../../common/types';

const createCellStyles: StyleFunction<
  MUITableCellProps & CellProps & TableCellProps
> = ({
  theme: {
    spacing,
    breakpoints: { down },
  },
  isShipCell,
  wasHit,
}) => {
  const shipCellColor = wasHit ? 'red' : 'black';

  const getPseudoStyles = () => ({
    display: isShipCell && wasHit ? 'block' : 'none',
    content: '""',
    position: 'absolute',

    top: '0',
    left: '50%',

    width: '1px',
    height: spacing(6),

    backgroundColor: 'black',
  });

  return {
    position: 'relative',

    width: spacing(6),
    height: spacing(6),

    border: '1px solid',
    borderColor: isShipCell ? 'white' : 'black',
    backgroundColor: isShipCell ? shipCellColor : 'white',

    cursor: isShipCell ? 'pointer' : '',

    ':before': {
      rotate: '45deg',
      ...getPseudoStyles(),
    },

    ':after': {
      rotate: '-45deg',
      ...getPseudoStyles(),
    },

    [down('md')]: {
      width: spacing(5),
      height: spacing(5),

      ':before': {
        height: spacing(5),
      },

      ':after': {
        height: spacing(5),
      },
    },

    [down('sm')]: {
      width: spacing(4),
      height: spacing(4),

      ':before': {
        height: spacing(4),
      },

      ':after': {
        height: spacing(4),
      },
    },
  };
};

export { createCellStyles };
