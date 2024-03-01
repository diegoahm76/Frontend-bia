/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material';
import { type FC } from 'react';

export const Loader: FC<any> = (props: any): JSX.Element => {
  const { altura } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        height: altura || '100vh',
      }}
    >
      <CircularProgress size={65} />
      <Typography variant="body1" marginTop={6}>
        Cargando información...
      </Typography>
    </Box>
  );
};
