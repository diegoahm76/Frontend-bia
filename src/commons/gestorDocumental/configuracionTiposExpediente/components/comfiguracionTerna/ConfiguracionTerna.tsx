/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';

export const ConfiguracionTerna: React.FC = () => {


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
          <Title title="Seleccionar Archivos" />
        </Grid>

    
      </Grid>
    </>
  );
};
