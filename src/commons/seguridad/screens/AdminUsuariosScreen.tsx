import { Card, Grid } from '@mui/material';
import { Title } from '../../../components';
import { AdminUsuarios } from '../components/AdminUsuarios';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUsuariosScreen: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card variant="outlined" sx={{ borderRadius: 5, padding: '20px' }}>
          <Title title="Administrar usuarios" />
          <AdminUsuarios />
        </Card>
      </Grid>
    </Grid>
  );
};
