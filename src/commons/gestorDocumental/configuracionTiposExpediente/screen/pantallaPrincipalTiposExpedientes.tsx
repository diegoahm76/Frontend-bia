/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { ConfiguracionTerna } from '../components/comfiguracionTerna/ConfiguracionTerna';

export const PantallaPrincipalConfiguracoinTiposExpediente: React.FC =
  () => {
    return (
      <>
        <Grid item xs={12}>
            <ConfiguracionTerna/>
        </Grid>

     
      </>
    );
  };
