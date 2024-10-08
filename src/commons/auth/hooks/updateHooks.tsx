import { useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import type {
    DataPersonas,
    IList,
    InfoPersona,
    KeysInfoPersona,
    ReisterHookUpdate,
    ResponseServer,
} from '../../../interfaces/globalModels';
import { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import {
    get_ciudades,
    get_departamentos,
    get_estado_civil,
    get_generos,
    get_naturaleza_emp,
    get_paises,
    get_person_by_document,
    get_tipo_documento,
    get_tipo_persona,
} from '../../../request/';
import { type AxiosError } from 'axios';

type options = 'inicial' | 'residencia' | 'notificacion';

export const update_register = (): ReisterHookUpdate => {
    const {
        register,
        handleSubmit: handle_submit,
        setValue: set_value,
        formState: { errors, isValid: is_valid },
        getValues: get_values,
        watch,
    } = useForm();
    const [ciudad_expedicion, set_ciudad_expedicion] = useState('');
    const [numero_documento, set_numero_documento] = useState('');
    const [ciudad_notificacion_opt, set_ciudad_notificacion_opt] = useState<
        IList[]
    >([]);
    const [ciudad_notificacion, set_ciudad_notificacion] = useState('');
    const [ciudad_residencia, set_ciudad_residencia] = useState('');
    const [nombre_representante, set_nombre_representante] = useState('');
    const [documento_rep, set_documento_rep] = useState('');
    const [ciudades_opt, set_ciudades_opt] = useState<IList[]>([]);
    const [ciudades_residencia_opt, set_ciudades_residencia_opt] = useState<
        IList[]
    >([]);
    const [cod_departamento_expedicion, set_departamento] = useState('');
    const [cod_departamento_residencia, set_dpto_residencia] = useState('');
    const [departamentos_opt, set_departamentos_opt] = useState<IList[]>([]);
    const [dpto_notifiacion_opt, set_dpto_notifiacion_opt] = useState<IList[]>(
        []
    );
    const [dpto_notifiacion, set_dpto_notifiacion] = useState('CO');
    const [naturaleza_emp, set_naturaleza_emp] = useState('');
    const [nacionalidad_emp, set_nacionalidad_emp] = useState('');
    const [dpts_residencia_opt, set_dpto_residencia_opt] = useState<IList[]>([]);
    const [error_email, set_error_email] = useState(false);
    const [error_password, set_error_password] = useState(false);
    const [error_phone, set_error_error_phone] = useState(false);
    const [estado_civil_opt, set_estado_civil_opt] = useState<IList[]>([]);
    const [estado_civil, set_estado_civil] = useState('');
    const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
    const [fecha_rep_legal, set_fecha_rep_legal] = useState<Dayjs | null>(null);
    const [genero_opt, set_genero_opt] = useState<IList[]>([]);
    const [naturaleza_emp_opt, set_naturaleza_emp_opt] = useState<IList[]>([]);
    const [genero, set_genero] = useState('');
    const [is_error, set_is_error] = useState(false);
    const [is_exists, set_is_exists] = useState(false);
    const [is_saving, set_is_saving] = useState(false);
    const [is_search, set_is_search] = useState(false);
    const [is_avaiable, set_is_is_avaiable] = useState(false);
    const [message_error, set_message_error] = useState('');
    const [loading, set_loading] = useState<boolean>(false);
    const [message_error_password, set_message_error_password] = useState('');
    const [pais_nacimiento, set_pais_nacimiento] = useState('');
    const [tipo_documento_rep, set_tipo_documento_rep] = useState('');
    const [pais_residencia, set_pais_residencia] = useState('');
    const [paises_options, set_paises_options] = useState<IList[]>([]);
    const [show_password, set_show_password] = useState(false);
    const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
    const [tipo_documento_opt_all, set_tipo_documento_opt_all] = useState<
        IList[]
    >([]);
    const [tipo_documento, set_tipo_documento] = useState('');
    const [tipo_persona_opt, set_tipo_persona_opt] = useState<IList[]>([]);
    const [tipo_persona, set_tipo_persona] = useState('');
    const [data_register, set_data_register] = useState<DataPersonas>({
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
        representante_legal: null,
        cod_municipio_expedicion_id: '',
        id_persona_crea: 0,
        id_persona_ultim_actualiz_diferente_crea: 0,
        cod_departamento_expedicion: '',
        cod_departamento_residencia: '',
        cod_departamento_notificacion: '',
        cod_departamento_laboral: '',
    });
    const [message_no_person, set_message_no_person] = useState('');

    const handle_change_checkbox = (value: boolean): void => {
        if (value) {
            set_value('dpto_notifiacion', get_values('cod_departamento_residencia'));
            set_value(
                'cod_municipio_notificacion_nal',
                get_values('municipio_residencia')
            );
            set_value('direccion_notificaciones', get_values('direccion_residencia'));
        } else {
            set_value('dpto_notifiacion', '');
            set_value('cod_municipio_notificacion_nal', '');
            set_value('direccion_notificaciones', '');
        }
    };

    const get_selects_options = async (): Promise<void> => {
        set_loading(true);
        try {
            const {
                data: { data: res_paises },
            } = await get_paises();
            set_paises_options(res_paises ?? []);

            const {
                data: { data: res_tipo_persona },
            } = await get_tipo_persona();
            set_tipo_persona_opt(res_tipo_persona ?? []);

            const {
                data: { data: res_tipo_documento },
            } = await get_tipo_documento();
            set_tipo_documento_opt(res_tipo_documento ?? []);
            set_tipo_documento_opt_all(res_tipo_documento ?? []);

            const generos = await get_generos();
            set_genero_opt(generos);

            const {
                data: { data: estado_civil },
            } = await get_estado_civil();
            set_estado_civil_opt(estado_civil);

            const {
                data: { data: naturaleza },
            } = await get_naturaleza_emp();
            set_naturaleza_emp_opt(naturaleza);

            void get_departamentos_por_pais('notificacion', 'CO');
        } catch (err) {
            control_error(err);
        } finally {
            set_loading(false);
        }
    };

    const handle_click_show_password = (): void => {
        set_show_password((show) => !show);
    };

    // Valida si la persona a registrar ya esta registrada en el sistema
    const validate_exits = async (numero_documento: string): Promise<void> => {
        set_is_search(true);
        try {
            set_is_error(false);
            set_is_is_avaiable(true);
            const {
                data: { data },
            } = await get_person_by_document(tipo_documento, numero_documento);

            if (data !== null && data !== undefined) {
                if (!data.tiene_usuario) {
                    set_data_register({ ...data_register, ...data });
                    for (const key in data) {
                        const temp_key = key as KeysInfoPersona;
                        set_value(key, data[temp_key]);
                        set_data_register({
                            ...data_register,
                            [temp_key]: data[temp_key],
                        });
                    }
                    return;
                } else {
                    set_message_error(
                        'Lo sentimos, este documento ya tiene un usuario, puede iniciar sesión con su usuario y contraseña, si ha olvidado sus datos de acceso, dirigase al inicio de sesión y haga click en ¿Olvidó su contraseña?'
                    );
                    set_is_error(true);
                    set_is_is_avaiable(false);
                    return;
                }
            } else {
                set_is_error(false);
            }
        } catch (error) {
            set_is_is_avaiable(false);
            const temp_err = error as AxiosError;
            if (temp_err.response?.status === 403) {
                const resp = temp_err.response.data as ResponseServer<InfoPersona>;
                set_message_error(resp.detail);
                set_is_error(true);
                return;
            }
            control_error(error);
        } finally {
            set_is_search(false);
        }
    };

    const get_ciudades_opt = async (
        type: options = 'inicial',
        departamento: string
    ): Promise<void> => {
        set_loading(true);
        try {
            const {
                data: { data },
            } = await get_ciudades(departamento);

            switch (type) {
                case 'inicial':
                    set_ciudades_opt(data ?? []);
                    break;

                case 'residencia':
                    set_ciudades_residencia_opt(data ?? []);
                    break;

                case 'notificacion':
                    set_ciudad_notificacion_opt(data ?? []);
                    break;
            }
        } catch (error) {
            control_error(error);
        } finally {
            set_loading(false);
        }
    };

    // Obtiene los departamentos por pais para el select lugar expedición
    const get_departamentos_por_pais = async (
        type: options = 'inicial',
        pais: string
    ): Promise<void> => {
        set_loading(true);
        try {
            const {
                data: { data },
            } = await get_departamentos(pais);

            switch (type) {
                case 'inicial':
                    set_departamentos_opt(data ?? []);
                    break;

                case 'residencia':
                    set_dpto_residencia_opt(data ?? []);
                    break;

                case 'notificacion':
                    set_dpto_notifiacion_opt(data ?? []);
                    break;
            }
        } catch (error) {
            control_error(error);
        } finally {
            set_loading(false);
        }
    };

    useEffect(() => {
        void get_departamentos_por_pais('inicial', pais_nacimiento);
    }, [pais_nacimiento]);

    useEffect(() => {
        void get_departamentos_por_pais('residencia', pais_residencia);
    }, [pais_residencia]);

    useEffect(() => {
        void get_ciudades_opt('inicial', cod_departamento_expedicion);
    }, [cod_departamento_expedicion]);

    useEffect(() => {
        void get_ciudades_opt('residencia', cod_departamento_residencia);
    }, [cod_departamento_residencia]);

    useEffect(() => {
        void get_ciudades_opt('notificacion', dpto_notifiacion);
    }, [dpto_notifiacion]);

    useEffect(() => {
        if (tipo_persona === 'N') {
            set_tipo_documento_opt(
                tipo_documento_opt_all.filter((e) => e.value !== 'NT')
            );
        } else {
            set_tipo_documento_opt(tipo_documento_opt_all);
        }
    }, [tipo_persona]);

    useEffect(() => {
        handle_change_checkbox(watch('misma_direccion'));
    }, [watch('misma_direccion')]);

    useEffect(() => {
        void get_selects_options();
    }, []);

    return {
        ciudad_expedicion,
        ciudad_notificacion_opt,
        ciudad_notificacion,
        ciudad_residencia,
        ciudades_opt,
        ciudades_residencia_opt,
        data_register,
        cod_departamento_expedicion,
        cod_departamento_residencia,
        departamentos_opt,
        documento_rep,
        dpto_notifiacion_opt,
        dpto_notifiacion,
        dpts_residencia_opt,
        error_email,
        error_password,
        error_phone,
        errors,
        estado_civil_opt,
        estado_civil,
        fecha_nacimiento,
        fecha_rep_legal,
        genero_opt,
        genero,
        is_error,
        is_avaiable,
        is_exists,
        is_saving,
        is_search,
        is_valid,
        loading,
        message_error_password,
        message_no_person,
        message_error,
        nacionalidad_emp,
        naturaleza_emp_opt,
        naturaleza_emp,
        nombre_representante,
        numero_documento,
        pais_nacimiento,
        pais_residencia,
        paises_options,
        show_password,
        tipo_documento_opt,
        tipo_documento_rep,
        tipo_documento,
        tipo_persona_opt,
        tipo_persona,
        get_selects_options,
        handle_click_show_password,
        handle_submit,
        register,
        set_ciudad_expedicion,
        set_ciudad_notificacion_opt,
        set_ciudad_notificacion,
        set_ciudad_residencia,
        set_ciudades_opt,
        set_ciudades_residencia_opt,
        set_data_register,
        set_departamento,
        set_departamentos_opt,
        set_documento_rep,
        set_dpto_notifiacion_opt,
        set_dpto_notifiacion,
        set_dpto_residencia_opt,
        set_dpto_residencia,
        set_error_email,
        set_error_error_phone,
        set_error_password,
        set_estado_civil_opt,
        set_estado_civil,
        set_fecha_nacimiento,
        set_fecha_rep_legal,
        set_genero_opt,
        set_genero,
        set_is_exists,
        set_is_saving,
        set_is_search,
        set_message_error_password,
        set_message_no_person,
        set_nacionalidad_emp,
        set_naturaleza_emp,
        set_nombre_representante,
        set_numero_documento,
        set_pais_nacimiento,
        set_pais_residencia,
        set_show_password,
        set_tipo_documento_rep,
        set_tipo_documento,
        set_tipo_persona,
        set_value,
        validate_exits,
        watch,
    };
};
