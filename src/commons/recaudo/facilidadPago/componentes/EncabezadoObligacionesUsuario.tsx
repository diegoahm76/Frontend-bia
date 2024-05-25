import { Grid, Box, TextField } from "@mui/material";
import { useSelector } from 'react-redux';
import { type ObligacionesUsuario } from '../interfaces/interfaces';
import { Title } from '../../../../components/Title';

interface RootState {
  obligaciones: {
    obligaciones: ObligacionesUsuario;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EncabezadoObligacionesUsuario: React.FC = () => {
  const { obligaciones } = useSelector((state: RootState) => state.obligaciones);

  return (
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >


        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item  xs={12}>
                <Title title='Listado de Obligaciones del Usuario Externo'/>
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <TextField
                  disabled
                  label="Nombres"
                  size="small"
                  fullWidth
                  value={`${obligaciones.nombre_completo||"Sin Obligaciones"}`}
                />
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={`${obligaciones.numero_identificacion||"Sin Obligaciones"}`}
                />
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={`${obligaciones.email||"Sin Obligaciones"}`}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
  )
}
