import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import { data_solicitud_viaje, inputs_persona_seleccionada, interface_busqueda_persona_solicita, interface_solicitar_viaje, interface_solicitud_respondida, response_solicitud_respondida } from '../interfaces/types';
import ViajeAgendado from './ViajeAgendado';
import { control_error } from '../../../../helpers';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../../../hooks';
import { editar_solicitud_viaje, enviar_solicitud_viaje, get_obtener_estados_solicitud, listar_departamentos, listar_municipios, obtener_agendamiento_solicitud, obtener_solicitud_por_id, obtener_solicitudes, parseHora } from '../thunks/viajes';
import BusquedaExpediente from './BusquedaExpediente';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import TablaPersonasViajan from '../tables/TablaPersonasViajan';
import PersonasViajan from '../components/PersonasViajan';
import { vi } from 'date-fns/locale';


interface props {
  set_mostrar_solicitud_viaje: React.Dispatch<React.SetStateAction<boolean>>;
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  refrescar_tabla: boolean;
  accion: string;
  id_solicitud_editar: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitarViaje: React.FC<props> = ({ set_mostrar_solicitud_viaje, set_refrescar_tabla, refrescar_tabla, accion, id_solicitud_editar }) => {
  const dispatch = useAppDispatch();


  const [motivo_viaje, set_motivo_viaje] = useState<string>('');
  const [switch_expediente_asociado, set_switch_expediente_asociado] = useState<boolean>(false);
  const [direccion, set_direccion] = useState<string>('');
  const [departamento, set_departamento] = useState<string>('');
  const [municipio, set_municipio] = useState<string>('');
  const [indicadores_destino, set_indicadores_destino] = useState<string>('');
  const [numero_pasajeros, set_numero_pasajeros] = useState<number>(0);
  const [fecha_rechazo, set_fecha_rechazo] = useState<Dayjs>(dayjs());
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());
  const [switch_requiere_carga, set_switch_requiere_carga] = useState<boolean>(false);
  const [switch_requiere_acompanamiento_militar, set_switch_requiere_acompanamiento_militar] = useState<boolean>(false);
  const [consideraciones_adicionales, set_consideraciones_adicionales] = useState<string>('');
  const [justificacion_rechazo, set_justificacion_rechazo] = useState<string>('');
  const [id_expediente, set_id_expediente] = useState<number>(0);
  const [mostrar_busqueda_expediente, set_mostrar_busqueda_expediente] = useState<boolean>(false);
  const [municipios, set_municipios] = useState<any>();
  const [departamentos, set_departamentos] = useState<any>();
  const [departamento_editar, set_departamento_editar] = useState<string>('73');
  const [municipio_editar, set_municipio_editar] = useState<string>('73001');
  const [unidad_organizacional, set_unidad_organizacional] = useState<string>('');

  const [abrir_modal_generar_direccion, set_abrir_modal_generar_direccion] = useState<boolean>(false);

  // INputs de la busqueda de personas
  const [inputs_persona_seleccionada, set_inputs_persona_seleccionada] = useState<inputs_persona_seleccionada>(Object);

  // DAta de las personas seleccionadas para viajar
  const [data_personas_viajan, set_data_personas_viajan] = useState<interface_busqueda_persona_solicita[]>([]);



  // Estados de mensajes de error
  const [msj_error_departamento, set_msj_error_departamento] = useState<string>('');
  const [msj_error_municipio, set_msj_error_municipio] = useState<string>("");
  const [msj_error_numero_pasajeros, set_msj_error_numero_pasajeros] = useState<string>("");
  const [msj_error_direccion, set_msj_error_direccion] = useState<string>("");
  const [msj_error_indicadores_destino, set_msj_error_indicadores_destino] = useState<string>("");
  const [msj_error_motivo_viaje, set_msj_error_motivo_viaje] = useState<string>("");
  const [msj_error_id_expediente, set_msj_error_id_expediente] = useState<string>("");


  // Estado para editar los datos de la solicitud de viaje
  const [editar_datos_solicitar_viaje, set_editar_datos_solicitar_viaje] = useState<data_solicitud_viaje>(Object);

  // Estado de datos de la solicitud para ver
  const [datos_solicitud_ver, set_datos_solicitud_ver] = useState<any>(Object);

