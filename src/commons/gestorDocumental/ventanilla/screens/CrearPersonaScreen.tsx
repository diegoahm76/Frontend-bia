// Components Material UI
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { AdminVentanilla } from '../registroPersonas/AdminVentanilla';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPersonaScreen: React.FC = () => {
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
          <Title title="Crear Personas - Formulario de registro" />
          <br />
          <AdminVentanilla />
        </Grid>
      </Grid>
    </>
  );
};
