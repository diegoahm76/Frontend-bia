/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext } from 'react';
import { SolicitudAlUsuarioContext } from '../../../../context/SolicitudUsarioContext';
import { Input } from '@mui/material';

export const PerSolicitaComplemento = (): JSX.Element => {
  //* context declaration
  const { infoInicialUsuario } = useContext(SolicitudAlUsuarioContext);

  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
        justifyContent: 'center',
      }}
    >
      <Title title="Persona que solicita el complemento de información" />
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
              value={infoInicialUsuario?.dataSolicita?.data?.nombres}
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
              value={infoInicialUsuario?.dataSolicita?.data?.apellidos}
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
              value={infoInicialUsuario?.dataSolicita?.data?.tipo_documento}
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
              value={infoInicialUsuario?.dataSolicita?.data?.numero_documento}
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
              value={infoInicialUsuario?.dataSolicita?.data?.unidad_organizacional_actual}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