  // Estado para almacenar los datos de la solicitud de viaje
  const [datos_solicitar_viaje, set_datos_solicitar_viaje] = useState<interface_solicitar_viaje>();

  // Estado para almacenar la solicitud de viaje respondida
  const [solicitud_respondida, set_solicitud_respondida] = useState<interface_solicitud_respondida>(Object);

  useEffect(() => {
    // Establece los datos de la solicitud de viaje en el estado correspondiente
    set_datos_solicitar_viaje({
      ...(accion === 'crear' ? { motivo_viaje_solicitado: motivo_viaje } : accion === 'editar' && { motivo_viaje: motivo_viaje }),
      cod_municipio: municipio,  // Código del municipio de destino
      cod_departamento: departamento,  // Código del departamento de destino
      tiene_expediente_asociado: switch_expediente_asociado,
      ...(switch_expediente_asociado && { id_expediente_asociado: id_expediente }),
      direccion: direccion,  // Dirección del destino
      nro_pasajeros: numero_pasajeros,  // Número de pasajeros
      fecha_partida: fecha_salida.format('YYYY-MM-DD'),  // Fecha de partida
      hora_partida: dayjs(hora_salida).format('HH:mm'),  // Hora de partida
      fecha_retorno: fecha_retorno.format('YYYY-MM-DD'),  // Fecha de retorno
      hora_retorno: dayjs(hora_retorno).format('HH:mm'),  // Hora de retorno
      req_compagnia_militar: switch_requiere_acompanamiento_militar,  // Indica si se requiere compañía militar
      requiere_carga: switch_requiere_carga,  // Indica si se requiere compañía militar
      consideraciones_adicionales: consideraciones_adicionales,
      indicaciones_destino: indicadores_destino,
      ...(accion !== 'editar' ? { personas_viajan: data_personas_viajan?.map((persona) => persona.id_persona) } : {})
    });
  }, [switch_expediente_asociado,
    departamento,
    msj_error_departamento,
    municipio,
    msj_error_municipio,
    numero_pasajeros,
    msj_error_numero_pasajeros,
    fecha_salida,
    fecha_retorno,
    hora_salida,
    hora_retorno,
    switch_requiere_carga,
    switch_requiere_acompanamiento_militar,
    direccion,
    indicadores_destino,
    consideraciones_adicionales,
    motivo_viaje,
    id_expediente,
    data_personas_viajan,
  ]);

