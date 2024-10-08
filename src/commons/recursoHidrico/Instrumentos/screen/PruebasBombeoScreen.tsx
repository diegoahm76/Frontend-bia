import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { AgregarBombeo } from '../components/PruebasBombeo/AgregarBombeo';
import { useAppSelector } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { EditarPruebaBombeo } from '../components/PruebasBombeo/EditarPruebaBombeo';
import { SeleccionarPruebaBombeo } from '../components/PruebasBombeo/SeleccionarPruebaBombeo';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PruebasBombeoScreen: React.FC = () => {
  const { mode_bombeo } = useAppSelector((state) => state.instrumentos_slice);

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
          <Title title="PRUEBAS DE BOMBEO " />
        </Grid>
      </Grid>
      {mode_bombeo.crear && <AgregarBombeo />}
      {mode_bombeo.editar && <EditarPruebaBombeo />}
      {mode_bombeo.ver && <SeleccionarPruebaBombeo />}
    </>
  );
};
