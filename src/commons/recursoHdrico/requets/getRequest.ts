import Swal from "sweetalert2";
import { api } from "../../../api/axios";
import { type ResponseServer } from "../../../interfaces/globalModels";
import { type Parametros, type conf_alarma, type Datos, type Estaciones, type EstacionesDetalle, type IEstacionEstaciones, type PersonaEstacion } from "../estaciones/interfaces/interfaces";


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
      void Swal.fire("Correcto", "La estación se agrego correctamente", "success");
    })
    .catch((error) => {
      console.log(error);
      void Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    });
};

// crear persona

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
export const crearPersona = async (Peronsa: PersonaEstacion) => {
  await api
    .post("estaciones/personas/crear-persona/", Peronsa)
    .then(() => {
      void Swal.fire("Correcto", "El usuario se agrego correctamente", "success");
    })
    .catch((error) => {
      console.log(error);
      void Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    });
};

// crear Configuracion Alerta Persona

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
export const crearConfiAlerta = async (configuracion: PersonaEstacion) => {
  await api
    .post("estaciones/configuracion/alertas/crear-configuracion-alerta/", configuracion)
    .then(() => {
      void Swal.fire("Correcto", "La configuración se agrego correctamente", "success");
    })
    .catch((error) => {
      console.log(error);
      void Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    });
};

// eliminar persona

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const eliminarUsuario = async (idPersona: number) => {
  try {
    await api.delete(`estaciones/personas/eliminar-persona/${idPersona}`);
    void Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario eliminado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    void Swal.fire({
      position: "center",
      icon: "error",
      title: `Algo pasó, intente de nuevo`,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

