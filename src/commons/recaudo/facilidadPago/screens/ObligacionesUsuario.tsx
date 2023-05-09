import { Title } from '../../../../components/Title';
import { TablaObligacionesUsuario } from '../componentes/TablaObligacionesUsuario';
import { Grid, Box, TextField } from "@mui/material";
import { get_obligaciones_usuario } from '../services/services';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesUsuario: React.FC = () => {
  const obligaciones = [
    {
      id: 1,
      nombreObligacion: 'Permiso 1',
      fecha_inicio: '01/01/2015',
      id_expediente: 378765,
      nroResolucion: '378765-143',
      monto_inicial: 120000000,
      valor_intereses: 35000000,
      dias_mora: 390,
    },
    {
      id: 2,
      nombreObligacion: 'Concesion Aguas',
      fecha_inicio: '01/04/2015',
      id_expediente: 3342765,
      nroResolucion: '3342765-4546',
      monto_inicial: 190700000,
      valor_intereses: 45000000,
      dias_mora: 180,
    },
  ];

  useEffect(() => {
    void get_obligaciones_usuario()
  }, [])

  return (
    <>
      <Title title='Listado de Obligaciones del Usuario Externo'/>
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
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombres"
                  size="small"
                  fullWidth
                  value={"nombre_completo"}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={"numero_identificacion"}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={"email"}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
              <p>Sus obligaciones pendientes por pago son las siguientes:</p>
              <TablaObligacionesUsuario obligaciones={obligaciones} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
