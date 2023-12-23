/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { ListarMetas } from '../components/Indicadores/ListarMetas';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Agregarmeta } from '../components/Indicadores/Agregarmeta';
import { useEffect } from 'react';
import { set_current_mode_planes } from '../../store/slice/indexPlanes';
import { ListarIndicador } from '../components/Indicadores/ListarIndicador';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaAvanzadaIndicadores } from '../components/Indicadores/BusquedaAvanzada/BusquedaAvanzadaIndicadores';
import { BusquedaMetas } from '../components/Indicadores/BusquedaAvanzada/BusquedaMetas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MetasScreen: React.FC = () => {
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
          <Title title="Metas por indicador " />
        </Grid>
      </Grid>
      <BusquedaAvanzadaIndicadores />
      {/* <ListarIndicador /> */}
      {mode.ver ? <ListarMetas /> : null}
      {mode.crear || mode.editar ? <Agregarmeta /> : null}
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
        <BusquedaMetas />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};
