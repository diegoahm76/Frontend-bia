/* eslint-disable @typescript-eslint/naming-convention */
import { Box, CircularProgress } from '@mui/material';
import { type FC } from 'react';

export const Loader: FC<any> = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};
