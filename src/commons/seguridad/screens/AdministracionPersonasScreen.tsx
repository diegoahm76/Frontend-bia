import { useState } from 'react';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type {
  DataPersonas,
  InfoPersona,
} from '../../../interfaces/globalModels';
import { Divider, Grid } from '@mui/material';
import { Title } from '../../../components/Title';
import { use_register } from '../../auth/hooks/registerHook';
import { consultar_datos_persona } from '../request/Request';
import { control_error } from '../../../helpers';
import type { AxiosError } from 'axios';
import { CrearPersonaNatAdmin } from '../components/CrearPersonaNatAdmin/CrearPersonaNatAdmin';
import { CrearPersonaJurAdmin } from '../components/CrearPersonaJurAdmin/CrearPersonaJurAdmin';
import { UpdatePersonaNatAdmin } from '../components/UpdatePersonaNatAdmin/UpdatePersonaNatAdmin';
import { UpdatePersonaJurAdmin } from '../components/UpdatePersonaJurAdmin/UpdatePersonaJurAdmin';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
  const [persona, set_persona] = useState<InfoPersona>();
  const [datos_persona, set_datos_persona] = useState<DataPersonas>();
  const {
    errors,
    is_valid,
    get_values,
    handle_submit,
    register,
    set_value,
    watch,
  } = use_register();


  const on_result = async (info_persona: InfoPersona): Promise<void> => {
    try {
      set_persona(info_persona);
      const {
        data: { data },
      } = await consultar_datos_persona(info_persona.id_persona);
      if (data.id_persona !== 0) {
        console.log(data)
        set_datos_persona(data);
      }
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Title title="ADMINISTRADOR DE PERSONAS" />
        </Grid>
      </Grid>
      <BuscadorPersona
        onResult={(data) => {
          void on_result(data);
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {datos_persona?.tipo_persona === 'N' && (
          <>
            <UpdatePersonaNatAdmin
              id_persona={datos_persona.id_persona}
              numero_documento={datos_persona.numero_documento}
              data={datos_persona}
              tipo_persona={datos_persona.tipo_persona}
              tipo_documento={datos_persona.tipo_documento}
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
        {datos_persona?.tipo_persona === 'J' && (
          <>
            <UpdatePersonaJurAdmin
              id_persona={datos_persona.id_persona}
              data={datos_persona}
              numero_documento={datos_persona?.numero_documento}
              tipo_persona={datos_persona.tipo_persona}
              tipo_documento={datos_persona.tipo_documento}
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
              numero_documento={persona?.numero_documento}
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
  );
};
