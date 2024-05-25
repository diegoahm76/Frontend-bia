/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';

import { useContext } from 'react';
import { RequerimientoAlUsuarioOPASContext } from '../../../../context/RequerimientoUsarioOpasContext';
import { Title } from '../../../../../../../../../../components';


export const PerSolicitaRequerimiento = (): JSX.Element => {
  //* context declaration
  const { infoInicialUsuario } = useContext(RequerimientoAlUsuarioOPASContext);

  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
        justifyContent: 'center',
      }}
    >
      <Title title="Persona que solicita el requerimiento" />
      <form
        style={{
          marginTop: '3rem',
          justifyContent: 'center',
        }}
      >
        <Grid
          sx={{
            justifyContent: 'center',
          }}
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombres"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={infoInicialUsuario?.dataSolicita?.data?.nombres ?? 'N/A'}
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Apellidos"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={infoInicialUsuario?.dataSolicita?.data?.apellidos ?? 'N/A'}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Tipo de documento"
              disabled
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={
                infoInicialUsuario?.dataSolicita?.data?.tipo_documento ?? 'N/A'
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Número de documento"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                infoInicialUsuario?.dataSolicita?.data?.numero_documento ??
                'N/A'
              }
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              size="small"
              label="Unidad organizacional solicitante"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                infoInicialUsuario?.dataSolicita?.data
                  ?.unidad_organizacional_actual ?? 'N/A'
              }
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
