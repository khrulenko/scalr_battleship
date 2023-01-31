import { Stack } from '@mui/material';

interface Props {
  children: any;
}

const MainLayout = ({ children }: Props) => {
  return (
    <Stack p={3}>
      <Stack width="100%" spacing={3} alignItems="center">
        {children}
      </Stack>
    </Stack>
  );
};

export default MainLayout;
