/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { useContext } from 'react';
import { RequerimientoAlUsuarioOPASContext } from '../../../../../OPAS/requerimientosUsuarioOpas/context/RequerimientoUsarioOpasContext';
import { Title } from '../../../../../../../../../components';


export const PersonaTitular = (): JSX.Element => {

  {/*datos deben salir de una mixtura del objeto de autenticación y */}

    //* context declaration
    const { infoInicialUsuario } = useContext(RequerimientoAlUsuarioOPASContext);
  

  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Información de la persona titular" />
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
              InputLabelProps={{ shrink: true }}
              value={infoInicialUsuario?.dataTitular?.data?.nombres ?? 'N/A'}
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
              value={infoInicialUsuario?.dataTitular?.data?.apellidos ?? 'N/A'}
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
              value={infoInicialUsuario?.dataTitular?.data?.tipo_documento ?? 'N/A'}
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
              value={infoInicialUsuario?.dataTitular?.data?.numero_documento ?? 'N/A'}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
