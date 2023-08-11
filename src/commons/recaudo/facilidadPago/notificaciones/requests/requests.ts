import { api } from '../../../../../api/axios';
import { type RecepcionFisica, type NotificacionFisica, type NotificacionEmailEdicto } from '../interfaces/interfaces';

// Obtener Datos Personales del Usuario Externo
export const get_datos_remitente = async (id: number): Promise<any> => {
  return await api.get(`transversal/notificaciones/datos-remitente/${id}/`);
}

// Obtener Medios de Notificaciones
export const get_medios_notificaciones = async (): Promise<any> => {
  return await api.get(`transversal/notificaciones/medio-notificacion/`);
}

// Crear Recepción Notificación Despacho Físico
export const post_recepcion_fisica = async (recepcion: RecepcionFisica): Promise<any> => {
  const data = await api.post(`transversal/notificaciones/crear-respuesta-notificacion/`, recepcion, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

// Crear Notificación por Despacho Físico
export const post_notificacion_fisica = async (notificacion_fisica: NotificacionFisica): Promise<any> => {
  const data = await api.post(`transversal/notificaciones/crear-despacho-notificacion/`, notificacion_fisica, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}

// Crear Notificación por Email o Edicto
export const post_notificacion_email_edicto = async (notificacion: NotificacionEmailEdicto): Promise<any> => {
  const data = await api.post(`transversal/notificaciones/crear-notificacion/`, notificacion, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data
}
