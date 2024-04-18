import { control_error } from "../../../../helpers";
import { interface_articulos_agregados, interface_articulos_obtenidos_por_id } from "../interfaces/types";

export const validar_form_seleccion_funcionarios = async (
  accion: string,
  funcionario_operario_seleccionado: any,
  funcionario_responsable_seleccionado: any,
  motivo: string,
  observaciones: string
) => {
  if (accion !== 'ver') {
    if (Object.keys(funcionario_responsable_seleccionado).length === 0 && accion === 'crear') {
      control_error('Debe seleccionar un funcionario responsable');
      return false;
    }
    if (Object.keys(funcionario_operario_seleccionado).length === 0 && accion === 'crear') {
      control_error('Debe seleccionar un funcionario operario');
      return false;
    }
    if (motivo === '') {
      control_error('El campo motivo es obligatorio');
      return false;
    }
    if (observaciones === '') {
      control_error('El campo observaciones es obligatorio');
      return false;
    }
  } else {
    return true;
  }
  return true;
}

export const validar_busqueda_articulos = async (
  accion: string,
  data_articulos_agregados: interface_articulos_agregados[] | interface_articulos_obtenidos_por_id[],
  switch_solicitud_prestamo: boolean
) => {
  if (accion !== 'ver') {
    // validamos que en data_articulos_agregados exista al menos un articulo
    if (data_articulos_agregados.length === 0) {
      control_error('Debe agregar al menos un articulo');
      return false;
    }
    // validamos que todos los articulos tengan una observacion
    if (data_articulos_agregados.some((articulo) => articulo.observacion === '')) {
      control_error('Todos los articulos deben tener una observacion');
      return false;
    }
    // validamos que si switch_solicitud_prestamo es true, todos los articulos tengan una fecha de devolucion
    if (switch_solicitud_prestamo && data_articulos_agregados.some((articulo) => articulo.fecha_devolucion === null || !('fecha_devolucion' in articulo))) {
      control_error('Si la solicitud es de prestamo, todos los articulos deben tener una fecha de devolucion');
      return false;
    }
  }
  return true;
}

/**
 * Funcion para convertir el codigo de estado de la solicitud a un estado legible
 * @param estado
 */
export const convertir_cod_estado = (estado: string | undefined) => {
  if (estado === 'S') {
    return 'Solicitado';
  } else if (estado === 'Aprobado') {
    return 'success';
  } else if (estado === 'R') {
    return 'Respondido';
  } else if (estado === 'SR') {
    return 'Solicitud Rechazada';
  } else if (estado === 'SA') {
    return 'Solicitud Aprobada';
  } else if (estado === 'DR') {
    return 'Despacho Rechazado';
  } else if (estado === 'DA') {
    return 'Despacho Autorizado';
  } else if (estado === 'F') {
    return 'Finalizado';
  } else if (estado === 'C') {
    return 'Cancelado';
  } else if (estado === undefined || estado === null) {
    return null;
  }
}