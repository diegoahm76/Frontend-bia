import { useState } from 'react';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type {
  DataPersonas,
  InfoPersona,
  key_data_persona,
} from '../../../interfaces/globalModels';
import { Divider, Grid } from '@mui/material';
import { Title } from '../../../components/Title';
import { use_register } from '../../auth/hooks/registerHook';
import { consultar_datos_persona } from '../request/Request';
import { control_error } from '../../../helpers';
import type { AxiosError } from 'axios';
import { CrearPersonaNatAdmin } from '../components/CrearPersonaNatAdmin/CrearPersonaNatAdmin';
import { CrearPersonaJurAdmin } from '../components/CrearPersonaJurAdmin/CrearPersonaJurAdmin';

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
        set_datos_persona(data);
        console.log(data);
        const fields = get_values();
        for (const key in fields) {
          const temp = key as key_data_persona;
          set_value(key, data[temp]);
        }
        set_value('departamento_expedicion', data.cod_departamento_expedicion);

        console.log(datos_persona);
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
  );
};