  /**
   * Maneja el cambio de la fecha de salida.
   * 
   * @param {Dayjs | null} date - Objeto que representa la fecha seleccionada.
   * @returns {void}
   */
  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
    }
  };

  /**
 * Maneja el cambio de la fecha de rechazo solicitud.
 * 
 * @param {Dayjs | null} date - Objeto que representa la fecha seleccionada.
 * @returns {void}
 */
  const cambio_fecha_rechazo = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_rechazo(date);
    }
  };

  /**
   * Maneja el cambio de la fecha de retorno.
   * 
   * @param {Dayjs | null} date - Objeto que representa la fecha seleccionada.
   * @returns {void}
   */
  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
    }
  };


  /**
   * Maneja el cambio en el número de pasajeros.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Objeto que representa el evento de cambio en el input.
   * @returns {void}
   */
  const cambio_numero_pasajeros: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_numero_pasajeros(Number(e.target.value));
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_numero_pasajeros("");
  };

  const cambio_hora_salida = (newTime: dayjs.Dayjs | null) => {
    set_hora_salida(newTime?.toDate() || null);
  };


  const cambio_hora_retorno = (newTime: dayjs.Dayjs | null) => {
    set_hora_retorno(newTime?.toDate() || null);
  };

  const limpiar_formulario_solicitar_viaje = () => {
    //Se limpiam los estados de los inputs
    set_id_expediente(0);
    set_motivo_viaje('');
    set_switch_expediente_asociado(false);
    set_direccion('');
    set_departamento('');
    set_municipio('');
    set_departamento_editar('');
    set_municipio_editar('');
    set_indicadores_destino('');
    set_numero_pasajeros(0);
    set_fecha_salida(dayjs());
    set_hora_salida(new Date());
    set_switch_requiere_carga(false);
    set_fecha_retorno(dayjs());
    set_hora_retorno(new Date());
    set_switch_requiere_acompanamiento_militar(false);
    set_consideraciones_adicionales('');
    //Se limpian los estaos de las propiedades de error de los inputs
    set_msj_error_departamento('');
    set_msj_error_municipio('');
    set_msj_error_numero_pasajeros('');
    set_msj_error_direccion('');
    set_msj_error_indicadores_destino('');
    set_msj_error_motivo_viaje('');
    set_msj_error_id_expediente('');
  }

  /**
   * Valida los datos del formulario antes de enviar la solicitud.
   * 
   * @returns {Promise<boolean | undefined>} - Una promesa que resuelve a `true` si la validación es exitosa, de lo contrario, retorna `false`.
   */
  const validar_datos: () => Promise<boolean | undefined> = async () => {
    let fecha_hoy = dayjs();

    if (motivo_viaje.trim() === '') {
      control_error('Escriba el motivo del viaje');
      set_msj_error_motivo_viaje('Escriba el motivo del viaje');
      return false;
    } else if (switch_expediente_asociado && id_expediente === 0) {
      set_msj_error_id_expediente('Selecciona un expediente en el campo de buscar expediente');
      control_error('Selecciona un expediente en el campo de buscar expediente');
      return false
    } else if (departamento === '' || departamento === null) {
      set_msj_error_departamento('Seleccione un departamento');
      control_error('Seleccione un departamento');
      return false;
    } else if (municipio === '' || municipio === null) {
      set_msj_error_municipio('Seleccione un municipio');
      control_error('Seleccione un municipio')
      return false;
    } else if (fecha_salida.isBefore(fecha_hoy, 'day')) {
      control_error('La fecha de salida no puede ser anterior a la de hoy');
      return false;
    } else if (numero_pasajeros <= 0) {
      set_msj_error_numero_pasajeros('El número de pasajeros no puede ser menor o igual a 0');
      control_error('El número de pasajeros no puede ser menor o igual a 0');
      return false;
    } else if (fecha_salida.isValid() === false) {
      control_error('La fecha de salida es invalida');
      return false
    } else if (fecha_retorno.isBefore(fecha_hoy, 'day')) {
      control_error('La fecha de salida no puede ser anterior a la de hoy');
    } else if (fecha_retorno.isValid() === false) {
      control_error('La fecha de salida es invalida');
      return false
    } else if (indicadores_destino.trim() === '') {
      control_error('El campo indicaciones de destino no puede estar vacío');
      set_msj_error_indicadores_destino('El campo indicaciones de destino no puede estar vacío');
      return false
    } else if (accion === 'crear' && data_personas_viajan.length > numero_pasajeros) {
      control_error('El número de funcionarios seleccionados no puede ser mayor al valor del campo de número de pasajeros');
      return false;
    } else if (accion === 'editar') {
      if (departamento_editar === '' || departamento_editar === null) {
        set_msj_error_departamento('Seleccione un departamento');
        control_error('Seleccione un departamento');
        return false;
      } else if (municipio_editar === '' || municipio_editar === null) {
        set_msj_error_municipio('Seleccione un municipio');
        control_error('Seleccione un municipio')
        return false;
      }
    }
    /**
    * Muestra un modal de confirmación para enviar la solicitud.
    * @returns {Promise<boolean>} - Una promesa que resuelve a `true` si se confirma, de lo contrario, resuelve a `false`.
    */
    const modal_confirmar = await Swal.fire({
      title: '¿Está seguro que desea enviar la solicitud?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return true;
      } else if (result.isDenied) {
        return false;
      }
    });

    return modal_confirmar ? true : false;
  }

  /**
   * Efecto secundario que se ejecuta al cambiar el ID del expediente.
   * Limpia el mensaje de error relacionado con el ID del expediente si este no es igual a 0.
   */
  useEffect(() => {
    if (id_expediente !== 0) {
      set_msj_error_id_expediente('');
    }
  }, [id_expediente])

  /**
   * Maneja la acción de enviar la solicitud de viaje.
   * Realiza una validación de los datos antes de enviar la solicitud.
   * @returns {void}
   */
  const btn_enviar_solicitud_viaje: () => void = async () => {
    const validacion = await validar_datos();
    if (validacion) {
      dispatch(enviar_solicitud_viaje(datos_solicitar_viaje)).then((response: { success: boolean, detail: string, data: any }) => {
        if (response.detail) {
          set_refrescar_tabla(!refrescar_tabla);
          return;
        }
      })
      limpiar_formulario_solicitar_viaje();
      set_mostrar_solicitud_viaje(false);
    }
  }

  /**
   * Maneja la acción de editar una solicitud de viaje.
   * Realiza una validación de los datos antes de realizar la edición.
   * 
   * @returns {void}
   */
  const btn_editar_solicitud_viaje: () => void = async () => {
    const validacion = await validar_datos();
    if (validacion) {
      dispatch(editar_solicitud_viaje(datos_solicitar_viaje, id_solicitud_editar))
        .then((response: { success: boolean, detail: string, data: any }) => {
          if (response.detail) {
            set_refrescar_tabla(!refrescar_tabla);
            return;
          }
        })
      set_mostrar_solicitud_viaje(false);
      limpiar_formulario_solicitar_viaje();
    }
  }

  /**
   * Maneja la acción de enviar o editar el formulario de solicitud de viaje.
   * Llama a la función correspondiente según la acción actual.
   * 
   * @returns {void}
   */
  const submit_fomulario = () => {
    if (accion === 'editar') {
      btn_editar_solicitud_viaje();
      return;
    } else if (accion === 'crear') {
      btn_enviar_solicitud_viaje();
      return;
    }
  }

  /**
   * Maneja la acción de buscar expedientes.
   * Muestra la búsqueda de expedientes si el interruptor de expediente asociado está activado.
   * 
   * @returns {void}
   */
  const btn_buscar_expediente = () => {
    if (accion !== 'ver') {
      if (switch_expediente_asociado) {
        set_mostrar_busqueda_expediente(true);
      }
    }
  }

  /**
   * Obtiene las solicitudes de viaje y, si se está editando una solicitud específica, establece los datos para editar.
   * 
   * @returns {void}
   */
  const obtener_solicitudes_fc: () => void = () => {
    dispatch(obtener_solicitudes()).then((response: any) => {
      const solicitud_editar_encontrada = response.data.find((solicitud: data_solicitud_viaje) => id_solicitud_editar === solicitud.id_solicitud_viaje);

      if (solicitud_editar_encontrada) {
        // Si se encuentra la solicitud, establece los datos para editar
        set_editar_datos_solicitar_viaje(solicitud_editar_encontrada);
      }
    })
  }

  const obtener_solicitud_por_id_fc: () => void = () => {
    dispatch(obtener_solicitud_por_id(id_solicitud_editar))
    .then((response: any) => {
      set_datos_solicitud_ver(response.data)
    })
  }

  const obtener_agendamiento_solicitud_fc: (value: number) => void = (id_solicitud_respondida: number) => {
    dispatch(obtener_agendamiento_solicitud(id_solicitud_respondida))
    .then((response: response_solicitud_respondida) => {
      if(Object.keys(response.data.viajes_agendados).length !== 0){
        set_solicitud_respondida(response?.data.viajes_agendados);
      } else {
        set_solicitud_respondida({} as interface_solicitud_respondida);
      }
    })
  }

  /**
   * Obtiene la lista de departamentos y actualiza el estado correspondiente.
   * 
   * @returns {void}
   */
  const obtener_departamentos: () => void = async () => {
    dispatch(listar_departamentos()).then((response: { success: boolean, detail: string, data: any }) => {
      set_departamentos(response);
      return;
    })
  }

  /**
   * Obtiene la lista de municipios y actualiza el estado correspondiente.
   * 
   * @returns {void}
   */
  const obtener_municipios: () => void = async () => {
    dispatch(listar_municipios()).then((response: { success: boolean, detail: string, data: any }) => {
      set_municipios(response);
      return;
    })
  }

  const obtener_servicios = useRef(false);
  useEffect(() => {
    if (!obtener_servicios.current) {
      obtener_departamentos();
      obtener_municipios();
      obtener_servicios.current = true;
    }
  }, []);

  /**
   * Efecto secundario que se ejecuta al montar el componente y cuando cambian ciertos valores.
   * Obtiene la lista de departamentos, municipios y las solicitudes de viaje si se está editando o viendo una solicitud.
   */
  useEffect(() => {
    if (accion === 'editar') {
      obtener_solicitudes_fc();
    } else if (accion === 'ver') {
      obtener_solicitud_por_id_fc();
    }
  }, [accion, id_solicitud_editar]);

  /**
   * Efecto secundario que se ejecuta al cambiar el estado de `editar_datos_solicitar_viaje` o `id_solicitud_editar`.
   * Actualiza los estados del formulario con los datos de la solicitud de viaje a editar o ver.
   */
  useEffect(() => {
    if (Object.keys(editar_datos_solicitar_viaje).length !== 0) {

      // Comprueba si la acción es 'editar' o 'ver'
      if (accion === 'editar') {
        // Obtiene el motivo de viaje de los datos de edición o solicitud
        const motivo_viaje = editar_datos_solicitar_viaje.motivo_viaje
          ? editar_datos_solicitar_viaje.motivo_viaje
          : editar_datos_solicitar_viaje.motivo_viaje_solicitado;

        // Si hay un expediente asociado, establece el ID del expediente, de lo contrario, establece el ID en 0
        if (editar_datos_solicitar_viaje.id_expediente_asociado) {
          set_id_expediente(editar_datos_solicitar_viaje.id_expediente_asociado);
        } else {
          set_id_expediente(0);
        }

        // Si hay un motivo de viaje definido, establece el motivo de viaje en el estado correspondiente
        if (motivo_viaje !== undefined) {
          set_motivo_viaje(motivo_viaje);
        }

        // Establece los valores de los otros estados con los datos de edición o solicitud
        set_switch_expediente_asociado(editar_datos_solicitar_viaje.tiene_expediente_asociado);
        set_direccion(editar_datos_solicitar_viaje.direccion);
        set_indicadores_destino(editar_datos_solicitar_viaje.indicaciones_destino);
        set_numero_pasajeros(editar_datos_solicitar_viaje.nro_pasajeros);
        set_switch_requiere_carga(editar_datos_solicitar_viaje.requiere_carga);
        set_switch_requiere_acompanamiento_militar(editar_datos_solicitar_viaje.requiere_compagnia_militar);
        set_consideraciones_adicionales(editar_datos_solicitar_viaje.consideraciones_adicionales);
        cambio_fecha_salida(dayjs(editar_datos_solicitar_viaje.fecha_partida));
        cambio_fecha_rechazo(dayjs(editar_datos_solicitar_viaje.fecha_rechazo));
        cambio_fecha_retorno(dayjs(editar_datos_solicitar_viaje.fecha_retorno));
        cambio_hora_salida(parseHora(editar_datos_solicitar_viaje.hora_partida));
        cambio_hora_retorno(parseHora(editar_datos_solicitar_viaje.hora_retorno));
        set_municipio_editar(editar_datos_solicitar_viaje.cod_municipio);
        set_departamento_editar(editar_datos_solicitar_viaje.cod_departamento);
        set_municipio(editar_datos_solicitar_viaje.cod_municipio);
        set_departamento(editar_datos_solicitar_viaje.cod_departamento);
      }

      // Si la acción es 'editar', establece la justificación de rechazo en el estado correspondiente
      if (accion === 'editar') {
        set_justificacion_rechazo(editar_datos_solicitar_viaje.justificacion_rechazo);
      }
      
      // Si la acción es 'ver', obtiene el agendamiento de la solicitud de viaje
    }
    if(Object.keys(datos_solicitud_ver).length !== 0){
      if (accion === 'ver') {
        set_switch_expediente_asociado(datos_solicitud_ver.solicitud_viaje.tiene_expediente_asociado);
        set_direccion(datos_solicitud_ver.solicitud_viaje.direccion);
        set_indicadores_destino(datos_solicitud_ver.solicitud_viaje.indicaciones_destino);
        set_numero_pasajeros(datos_solicitud_ver.solicitud_viaje.nro_pasajeros);
        set_switch_requiere_carga(datos_solicitud_ver.solicitud_viaje.requiere_carga);
        set_switch_requiere_acompanamiento_militar(datos_solicitud_ver.solicitud_viaje.requiere_compagnia_militar);
        set_consideraciones_adicionales(datos_solicitud_ver.solicitud_viaje.consideraciones_adicionales);
        cambio_fecha_salida(dayjs(datos_solicitud_ver.solicitud_viaje.fecha_partida));
        cambio_fecha_rechazo(dayjs(datos_solicitud_ver.solicitud_viaje.fecha_rechazo));
        cambio_fecha_retorno(dayjs(datos_solicitud_ver.solicitud_viaje.fecha_retorno));
        cambio_hora_salida(parseHora(datos_solicitud_ver.solicitud_viaje.hora_partida));
        cambio_hora_retorno(parseHora(datos_solicitud_ver.solicitud_viaje.hora_retorno));
        set_municipio_editar(datos_solicitud_ver.solicitud_viaje.cod_municipio);
        set_departamento_editar(datos_solicitud_ver.solicitud_viaje.cod_departamento);
        set_municipio(datos_solicitud_ver.solicitud_viaje.cod_municipio);
        set_departamento(datos_solicitud_ver.solicitud_viaje.cod_departamento);
        set_motivo_viaje(datos_solicitud_ver.solicitud_viaje.motivo_viaje);
        set_unidad_organizacional(datos_solicitud_ver.solicitud_viaje.unidad_organizacional_solicita);

        set_data_personas_viajan(datos_solicitud_ver.personas_solicitud_viaje);
  
        obtener_agendamiento_solicitud_fc(datos_solicitud_ver.solicitud_viaje.id_solicitud_viaje);
      }
    }
  }, [editar_datos_solicitar_viaje, id_solicitud_editar, accion, datos_solicitud_ver])



  /**
   * Obtiene el departamento seleccionado en base al código del departamento a editar.
   */
  const departamento_seleccionado = departamentos && departamentos.find(
    ([codigoDepartamento]: string) => departamento_editar.startsWith(codigoDepartamento)
  );

  /**
   * Filtra los municipios basándose en el departamento seleccionado.
   */
  const municipios_filtrados = municipios && municipios?.filter(
    ([codigoMunicipio, nombre]: [string, string]) => codigoMunicipio.startsWith(departamento_seleccionado && departamento_seleccionado[0])
  );

  /**
   * Maneja el cambio en el departamento.
   * Actualiza el estado correspondiente dependiendo de la acción (crear o editar).
   * 
   * @param {SelectChangeEvent<string>} e - Objeto que representa el evento de cambio en la selección del departamento.
   * @returns {void}
   */
  const cambio_departamento: (e: SelectChangeEvent<string>) => void = (e) => {
    if (accion === 'crear') {
      set_msj_error_departamento('');
      set_departamento(e.target.value);
    } else if (accion === 'editar') {
      set_departamento_editar(e.target.value);
      set_departamento(e.target.value);
    }
  }


  /**
   * Maneja el cambio en el municipio.
   * Actualiza el estado correspondiente dependiendo de la acción (crear o editar).
   * 
   * @param {SelectChangeEvent<string>} e - Objeto que representa el evento de cambio en la selección del municipio.
   * @returns {void}
   */
  const cambio_municipio: (e: SelectChangeEvent<string>) => void = (e) => {
    if (accion === 'crear') {
      set_msj_error_municipio('');
      set_municipio(e.target.value);
    } else if (accion === 'editar') {
      set_municipio_editar(e.target.value);
      set_municipio(e.target.value);
    }
  }


  return (
    <Grid
      container
      marginTop={2}
      sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
    >
      <BusquedaExpediente
        set_mostrar_busqueda_expediente={set_mostrar_busqueda_expediente}
        mostrar_busqueda_expediente={mostrar_busqueda_expediente}
        set_id_expediente={set_id_expediente}
        id_expediente={id_expediente}
      />

      <Title title="Solicitar viaje" />
      <Grid
        container
        spacing={2}
        rowSpacing={3}
        sx={{
          marginTop: "10px",
        }}
      >
        <Grid item xs={12} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start'
        }}>
          <TextField
            label='Motivo de viaje'
            required
            disabled={accion === 'ver'}
            error={msj_error_motivo_viaje !== ''}
            value={motivo_viaje}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              set_msj_error_motivo_viaje('');
              set_motivo_viaje(e.target.value)
            }}
            fullWidth
            placeholder="Escriba aqui el motivo de viaje"
            size="small"
            multiline
            rows={2}
          />
        </Grid>

        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} lg={3}>
            <FormLabel htmlFor="expediente_asociado">
              ¿Tiene expediente asociado?
            </FormLabel>
            <Switch
              id="expediente_asociado"
              checked={switch_expediente_asociado}
              disabled={accion === 'ver'}
              onChange={() => {
                set_msj_error_id_expediente('')
                set_switch_expediente_asociado(!switch_expediente_asociado)
              }}
            />
          </Grid>

          <Grid item container spacing={1} xs={12} lg={4} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                label='Id'
                sx={{ cursor: switch_expediente_asociado ? 'pointer' : 'default' }}
                disabled
                required
                size="small"
                onClick={btn_buscar_expediente}
                error={msj_error_id_expediente !== ''}
                value={id_expediente === 0 ? '' : id_expediente}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_msj_error_id_expediente('');
                  set_id_expediente(Number(e.target.value))
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Button
                fullWidth
                disabled={switch_expediente_asociado && accion !== 'ver' ? false : true}
                color='primary'
                onClick={btn_buscar_expediente}
                variant='contained'
                startIcon={<SearchIcon />}
                type='submit'
              >
                Buscar expediente
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={3}>
            <TextField
              label='Dirección: '
              fullWidth
              value={direccion}
              disabled
              error={msj_error_direccion !== ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                set_msj_error_direccion('')
                set_direccion(e.target.value)
              }}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchOutlined />}
              onClick={() => {
                set_abrir_modal_generar_direccion(true);
              }}
            >
              Generar
            </Button>
          </Grid>
        </Grid>


        <Grid item container xs={12} spacing={1} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        >
          <Grid item xs={12} lg={3} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          >
            <FormControl required size="small" fullWidth>
              <InputLabel error={msj_error_departamento !== ''}>Departamento</InputLabel>
              <Select
                fullWidth
                disabled={accion === 'ver'}
                label="Departamento"
                value={accion === 'crear' ? departamento : accion === 'editar' ? departamento_editar : departamento}
                required
                error={msj_error_departamento !== ''}
                onChange={cambio_departamento}
              >
                {departamentos && departamentos.map((dept: any) => {
                  return <MenuItem key={dept[0]} value={dept[0]}>{dept[1]}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={3} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          >
            <FormControl required size="small" fullWidth>
              <InputLabel>Municipio</InputLabel>
              <Select
                fullWidth
                label="Estado"
                disabled={accion === 'ver'}
                value={accion === 'crear' ? municipio : accion === 'editar' ? municipio_editar : municipio}
                required
                onChange={cambio_municipio}
                error={msj_error_municipio !== ""}
              >
                {accion === 'crear' ? departamento ? municipios &&
                  municipios?.filter(([codigoMunicipio]: [string]) => {
                    return codigoMunicipio.startsWith(departamento);
                  })
                    .map(([codigoMunicipio, nombre]: [string, string]) => (
                      <MenuItem key={codigoMunicipio} value={codigoMunicipio}>
                        {nombre}
                      </MenuItem>
                    ))
                  :
                  <MenuItem value=''>
                    Seleccione un departamento
                  </MenuItem>
                  : accion === 'editar' ?
                    municipios_filtrados && municipios_filtrados.map(([codigoMunicipio, nombre]: [string, string]) => (
                      <MenuItem key={codigoMunicipio} value={codigoMunicipio}>
                        {nombre}
                      </MenuItem>
                    ))
                    : accion === 'ver' &&
                    municipios_filtrados && municipios_filtrados.map(([codigoMunicipio, nombre]: [string, string]) => (
                      <MenuItem key={codigoMunicipio} value={codigoMunicipio}>
                        {nombre}
                      </MenuItem>
                    ))
                }

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={4}>
            <TextField
              label='Indicaciones de destino (Predio)'
              disabled={accion === 'ver'}
              value={indicadores_destino}
              error={msj_error_indicadores_destino !== ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                set_msj_error_indicadores_destino('');
                set_indicadores_destino(e.target.value);
              }}
              fullWidth
              size="small" />
          </Grid>
          <Grid item xs={12} lg={2} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <TextField
              fullWidth
              label='Número de pasajeros*:'
              type={"number"}
              disabled={accion === 'ver'}
              value={numero_pasajeros}
              error={msj_error_numero_pasajeros !== ''}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={cambio_numero_pasajeros}
            />
          </Grid>
        </Grid>

        <Grid item container columnSpacing={2} rowSpacing={1} xs={12} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        >
          <Grid item xs={12} lg={5} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha de salida: '
                value={fecha_salida}
                disabled={accion === 'ver'}
                onChange={(newValue) => {
                  cambio_fecha_salida(newValue);
                }}
                renderInput={(params) => (
                  <TextField disabled={accion === 'ver'} required fullWidth size="small" {...params} />
                )}
                minDate={accion === 'crear' ? dayjs() : null}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={3} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Seleccionar hora de salida"
                openTo="hours"
                value={hora_salida}
                disabled={accion === 'ver'}
                onChange={cambio_hora_salida}
                renderInput={(params) => (
                  <TextField fullWidth {...params} disabled={accion === 'ver'} variant="standard" helperText="" />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          >
            <Grid item sx={{
              display: 'flex',
              justifyContent: 'start'
            }}>
              <FormLabel htmlFor="requiere_recarga">¿Requiere carga?</FormLabel>
            </Grid>
            <Switch
              id="requiere_recarga"
              checked={switch_requiere_carga}
              disabled={accion === 'ver'}
              onChange={() => set_switch_requiere_carga(!switch_requiere_carga)}
            />
          </Grid>
        </Grid>

        <Grid item container columnSpacing={2} rowSpacing={1} xs={12} sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        >
          <Grid item xs={12} lg={5} sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha de retorno: '
                disabled={accion === 'ver'}
                value={fecha_retorno}
                onChange={(newValue) => {
                  cambio_fecha_retorno(newValue);
                }}
                renderInput={(params) => (
                  <TextField required disabled={accion === 'ver'} fullWidth size="small" {...params} />
                )}
                minDate={accion === 'crear' ? dayjs() : null}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={3} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label="Seleccionar hora de retorno"
                openTo="hours"
                disabled={accion === 'ver'}
                value={hora_retorno}
                onChange={cambio_hora_retorno}
                renderInput={(params) => (
                  <TextField fullWidth {...params} disabled={accion === 'ver'} variant="standard" helperText="" />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={4} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          >
            <Grid item sx={{
              display: 'flex',
              justifyContent: 'start'
            }}>
              <FormLabel style={{ textAlign: 'start' }} htmlFor="requiere_compania_militar">
                ¿Requiere acompañamiento militar?
              </FormLabel>
            </Grid>
            <Switch
              id="requiere_compania_militar"
              disabled={accion === 'ver'}
              checked={switch_requiere_acompanamiento_militar}
              onChange={() =>
                set_switch_requiere_acompanamiento_militar(!switch_requiere_acompanamiento_militar)
              }
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          <TextField
            label='Consideraciones adicionales'
            disabled={accion === 'ver'}
            fullWidth
            size="small"
            value={consideraciones_adicionales}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_consideraciones_adicionales(e.target.value)}
          />
        </Grid>

        {accion === 'ver' &&
          <Grid item xs={12}>
            <TextField
              label='Unidad organizacional'
              disabled
              fullWidth
              size="small"
              value={unidad_organizacional}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_unidad_organizacional(e.target.value)}
            />
          </Grid>
        }

        {accion === 'editar' &&
          <Grid container spacing={1} item xs={12} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <Grid item xs={12} lg={10} sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <TextField
                label='Justificacion de rechazo'
                disabled
                fullWidth
                size="small"
                value={justificacion_rechazo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_justificacion_rechazo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de rechazo: '
                  value={fecha_rechazo}
                  disabled
                  onChange={(newValue) => {
                    cambio_fecha_rechazo(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField disabled required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        }
      </Grid>

      <PersonasViajan
        inputs_persona_seleccionada={inputs_persona_seleccionada}
        set_inputs_persona_seleccionada={set_inputs_persona_seleccionada}
        data_personas_viajan={data_personas_viajan}
        set_data_personas_viajan={set_data_personas_viajan}
        accion={accion}
      />
      


      {accion !== 'ver' &&
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "20px",
            gap: 4,
          }}
        >
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={submit_fomulario}
            >
              {accion === 'crear' ? "Guardar" : 'Actualizar'}
            </Button>
          </Grid>

          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={() => {
                set_mostrar_solicitud_viaje(false);
              }}
            >
              Salir
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={limpiar_formulario_solicitar_viaje}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      }

      {accion === 'ver' &&
        <>
          <ViajeAgendado
            solicitud_respondida={solicitud_respondida}
          />
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Button
              color="error"
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={() => { set_mostrar_solicitud_viaje(false) }}
            >
              Salir
            </Button>
          </Grid>
        </>
      }
      <DialogGeneradorDeDirecciones
        open={abrir_modal_generar_direccion}
        openDialog={set_abrir_modal_generar_direccion}
        onChange={set_direccion}
        type={''}
      />
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitarViaje;