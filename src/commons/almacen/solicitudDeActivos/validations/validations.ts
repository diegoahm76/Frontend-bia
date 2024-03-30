import { control_error } from "../../../../helpers";

export const validar_form_seleccion_funcionarios = async(
  accion: string,
  funcionario_operario_seleccionado: any,
  funcionario_responsable_seleccionado: any,
  motivo: string,
  observaciones: string
  ) => {
  if(accion !== 'ver'){
    if(Object.keys(funcionario_responsable_seleccionado).length === 0 && accion === 'crear'){
      control_error('Debe seleccionar un funcionario responsable');
      return false;
    }
    if(Object.keys(funcionario_operario_seleccionado).length === 0 && accion === 'crear'){
      control_error('Debe seleccionar un funcionario operario');
      return false;
    }
    if(motivo === ''){
      control_error('El campo motivo es obligatorio');
      return false;
    }
    if(observaciones === ''){
      control_error('El campo observaciones es obligatorio');
      return false;
    }
  } else {
    return true;
  }
  return true;
}

export const validar_busqueda_articulos = async(
  accion: string,
  articulo_encontrado: any,
  cantidad_articulo: number,
  fecha_devolucion: any,
  observacion: string
  ) => {
  if(accion !== 'ver'){
    if(cantidad_articulo === 0 && Object.keys(articulo_encontrado).length !== 0){
      control_error('El campo cantidad es obligatorio');
      return false;
    }
    if(fecha_devolucion === null && Object.keys(articulo_encontrado).length !== 0){
      control_error('El campo fecha de devolución es obligatorio');
      return false;
    }
    if(observacion === '' && Object.keys(articulo_encontrado).length !== 0){
      control_error('El campo observación es obligatorio');
      return false;
    }
  } else {
    return true;
  }
  return true;
}

  /**
   * Funcion para convertir el codigo de estado de la solicitud a un estado legible
   * @param estado
   */
  export const convertir_cod_estado = (estado: string | undefined) => {
    if(estado === 'S') {
      return 'Solicitado';
    } else if(estado === 'Aprobado') {
      return 'success';
    } else if(estado === 'R') {
      return 'Respondido';
    } else if(estado === 'SR') {
      return 'Solicitud Rechazada';
    } else if(estado === 'SA') {
      return 'Solicitud Aprobada';
    } else if(estado === 'DR') {
      return 'Despacho Rechazado';
    } else if(estado === 'DA') {
      return 'Despacho Autorizado';
    } else if(estado === 'F') {
      return 'Finalizado';
    } else if(estado === 'C') {
      return 'Cancelado';
    } else if(estado === undefined || estado === null){
      return null;
    }
  }