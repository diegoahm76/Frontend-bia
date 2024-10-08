/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AgregarIndicacdor } from '../components/Programas/AgregarIndicacdor';
import { useEffect } from 'react';
import { set_current_mode_planes } from '../../store/slice/indexPlanes';
import { ListarIndicador } from '../components/Programas/ListarIndicador';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaActividad } from '../components/Programas/BusquedaAvanzada/BusquedaActividad';
import { BusquedaAvanzadaIndicadores } from '../components/Programas/BusquedaAvanzada/BusquedaAvanzadaIndicadores';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IndicadoresScreen: React.FC = () => {
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
          <Title title="Indicadores " />
        </Grid>
      </Grid>
      <BusquedaActividad />
      {mode.ver ? <ListarIndicador /> : null}
      {mode.crear || mode.editar ? <AgregarIndicacdor /> : null}
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
        <BusquedaAvanzadaIndicadores />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};
