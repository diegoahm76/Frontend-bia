import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { AgregarCartera } from '../components/CarteraAforos/AgregarCartera';
import { useAppSelector } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SeleccionarAforo } from '../components/CarteraAforos/SeleccionarAforo';
import { EditarCartera } from '../components/CarteraAforos/EditarCartera';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraAforosScreen: React.FC = () => {
  const { mode_carteras } = useAppSelector((state) => state.instrumentos_slice);
  const { id_instrumento } = useAppSelector(
    (state) => state.instrumentos_slice
  );
  const navigate = useNavigate();

  console.log('mode_carteras', mode_carteras);

  useEffect(() => {
    if (id_instrumento === 0) {
      navigate('/app/recurso_hidrico/instrumentos/instrumentos', {
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
          <Title title="CARTERA DE AFOROS " />
        </Grid>
      </Grid>
      {mode_carteras.crear ? (<AgregarCartera />): null}
      {mode_carteras.ver ? (<SeleccionarAforo />): null}
      {mode_carteras.editar ? (<EditarCartera />): null}
    </>
  );
};
