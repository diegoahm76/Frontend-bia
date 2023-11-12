/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { ListarPlanes } from '../components/Programas/ListarPlanes';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { AgregarPrograma } from '../components/Programas/AgregarPrograma';
import { useEffect } from 'react';
import { ListarPrograma } from '../components/Programas/ListarPrograma';
import { set_current_mode_planes } from '../../store/slice/indexPlanes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProgramasScreen: React.FC = () => {
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
          <Title title="Programas " />
        </Grid>
      </Grid>
      <ListarPlanes />
      {mode.ver ? <ListarPrograma /> : null}
      {mode.crear || mode.editar ? <AgregarPrograma /> : null}
    </>
  );
};
