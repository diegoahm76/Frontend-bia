/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, CircularProgress } from '@mui/material';
import { type FC } from 'react';

export const Loader: FC<any> = (props: any): JSX.Element => {
  const { altura } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: altura || '100vh'
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};
