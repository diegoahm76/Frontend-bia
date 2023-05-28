import { useState } from 'react';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type {
  DataPersonas,
  InfoPersona,
} from '../../../interfaces/globalModels';
import { Divider, Grid, Typography } from '@mui/material';
import { Title } from '../../../components/Title';
import 'react-datepicker/dist/react-datepicker.css';
import { use_register } from '../../auth/hooks/registerHook';
import { consultar_datos_persona } from '../request/Request';
import { control_error } from '../../../helpers';
import { AdministracionPersonasScreenNatural } from '../../auth/components/AdministradorPersonaNatural/AdministradorPersonaNatural';
import { AdministracionPersonasScreenJuridica } from '../../auth/components/AdministrarPersonaJuridica/AdministradorPersonaJuridica';
import { CrearPersonaNatAdmin } from '../../auth/components/CrearPersonaNatAdmin/CrearPersonaNatAdmin';
import { CrearPersonaJurAdmin } from '../../auth/components/CrearPersonaJurAdmin/CrearPersonaJurAdmin';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
  const [persona, set_persona] = useState<InfoPersona>();
  const [datos_persona, set_datos_persona] = useState<DataPersonas>();
  const [is_register, set_is_register] = useState(false);
  const [is_update, set_is_update] = useState(false);
  const {
    errors,
    is_valid,
    get_values,
    handle_submit,
    register,
    set_value,
    watch,
  } = use_register();

  const get_datos_persona = async (id_persona: number): Promise<void> => {
    try {
      const response = await consultar_datos_persona(id_persona);
      set_datos_persona(response);
    } catch (err) {
      control_error(err);
    }
  };

  const on_result = (info_persona: InfoPersona): void => {
    set_is_update(false);
    set_is_register(false);
    if (info_persona !== undefined && info_persona.id_persona !== 0) {
      void get_datos_persona(info_persona.id_persona);
      set_is_update(true);
      set_persona(info_persona);
    } else {
      set_is_register(true);
      set_persona(info_persona);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Title title="ADMINISTRADOR DE PERSONAS" />
        </Grid>
      </Grid>
      <BuscadorPersona onResult={on_result} />
      {is_update && (
        <>
          {persona?.tipo_persona === 'N' && (
            <AdministracionPersonasScreenNatural
              data={datos_persona}
              errors={errors}
              handleSubmit={handle_submit}
              isValid={is_valid}
              register={register}
              setValue={set_value}
              getValues={get_values}
              watch={watch}
            />
          )}
          {persona?.tipo_persona === 'J' && (
            <>
              <AdministracionPersonasScreenJuridica
                data={datos_persona}
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
    </>
  );
};
