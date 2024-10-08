/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { AgregarLaboratorio } from '../components/ResultadoLaboratorio/AgregarLaboratorio';
import { useAppSelector } from '../../../../hooks';
import { SeleccionarLaboratorio } from '../components/ResultadoLaboratorio/SeleccionarLaboratorio';
import { EditarLaboratorio } from '../components/ResultadoLaboratorio/EditarLaboratorio';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroLaboratorio: React.FC = () => {
  const { mode } = useAppSelector((state) => state.instrumentos_slice);
  const { id_instrumento } = useAppSelector(
    (state) => state.instrumentos_slice
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (id_instrumento === 0) {
      navigate('/app/recurso_hidrico/biblioteca/instrumentos/administracion', {
        replace: true,
      });
    }
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
          <Title title="Resultado de laboratorio - calidad de agua " />
        </Grid>
      </Grid>
      {mode.crear && <AgregarLaboratorio />}
      {mode.editar && <EditarLaboratorio />}
      {mode.ver && <SeleccionarLaboratorio />}
    </>
  );
};
