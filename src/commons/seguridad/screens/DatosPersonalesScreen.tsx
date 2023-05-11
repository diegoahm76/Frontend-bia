import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Stack } from '@mui/material';
import { type AuthSlice } from '../../auth/interfaces';
import { type SeguridadSlice } from '../interfaces';
import {
  DatosIdentificacionComponent,
  DatosEmpresarialesComponent,
  DatosNotificacionNacional,
  DatosRepresentanteLegalComponent,
  DatosAdicionales,
} from '../components/datosPersonales';
import { Title } from '../../../components';
import { get_data_legal_person } from '../store';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosPersonalesScreen: React.FC = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { legal_person } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_data_legal_person(userinfo.id_usuario) as any);
  }, [userinfo]);

  console.log(legal_person);

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Datos de identificacion"></Title>
          <DatosIdentificacionComponent legal_person={legal_person} />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Datos empresariales"></Title>
          <DatosEmpresarialesComponent />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Datos de notificacion nacional"></Title>
          <DatosNotificacionNacional />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Datos de notificacion nacional"></Title>
          <DatosRepresentanteLegalComponent />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Datos adicionales"></Title>
          <DatosAdicionales />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ p: '40px' }}
      >
        <Button color="success" variant="contained">
          Actualizar
        </Button>
        <Button color="error" variant="contained">
          Cancelar
        </Button>
      </Stack>
    </>
  );
};
