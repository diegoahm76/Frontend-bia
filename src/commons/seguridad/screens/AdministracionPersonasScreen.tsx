import { useEffect, useState } from 'react';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type { InfoPersona } from '../../../interfaces/globalModels';
import {
  Alert,
  Divider,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { Title } from '../../../components/Title';
import 'react-datepicker/dist/react-datepicker.css';

import { use_register } from '../../auth/hooks/registerHook';
import { AdministracionPersonasScreenNatural } from '../../auth/components/admin';
import { AdministracionPersonasScreenJuridica } from '../../auth/components/AdministrarPersonaJuridica/AdministradorPersonaJuridica';
import { CrearPersonaNatAdmin } from '../../auth/components/CrearPersonaNatAdmin/CrearPersonaNatAdmin';
import { CrearPersonaJurAdmin } from '../../auth/components/CrearPersonaJurAdmin/CrearPersonaJurAdmin';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
  const [persona, set_persona] = useState<InfoPersona>();
  const [is_register, set_is_register] = useState(false);
  const [is_update, set_is_update] = useState(false);
  const {
    errors,
    is_valid,
    get_values,
    handle_submit,
    register,
    set_value,
    watch
  } = use_register();

  const on_result = (info_persona: InfoPersona): void => {
    set_is_update(false);
    set_is_register(false);
    if (info_persona !== undefined && info_persona.id_persona !== 0) {
      console.log('info_persona', info_persona);
      set_is_update(true);
      set_persona(info_persona);
    } else {
      set_is_register(true);
      set_persona(info_persona);
    }
  };

  useEffect(() => {
    set_is_update(false);
    if (persona !== undefined) {
      set_is_update(true);
    }
  }, [persona]);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que se actualice is_update o is_register
  }, [is_update, is_register]);

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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12} spacing={2}>
          <Title title="ADMINISTRADOR DE PERSONAS" />
          <BuscadorPersona onResult={on_result} />
          {is_update && (
            <>
              {persona?.tipo_persona === 'N' ? (
                <AdministracionPersonasScreenNatural data_all={persona} />
              ) : (
                <Grid item xs={12}>
                  <Grid container justifyContent="center" textAlign="center">
                    <Alert icon={false} severity="info">
                      <LinearProgress />
                      <Typography>Cargando Información...</Typography>
                    </Alert>
                  </Grid>
                </Grid>
              )}
              {persona?.tipo_persona === 'J' && (
                <>
                  <AdministracionPersonasScreenJuridica data_all={persona} />
                </>
              )}
            </>
          )}
          {is_register && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center" pb={2}>
                    Formulario registro
                  </Typography>
                </Grid>
                {persona?.tipo_persona === 'N' && (
                  <>
                    <CrearPersonaNatAdmin
                      numero_documento={persona.numero_documento}
                      tipo_persona={persona.tipo_persona}
                      tipo_documento={persona.tipo_documento}
                      errors={errors}
                      handleSubmit={handle_submit}
                      isValid={is_valid}
                      register={register}
                      setValue={set_value}
                      getValues={get_values}
                      watch={watch}
                    />
                  </>
                )}
                {persona?.tipo_persona === 'J' && (
                  <>
                    <CrearPersonaJurAdmin
                      numero_documento={persona.numero_documento}
                      tipo_persona={persona.tipo_persona}
                      tipo_documento={persona.tipo_documento}
                      errors={errors}
                      handleSubmit={handle_submit}
                      isValid={is_valid}
                      register={register}
                      setValue={set_value}
                      getValues={get_values}
                      watch={watch}
                    />
                  </>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
