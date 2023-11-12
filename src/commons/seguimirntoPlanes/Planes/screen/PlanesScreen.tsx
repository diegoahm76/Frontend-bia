/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { AgregarPlanes } from '../components/Planes/AgregarPlanes';
import { ListarPlanes } from '../components/Planes/ListarPlanes';
import { useAppSelector } from '../../../../hooks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlanesScreen: React.FC = () => {
  const { mode } = useAppSelector((state) => state.planes);

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
          <Title title="Planes" />
        </Grid>
      </Grid>
      <ListarPlanes />
      {mode.crear || mode.editar ? <AgregarPlanes /> : null}
    </>
  );
};
