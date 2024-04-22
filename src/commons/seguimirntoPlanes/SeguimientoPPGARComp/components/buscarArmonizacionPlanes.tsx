import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  set_current_actividad_pgar,
  set_current_mode_planes,
  set_current_planes,
} from '../../store/slice/indexPlanes';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { DataContextPgar } from '../../SeguimientoPGAR/context/context';
import { get_actividades_id_linea_base, get_actividades_id_producto, get_ejes_estrategicos_id_objetivo, get_indicadores_id_actividad, get_linea_base_id_meta, get_metas_id_eje, get_productos_id_proyectos, get_programas_id_eje_estrategico, get_proyectos_id_programa, post_seguimiento_pgar, search_actividad } from '../../SeguimientoPGAR/services/services';
import { IBusquedaLineas } from '../../SeguimientoPGAR/utils/types';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { NumericFormatCustom } from '../../components/inputs/NumericInput';
import { id } from 'date-fns/locale';
import { get_eje_estrategico_id } from '../../EjeEstrategico/services/services';
import { LoadingButton } from '@mui/lab';
import { validate, v4 as uuid } from 'uuid';
import { set } from 'date-fns';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaArmonizacionPlanes: React.FC = () => {

  const [form_values, set_form_values] = useState({
    id_armonizar: '',
    id_planPGAR: null,
    id_planPAI: null,
    nombre_planPGAR: '',
    nombre_planPAI: '',
    objetivoPGAR: [],
    ejesEstrategicosPAI: [],
    estado: '',
  });
  const [id_objetivo, set_id_objetivo] = useState<number | "">("");
  const [id_eje_estrategico_pgar, set_id_eje_estrategico_pgar] = useState<number | "">("");
  const [id_meta, set_id_meta] = useState<number | "">("");
  const [id_linea_base, set_id_linea_base] = useState<number | "">("");
  const [id_actividad_pgar, set_id_actividad_pgar] = useState<number | "">("");
  const [id_indicador_pgar, set_id_indicador_pgar] = useState<number | "">("");

  const [id_eje_estrategico_pai, set_id_eje_estrategico_pai] = useState<number | "">("");
  const [id_programa, set_id_programa] = useState<number | "">("");
  const [id_proyecto, set_id_proyecto] = useState<number | "">("");
  const [id_producto, set_id_producto] = useState<number | "">("");
  const [id_actividad_pai, set_id_actividad_pai] = useState<number | "">("");
  const [id_indicador_pai, set_id_indicador_pai] = useState<number | "">("");

  const [ejes_estrategicos_pgar, set_ejes_estrategicos_pgar] = useState<any>([]);
  const [metas_pgar, set_metas_pgar] = useState<any>([]);
  const [lineas_base_pgar, set_lineas_base_pgar] = useState<any>([]);
  const [actividades_pgar, set_actividades_pgar] = useState<any>([]);
  const [indicadores_pgar, set_indicadores_pgar] = useState<any>([]);
  const [anio_pgar, set_anio_pgar] = useState<any>("");

  //TODO: Eliminar
  const [ejes_estrategicos_pai, set_ejes_estrategicos_pai] = useState<any>([]);

  const [programas_pai, set_programas_pai] = useState<any>([]);
  const [proyectos_pai, set_proyectos_pai] = useState<any>([]);
  const [productos_pai, set_productos_pai] = useState<any>([]);
  const [actividades_pai, set_actividades_pai] = useState<any>([]);
  const [indicadores_pai, set_indicadores_pai] = useState<any>([]);

  const [meta_fisica_anual, set_meta_fisica_anual] = useState("");
  const [avance_meta_fisica_anual, set_avance_meta_fisica_anual] = useState("");
  const [porcentaje_avance, set_porcentaje_avance] = useState<number | "">("");
  const [porcentaje_avance_acumulado, set_porcentaje_avance_acumulado] = useState<number | "">("");
  const [descripcion_avance, set_descripcion_avance] = useState('');
  const [meta_financiera_anual, set_meta_financiera_anual] = useState<number | "">("");
  const [avance_meta_financiera, set_avance_meta_financiera] = useState<number | "">("");
  const [porcentaje_avance_financiero, set_porcentaje_avance_financiero] = useState<number | "">("");
  const [avance_recursos_obligados, set_avance_recursos_obligados] = useState<number | "">("");
  const [porcentaje_avance_recursos_obligados, set_porcentaje_avance_recursos_obligados] = useState<number | "">("");
  const [error_meta, set_error_meta] = useState('');
  const [error_avance_meta, set_error_avance_meta] = useState('');
  const [error_porcentaje_avance, set_error_porcentaje_avance] = useState('');
  const [error_porcentaje_avance_acumulado, set_error_porcentaje_avance_acumulado] = useState('');
  const [error_description_avance, set_error_description_avance] = useState('');
  const [error_meta_financiera_anual, set_error_meta_financiera_anual] = useState('');
  const [error_meta_fisica_anual, set_error_meta_fisica_anual] = useState('');
  const [error_porcentaje_avance_financiero, set_error_porcentaje_avance_financiero] = useState('');
  const [error_avance_recursos_obligados, set_error_avance_recursos_obligados] = useState('');
  const [error_porcentaje_avance_recursos_obligados, set_error_porcentaje_avance_recursos_obligados] = useState('');

  const [show_plan_info, set_show_plan_info] = useState(false);
  const [show_registro_avance, set_show_registro_avance] = useState(false);
  const [value, set_value] = useState('');

  const {rows_armonizacion, fetch_data_armonizaciones, fetch_data_seguimiento_pgar} = useContext(DataContextPgar);

  const change_armonizacion = (event: any) => {
    set_show_plan_info(true);
    const id_armonizacion_select = event.target.value;
    const armonizacion_select = rows_armonizacion.find(armonizacion => armonizacion.id_armonizar === id_armonizacion_select);
    set_id_objetivo("");
    set_id_eje_estrategico_pgar("");
    set_id_meta("");
    set_id_linea_base("");
    set_anio_pgar("");
    set_id_actividad_pgar("");
    set_id_indicador_pgar("");
    set_id_eje_estrategico_pai("");
    set_id_programa("");
    set_id_proyecto("");
    set_id_producto("");
    set_id_actividad_pai("");
    set_id_indicador_pai("");
    set_show_registro_avance(false);
    if (armonizacion_select) {
      set_form_values({
        ...form_values,
        id_armonizar: armonizacion_select.id_armonizar,
        id_planPGAR: armonizacion_select.id_planPGAR,
        id_planPAI: armonizacion_select.id_planPAI,
        nombre_planPGAR: armonizacion_select.nombre_planPGAR,
        nombre_planPAI: armonizacion_select.nombre_planPAI,
        objetivoPGAR: armonizacion_select.objetivoPGAR,
        estado: armonizacion_select.estado,
      });
    }
  }

  const handle_objetivo_change = (event: any) => {
    set_id_objetivo(event.target.value);
    set_id_eje_estrategico_pgar("");
    set_id_meta("");
    set_id_linea_base("");
    set_id_actividad_pgar("");
    set_id_indicador_pgar("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_objetivo) {
      get_ejes_estrategicos_id_objetivo(id_objetivo).then((response) => {
        set_ejes_estrategicos_pgar(response);
      }).catch((error) => {
        set_ejes_estrategicos_pgar([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_objetivo]);

  const handle_eje_estrategico_pgar_change = (event: any) => {
    set_id_eje_estrategico_pgar(event.target.value);
    set_id_meta("");
    set_id_linea_base("");
    set_id_actividad_pgar("");
    set_id_indicador_pgar("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_eje_estrategico_pgar) {
      get_metas_id_eje(id_eje_estrategico_pgar).then((response) => {
        set_metas_pgar(response);
      }).catch((error) => {
        set_metas_pgar([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_eje_estrategico_pgar]);

  const handle_meta_change = (event: any) => {
    set_id_meta(event.target.value);
    set_id_linea_base("");
    set_id_actividad_pgar("");
    set_id_indicador_pgar("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_meta) {
      get_linea_base_id_meta(id_meta).then((response) => {
        set_lineas_base_pgar(response);
      }).catch((error) => {
        set_lineas_base_pgar([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_meta]);

  const handle_linea_base_change = (event: any) => {
    set_id_linea_base(event.target.value);
    set_id_actividad_pgar("");
    set_id_indicador_pgar("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_linea_base) {
      get_actividades_id_linea_base(id_linea_base).then((response) => {
        set_actividades_pgar(response);
      }).catch((error) => {
        set_actividades_pgar([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_linea_base]);

  const handle_actividad_pgar_change = (event: any) => {
    set_id_actividad_pgar(event.target.value);
    set_id_indicador_pgar("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_actividad_pgar) {
      get_indicadores_id_actividad(id_actividad_pgar).then((response) => {
        set_indicadores_pgar(response);
      }).catch((error) => {
        set_indicadores_pgar([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_actividad_pgar]);

  const handle_indicador_pgar_change = (event: any) => {
    set_id_indicador_pgar(event.target.value);
  }

  useEffect(() => {
    if(id_indicador_pai && id_indicador_pgar) {
      set_show_registro_avance(true);
    }
  }, [id_indicador_pai, id_indicador_pgar]);

  //TODO: Eliminar
  useEffect(() => {
    if(form_values.id_planPAI){
      get_eje_estrategico_id(form_values.id_planPAI).then((response) => {
        set_ejes_estrategicos_pai(response)
      }).catch((error) => {
        set_ejes_estrategicos_pai([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [form_values.id_planPAI]);

  const handle_eje_estrategico_pai_change = (event: any) => {
    set_id_eje_estrategico_pai(event.target.value);
    set_id_programa("");
    set_id_proyecto("");
    set_id_producto("");
    set_id_actividad_pai("");
    set_id_indicador_pai("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_eje_estrategico_pai) {
      get_programas_id_eje_estrategico(id_eje_estrategico_pai).then((response) => {
        set_programas_pai(response);
      }).catch((error) => {
        set_programas_pai([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_eje_estrategico_pai]);

  const handle_programa_change = (event: any) => {
    set_id_programa(event.target.value);
    set_id_proyecto("");
    set_id_producto("");
    set_id_actividad_pai("");
    set_id_indicador_pai("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_programa) {
      get_proyectos_id_programa(id_programa).then((response) => {
        set_proyectos_pai(response);
      }).catch((error) => {
        set_proyectos_pai([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_programa]);

  const handle_proyecto_change = (event: any) => {
    set_id_proyecto(event.target.value);
    set_id_producto("");
    set_id_actividad_pai("");
    set_id_indicador_pai("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_proyecto) {
      get_productos_id_proyectos(id_proyecto).then((response) => {
        set_productos_pai(response);
      }).catch((error) => {
        set_productos_pai([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_proyecto]);

  const handle_producto_change = (event: any) => {
    set_id_producto(event.target.value);
    set_id_actividad_pai("");
    set_id_indicador_pai("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_producto) {
      get_actividades_id_producto(id_producto).then((response) => {
        set_actividades_pai(response);
      }).catch((error) => {
        set_actividades_pai([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_producto]);

  const handle_actividad_pai_change = (event: any) => {
    set_id_actividad_pai(event.target.value);
    set_id_indicador_pai("");
    set_show_registro_avance(false);
  }

  useEffect(() => {
    if(id_actividad_pai) {
      get_indicadores_id_actividad(id_actividad_pai).then((response) => {
        set_indicadores_pai(response);
      }).catch((error) => {
        set_indicadores_pai([]);
        control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
      });
    }
  }, [id_actividad_pai]);

  const handle_indicador_pai_change = (event: any) => {
    set_id_indicador_pai(event.target.value);
  }

  const handle_anio_pgar_change = (event: any) => {
    set_anio_pgar(event.target.value);
  }

  const handle_porcentaje_avance_change = (event: any) => {
    const numero = parseFloat(event.target.value);
    (numero < 0 || numero > 100 || isNaN(numero))
          ? set_error_porcentaje_avance('El valor debe estar entre 0 y 100')
          : set_error_porcentaje_avance('');
    set_porcentaje_avance(numero);
  }

  const handle_porcentaje_avance_acumulado_change = (event: any) => {
    const numero = parseFloat(event.target.value);
    (numero < 0 || numero > 100 || isNaN(numero))
          ? set_error_porcentaje_avance_acumulado('El valor debe estar entre 0 y 100')
          : set_error_porcentaje_avance_acumulado('');
    set_porcentaje_avance_acumulado(numero);
  }

  const handle_descripcion_change = (event: any) => {
    const value = event.target.value;
    set_descripcion_avance(value);
    if(value) set_error_description_avance('');
  }

  const handle_meta_financiera_change = (event: any) => {
    const value = event.target.value;
    set_meta_financiera_anual(value);
    if(value) set_error_meta_financiera_anual('');
  }

  const handle_avance_meta_fisica_change = (event: any) => {
    const value = event.target.value;
    set_avance_meta_financiera(value);
    if(value) set_error_meta_fisica_anual('');
  }

  const handle_porcentaje_avance_financiero_change = (event: any) => {
    const numero = parseFloat(event.target.value);
    (numero < 0 || numero > 100 || isNaN(numero))
          ? set_error_porcentaje_avance_financiero('El valor debe estar entre 0 y 100')
          : set_error_porcentaje_avance_financiero('');
    set_porcentaje_avance_financiero(numero);
  }

  const handle_recursos_obligados_change = (event: any) => {
    const value = event.target.value;
    set_avance_recursos_obligados(value);
    if(value) set_error_avance_recursos_obligados('');
  }

  const handle_porcentaje_avance_recursos_obligados_change = (event: any) => {
    const numero = parseFloat(event.target.value);
    (numero < 0 || numero > 100 || isNaN(numero))
          ? set_error_porcentaje_avance_recursos_obligados('El valor debe estar entre 0 y 100')
          : set_error_porcentaje_avance_recursos_obligados('');
    set_porcentaje_avance_recursos_obligados(numero);
  }

  const handle_meta_fisica_change = (event: any) => {
    const value = event.target.value;
    if(id_indicador_pai){
      const indicador_select = indicadores_pai.find((indicador: any) => indicador.id_indicador === id_indicador_pai);
      if(indicador_select.medida === 'POR'){
        const numero = parseFloat(value);
        (numero < 0 || numero > 100 || isNaN(numero))
          ? set_error_meta('El valor debe estar entre 0 y 100')
          : set_error_meta('');
      }else{
        const valid_number = /^[0-9]+(\.[0-9]+)?$/.test(value);
        (!valid_number)
          ? set_error_meta('Por favor, ingrese solo números')
          : set_error_meta('');
      }
    }
    set_meta_fisica_anual(value);
  }

  const handle_meta_anual_change = (event: any) => {
    const value = event.target.value;
    if(id_indicador_pai){
      const indicador_select = indicadores_pai.find((indicador: any) => indicador.id_indicador === id_indicador_pai);
      if(indicador_select.medida === 'POR'){
        const numero = parseFloat(value);
        (numero < 0 || numero > 100 || isNaN(numero))
          ? set_error_avance_meta('El valor debe estar entre 0 y 100')
          : set_error_avance_meta('');
      }else{
        const valid_number = /^[0-9]+(\.[0-9]+)?$/.test(value);
        (!valid_number)
          ? set_error_avance_meta('Por favor, ingrese solo números')
          : set_error_avance_meta('');
      }
    }
    set_avance_meta_fisica_anual(value);
  }

  const limpiar_form_registro = (): void => {
    set_meta_fisica_anual("");
    set_avance_meta_fisica_anual("");
    set_porcentaje_avance("");
    set_porcentaje_avance_acumulado("");
    set_descripcion_avance('');
    set_meta_financiera_anual("");
    set_avance_meta_financiera("");
    set_porcentaje_avance_financiero("");
    set_avance_recursos_obligados("");
    set_porcentaje_avance_recursos_obligados("");
    set_error_meta('');
    set_error_avance_meta('');
    set_error_porcentaje_avance('');
    set_error_porcentaje_avance_acumulado('');
    set_error_porcentaje_avance_financiero('');
    set_error_porcentaje_avance_recursos_obligados('');
  }

  const limpiar_informacion_planes = (): void => {
    set_id_objetivo("");
    set_id_eje_estrategico_pgar("");
    set_id_meta("");
    set_id_linea_base("");
    set_anio_pgar("");
    set_id_actividad_pgar("");
    set_id_indicador_pgar("");
    set_id_eje_estrategico_pai("");
    set_id_programa("");
    set_id_proyecto("");
    set_id_producto("");
    set_id_actividad_pai("");
    set_id_indicador_pai("");
    set_show_registro_avance(false);
  }

  const validate_form = (): boolean => {
    if(!meta_fisica_anual){
      set_error_meta('Este campo es requerido');
      return false;
    }

    if(!avance_meta_fisica_anual){
      set_error_avance_meta('Este campo es requerido');
      return false;
    }

    if(!porcentaje_avance){
      set_error_porcentaje_avance('Este campo es requerido');
      return false;
    }

    if(!porcentaje_avance_acumulado){
      set_error_porcentaje_avance_acumulado('Este campo es requerido');
      return false;
    }

    if(!descripcion_avance){
      set_error_description_avance('Este campo es requerido');
      return false;
    }

    if(!meta_financiera_anual){
      set_error_meta_financiera_anual('Este campo es requerido');
      return false;
    }

    if(!avance_meta_financiera){
      set_error_meta_fisica_anual('Este campo es requerido');
      return false;
    }

    if(!porcentaje_avance_financiero){
      set_error_porcentaje_avance_financiero('Este campo es requerido');
      return false;
    }

    if(!avance_recursos_obligados){
      set_error_avance_recursos_obligados('Este campo es requerido');
      return false;
    }

    if(!porcentaje_avance_recursos_obligados){
      set_error_porcentaje_avance_recursos_obligados('Este campo es requerido');
      return false;
    }

    return true;
  }

  const send_form = () => {
    if(id_indicador_pai && id_indicador_pgar && validate_form()){
      const data = {
        ano_PGAR: anio_pgar,
        id_armonizar: form_values.id_armonizar,
        id_indicador: id_indicador_pgar,
        id_actividad: id_actividad_pgar,
        id_linea_base: id_linea_base,
        id_meta_eje: id_meta,
        id_eje_estrategico: id_eje_estrategico_pgar,
        id_programa: id_programa,
        id_proyecto: id_proyecto,
        id_producto: id_producto,
        id_indicador_seg: id_indicador_pai,
        meta_fisica_anual: meta_fisica_anual,
        avance_fisico_anual: avance_meta_fisica_anual,
        pavance_fisico: porcentaje_avance,
        pavance_fisico_acumulado: porcentaje_avance_acumulado,
        descripcion_avance: descripcion_avance,
        meta_finaciera_anual: meta_financiera_anual,
        avance_financiero_anual: avance_meta_financiera,
        pavance_financiero: porcentaje_avance_financiero,
        avance_recurso_obligado: avance_recursos_obligados,
        pavance_recurso_obligado: porcentaje_avance_recursos_obligados,
      };
      if(data){
        post_seguimiento_pgar(data).then(() => {
          control_success('Se registro correctamente');
          limpiar_form_registro();
          fetch_data_seguimiento_pgar();
        }).catch((error) => {
          control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
        });
      }
    }
  }

  const { mode, seguimiento_pgar } = useAppSelector((state) => state.planes);

  useEffect(() => {
    fetch_data_armonizaciones();
  }, []);

  useEffect(() => {
    if (mode.editar) {
      form_values.id_armonizar = seguimiento_pgar.id_armonizar;
      form_values.id_planPGAR = seguimiento_pgar.id_planPGAR;
      form_values.id_planPAI = seguimiento_pgar.id_planPAI;
      form_values.nombre_planPGAR = seguimiento_pgar.nombre_planPGAR;
      form_values.nombre_planPAI = seguimiento_pgar.nombre_planPAI;
      set_id_objetivo(seguimiento_pgar.id_objetivo);
      set_id_eje_estrategico_pgar(seguimiento_pgar.id_eje_estrategico);
      set_id_meta(seguimiento_pgar.id_meta_eje);
      set_id_linea_base(seguimiento_pgar.id_linea_base);
      set_anio_pgar(seguimiento_pgar.ano_PGAR);
      set_id_actividad_pgar(seguimiento_pgar.id_actividad);
      set_id_indicador_pgar(seguimiento_pgar.id_indicador);
      set_id_eje_estrategico_pai(seguimiento_pgar.id_eje_estrategico_pai);
      set_id_programa(seguimiento_pgar.id_programa);
      set_id_proyecto(seguimiento_pgar.id_proyecto);
      // set_id_producto(seguimiento_pgar.id_producto);
      // set_id_actividad_pai(seguimiento_pgar.id_actividad);
      set_id_indicador_pai(seguimiento_pgar.id_indicador_seg);
      set_meta_fisica_anual(seguimiento_pgar.meta_fisica_anual);
      set_avance_meta_fisica_anual(seguimiento_pgar.avance_fisico_anual);
      set_porcentaje_avance(seguimiento_pgar.pavance_fisico);
      set_porcentaje_avance_acumulado(seguimiento_pgar.pavance_fisico_acumulado);
      set_descripcion_avance(seguimiento_pgar.descripcion_avance);
      set_meta_financiera_anual(seguimiento_pgar.meta_finaciera_anual);
      set_avance_meta_financiera(seguimiento_pgar.avance_financiero_anual);
      set_porcentaje_avance_financiero(seguimiento_pgar.pavance_financiero);
      set_avance_recursos_obligados(seguimiento_pgar.avance_recurso_obligado);
      set_porcentaje_avance_recursos_obligados(seguimiento_pgar.pavance_recurso_obligado);
    }
  }, [mode, seguimiento_pgar]);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Búsqueda de Armonizaciones" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl required size='small' fullWidth>
            <InputLabel>Nombre Armonización</InputLabel>
            <Select
              multiline
              value={form_values.id_armonizar || ''}
              label="Nombre Armonización"
              onChange={change_armonizacion}
            >
              <MenuItem value="">
                <em>Seleccione una opción</em>
              </MenuItem>
              {rows_armonizacion.map((tipos: any) => (
                <MenuItem key={tipos.id_armonizar} value={tipos.id_armonizar}>
                  {tipos.nombre_relacion}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione una armonización</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            size='small'
            multiline
            fullWidth
            label="Nombre PGAR"
            value={form_values.nombre_planPGAR || ''}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size='small'
            fullWidth
            label="Estado"
            value={form_values.estado ? 'Vigente' : 'No Vigente'}
            disabled
         />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            multiline
            size='small'
            fullWidth
            label="Nombre PAI"
            value={form_values.nombre_planPAI}
            disabled
          />
        </Grid>
        {show_plan_info && (
          <>
            <Grid item xs={12} my={1}>
              <Title title="Información Plan PGAR" />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Objetivo</InputLabel>
                <Select
                  multiline
                  value={id_objetivo || ''}
                  label="Nombre Objetivo"
                  onChange={handle_objetivo_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {form_values.objetivoPGAR.map((tipos: any) => (
                    <MenuItem key={tipos.id_objetivo} value={tipos.id_objetivo}>
                      {tipos.nombre_objetivo}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Objetivo</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required size='small'  fullWidth>
                <InputLabel>Eje Estratégico</InputLabel>
                <Select
                  disabled={id_objetivo == ""}
                  multiline
                  value={id_eje_estrategico_pgar}
                  label="Eje Estratégico"
                  onChange={handle_eje_estrategico_pgar_change}
                >
                  {ejes_estrategicos_pgar.map((tipos: any) => (
                    <MenuItem key={tipos.id_eje_estrategico} value={tipos.id_eje_estrategico}>
                      {tipos.nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Eje Estratégico</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Meta</InputLabel>
                <Select
                  disabled={id_eje_estrategico_pgar == ""}
                  multiline
                  value={id_meta || ''}
                  label="Nombre Meta"
                  onChange={handle_meta_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {metas_pgar.map((tipos: any) => (
                    <MenuItem key={tipos.id_meta_eje} value={tipos.id_meta_eje}>
                      {tipos.nombre_meta_eje}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione una Meta</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Linea Base</InputLabel>
                <Select
                  disabled={id_meta == ""}
                  multiline
                  value={id_linea_base || ''}
                  label="Nombre Linea Base"
                  onChange={handle_linea_base_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {lineas_base_pgar.map((tipos: any) => (
                    <MenuItem key={tipos.id_linea_base} value={tipos.id_linea_base}>
                      {tipos.nombre_linea_base}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione una Linea Base</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                size='small'
                fullWidth
                label="Año PGAR"
                type="number"
                value={anio_pgar || ''}
                onChange={handle_anio_pgar_change}
                helperText="Año de la meta"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Actividad</InputLabel>
                <Select
                  disabled={id_linea_base == ""}
                  multiline
                  value={id_actividad_pgar || ''}
                  label="Nombre Actividad"
                  onChange={handle_actividad_pgar_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {actividades_pgar.map((tipos: any) => (
                    <MenuItem key={tipos.id_actividad} value={tipos.id_actividad}>
                      {tipos.nombre_actividad}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione una Actividad</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Indicador</InputLabel>
                <Select
                  disabled={id_actividad_pgar == ""}
                  multiline
                  value={id_indicador_pgar || ''}
                  label="Nombre Indicador"
                  onChange={handle_indicador_pgar_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {indicadores_pgar.map((tipos: any) => (
                    <MenuItem key={tipos.id_indicador} value={tipos.id_indicador}>
                      {tipos.nombre_indicador}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Indicador</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} my={1}>
              <Title title="Información Plan PAI" />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Eje Estratégico</InputLabel>
                <Select
                  multiline
                  value={id_eje_estrategico_pai || ''}
                  label="Eje Estratégico"
                  onChange={handle_eje_estrategico_pai_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {/* {form_values.ejesEstrategicosPAI.map((tipos: any) => (
                    <MenuItem key={tipos.id_eje_estrategico} value={tipos.id_eje_estrategico}>
                      {tipos.nombre}
                    </MenuItem>
                  ))} */}
                  {/* TODO: Eliminar */}
                  {ejes_estrategicos_pai.map((tipos: any) => (
                    <MenuItem key={tipos.id_eje_estrategico} value={tipos.id_eje_estrategico}>
                      {tipos.nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Eje Estratégico</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Programa</InputLabel>
                <Select
                  disabled={id_eje_estrategico_pai == ""}
                  multiline
                  value={id_programa || ''}
                  label="Nombre Programa"
                  onChange={handle_programa_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {programas_pai.map((tipos: any) => (
                    <MenuItem key={tipos.id_programa} value={tipos.id_programa}>
                      {tipos.nombre_programa}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Programa</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Proyecto</InputLabel>
                <Select
                  disabled={id_programa == ""}
                  multiline
                  rows={2}
                  value={id_proyecto || ''}
                  label="Nombre Proyecto"
                  onChange={handle_proyecto_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {proyectos_pai.map((tipos: any) => (
                    <MenuItem key={tipos.id_proyecto} value={tipos.id_proyecto}>
                      {tipos.nombre_proyecto}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Proyecto</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Producto</InputLabel>
                <Select
                  disabled={id_proyecto == ""}
                  multiline
                  rows={2}
                  value={id_producto || ''}
                  label="Nombre Producto"
                  onChange={handle_producto_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {productos_pai.map((tipos: any) => (
                    <MenuItem key={tipos.id_producto} value={tipos.id_producto}>
                      {tipos.nombre_producto}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Producto</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Actividad</InputLabel>
                <Select
                  disabled={id_producto == ""}
                  multiline
                  value={id_actividad_pai}
                  label="Nombre Actividad"
                  onChange={handle_actividad_pai_change}
                >
                  {actividades_pai.map((tipos: any) => (
                    <MenuItem key={tipos.id_actividad} value={tipos.id_actividad}>
                      {tipos.nombre_actividad}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione una Actividad</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Nombre Indicador</InputLabel>
                <Select
                  disabled={id_actividad_pai == ""}
                  multiline
                  value={id_indicador_pai || ''}
                  label="Nombre Indicador"
                  onChange={handle_indicador_pai_change}
                >
                  <MenuItem value="">
                    <em>Seleccione una opción</em>
                  </MenuItem>
                  {indicadores_pai.map((tipos: any) => (
                    <MenuItem key={tipos.id_indicador} value={tipos.id_indicador}>
                      {tipos.nombre_indicador}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un Indicador</FormHelperText>
              </FormControl>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" mt={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="warning"
                  disabled={false}
                  onClick={() => {
                    limpiar_informacion_planes();
                  }}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      {show_registro_avance && (
        <Grid
          container
          spacing={2}
          m={2}
          p={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            m: '10px 0 20px 0',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12}>
            <Title title="Registro de Avance PGAR" />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              required
              size='small'
              type='number'
              fullWidth
              label="Meta Física Anual"
              value={meta_fisica_anual || ''}
              onChange={handle_meta_fisica_change}
              error={error_meta !== ''}
              helperText={error_meta || 'Ingrese la meta física anual'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              required
              size='small'
              type='number'
              fullWidth
              label="Avance Meta Física Anual"
              value={avance_meta_fisica_anual || ''}
              onChange={handle_meta_anual_change}
              error={error_avance_meta !== ''}
              helperText={error_avance_meta || 'Ingrese el avance de la meta física anual'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              required
              size='small'
              type="number"
              fullWidth
              label="Porcentaje de Avance Físico"
              value={porcentaje_avance || ''}
              onChange={handle_porcentaje_avance_change}
              error={error_porcentaje_avance !== ''}
              helperText={error_porcentaje_avance || 'Ingrese el porcentaje de avance físico'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              required
              size='small'
              type="number"
              fullWidth
              label="Porcentaje de Avance Físico Acumulado"
              value={porcentaje_avance_acumulado || ''}
              onChange={handle_porcentaje_avance_acumulado_change}
              error={error_porcentaje_avance_acumulado !== ''}
              helperText={error_porcentaje_avance_acumulado || 'Ingrese el porcentaje de avance físico acumulado'}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={12}>
            <TextField
              required
              size='small'
              multiline
              fullWidth
              rows={3}
              label="Descripción de Avance"
              value={descripcion_avance || ''}
              onChange={handle_descripcion_change}
              error={error_description_avance !== ''}
              helperText={error_description_avance || 'Ingrese la descripción del avance'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size='small'
              fullWidth
              label="Avance Meta Financiera Anual"
              value={meta_financiera_anual || ''}
              onChange={handle_meta_financiera_change}
              error={error_meta_financiera_anual !== ''}
              helperText={error_meta_financiera_anual || 'Ingrese la meta financiera anual'}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              size='small'
              fullWidth
              label="Avance Meta Física Anual"
              value={avance_meta_financiera || ''}
              onChange={handle_avance_meta_fisica_change}
              error={error_meta_fisica_anual !== ''}
              helperText={error_meta_fisica_anual || 'Ingrese el avance de la meta financiera anual'}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              type='number'
              size='small'
              fullWidth
              label="Porcentaje Avance Financiero"
              value={porcentaje_avance_financiero || ''}
              onChange={handle_porcentaje_avance_financiero_change}
              error={error_porcentaje_avance_financiero !== ''}
              helperText={error_porcentaje_avance_financiero || 'Ingrese el porcentaje de avance financiero'}
            />
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center', gap: '5rem' }} item xs={12}>
            <Grid item xs={12} md={4}>
              <TextField
                required
                size='small'
                fullWidth
                label="Avance de los Recursos Obligados"
                value={avance_recursos_obligados || ''}
                onChange={handle_recursos_obligados_change}
                error={error_avance_recursos_obligados !== ''}
                helperText={error_avance_recursos_obligados || 'Ingrese el avance de los recursos obligados'}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                size='small'
                type='number'
                fullWidth
                label="Porcentaje Avance de los Recursos Obligados"
                value={porcentaje_avance_recursos_obligados || ''}
                onChange={handle_porcentaje_avance_recursos_obligados_change}
                error={error_porcentaje_avance_recursos_obligados !== ''}
                helperText={error_porcentaje_avance_recursos_obligados || 'Ingrese el porcentaje de avance de los recursos obligados'}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="flex-end" mt={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  disabled={false}
                  onClick={() => {
                    limpiar_form_registro();
                    set_show_registro_avance(false);
                    set_id_actividad_pai("");
                  }}
                >
                  Cerrar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="warning"
                  disabled={false}
                  onClick={() => {
                    limpiar_form_registro();
                  }}
                >
                  Limpiar
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color="success"
                  onClick={() => {send_form()}}
                  startIcon={<SaveIcon />}
                >
                  Guardar
                </LoadingButton>
              </Grid>
            </Grid>
        </Grid>
      )}
    </>
  );
};