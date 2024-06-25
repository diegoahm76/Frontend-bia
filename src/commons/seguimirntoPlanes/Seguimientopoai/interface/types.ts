/* eslint-disable @typescript-eslint/naming-convention */


export interface BuscarProps {
  setSelecTodosId:any;
    planes: any; 
    programa:any;
    formData: any;
    setPlanes: any;
    setShowHeader: any; 
    is_modal_active: any;
    handleInputChange: any;
    handleBuscarClick: any;
    set_is_modal_active: any;
    setPrograma:any;
    proyecto:any ;
    setProyecto:any;
    producto:any ;
    setProducto:any;
    actividad:any ;
    setactividad:any;
    indicador:any ;
    setindicador:any;
    metas:any;
    setmetas:any;
    setFormData:any;
    setejeplan:any;
    ejeplan:any;
    setSelectedConceptoId:any;
  }
export interface ResultadosProps {
  handle:any;
  setselectid:any;
  selecTodosId:any;
  selectedConceptoId:any;
  seteditar:any;
  editartabla:any;
  seteditarr:any;
  consultarSeguimiento:any;
  ConsultarSeguimiento:any;
};
export interface AgregarProps {
  editar:any;
  handle:any;
  formData:any;
  setShowdos:any;
  selecTodosId:any;
  formDatagregar:any;
  setFormDataCrear:any;
  initialFormDataCrear:any;
  selectid:any;
  consultarSeguimiento:any;
};


export const miEstilo = {
    p: '20px',
    mb: '20px',
    m: '10px 0 20px 0',
    position: 'relative',
    borderRadius: '15px',
    background: '#FAFAFA',
    boxShadow: '0px 3px 6px #042F4A26',
  };

  export interface Historico {
    id_concepto: any;
    nombre_indicador: string;
    nombre: string;
    rubro: string;
    concepto: string;
    valor_total: any;
    id_plan: any;
    id_proyecto: any;
    id_rubro: any;
    id_indicador: any;
    id_meta: any;
    id_modalidad: any;
    id_unidad_organizacional: any;
  }
  export interface Planes {
    id_plan: any;
    nombre_plan: string;
    sigla_plan: string;
    tipo_plan: string;
    agno_inicio: any;
    agno_fin: any;
    estado_vigencia: any;
  }
  export interface FormData {
    meta: any;
    plan: any;
    programa: any;
    proyecto: any;
    producto: any;
    actividad: any;
    indicador: any;
    eje:any;
  }

  export interface FormDataRegistro {
    id_concepto: any;
    id_plan: any;
    id_producto: any;
    id_actividad: any;
    id_indicador: any;
    id_meta: any;
    id_rubro: any;
    descripcion: string;
    id_prioridad: any;
    codigo_pre: string;
    cuenta: string | any;
    id_unidad_organizacional: any;
    id_modalidad: any;
    id_fuente1: any;
    valor_fte1: any;
    adicion1: boolean;
    id_fuente2: any;
    valor_fte2: any;
    adicion2: boolean;
    id_fuente3: any;
    valor_fte3: any;
    adicion3: boolean;
    id_fuente4: any;
    valor_fte4: any;
    adicion4: boolean;
    valor_banco: any;
    valor_cdp: any;
    valor_rp: any;
    valor_obligado: any;
    fecha_terminacion: string;
    duracion: any;
    valor_mensual: any;
    fecha_estimada: string;
    mes_proyectado: string;
    codigo_unsp: string;
    lugar_ejecucion: string;
    numero_contrato: any;
    numero_banco: any;
    numero_rp: any;
    fecha_rp: string;
    numero_cdp: any;
    fecha_cdp: string;
    nombre_contratista: string;
    observaciones_poai: string;
    fecha_registro: string;
    valor_pagado: any;
    vseguimiento_paabanco: any;
    vseguimiento_paacdp: any;
    vseguimiento_paarp: any;
    svseguimiento_paaobligado: any;
    vseguimiento_paapagado: any;
  }
  
  
  export interface Programa {
    id_programa: any;
    nombre_eje_estrategico: string;
    nombre_programa: string;
    numero_programa: string;
    porcentaje_1: any;
    porcentaje_2: any;
    porcentaje_3: any;
    porcentaje_4: any;
    cumplio: any;
    fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
    id_eje_estrategico: any;
    id_sector: any;
  }
  

  export interface Proyecto {
    id_proyecto: any;
    nombre_plan: string;
    nombre_programa: string;
    numero_proyecto: string;
    nombre_proyecto: string;
    pondera_1: any;
    pondera_2: any;
    pondera_3: any;
    pondera_4: any;
    cumplio: any;
    fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
    id_programa: any;
    id_plan: any;
  }

  export interface Producto {
    id_producto: any;
    nombre_plan: string;
    nombre_programa: string;
    nombre_proyecto: string;
    numero_producto: string;
    nombre_producto: string;
    fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
    cumplio: any;
    id_proyecto: any;
    id_plan: any;
    id_programa: any;
  }
  export interface Actividad {
    id_actividad: any;
    nombre_plan: string;
    nombre_programa: string;
    nombre_proyecto: string;
    nombre_producto: string;
    numero_producto: string;
    // indicadores: Indicador[];
    numero_actividad: string;
    nombre_actividad: string;
    fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
    cumplio: any;
    id_producto: any;
    id_plan: any;
    id_proyecto: any;
    id_programa: any;
    id_linea_base: any | null;
    id_meta_eje: any | null;
    id_objetivo: any | null;
    id_eje_estrategico: any | null;
  }


  export interface Indicador {
    id_indicador: any;
    nombre_medicion: string;
    nombre_tipo: string | null;
    nombre_plan: string | null;
    nombre_programa: string | null;
    nombre_proyecto: string | null;
    nombre_producto: string | null;
    nombre_actividad: string;
    nombre_unidad_org: string | null;
    nombre_eje_estrategico: string | null;
    nombre_meta: string | null;
    nombre_linea_base: string | null;
    metas: any[];
    nombre_indicador: string;
    numero_indicador: string;
    linea_base: string | null;
    medida: string;
    tipo_indicador: string;
    fecha_creacion: string; // o Date si prefieres manejarlo como objeto Date
    cumplio: any;
    entidad_responsable: string | null;
    id_medicion: any;
    id_tipo: any | null;
    id_producto: any | null;
    id_actividad: any;
    id_plan: any | null;
    id_proyecto: any | null;
    id_programa: any | null;
    id_linea_base: any | null;
    id_meta_eje: any | null;
    id_eje_estrategico: any | null;
    id_unidad_organizacional: any | null;
  }

  export interface metas {
    id_meta: any;
    nombre_meta: string;
    unidad_meta: string;
    porcentaje_meta: any;
    valor_meta: string;
    cumplio: any;
    fecha_creacion_meta: string;
}


