// Componentes de Material UI
import { Grid } from '@mui/material';
import { Title } from '../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuditoriaScreen: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Title title="AUDITORIA" />
    </Grid>
  );
};
