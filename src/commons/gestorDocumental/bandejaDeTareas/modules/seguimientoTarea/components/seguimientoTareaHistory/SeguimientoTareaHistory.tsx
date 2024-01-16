/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, Stack } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const SeguimientoTareaHistory = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Grid container sx={containerStyles}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mb: '20px', mt: '20px' }}
      >
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            navigate('/app/gestor_documental/bandeja_tareas/');
            /* handleOpenInfoMetadatos(false);
            handleOpenInfoAnexos(false);
            setMetadatos([]);*/
          }}
          startIcon={<ArrowBackIcon />}
        >
          VOLVER A LA BANDEJA DE TAREAS
        </Button>
      </Stack>
    </Grid>
  );
};
