/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { useAppSelector } from '../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../components';

export const PersonaTitular = (): JSX.Element => {

  {/*datos deben salir de una mixtura del objeto de autenticación y */}

    //* context declaration
    // const { infoInicialUsuario } = useContext(ResRequerimientoOpaContext);
    const { currentPersonaRespuestaUsuario } = useAppSelector(state => state.ResRequerimientoOpaSlice);
  

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
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombre completo"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={currentPersonaRespuestaUsuario?.nombre_completo ?? 'N/A'}
              inputProps={{
                maxLength: 50,
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
              value={currentPersonaRespuestaUsuario?.tipo_documento ?? 'N/A'}
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
              value={currentPersonaRespuestaUsuario?.numero_documento ?? 'N/A'}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
