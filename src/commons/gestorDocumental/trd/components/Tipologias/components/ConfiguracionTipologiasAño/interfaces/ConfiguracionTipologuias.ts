/* eslint-disable @typescript-eslint/naming-convention */

import { type SetStateAction, ReactNode } from "react"



export interface TipodeCeaccionInterfaz {
    Formulario_Empresa: any,
    Set_Formulario_Empresa: React.Dispatch<SetStateAction<any>>,
  
    Datos_Return: any,
    Set_Datos_Return: React.Dispatch<SetStateAction<any>>,
  }
  
  export interface ConfiguracionPorUnidad {
    valor_inicial: any;
    cantidad_digitos: any;
    prefijo_consecutivo: any;
    id_unidad_organizacional: any;
  }
  
 export interface FormularioConfiguracionTipologuiaproviderProps {
    children: ReactNode;
  }
  
 export  interface variables_iniciales{
    tipo_configuracion:string,
    
  }


export interface Formulario {

    id_tipologia_documental: number,
    opcion_seleccionada: string,
    valor_inicial: number,
    cantidad_digitos: number,
    maneja_consecutivo: boolean,
    configuracion_por_unidad: ConfiguracionPorUnidad[],
    actualizar:boolean,
    variables_iniciales:variables_iniciales[],
    variables_iniciales_dos:string
  
  }


 export interface ConfiguracionAnoTipologia {
    tipo_configuracion: string;
    id_tipologia: number;
    id_config_tipologia_doc_agno: number;
    nombre_tipologia: string;
    agno_tipologia: number;
    consecutivo_inicial: number;
    cantidad_digitos: number;
    Prefijo_Consecutivo: string;
    Consecutivo_Actual: number;
    T247Id_UnidadOrganizacional: number;
    Codigo_Seccion_Subseccion: string;
    Codigo_Tipo_Unidad_Seccion_Subseccion: string;
    Seccion_Subseccion: string;
    T247Id_TRD_Actual: number;
    T247Id_PersonaUltConfigImplemen: number;
    Persona_ult_config_implemen: string;
    T247fechaUltConfigImplemen: string;
    consecutivo_final: string;
    fecha_consecutivo_final: string;
    maneja_consecutivo: boolean;
}

export interface VariablesCreacionPlantilla {
  valor_inicial: any;
  cantidad_digitos: any;
  prefijo_consecutivo: any;
  id_unidad_organizacional: any;
}


export const valores_defecto_plantilla: VariablesCreacionPlantilla = {
  valor_inicial: 1,
  cantidad_digitos: 0,
  prefijo_consecutivo: "",
  id_unidad_organizacional: 0,
}

  export const Inicial_Formulario: Formulario = {
    id_tipologia_documental: 0,
    opcion_seleccionada: "Ninguno",
    valor_inicial: 1,
    cantidad_digitos: 0,
    maneja_consecutivo: false,
    configuracion_por_unidad: [],
    actualizar:false,
    variables_iniciales:[],
    variables_iniciales_dos:"Ninguno"
  }



export const defaultConfiguracionAnoTipologia: ConfiguracionAnoTipologia = {
    tipo_configuracion: "Ninguno",
    id_tipologia: 0,
    id_config_tipologia_doc_agno: 0,
    nombre_tipologia: "",
    agno_tipologia: 0,
    consecutivo_inicial: 0,
    cantidad_digitos: 0,
    Prefijo_Consecutivo: "",
    Consecutivo_Actual: 0,
    T247Id_UnidadOrganizacional: 0,
    Codigo_Seccion_Subseccion: "",
    Codigo_Tipo_Unidad_Seccion_Subseccion: "",
    Seccion_Subseccion: "",
    T247Id_TRD_Actual: 0,
    T247Id_PersonaUltConfigImplemen: 0,
    Persona_ult_config_implemen: "",
    T247fechaUltConfigImplemen: "",
    consecutivo_final: "",
    fecha_consecutivo_final: "",
    maneja_consecutivo: false,
};