/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import type { ClaseTercero, ClaseTerceroPersona, DataJuridicaUpdate, DataPersonas, InfoPersona, UpdateAutorizaNotificacion, keys_object } from "../../../interfaces/globalModels";
import {
    Button, Divider, Grid, MenuItem, Stack, TextField, Typography,
    type SelectChangeEvent,
    FormControlLabel,
    Checkbox,
    FormControl,
    Autocomplete,
    type AutocompleteChangeReason,
    type AutocompleteChangeDetails,
} from "@mui/material";
import { Title } from "../../../components/Title";
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UpdateIcon from '@mui/icons-material/Update';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { control_error, control_success } from '../../../helpers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { CustomSelect } from '../../../components/CustomSelect';
import { type FieldErrors, useForm } from "react-hook-form";
import { DialogGeneradorDeDirecciones } from "../../../components/DialogGeneradorDeDirecciones";
import { consultar_clase_tercero, consultar_clase_tercero_persona, consultar_datos_persona, consultar_datos_persona_basicos, editar_persona_juridica } from "../../seguridad/request/Request";
import dayjs, { type Dayjs } from 'dayjs';
import { DialogRepresentanteLegal } from "./DialogCambioRepresentanteLegal";
import { DialogAutorizaDatos } from '../../../components/DialogAutorizaDatos';
import { DialogHistorialDatosRestringidos } from '../../seguridad/components/DialogHistorialDatosRestringidos';
import { DialogHistorialEmail } from './HistoricoEmail';
import { DialogHistorialDirecciones } from './HistoricoDirecciones';
import { DialogHistoricoAutorizaNotificaciones } from './HistoricoAutorizaNotificaciones';
import { DialogHistoricoRepresentanteLegal } from './HistoricoRepresentanteLegal';
import { update_register } from '../hooks/updateHooks';

