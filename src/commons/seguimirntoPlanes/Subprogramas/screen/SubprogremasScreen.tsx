/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AgregarSubprograma } from '../components/Proyectos/AgregarSubprograma';
import { useEffect } from 'react';
import { ListarSubprograma } from '../components/Proyectos/ListarSubprograma';
import { set_current_mode_planes } from '../../store/slice/indexPlanes';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaPrograma } from '../components/BusquedaAvanzada copy/BusquedaPrograma';
import { BusquedaSubprograma } from '../components/BusquedaAvanzada copy/BusquedaSubprograma';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubprogremasScreen: React.FC = () => {
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
          <Title title="Subprogramas " />
        </Grid>
      </Grid>
      <BusquedaPrograma />
      {mode.ver ? <ListarSubprograma /> : null}
      {mode.crear || mode.editar ? <AgregarSubprograma /> : null}
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
        <BusquedaSubprograma />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};
