/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type React from 'react';
import { useContext } from 'react';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { DataContext } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarSubseccion: React.FC = () => {
  const { info_subseccion } = useContext(DataContext);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Información subsección
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Persona Creadora"
          type="text"
          value={info_subseccion?.nombre_completo}
          disabled
          fullWidth
          autoFocus
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Fecha"
          type="text"
          value={info_subseccion?.fechaCreacion}
          disabled
          fullWidth
          autoFocus
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre subsección"
          fullWidth
          disabled
          autoFocus
          size="small"
          value={info_subseccion?.nombre}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Descripción subsección"
          multiline
          fullWidth
          disabled
          autoFocus
          size="small"
          value={info_subseccion?.descripcion}
        />
      </Grid>
    </>
  );
};
