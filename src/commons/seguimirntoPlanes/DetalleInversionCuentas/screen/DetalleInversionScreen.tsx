/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { ListarDetalleInversion } from '../components/Components/ListarDetalleInversion';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AgregarDetalleInversion } from '../components/Components/AgregarDetalleInversion';
import { useEffect } from 'react';
import { set_current_mode_planes } from '../../store/slice/indexPlanes';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaMetas } from '../components/Components/BusquedaAvanzada/BusquedaMetas';
import { BusuquedaDetalleInversion } from '../components/Components/BusquedaAvanzada/BusuquedaDetalleInversion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetalleInversionScreen: React.FC = () => {
  const { mode } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      set_current_mode_planes({
        ver: false,
        crear: false,
        editar: false,
      })
    );
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Detalle inversión cuentas " />
        </Grid>
      </Grid>
      <BusquedaMetas />
      {mode.ver ? <ListarDetalleInversion /> : null}
      {mode.crear || mode.editar ? <AgregarDetalleInversion /> : null}
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
        justifyContent="flex-end"
      >
        <BusuquedaDetalleInversion />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};
