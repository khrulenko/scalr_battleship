import { TableCellProps as MUITableCellProps } from '@mui/material';
import { CellProps } from '.';
import { StyleFunction } from '../../common/types';

const createCellStyles: StyleFunction<MUITableCellProps & CellProps> = ({
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
    backgroundColor: isShipCell ? shipCellColor : 'white',
    boxShadow: isShipCell ? '0px 0px 0px 0.5px white inset' : '',

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

const createHorisontalCoordStyles: StyleFunction = ({
  theme: {
    breakpoints: { down },
  },
}) => ({
  position: 'absolute',
  top: '-50%',

  height: '20px',

  [down('md')]: {
    top: '-60%',
  },

  [down('sm')]: {
    top: '-70%',
    left: '30%',
  },
});

const createVerticalCoordStyles: StyleFunction = ({
  theme: {
    spacing,
    breakpoints: { down },
  },
}) => ({
  position: 'absolute',
  left: '-50%',

  width: '20px',

  textAlign: 'center',

  [down('md')]: {
    left: '-60%',
  },

  [down('sm')]: {
    left: '-70%',
  },
});

export {
  createCellStyles,
  createHorisontalCoordStyles,
  createVerticalCoordStyles,
};
