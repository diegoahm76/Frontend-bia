import { type Dispatch, type SetStateAction, useState } from 'react';
import { type DataRegisterPersonaN } from '../interfaces';

interface RegisterPersonHook {
  persona_natural: DataRegisterPersonaN;
  set_persona_natural: Dispatch<SetStateAction<DataRegisterPersonaN>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const use_register_persona_n = (): RegisterPersonHook => {
  const [persona_natural, set_persona_natural] = useState<DataRegisterPersonaN>(
    {
      tipo_persona: 'N',
      tipo_documento: 'CC',
      numero_documento: '1193201477',
      cod_municipio_expedicion_id: '91001',
      nombre_comercial: 'string',
      primer_nombre: 'Oscar',
      segundo_nombre: 'Steven',
      primer_apellido: 'Rodríguez',
      segundo_apellido: 'Galeano',
      fecha_nacimiento: '2000-01-04',
      email: 'juancamiloariascalderon173@gmail.com',
      telefono_celular: '573228215133',
      telefono_empresa_2: null,
      sexo: 'M',
      estado_civil: 'S',
      pais_nacimiento: 'CO',
      email_empresarial: 'rubenhernanedoprietosolano@gmail.com',
      ubicacion_georeferenciada: 'string',
      telefono_fijo_residencial: null,
      pais_residencia: 'CO',
      municipio_residencia: '91263',
      direccion_residencia: 'string',
      direccion_laboral: 'string',
      direccion_residencia_ref: 'string',
      direccion_notificaciones: 'string',
      cod_municipio_laboral_nal: '91263',
      cod_municipio_notificacion_nal: '91263',
      acepta_notificacion_sms: true,
      acepta_notificacion_email: true,
      acepta_tratamiento_datos: true,
      nombre_de_usuario: 'pruebanatural2820',
      password: 'Pass.1234',
      redirect_url: 'www.google.com',
    }
  );

  return {
    persona_natural,
    set_persona_natural,
  };
};
