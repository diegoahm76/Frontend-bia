import { toast, type ToastContent } from "react-toastify";
import { api } from "../../../api/axios";
import { control_error } from "../../../helpers/controlError";
import { type ResponseServer } from "../../../interfaces/globalModels";
import { type Parametros, type conf_alarma, type Datos, type Estaciones, type EstacionesDetalle, type IEstacionEstaciones, type PersonaEstacion, type CrearAlerta } from "../estaciones/interfaces/interfaces";


export const control_success = (message: ToastContent): any =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// consultar estaciones
export const consultar_estaciones = async (): Promise<Estaciones[]> => {
  const { data } = await api.get<ResponseServer<Estaciones[]>>('estaciones/consultar-estaciones/');
  return data.data
}

// consultar datos 
export const consultar_datos = async (): Promise<Datos[]> => {
  const { data } = await api.get<ResponseServer<Datos[]>>('estaciones/datos/consultar-datos-opt/');
  return data.data
}

// consultar configuracion alerta personas
export const consultar_conf_alerta_persona = async (): Promise<conf_alarma[]> => {
  const { data } = await api.get<ResponseServer<conf_alarma[]>>('estaciones/configuracion/alertas/consultar-configuracion-alerta/');
  return data.data
}

// consultar parametros de referencia
export const consultar_parametros_referencia = async (): Promise<Parametros[]> => {
  const { data } = await api.get<ResponseServer<Parametros[]>>('estaciones/parametros/consultar-parametro');
  return data.data
}

// consultar estaciones id
export const consultar_estaciones_id = async (id: number | string): Promise<EstacionesDetalle> => {
  const { data } = await api.get<ResponseServer<EstacionesDetalle>>(`estaciones/consultar-estaciones-id/${id}/`);
  return data.data;
}

// crear estacion

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
export const crearEstacion = async (Estacion: IEstacionEstaciones) => {
  await api
    .post("estaciones/crear-estaciones/", Estacion)
    .then(() => {
      control_success('La estación Se creo correctamente')
    })
    .catch((error) => {
      control_error(error)
    });
};

// crear persona

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
export const crearPersona = async (Peronsa: PersonaEstacion) => {
  await api
    .post("estaciones/personas/crear-persona/", Peronsa)
    .then(() => {
      control_success('La persona se creo correctamente')
    })
    .catch((error) => {
      control_error(error)
    });
};

// crear Configuracion Alerta Persona

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
export const crearConfiAlerta = async (configuracion: CrearAlerta) => {
  await api
    .post("estaciones/configuracion/alertas/crear-configuracion-alerta/", configuracion)
    .then(() => {
      control_success('La configuración alerta persona se creó correctamente')
    })
    .catch((error) => {
      control_error(error)
    });
};

// eliminar persona

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const eliminarUsuario = async (idPersona: number) => {
  try {
    await api.delete(`estaciones/personas/eliminar-persona/${idPersona}`);
    control_success('La persona se eliminó correctamente')
  } catch (error) {
    control_error(error)
  }
};

// eliminar Configuración Alerta Persona

export const eliminar_conf_alerta_persona = async (idconfAlerta: number): Promise<any> => {
  return await api.delete(`estaciones/configuracion/alertas/eliminar-configuracion-alerta/${idconfAlerta}`);

};