interface PropsElement {
    errors: FieldErrors<DataPersonas>;
}
interface PropsStep {
    label: string;
    component: (props: PropsElement) => JSX.Element;
}
interface Props {
    data_all: InfoPersona;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreenJuridica: React.FC<Props> = ({
    data_all,
}: Props) => {

    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    const [datos_representante, set_datos_representante] = useState<DataPersonas>({
        id_persona: 0,
        nombre_unidad_organizacional_actual: '',
        tiene_usuario: false,
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        tipo_persona: '',
        numero_documento: '',
        digito_verificacion: '',
        nombre_comercial: '',
        razon_social: '',
        pais_residencia: '',
        municipio_residencia: '',
        direccion_residencia: '',
        direccion_residencia_ref: '',
        ubicacion_georeferenciada: '',
        direccion_laboral: '',
        direccion_notificaciones: '',
        pais_nacimiento: '',
        fecha_nacimiento: '',
        sexo: '',
        fecha_asignacion_unidad: '',
        es_unidad_organizacional_actual: '',
        email: '',
        email_empresarial: '',
        telefono_fijo_residencial: '',
        telefono_celular: '',
        telefono_empresa: '',
        cod_municipio_laboral_nal: '',
        cod_municipio_notificacion_nal: '',
        telefono_celular_empresa: '',
        telefono_empresa_2: '',
        cod_pais_nacionalidad_empresa: '',
        acepta_notificacion_sms: false,
        acepta_notificacion_email: false,
        acepta_tratamiento_datos: false,
        cod_naturaleza_empresa: '',
        direccion_notificacion_referencia: '',
        fecha_cambio_representante_legal: '',
        fecha_inicio_cargo_rep_legal: '',
        fecha_inicio_cargo_actual: '',
        fecha_a_finalizar_cargo_actual: '',
        observaciones_vinculacion_cargo_actual: '',
        fecha_ultim_actualizacion_autorizaciones: '',
        fecha_creacion: '',
        fecha_ultim_actualiz_diferente_crea: '',
        tipo_documento: '',
        estado_civil: '',
        id_cargo: 0,
        id_unidad_organizacional_actual: 0,
        representante_legal: 0,
        cod_municipio_expedicion_id: '',
        id_persona_crea: 0,
        id_persona_ultim_actualiz_diferente_crea: 0,
        cod_departamento_expedicion: '',
        cod_departamento_residencia: '',
        cod_departamento_notificacion: '',
        cod_departamento_laboral: '',
    });
    const [datos_representante_basicos, set_datos_representante_basicos] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: '',
        tipo_documento: '',
        numero_documento: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_completo: '',
        razon_social: '',
        nombre_comercial: '',
        tiene_usuario: false,
        digito_verificacion: '',
        cod_naturaleza_empresa: '',
    });
    const [persona, set_persona] = useState<InfoPersona>();
    const [clase_tercero, set_clase_tercero] = useState<ClaseTercero[]>([]);
    const [clase_tercero_persona, set_clase_tercero_persona] = useState<ClaseTercero[]>([]);
    const [is_modal_active, open_modal] = useState(false);
    const [ver_datos_adicionales, set_ver_datos_adicionales] = useState(false);
    const [ver_datos_representante, set_ver_datos_representante] = useState(false);
    const [button_datos_adicionales, set_button_datos_adicionales] = useState(true);
    const [dialog_notificaciones, set_dialog_notificaciones] = useState<boolean>(false);
    const [historico, set_historico] = useState<boolean>(false);
    const [historico_email, set_historico_email] = useState<boolean>(false);
    const [historico_direcciones, set_historico_direcciones] = useState<boolean>(false);
    const [type_direction, set_type_direction] = useState('');
    const [direccion, set_direccion] = useState('');
    const [direccion_notificacion, set_direccion_notificacion] = useState('');
    const [loading_juridica, set_loading_juridica] = useState<boolean>(false);
    const [historico_autorizacion, set_historico_autorizacion] = useState<boolean>(false);
    const [historico_representante, set_historico_representante] = useState<boolean>(false);
    const [fecha_inicio_representante, set_fecha_inicio_representante] = useState<Date | null | string>(new Date());
    const [datos_historico_representante, set_datos_historico_representante] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: '',
        tipo_documento: '',
        numero_documento: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_completo: '',
        razon_social: '',
        nombre_comercial: '',
        tiene_usuario: false,
        digito_verificacion: '',
        cod_naturaleza_empresa: '',
    })
    const [datos_historico_autorizacion, set_datos_historico_autorizacion] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: '',
        tipo_documento: '',
        numero_documento: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_completo: '',
        razon_social: '',
        nombre_comercial: '',
        tiene_usuario: false,
        digito_verificacion: '',
        cod_naturaleza_empresa: '',
    })
    const [datos_historico_direcciones, set_datos_historico_direcciones] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: '',
        tipo_documento: '',
        numero_documento: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_completo: '',
        razon_social: '',
        nombre_comercial: '',
        tiene_usuario: false,
        digito_verificacion: '',
        cod_naturaleza_empresa: '',
    });
    const [datos_historico, set_datos_historico] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: '',
        tipo_documento: '',
        numero_documento: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_completo: '',
        razon_social: '',
        nombre_comercial: '',
        tiene_usuario: false,
        digito_verificacion: '',
        cod_naturaleza_empresa: '',
    });
    const [datos_historico_email, set_datos_historico_email] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: '',
        tipo_documento: '',
        numero_documento: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_completo: '',
        razon_social: '',
        nombre_comercial: '',
        tiene_usuario: false,
        digito_verificacion: '',
        cod_naturaleza_empresa: '',
    });

    const {
        register,
        handleSubmit: handle_submit,
        reset,
        setValue: set_value,
        formState: { errors, isValid: is_valid },
        watch,
    } = useForm<DataPersonas>();
    const {
        ciudad_expedicion,
        ciudad_residencia,
        ciudades_opt,
        data_register,
        cod_departamento_expedicion,
        cod_departamento_residencia,
        departamentos_opt,
        estado_civil_opt,
        estado_civil,
        genero_opt,
        genero,
        is_exists,
        loading,
        pais_nacimiento,
        pais_residencia,
        paises_options,
        dpto_notifiacion_opt,
        dpto_notifiacion,
        ciudad_notificacion_opt,
        ciudad_notificacion,
        dpts_residencia_opt,
        ciudades_residencia_opt,
        set_ciudad_notificacion,
        set_dpto_notifiacion,
        set_ciudad_expedicion,
        set_ciudad_residencia,
        set_data_register,
        set_departamento,
        set_dpto_residencia,
        set_estado_civil,
        set_genero,
        set_pais_nacimiento,
        set_pais_residencia,
    } = update_register();

    const handle_open_historico_representante = (): void => {
        set_historico_representante(true);
    };

    const handle_open_historico_email = (): void => {
        set_historico_email(true);
    };

    const handle_open_dialog_autorizacion = (): void => {
        set_historico_autorizacion(true);
    };

    // abrir modal datos restringidos
    const handle_open_historico = (): void => {
        set_historico(true);
    };

    const handle_open_historico_direcciones = (): void => {
        set_historico_direcciones(true);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_fecha_ini_repre_change = (date: Date | null) => {
        set_fecha_inicio_representante(date);
    };

    // abrir modal Notificaciones
    const handle_open_dialog_notificaciones = (): void => {
        set_dialog_notificaciones(true);
    };

    const datos_clasificacion = watch('datos_clasificacion_persona')

    const handle_change_autocomplete = (
        event: React.SyntheticEvent<Element, Event>,
        value: ClaseTercero[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<ClaseTercero>
    ): void => {
        set_clase_tercero_persona(value);
        set_value('datos_clasificacion_persona', value.map(e => e.value));
        console.log("datos_clasificacion", datos_clasificacion)
    };

    // Establece los valores del formulario
    const set_value_form = (name: string, value: string): void => {
        value = name === 'nombre_de_usuario' ? value.replace(/\s/g, '') : value;
        set_data_register({
            ...data_register,
            [name]: value,
        });
        set_value(name as keys_object, value);
    };
    const set_value_direction = (value: string, type: string): void => {
        // direccion_laboral
        // direccion_notificaciones
        // direccion_residencia_ref
        // direccion_residencia
        switch (type_direction) {
            case 'residencia':
                set_direccion(value);
                set_value_form('direccion_residencia', value);

                break;
            case 'notificacion':
                set_direccion_notificacion(value);
                set_value_form('direccion_notificaciones', value);

                break;
        }
        open_modal(false);
    };

    // Se usa para escuchar los cambios de valor del componente CustomSelect
    const on_change = (e: SelectChangeEvent<string>): void => {
        set_value_form(e.target.name, e.target.value);
    };
    const on_change_checkbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_data_register({
            ...data_register,
            [e.target.name]: e.target.checked,
        });
        set_value(e.target.name as keys_object, e.target.checked);
    };
    // Cambio inputs
    const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
        set_value_form(e.target.name, e.target.value);
    };
    const on_result = (): void => {
        if (data_all !== null || data_all !== undefined || data_all !== "") {
            reset();
            set_persona(data_all);
        }
    };

    const respuesta_autorizacion = (data: UpdateAutorizaNotificacion): void => {
        set_data_register({
            ...data_register,
            acepta_notificacion_email: data.acepta_autorizacion_email,
            acepta_notificacion_sms: data.acepta_autorizacion_sms,

        });
    }
    const result_representante = (data_representante: InfoPersona, result_representante_datalle: DataPersonas): void => {
        set_datos_representante_basicos({
            ...datos_representante_basicos,
            id: data_representante.id,
            id_persona: data_representante.id_persona,
            nombre_completo: data_representante.nombre_completo
        })
        set_datos_representante({
            ...datos_representante,
            id_persona: result_representante_datalle.id_persona,
            nombre_unidad_organizacional_actual: result_representante_datalle.nombre_unidad_organizacional_actual,
            tiene_usuario: result_representante_datalle.tiene_usuario,
            primer_nombre: result_representante_datalle.primer_nombre,
            segundo_nombre: result_representante_datalle.segundo_nombre,
            primer_apellido: result_representante_datalle.primer_apellido,
            segundo_apellido: result_representante_datalle.segundo_apellido,
            tipo_persona: result_representante_datalle.tipo_persona,
            numero_documento: result_representante_datalle.numero_documento,
            digito_verificacion: result_representante_datalle.digito_verificacion,
            nombre_comercial: result_representante_datalle.nombre_comercial,
            razon_social: result_representante_datalle.razon_social,
            pais_residencia: result_representante_datalle.pais_residencia,
            municipio_residencia: result_representante_datalle.municipio_residencia,
            direccion_residencia: result_representante_datalle.direccion_residencia,
            direccion_residencia_ref: result_representante_datalle.direccion_residencia_ref,
            ubicacion_georeferenciada: result_representante_datalle.ubicacion_georeferenciada,
            direccion_laboral: result_representante_datalle.direccion_laboral,
            direccion_notificaciones: result_representante_datalle.direccion_notificaciones,
            pais_nacimiento: result_representante_datalle.pais_nacimiento,
            fecha_nacimiento: result_representante_datalle.fecha_nacimiento,
            sexo: result_representante_datalle.sexo,
            fecha_asignacion_unidad: result_representante_datalle.fecha_asignacion_unidad,
            es_unidad_organizacional_actual: result_representante_datalle.es_unidad_organizacional_actual,
            email: result_representante_datalle.email,
            email_empresarial: result_representante_datalle.email_empresarial,
            telefono_fijo_residencial: result_representante_datalle.telefono_fijo_residencial,
            telefono_celular: result_representante_datalle.telefono_celular,
            telefono_empresa: result_representante_datalle.telefono_empresa,
            cod_municipio_laboral_nal: result_representante_datalle.cod_municipio_laboral_nal,
            cod_municipio_notificacion_nal: result_representante_datalle.cod_municipio_notificacion_nal,
            telefono_celular_empresa: result_representante_datalle.telefono_celular_empresa,
            telefono_empresa_2: result_representante_datalle.telefono_empresa_2,
            cod_pais_nacionalidad_empresa: result_representante_datalle.cod_pais_nacionalidad_empresa,
            acepta_notificacion_sms: result_representante_datalle.acepta_notificacion_sms,
            acepta_notificacion_email: result_representante_datalle.acepta_notificacion_email,
            acepta_tratamiento_datos: result_representante_datalle.acepta_tratamiento_datos,
            cod_naturaleza_empresa: result_representante_datalle.cod_naturaleza_empresa,
            direccion_notificacion_referencia: result_representante_datalle.direccion_notificacion_referencia,
            fecha_cambio_representante_legal: result_representante_datalle.fecha_cambio_representante_legal,
            fecha_inicio_cargo_rep_legal: result_representante_datalle.fecha_inicio_cargo_rep_legal,
            fecha_inicio_cargo_actual: result_representante_datalle.fecha_inicio_cargo_actual,
            fecha_a_finalizar_cargo_actual: result_representante_datalle.fecha_a_finalizar_cargo_actual,
            observaciones_vinculacion_cargo_actual: result_representante_datalle.observaciones_vinculacion_cargo_actual,
            fecha_ultim_actualizacion_autorizaciones: result_representante_datalle.fecha_ultim_actualizacion_autorizaciones,
            fecha_creacion: result_representante_datalle.fecha_creacion,
            fecha_ultim_actualiz_diferente_crea: result_representante_datalle.fecha_ultim_actualiz_diferente_crea,
            tipo_documento: result_representante_datalle.fecha_ultim_actualiz_diferente_crea,
            estado_civil: result_representante_datalle.estado_civil,
            id_cargo: result_representante_datalle.id_cargo,
            id_unidad_organizacional_actual: result_representante_datalle.id_unidad_organizacional_actual,
            representante_legal: result_representante_datalle.representante_legal,
            cod_municipio_expedicion_id: result_representante_datalle.cod_municipio_expedicion_id,
            id_persona_crea: result_representante_datalle.id_persona_crea,
            id_persona_ultim_actualiz_diferente_crea: result_representante_datalle.id_persona_ultim_actualiz_diferente_crea,
            cod_departamento_expedicion: result_representante_datalle.cod_departamento_expedicion,
            cod_departamento_residencia: result_representante_datalle.cod_departamento_residencia,
            cod_departamento_notificacion: result_representante_datalle.cod_departamento_notificacion,
            cod_departamento_laboral: result_representante_datalle.cod_departamento_laboral,
        })
    };

    useEffect(() => {
        console.log('cambios')
        console.log(datos_representante_basicos)
    }, [datos_representante_basicos])
    useEffect(() => {
        on_result()
    }, [])

    const cancelar = (): void => {
        set_persona(undefined);
    };
    // trae todas las clase tercero
    const get_datos_clase_tercero = async (): Promise<void> => {
        try {
            const response = await consultar_clase_tercero();
            set_clase_tercero(response)
        } catch (err) {
            control_error(err);
        }
    };
    // trae clase tercero por persona
    const get_datos_clase_tercero_persona = async (): Promise<void> => {
        try {
            const id_persona: number | undefined = persona?.id_persona;
            const response = await consultar_clase_tercero_persona(id_persona);
            const data_persona_clase_tercero = response.map((item: ClaseTerceroPersona) => ({
                value: item.id_clase_tercero,
                label: item.nombre
            }));
            set_value('datos_clasificacion_persona', data_persona_clase_tercero.map(e => e.value))
            set_clase_tercero_persona(data_persona_clase_tercero);
        } catch (err) {
            control_error(err);
        }
    }
    // trae datos del representante legal
    const get_datos_representante_legal = async (id: number | undefined | null): Promise<void> => {
        try {
            const id_persona: number | undefined | null = id;
            const response = await consultar_datos_persona(id_persona);
            set_datos_representante(response)
            set_fecha_inicio_representante(response.fecha_inicio_cargo_rep_legal)
            const tipo_doc: string = response?.tipo_documento
            const num_doc: string = response?.numero_documento
            void get_datos_basicos_representante_legal(num_doc, tipo_doc)
            // Datos adicionales
        } catch (err) {
            control_error(err);
        }
    };
    // datos basicos
    const get_datos_basicos_representante_legal = async (num_doc: string, tipo_doc: string): Promise<void> => {
        try {
            const response = await consultar_datos_persona_basicos(num_doc, tipo_doc);
            set_datos_representante_basicos(response)
            // Datos adicionales
            if (response !== null) {
                set_ver_datos_representante(true)
            }

        } catch (err) {
            control_error(err);
        }
    };

    const get_datos_persona = async (id: number): Promise<void> => {
        try {
            const response = await consultar_datos_persona(id);
            set_datos_persona(response);

            //
            if (response?.representante_legal !== undefined) {
                const id: number | undefined | null = response?.representante_legal
                if (id !== 0) {
                    void get_datos_representante_legal(id)
                }
            } else {
                control_error("Esta persona no tiene un representante legal")
            }
            // datos basicos
            // set_nacionalidad_emp(response?.cod_pais_nacionalidad_empresa)

            // dirección notificación
            set_dpto_notifiacion(response?.cod_departamento_notificacion)
            set_ciudad_notificacion(response?.cod_municipio_notificacion_nal)
            set_direccion_notificacion(response?.direccion_notificaciones)
            set_data_register({
                ...data_register,
                email: response?.email,
                telefono_celular: response?.telefono_celular,
                // complemeto_direccion: response?.direccion_notificacion_referencia,
                // Autorización
                acepta_notificacion_email: response?.acepta_notificacion_email,
                acepta_notificacion_sms: response?.acepta_notificacion_sms,
                acepta_tratamiento_datos: response?.acepta_tratamiento_datos,
            });
            set_direccion_notificacion(response?.direccion_notificaciones)
            set_dpto_notifiacion(response?.cod_departamento_notificacion)
            set_ciudad_notificacion(response?.cod_municipio_notificacion_nal)

            // set_fecha_rep_legal(response?.fecha_inicio_cargo_rep_legal)

        } catch (err) {
            control_error(err);
        }
    };
    const on_submit_update_natural = handle_submit(async (data) => {
        try {
            // if (data.datos_clasificacion_persona === undefined || data.datos_clasificacion_persona.length === 0) {
            //     control_error('Por favor complete los datos de clasificación');
            //     console.log("datos clasificacion", data.datos_clasificacion_persona)
            //     return;
            // }


            const id_representante = datos_representante_basicos.id_persona

            set_loading_juridica(true)
            const datos_persona = {
                email: data.email,
                email_empresarial: data.email_empresarial,
                direccion_notificaciones: data.direccion_notificaciones,
                direccion_notificacion_referencia: data.direccion_notificacion_referencia,
                cod_municipio_notificacion_nal: data.cod_municipio_notificacion_nal,
                cod_pais_nacionalidad_empresa: data.cod_pais_nacionalidad_empresa,
                telefono_celular_empresa: data.telefono_celular_empresa,
                telefono_empresa_2: data.telefono_empresa_2,
                telefono_empresa: data.telefono_empresa,
                representante_legal: id_representante,
                fecha_inicio_cargo_rep_legal: data.fecha_inicio_cargo_rep_legal,
                datos_clasificacion_persona: data.datos_clasificacion_persona
            };
            await editar_persona_juridica(persona?.id_persona, datos_persona as DataJuridicaUpdate);
            control_success('la persona se actualizó correctamente');
            set_loading_juridica(false)
        } catch (error) {
            control_error(error);
            set_loading_juridica(false)
        }
    });
    // trer datos de la persona
    useEffect(() => {
        if (persona?.numero_documento !== undefined) {
            if (persona?.tipo_persona === "J") {
                void get_datos_persona(persona.id_persona);
                void get_datos_clase_tercero();
                void get_datos_clase_tercero_persona();
            }
        }
    }, [persona?.numero_documento !== undefined])

    const tipos_doc = [
        {
            value: 'CC',
            label: 'Cédula de ciudadanía',
        },
        {
            value: 'CE',
            label: 'Cédula extranjería',
        },
        {
            value: 'TI',
            label: 'Tarjeta de identidad',
        },
        {
            value: 'RC',
            label: 'Registro civil',
        },
        {
            value: 'NU',
            label: 'NUIP',
        },
        {
            value: 'PA',
            label: 'Pasaporte',
        },
        {
            value: 'PE',
            label: 'Permiso especial de permanencia',
        },
    ];
    const tipos_doc_comercial = [
        {
            value: 'NT',
            label: 'NIT',
        },
    ];
    const tipo_persona = [
        {
            value: 'N',
            label: 'Natural',
        },
        {
            value: 'J',
            label: 'Juridica',
        },
    ];
    const tipo_empresa = [
        {
            value: 'PU',
            label: 'Pública',
        },
        {
            value: 'PR',
            label: 'Privada',
        },
        {
            value: 'MI',
            label: 'Mixta',
        },
    ];

    useEffect(() => {
        if (watch('cod_departamento_expedicion') !== undefined) {
            set_departamento(watch('cod_departamento_expedicion'));
        }
    }, [watch('cod_departamento_expedicion')]);

    useEffect(() => {
        if (watch('cod_municipio_expedicion_id') !== undefined) {
            set_ciudad_expedicion(watch('cod_municipio_expedicion_id'));
        }
    }, [watch('cod_municipio_expedicion_id')]);

    // Datos de residencia
    useEffect(() => {
        if (watch('pais_residencia') !== undefined) {
            set_pais_residencia(watch('pais_residencia'));
        }
    }, [watch('pais_residencia')]);

    useEffect(() => {
        if (watch('cod_departamento_residencia') !== undefined) {
            set_dpto_residencia(watch('cod_departamento_residencia'));
        }
    }, [watch('cod_departamento_residencia')]);

    useEffect(() => {
        if (watch('municipio_residencia') !== undefined) {
            set_ciudad_residencia(watch('municipio_residencia'));
        }
    }, [watch('municipio_residencia')]);

    // Datos de notificación

    useEffect(() => {
        if (watch('cod_departamento_notificacion') !== undefined) {
            set_dpto_notifiacion(watch('cod_departamento_notificacion'));
        }
    }, [watch('cod_departamento_notificacion')]);

    useEffect(() => {
        if (watch('cod_municipio_notificacion_nal') !== undefined) {
            set_ciudad_notificacion(watch('cod_municipio_notificacion_nal'));
        }
    }, [watch('cod_municipio_notificacion_nal')]);

    useEffect(() => {
        if (watch('pais_nacimiento') !== undefined) {
            set_pais_nacimiento(watch('pais_nacimiento'));
        }
    }, [watch('pais_nacimiento')]);

    useEffect(() => {
        if (watch('sexo') !== undefined) {
            set_genero(watch('sexo'));
        }
    }, [watch('sexo')]);

    useEffect(() => {
        if (watch('estado_civil') !== undefined) {
            set_estado_civil(watch('estado_civil'));
        }
    }, [watch('estado_civil')]);

    return (
        <>
            <Grid item xs={12} spacing={2}>
                {(datos_persona?.representante_legal !== undefined) && (
                    <form
                        onSubmit={(e) => {
                            void on_submit_update_natural(e)
                        }}>
                        <>
                            {(persona?.tipo_persona === "J") && (
                                <>
                                    {(datos_persona != null) && (
                                        <Grid container spacing={2}>
                                            {/* datos de identificación */}
                                            <>
                                                <Grid item xs={12}>
                                                    <Title title="DATOS DE IDENTIFICACIÓN" />
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        id="tipo_doc_comercial"
                                                        label="Tipo de Persona"
                                                        select
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        autoFocus
                                                        defaultValue={persona?.tipo_persona}
                                                        disabled
                                                    >
                                                        {tipo_persona.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        label="Tipo de Documento"
                                                        select
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        autoFocus
                                                        disabled
                                                        defaultValue={persona?.tipo_documento}
                                                    >
                                                        {tipos_doc_comercial.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        label="Número Identificación"
                                                        id="documento_juridico"
                                                        type="number"
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        defaultValue={persona?.numero_documento}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <TextField
                                                        label="Digito de verificación:"
                                                        type="number"
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        autoFocus
                                                        defaultValue={persona?.digito_verificacion}
                                                        disabled
                                                    />
                                                </Grid>
                                            </>
                                            {/* datos empresariales */}
                                            <>
                                                <Grid item xs={12}>
                                                    <Title title="DATOS EMPRESARIALES" />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Razón social"
                                                        type="text"
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        autoFocus
                                                        defaultValue={datos_persona?.razon_social}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Nombre comercial"
                                                        type="text"
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        autoFocus
                                                        defaultValue={datos_persona?.nombre_comercial}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Naturaleza de la empresa"
                                                        select
                                                        fullWidth
                                                        size="small"
                                                        margin="dense"
                                                        required
                                                        autoFocus
                                                        defaultValue={persona?.cod_naturaleza_empresa}
                                                        disabled
                                                    >
                                                        {tipo_empresa.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <CustomSelect
                                                        onChange={on_change}
                                                        label="Nacionalidad empresa *"
                                                        name="cod_pais_nacionalidad_empresa"
                                                        value={datos_persona.cod_pais_nacionalidad_empresa}
                                                        options={paises_options}
                                                        loading={loading}
                                                        disabled={false}
                                                        required={true}
                                                        errors={errors}
                                                        register={register}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Stack
                                                        justifyContent="flex-end"
                                                        sx={{ m: '10px 0 20px 0' }}
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<RemoveRedEyeIcon />}
                                                            onClick={() => {
                                                                set_datos_historico(persona);
                                                                handle_open_historico();
                                                            }}
                                                        >
                                                            Historico Datos Restringidos
                                                        </Button>
                                                    </Stack>
                                                </Grid>
                                            </>
                                            {/* datos de Notificación */}
                                            <>
                                                <Grid item xs={12}>
                                                    <Title title="DATOS DE NOTIFICACIÓN" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Datos de notificación nacional</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CustomSelect
                                                        onChange={on_change}
                                                        label="País de notificación"
                                                        name="pais_notificacion"
                                                        value={'CO'}
                                                        options={paises_options}
                                                        loading={loading}
                                                        disabled={false}
                                                        required={true}
                                                        errors={errors}
                                                        register={register}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CustomSelect
                                                        onChange={on_change}
                                                        label="Departamento *"
                                                        name="dpto_notifiacion"
                                                        value={dpto_notifiacion}
                                                        options={dpto_notifiacion_opt}
                                                        loading={loading}
                                                        required={true}
                                                        errors={errors}
                                                        register={register}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CustomSelect
                                                        onChange={on_change}
                                                        label="Ciudad"
                                                        name="cod_municipio_notificacion_nal"
                                                        value={ciudad_notificacion}
                                                        options={ciudad_notificacion_opt}
                                                        loading={loading}
                                                        disabled={dpto_notifiacion === '' ?? true}
                                                        required={true}
                                                        errors={errors}
                                                        register={register}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        label="Dirección"
                                                        // disabled
                                                        error={errors.direccion_notificaciones?.type === 'required'}
                                                        helperText={
                                                            errors.direccion_notificaciones?.type === 'required'
                                                                ? 'Este campo es obligatorio'
                                                                : ''
                                                        }
                                                        {...register('direccion_notificaciones', {
                                                            required: true,
                                                        })}
                                                        value={direccion_notificacion}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            open_modal(true);
                                                            set_type_direction('notificacion');
                                                        }}
                                                    >
                                                        Generar dirección
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        disabled={is_exists}
                                                        fullWidth
                                                        size="small"
                                                        label="Complemento dirección"
                                                        value={datos_persona.direccion_notificacion_referencia}
                                                        {...register('direccion_notificacion_referencia')}
                                                        onChange={handle_change}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        disabled={is_exists}
                                                        fullWidth
                                                        size="small"
                                                        label="E-mail"
                                                        error={errors.email?.type === 'required'}
                                                        type="email"
                                                        value={data_register.email}
                                                        helperText={
                                                            errors.email?.type === 'required'
                                                                ? 'Este campo es obligatorio'
                                                                : ''
                                                        }
                                                        {...register('email', {
                                                            required: true,
                                                        })}
                                                        onChange={handle_change}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <TextField
                                                        disabled={is_exists}
                                                        fullWidth
                                                        size="small"
                                                        label="Celular"
                                                        onCopy={(e: any) => e.preventDefault()}
                                                        value={data_register.telefono_celular}
                                                        error={errors.telefono_celular?.type === 'required'}
                                                        helperText={(errors.telefono_celular != null) ? 'Los número de celular no son iguales' : ''}
                                                        {...register('telefono_celular')}
                                                        onChange={handle_change}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <Stack
                                                        justifyContent="flex-end"
                                                        sx={{ m: '10px 0 20px 0' }}
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<RemoveRedEyeIcon />}
                                                            onClick={() => {
                                                                set_datos_historico_email(persona);
                                                                handle_open_historico_email();
                                                            }}
                                                        >
                                                            Historico E-mail
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<RemoveRedEyeIcon />}
                                                            onClick={() => {
                                                                set_datos_historico_direcciones(persona);
                                                                handle_open_historico_direcciones();
                                                            }}
                                                        >
                                                            Historico Direcciones
                                                        </Button>
                                                    </Stack>
                                                </Grid>
                                            </>
                                            {/* datos de representante legal */}
                                            <>
                                                {(ver_datos_representante) && (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Title title="DATOS DEL REPRESENTANTE LEGAL" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Tipo de Documento"
                                                                id="tipo-doc-representante"
                                                                select
                                                                fullWidth
                                                                size="small"
                                                                margin="dense"
                                                                required
                                                                autoFocus
                                                                disabled
                                                                defaultValue={datos_representante?.tipo_documento}
                                                            >
                                                                {tipos_doc.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Número Identificación"
                                                                id="documento_representante"
                                                                type="number"
                                                                fullWidth
                                                                size="small"
                                                                margin="dense"
                                                                required
                                                                defaultValue={datos_representante?.numero_documento}
                                                                disabled
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Representante Legal"
                                                                type="text"
                                                                fullWidth
                                                                size="small"
                                                                margin="dense"
                                                                required
                                                                autoFocus
                                                                value={datos_representante_basicos?.nombre_completo}
                                                                disabled
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                fullWidth
                                                                type="text"
                                                                size="small"
                                                                label="Dirección"
                                                                disabled
                                                                required
                                                                autoFocus
                                                                defaultValue={datos_representante?.direccion_notificaciones}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                fullWidth
                                                                type="text"
                                                                size="small"
                                                                label="Telefono"
                                                                disabled
                                                                required
                                                                autoFocus
                                                                defaultValue={datos_representante?.telefono_celular}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <CustomSelect
                                                                onChange={on_change}
                                                                label="Ciudad"
                                                                name="cod_municipio_notificacion_nal"
                                                                value={datos_representante?.cod_municipio_notificacion_nal}
                                                                options={ciudad_notificacion_opt}
                                                                loading={loading}
                                                                disabled={datos_representante?.cod_departamento_notificacion === '' ?? true}
                                                                required={true}
                                                                errors={errors}
                                                                register={register}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                fullWidth
                                                                type="email"
                                                                size="small"
                                                                label="E-mail"
                                                                disabled
                                                                required
                                                                autoFocus
                                                                defaultValue={datos_representante?.email_empresarial}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                                                <DatePicker
                                                                    label="Fecha de inicio como representante legal"
                                                                    inputFormat="YYYY-MM-DD"
                                                                    openTo="day"
                                                                    value={fecha_inicio_representante}
                                                                    onChange={handle_fecha_ini_repre_change}
                                                                    views={['year', 'month', 'day']}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            required
                                                                            fullWidth
                                                                            // defaultValue={datos_persona?.fecha_nacimiento}
                                                                            size="small"
                                                                            {...params}
                                                                            helperText={
                                                                                errors.fecha_nacimiento?.type === 'required'
                                                                                    ? 'Este campo es obligatorio'
                                                                                    : ''
                                                                            }
                                                                            {...register('fecha_inicio_cargo_rep_legal', {
                                                                                required: true,
                                                                            })}
                                                                        />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Stack
                                                                justifyContent="flex-end"
                                                                sx={{ m: '0 0 0 0' }}
                                                                direction="row"
                                                                spacing={2}
                                                            >
                                                                <Button
                                                                    variant="outlined"
                                                                    startIcon={<RemoveRedEyeIcon />}
                                                                    onClick={() => {
                                                                        if (datos_representante_basicos !== undefined && datos_representante_basicos !== null) {
                                                                            set_datos_historico_representante(persona);
                                                                            handle_open_historico_representante();
                                                                        }
                                                                    }}
                                                                >
                                                                    Historico Representante Legal
                                                                </Button>

                                                                <DialogRepresentanteLegal
                                                                    onResult={result_representante}
                                                                />
                                                            </Stack>
                                                        </Grid>
                                                    </>
                                                )}
                                            </>
                                            {/* Autorización de datos */}
                                            <>
                                                <Grid item xs={12}>
                                                    <Title title="AUTORIZACIÓN DE NOTIFICACIONES" />
                                                </Grid>
                                                <>
                                                    <Grid item xs={12}>
                                                        <FormControl
                                                            required
                                                            error={errors.acepta_notificacion_email?.type === 'required'}
                                                            component="fieldset"
                                                            variant="standard"
                                                        >
                                                            <FormControlLabel
                                                                label="¿Autoriza notificaciones judiciales por correo electrónico?"
                                                                control={
                                                                    <Checkbox
                                                                        size="small"
                                                                        disabled
                                                                        checked={data_register.acepta_notificacion_email}
                                                                        {...register('acepta_notificacion_email')}
                                                                        onChange={on_change_checkbox}
                                                                    />
                                                                }
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl
                                                            required
                                                            error={errors.acepta_notificacion_sms?.type === 'required'}
                                                            component="fieldset"
                                                            variant="standard"
                                                        >
                                                            <FormControlLabel
                                                                label="¿Autoriza notifiaciones informativas a través de mensajes de texto?"
                                                                control={
                                                                    <Checkbox
                                                                        disabled
                                                                        size="small"
                                                                        checked={data_register.acepta_notificacion_sms}
                                                                        {...register('acepta_notificacion_sms')}
                                                                        onChange={on_change_checkbox}
                                                                    />
                                                                }
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Stack
                                                            justifyContent="flex-end"
                                                            sx={{ m: '10px 0 20px 0' }}
                                                            direction="row"
                                                            spacing={2}
                                                        >
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<RemoveRedEyeIcon />}
                                                                onClick={() => {
                                                                    set_datos_historico_autorizacion(persona);
                                                                    handle_open_dialog_autorizacion();
                                                                }}
                                                            >
                                                                Historico Autorizaciones
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                startIcon={<UpdateIcon />}
                                                                onClick={() => {
                                                                    set_dialog_notificaciones(true);
                                                                    handle_open_dialog_notificaciones();
                                                                }}
                                                            >
                                                                Actualizar Notificaciones
                                                            </Button>
                                                        </Stack>
                                                    </Grid>
                                                </>
                                            </>
                                            {/* Datos adicionales */}
                                            <>
                                                {button_datos_adicionales && (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Title title="DATOS ADICIONALES" />
                                                            <Stack sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>

                                                                <Button
                                                                    fullWidth
                                                                    startIcon={<ExpandMoreIcon />}
                                                                    onClick={() => {
                                                                        set_ver_datos_adicionales(true)
                                                                        set_button_datos_adicionales(false)
                                                                    }}
                                                                >
                                                                    Ver más
                                                                </Button>
                                                            </Stack>
                                                        </Grid>
                                                    </>)}
                                                {ver_datos_adicionales && (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Title title="DATOS ADICIONALES" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Nombre Comercial"
                                                                type="text"
                                                                fullWidth
                                                                size="small"
                                                                margin="dense"
                                                                required={datos_persona?.nombre_comercial !== ""}
                                                                autoFocus
                                                                defaultValue={datos_persona?.nombre_comercial}

                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                label="Telefono fijo"
                                                                type="text"
                                                                fullWidth
                                                                size="small"
                                                                margin="dense"
                                                                autoFocus
                                                                defaultValue={datos_persona?.telefono_fijo_residencial}

                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                disabled={is_exists}
                                                                fullWidth
                                                                size="small"
                                                                label="E-mail laboral / personal"
                                                                error={errors.email_empresarial?.type === 'required'}
                                                                type="email_empresarial"
                                                                value={data_register.email_empresarial}
                                                                helperText={
                                                                    errors.email_empresarial?.type === 'required'
                                                                        ? 'Este campo es obligatorio'
                                                                        : ''
                                                                }
                                                                {...register('email_empresarial', {
                                                                    required: true,
                                                                })}
                                                                onChange={handle_change}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                disabled={is_exists}
                                                                fullWidth
                                                                type="number"
                                                                size="small"
                                                                label="Telefono laboral"
                                                                onCopy={(e: any) => e.preventDefault()}
                                                                value={data_register.telefono_celular_empresa}
                                                                error={errors.telefono_celular_empresa?.type === 'required'}
                                                                helperText={
                                                                    errors.telefono_celular_empresa?.type === 'required'
                                                                        ? 'Este campo es obligatorio'
                                                                        : ''
                                                                }
                                                                {...register('telefono_celular_empresa')}
                                                                onChange={handle_change}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Divider />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1" fontWeight="bold">Dirección laboral nacional</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <CustomSelect
                                                                onChange={on_change}
                                                                label="País de notificación"
                                                                name="pais_notificacion"
                                                                value={'CO'}
                                                                options={paises_options}
                                                                loading={loading}
                                                                disabled={false}
                                                                required={true}
                                                                errors={errors}
                                                                register={register}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <CustomSelect
                                                                onChange={on_change}
                                                                label="Departamento *"
                                                                name="dpto_notifiacion"
                                                                value={dpto_notifiacion}
                                                                options={dpto_notifiacion_opt}
                                                                loading={loading}
                                                                required={true}
                                                                errors={errors}
                                                                register={register}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <CustomSelect
                                                                onChange={on_change}
                                                                label="Ciudad"
                                                                name="cod_municipio_notificacion_nal"
                                                                value={ciudad_notificacion}
                                                                options={ciudad_notificacion_opt}
                                                                loading={loading}
                                                                disabled={dpto_notifiacion === '' ?? true}
                                                                required={true}
                                                                errors={errors}
                                                                register={register}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <TextField
                                                                size="small"
                                                                label="Direccion"
                                                                disabled
                                                                fullWidth
                                                                error={errors.direccion_notificaciones?.type === 'required'}
                                                                helperText={
                                                                    errors.direccion_notificaciones?.type === 'required'
                                                                        ? 'Este campo es obligatorio'
                                                                        : ''
                                                                }
                                                                {...register('direccion_notificaciones', {
                                                                    required: true,
                                                                })}
                                                                value={direccion_notificacion}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => {
                                                                    open_modal(true);
                                                                    set_type_direction('notificacion');
                                                                }}
                                                            >
                                                                Generar dirección
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6} md={4}>
                                                            <TextField
                                                                disabled={is_exists}
                                                                fullWidth
                                                                size="small"
                                                                label="Complemento dirección"
                                                                value={datos_persona.direccion_laboral}
                                                                {...register('direccion_laboral')}
                                                                onChange={handle_change}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                fullWidth
                                                                startIcon={<ExpandLessIcon />}
                                                                onClick={() => {
                                                                    set_ver_datos_adicionales(false)
                                                                    set_button_datos_adicionales(true)
                                                                }}
                                                            >
                                                                ver menos
                                                            </Button>
                                                        </Grid>
                                                    </>
                                                )}
                                            </>
                                            {/* Datos de clasificación cormacarena */}
                                            <>
                                                <Grid item xs={12}>
                                                    <Title title="DATOS DE CLASIFICACIÓN DE CORMACARENA" />
                                                </Grid>
                                                {(clase_tercero.length > 0) && (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Autocomplete
                                                                multiple
                                                                fullWidth
                                                                size="medium"
                                                                options={clase_tercero}
                                                                getOptionLabel={(option) => option.label}
                                                                isOptionEqualToValue={(option, value) => option.value === value?.value}
                                                                value={clase_tercero_persona}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        key={params.id}
                                                                        {...params}
                                                                        label="Datos clasificación Cormacarena"
                                                                        placeholder="Clasificacion Cormacarena"
                                                                        helperText={
                                                                            clase_tercero_persona.length === 0 ? 'Este campo es obligatorio' : ''
                                                                        }
                                                                        value={clase_tercero_persona}
                                                                    />
                                                                )}
                                                                {...register('datos_clasificacion_persona')}
                                                                onChange={handle_change_autocomplete}
                                                            />
                                                        </Grid>
                                                    </>
                                                )}
                                            </>
                                            <Grid item xs={12}>
                                                <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<CancelIcon />}
                                                        onClick={() => {
                                                            reset();
                                                            cancelar();
                                                        }}>Cancelar
                                                    </Button>
                                                    <Button
                                                        id="actualiza-juridica"
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            reset();
                                                        }}
                                                        // startIcon={
                                                        //     loading_juridica
                                                        //         ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                                        //         : ""
                                                        // }
                                                        aria-label="Actualizar"
                                                        // disabled={loading_juridica}
                                                        size="large"
                                                    >Actualizar</Button>
                                                    {/* <Button
                                            variant="outlined"
                                            startIcon={<RemoveRedEyeIcon />}
                                            onClick={() => {
                                                set_datos_historico(persona)
                                                handle_open_historico();
                                            }}>Historico
                                        </Button> */}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </>
                    </form>
                )}
            </Grid>
            <DialogGeneradorDeDirecciones
                open={is_modal_active}
                openDialog={open_modal}
                onChange={set_value_direction}
                type={type_direction}
            />
            <DialogAutorizaDatos
                is_modal_active={dialog_notificaciones}
                set_is_modal_active={set_dialog_notificaciones}
                id_persona={persona?.id_persona}
                data_autorizacion={{ acepta_autorizacion_email: data_register.acepta_notificacion_email, acepta_autorizacion_sms: data_register.acepta_notificacion_sms }}
                on_result={respuesta_autorizacion}
            />
            <DialogHistorialDatosRestringidos
                is_modal_active={historico}
                set_is_modal_active={set_historico}
                datos_historico={datos_historico}
            />
            <DialogHistorialEmail
                is_modal_active={historico_email}
                set_is_modal_active={set_historico_email}
                datos_historico={datos_historico_email}
            />
            <DialogHistorialDirecciones
                is_modal_active={historico_direcciones}
                set_is_modal_active={set_historico_direcciones}
                historico_direcciones={datos_historico_direcciones}
            />
            <DialogHistoricoAutorizaNotificaciones
                is_modal_active={historico_autorizacion}
                set_is_modal_active={set_historico_autorizacion}
                historico_autorizaciones={datos_historico_autorizacion}
            />
            <DialogHistoricoRepresentanteLegal
                is_modal_active={historico_representante}
                set_is_modal_active={set_historico_representante}
                historico_representante={datos_historico_representante}
            />
        </>
    );
};
