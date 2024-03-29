/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { toast, type ToastContent } from 'react-toastify';
import { api, DEFAULT_BETA_URL, DEFAULT_PROD_URL } from '../../../api/axios';
import { control_error } from '../../../helpers/controlError';
import { type ResponseServer } from '../../../interfaces/globalModels';
import type {
  Parametros,
  conf_alarma,
  Datos,
  Estaciones,
  EstacionesDetalle,
  IEstacionEstaciones,
  PersonaEstacion,
  CrearAlerta,
  EditarPersona,
  ParametrosEditar,
  Equipo,
  HistorialAlerta,
  DatosMigracion,
} from '../estaciones/interfaces/interfaces';
import axios from 'axios';

export const alertas = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BETA_URL ||
        `${DEFAULT_BETA_URL}`
      : process.env.REACT_APP_PROD_URL || `${DEFAULT_PROD_URL}`,
});
export const control_success = (message: ToastContent): any =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

export const control_success_fail = (message: ToastContent): any =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// llamar alerta
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const llamar_alertas = async () => {
  try {
    const response = await alertas.get('estaciones/prueba/');
    //  console.log('')(response.data);
  } catch (error) {
    console.error(error);
  }
};

// consultar estaciones
export const consultar_estaciones = async (): Promise<Estaciones[]> => {
  const { data } = await api.get<ResponseServer<Estaciones[]>>(
    'estaciones/consultar-estaciones/'
  );
  return data.data;
};
// consultar datos por id estación
export const consultar_datos_id = async (
  id: number | string
): Promise<Datos[]> => {
  const {
    data: { data },
  } = await api.get<ResponseServer<Datos[]>>(
    `estaciones/datos/consultar-datos-id-primeros/${id}/`
  );
  return data;
};

// consultar datos por fecha
export const consultar_datos_mes = async (
  id: number,
  fecha: string | Date | null
): Promise<Datos[]> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const { data } = await api.get<ResponseServer<Datos[]>>(
    `estaciones/datos/consultar-datos-reporte/${id}/${fecha}/`
  );
  return data.data;
};

// consultar configuracion alerta personas
export const consultar_conf_alerta_persona = async (): Promise<
  conf_alarma[]
> => {
  const { data } = await api.get<ResponseServer<conf_alarma[]>>(
    'estaciones/configuracion/alertas/consultar-configuracion-alerta/'
  );
  return data.data;
};

// consultar parametros de referencia
export const consultar_parametros_referencia = async (): Promise<
  Parametros[]
> => {
  const { data } = await api.get<ResponseServer<Parametros[]>>(
    'estaciones/parametros/consultar-parametro'
  );
  return data.data;
};

// consultar estaciones id
export const consultar_estaciones_id = async (
  id: number | string
): Promise<EstacionesDetalle> => {
  const { data } = await api.get<ResponseServer<EstacionesDetalle>>(
    `estaciones/consultar-estaciones-id/${id}/`
  );
  return data.data;
};

// crear estacion
export const crear_estacion = async (
  Estacion: IEstacionEstaciones
): Promise<any> => {
  await api
    .post('estaciones/crear-estaciones/', Estacion)
    .then(() => {
      control_success('La estación Se creo correctamente');
    })
    .catch((error: any) => {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    });
};

// crear persona
export const crear_persona = async (Peronsa: PersonaEstacion): Promise<any> => {
  await api
    .post('estaciones/personas/crear-persona/', Peronsa)
    .then(() => {
      control_success('La persona se creo correctamente');
    })
    .catch((error: any) => {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    });
};

export const crear_confi_alerta = async (
  configuracion: CrearAlerta
): Promise<any> => {
  await api
    .post(
      'estaciones/configuracion/alertas/crear-configuracion-alerta/',
      configuracion
    )
    .then(() => {
      control_success('La configuración alerta persona se creó correctamente');
    })
    .catch((error: any) => {
      control_error(
        error.response.data.detail || 'Algo paso, intente de nuevo'
      );
    });
};

// eliminar estacion
export const eliminar_estacion = async (idEstacion: number): Promise<any> => {
  return await api.delete(`estaciones/eliminar-estaciones/${idEstacion}`);
};

// eliminar persona
export const eliminar_usuario = async (idPersona: number): Promise<any> => {
  return await api.delete(`estaciones/personas/eliminar-persona/${idPersona}`);
};

// eliminar Configuración Alerta Persona
export const eliminar_conf_alerta_persona = async (
  idconfAlerta: number
): Promise<any> => {
  return await api.delete(
    `estaciones/configuracion/alertas/eliminar-configuracion-alerta/${idconfAlerta}`
  );
};

// editar estacion
export const editar_estacion = async (
  idEstaion: number,
  datos_estacion: IEstacionEstaciones
): Promise<any> => {
  const response = await api.put(
    `estaciones/actualizar-estaciones/${idEstaion}/`,
    datos_estacion
  );
  return response.data;
};

// editar persona
export const editar_persona = async (
  idPeronsa: number,
  datos_persona: EditarPersona
): Promise<any> => {
  const response = await api.put(
    `estaciones/personas/actualizar-persona/${idPeronsa}/`,
    datos_persona
  );
  return response.data;
};

// editar parametros de referencia
export const editar_parametro = async (
  idParametro: number,
  datos_parametro: ParametrosEditar
): Promise<any> => {
  const response = await api.put(
    `estaciones/parametros/actualizar-parametro/${idParametro}/`,
    datos_parametro
  );
  return response.data;
};

// editar parametros de referencia
export const editar_conf_alarma = async (
  idalarma: number,
  datos_alarma: CrearAlerta
): Promise<any> => {
  const response = await api.put(
    `estaciones/configuracion/alertas/actualizar-configuracion-alerta/${idalarma}/`,
    datos_alarma
  );
  return response.data;
};

// consultar historial equipo
export const consultar_historial_equipo = async (
  id: number,
  fecha: string | Date | null
): Promise<Equipo[]> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const { data } = await api.get<ResponseServer<Equipo[]>>(
    `estaciones/historial/consultar-historial-equipo/${id}/${fecha}/`
  );
  return data.data;
};

// consultar historial equipo
export const consultar_historial_alertas = async (
  id: number,
  fecha: string | Date | null
): Promise<HistorialAlerta[]> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const { data } = await api.get<ResponseServer<HistorialAlerta[]>>(
    `estaciones/historial/consultar-historial-alertas/${id}/${fecha}/`
  );
  return data.data;
};
// consultar datos por fecha migracion
export const consultar_datos_mes_migracion = async (
  id: number,
  fecha: string | Date | null
): Promise<DatosMigracion[]> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const { data } = await api.get<ResponseServer<DatosMigracion[]>>(
    `estaciones/migracion/consultar-migracion-estaciones-id/${id}/?fecha=${fecha}`
  );
  return data.data;
};
// consultar datos por fecha migracion
export const consultar_datos_id_migracion = async (
  id: number
): Promise<DatosMigracion[]> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const { data } = await api.get<ResponseServer<DatosMigracion[]>>(
    `estaciones/migracion/consultar-migracion-estaciones-id/${id}/`
  );
  return data.data;
};
