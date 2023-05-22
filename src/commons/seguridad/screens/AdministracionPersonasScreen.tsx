import { useState } from 'react';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type { InfoPersona } from '../../../interfaces/globalModels';
import { Grid } from '@mui/material';
import { Title } from '../../../components/Title';
import 'react-datepicker/dist/react-datepicker.css';
import { AdministracionPersonasScreenNatural } from '../../auth/components/AdministradorPersonaNatural/AdministradorPersonaNatural';
import { AdministracionPersonasScreenJuridica } from '../../auth/components/AdministrarPersonaJuridica/AdministradorPersonaJuridica';
import { RegisterAdministradorPersona } from '../../auth/components/RegisterAdministradorPersona/RegisterAdministradorPersona';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
  const [persona, set_persona] = useState<InfoPersona>();
  const [is_register, set_is_register] = useState(false);

  const on_result = (info_persona: InfoPersona): void => {
    console.log("info_persona", info_persona)
    set_is_register(false)
    if (info_persona !== undefined) {
      set_persona(info_persona);
    } else {
      set_is_register(true);
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
          {is_register && (
            <>
              <RegisterAdministradorPersona uso_interno={false} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
