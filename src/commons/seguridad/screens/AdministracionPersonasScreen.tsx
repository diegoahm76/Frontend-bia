import { useState } from 'react';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type { InfoPersona } from '../../../interfaces/globalModels';
import { Grid } from '@mui/material';
import { Title } from '../../../components/Title';
import 'react-datepicker/dist/react-datepicker.css';
import { AdministracionPersonasScreenNatural } from '../../auth/components/AdministradorPersonaNatural';
import { AdministracionPersonasScreenJuridica } from '../../auth/components/AdministradorPersonaJuridica';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
  const [persona, set_persona] = useState<InfoPersona>();

  const on_result = (info_persona: InfoPersona): void => {
    if (
      info_persona !== null ||
      info_persona !== undefined ||
      info_persona !== ''
    ) {
      set_persona(info_persona);
    }
  };

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
        <Grid item xs={12} spacing={2}>
          <Title title="ADMINISTRADOR DE PERSONAS" />
          <BuscadorPersona onResult={on_result} />
          {persona?.tipo_persona === 'N' && (
            <AdministracionPersonasScreenNatural data_all={persona} />
          )}
          {persona?.tipo_persona === 'J' && (
            <>
              <AdministracionPersonasScreenJuridica data_all={persona} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
