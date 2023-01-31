import { CSSObject, Theme } from '@mui/material';

export type AnyFunction = (...args: any[]) => any;

export type PropsWithTheme<T = any> = { theme: Theme } & T;
export type StyleFunction<T = any> = ({}: PropsWithTheme<T>) => CSSObject;

export type Field = number[][];
export type CellCoords = number[];
export type Vector = 'up' | 'down' | 'right' | 'left';
export type Vectors = Vector[];
export type ShipStart = [number, number, Vector];