export interface EjeEstrategico {
  id_eje_estrategico: any;
  nombre_plan: string;
  sigla_plan: string;
  nombre_tipo_eje: string;
  nombre_objetivo: string | null;
  nombre_plan_objetivo: string | null;
  sigla_plan_objetivo: string | null;
  nombre: string;
  id_tipo_eje: any;
  id_plan: any;
  id_objetivo: any | null;
}

  export interface ConsultarSeguimiento {
  id_seguimiento: number;
  descripcion: string;
  codigo_pre: string;
  cuenta: number;
  id_fuente1: number;
  valor_fte1: number;
  adicion1: boolean;
  id_fuente2: number;
  valor_fte2: number;
  adicion2: boolean;
  id_fuente3: number;
  valor_fte3: number;
  adicion3: boolean;
  id_fuente4: number;
  valor_fte4: number;
  adicion4: boolean;
  valor_banco: number;
  valor_cdp: number;
  valor_rp: number;
  valor_obligado: number;
  fecha_terminacion: string; // o Date si prefieres manejarlo como objeto Date
  duracion: number;
  valor_mensual: number;
  fecha_estimada: string; // o Date si prefieres manejarlo como objeto Date
  mes_proyectado: string;
  codigo_unsp: string;
  lugar_ejecucion: string;
  numero_contrato: number;
  numero_banco: number;
  numero_rp: number;
  fecha_rp: string;  
  numero_cdp: number;
  fecha_cdp: string;  
  nombre_contratista: string;
  observaciones_poai: string;
  fecha_registro: string;  
  valor_pagado: number;
  vseguimiento_paabanco: number;
  vseguimiento_paacdp: number;
  vseguimiento_paarp: number;
  svseguimiento_paaobligado: number | null;
  vseguimiento_paapagado: number;
  id_concepto: number;
  id_plan: number;
  id_producto: number;
  id_actividad: number;
  id_indicador: number;
  id_meta: number;
  id_rubro: number;
  id_prioridad: number;
  id_unidad_organizacional: number;
  id_modalidad: number;
}