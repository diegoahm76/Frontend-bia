/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext } from 'react';
import { SolicitudAlUsuarioContext } from '../../../../context/SolicitudUsarioContext';

export const PersonaTitular = (): JSX.Element => {

  {/*datos deben salir de una mixtura del objeto de autenticación y */}

    //* context declaration
    const { infoInicialUsuario } = useContext(SolicitudAlUsuarioContext);
  

  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Persona titular de la PQRSDF" />
      <form
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombres"
              variant="outlined"
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
              value={infoInicialUsuario?.dataSolicita?.data?.numero_documento}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
