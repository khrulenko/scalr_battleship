import MUITable from '@mui/material/Table';

interface Props {
  children: any;
}

const Table = ({ children }: Props) => (
  <MUITable>
    <tbody>{children}</tbody>
  </MUITable>
);
export default Table;
