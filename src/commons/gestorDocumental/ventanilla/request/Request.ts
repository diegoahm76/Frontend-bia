import type { AxiosResponse } from 'axios';
import { api } from '../../../../api/axios';
import type {
  ClaseTercero,
  ClaseTerceroPersona,
  CrearPersonJuridicaAdmin,
  CrearPersonNaturalAdmin,
  DataJuridicaUpdate,
  DataNaturaUpdate,
  DataPersonas,
  DatosVinculacionCormacarena,
  HistoricoAutorizaNotificaciones,
  HistoricoDatosRestringidos,
  HistoricoDirecciones,
  HistoricoEmail,
  HistoricoRepresentanteLegal,
  InfoPersona,
  ResponseServer,
  UpdateAutorizaNotificacion,
  UpdateAutorizaNotificacionPropia
} from '../../../../interfaces/globalModels';

// editar datos persona restringida naturual
export const editar_datos_restringidos_persona = async (
  id_persona: number | undefined,
  datos: FormData
): Promise<any> => {
  const response = await api.put(
    `personas/update-personas-naturales-restringidos/${id_persona ?? 0}/`,
    datos
  );
  return response.data;
};

// editar datos persona restringida juridica
export const editar_datos_restringidos_juridica = async (
  id_persona: number | undefined,
  datos: FormData
): Promise<any> => {
  const response = await api.put(
    `personas/update-personas-juridicas-restringidos/${id_persona ?? 0}/`,
    datos
  );
  return response.data;
};
// consultar historico datos restringidos
export const consultar_historico_restringido = async (
  id: number
): Promise<HistoricoDatosRestringidos[]> => {
  const { data } = await api.get<ResponseServer<HistoricoDatosRestringidos[]>>(
    `personas/buscar-historico-cambios/${id}/`
  );
  return data.data;
};
// consultar datos de una persona por id
export const consultar_datos_persona = async (
  id: number
): Promise<AxiosResponse<ResponseServer<DataPersonas>>> => {
  return await api.get<ResponseServer<DataPersonas>>(
    `personas/get-by-id/${id}/`
  );
};
// consultar datos de una persona por id
export const consultar_datos_persona_basicos = async (
  tipo_doc: string,
  num_doc: string
): Promise<InfoPersona> => {
  const { data } = await api.get<ResponseServer<InfoPersona>>(
    `personas/get-personas-by-document/${num_doc}/${tipo_doc}`
  );
  return data.data;
};
// datos de clasificación cormacarena
export const consultar_clase_tercero = async (): Promise<ClaseTercero[]> => {
  const { data } = await api.get<ResponseServer<ClaseTercero[]>>(
    `listas/clase-tercero/`
  );
  return data.data;
};
// datos de clasificación cormacarena por persona
export const consultar_clase_tercero_persona = async (
  id: number | undefined
): Promise<ClaseTerceroPersona[]> => {
  const { data } = await api.get<ResponseServer<ClaseTerceroPersona[]>>(
    `personas/get-clases-tercero-persona/${id ?? 0}/`
  );
  return data.data;
};
// datos de vnculación cormacarena por persona
export const consultar_vinculacion_persona = async (
  id: number | undefined
): Promise<DatosVinculacionCormacarena> => {
  const { data } = await api.get<ResponseServer<DatosVinculacionCormacarena>>(
    `transversal/vinculacion/get-vinculacion-colaboradores/${id ?? 0}/`
  );
  return data.data;
};
// editar datos persona naturual
export const editar_persona_natural = async (
  id_persona: number | undefined,
  datos: DataNaturaUpdate
): Promise<any> => {
  const response = await api.put(
    `personas/update-persona-natural-admin-personas/${id_persona ?? 0}/`,
    datos
  );
  return response.data;
};
// editar datos persona naturual
export const editar_persona_juridica = async (
  id_persona: number | undefined,
  datos: DataJuridicaUpdate
): Promise<any> => {
  const response = await api.put(
    `personas/update-persona-juridica-admin-personas/${id_persona ?? 0}/`,
    datos
  );
  return response.data;
};
// Historico direcciones
export const consultar_historico_direcciones = async (
  id: number
): Promise<HistoricoDirecciones[]> => {
  const { data } = await api.get<HistoricoDirecciones[]>(
    `personas/historico-direccion/${id}/`
  );
  return data;
};
// Historico Email
export const consultar_historico_email = async (
  id: number
): Promise<HistoricoEmail[]> => {
  const { data } = await api.get<HistoricoEmail[]>(
    `personas/historico-emails/${id}/`
  );
  return data;
};
// consulta autorizacion notificaciones
export const consultar_notificaciones = async (
  id: number
): Promise<UpdateAutorizaNotificacion> => {
  const { data } = await api.get<ResponseServer<UpdateAutorizaNotificacion>>(
    `personas/get-by-id/${id ?? 0}/`
  );
  return data.data;
};
export const consultar_notificaciones_cuenta_propia = async (
  id: number
): Promise<UpdateAutorizaNotificacionPropia> => {
  const { data } = await api.get<ResponseServer<UpdateAutorizaNotificacionPropia>>(
    `personas/get-by-id/${id ?? 0}/`
  );
  return data.data;
};
// Historico autorizaciones
export const consultar_historico_autorizaciones = async (
  id: number
): Promise<HistoricoAutorizaNotificaciones[]> => {
  const { data } = await api.get<HistoricoAutorizaNotificaciones[]>(
    `personas/historico-notificaciones/${id}/`
  );
  return data;
};
// Historico representante
export const consultar_historico_representante = async (
  id: number
): Promise<HistoricoRepresentanteLegal[]> => {
  const { data } = await api.get<HistoricoRepresentanteLegal[]>(
    `personas/historico-representante-legal/${id}/`
  );
  return data;
};
// editar autorización de notificaciones
export const editar_autorizacion_notificaciones = async (
  id_persona: number | undefined,
  datos: UpdateAutorizaNotificacion
): Promise<any> => {
  const response = await api.put(
    `gestor/ventanilla/personas/autorizacion-notificaciones/${
      id_persona ?? 0
    }/`,
    datos
  );
  return response.data;
};
// crear datos persona naturual
export const crear_persona_natural = async (
  datos: CrearPersonNaturalAdmin
): Promise<any> => {
  const {data} = await api.post(
    `gestor/ventanilla/personas/register-persona-natural/`,
    datos
  );
  return data;
};
// crear datos persona naturual
export const crear_persona_juridica = async (
  datos: CrearPersonJuridicaAdmin
): Promise<any> => {
  const {data} = await api.post(
    `personas/register-persona-juridica-admin-personas/`,
    datos
  );
  return data;
};

// editar datos persona naturual
export const editar_persona_natural_cuenta_propia = async (
  datos: DataNaturaUpdate
): Promise<any> => {
  const response = await api.patch(
    `personas/persona-natural/self/update/`,
    datos
  );
  return response.data;
};
// editar datos persona naturual
export const editar_persona_juridica_cuenta_propia = async (
  datos: DataJuridicaUpdate
): Promise<any> => {
  const response = await api.patch(
    `personas/persona-juridica/self/update/`,
    datos
  );
  return response.data;
};
