import { useEffect, useState } from 'react';
import type { ClaseTercero, ClaseTerceroPersona, DataPersonas, PropsUpdate} from "../../../../interfaces/globalModels";
import {
    Button, Divider, Grid, MenuItem, TextField, Typography,
    FormControlLabel,
    Checkbox,
    Autocomplete,
    type AutocompleteChangeReason,
    type AutocompleteChangeDetails,
} from "@mui/material";

import { Title } from "../../../../components/Title";

import { control_error } from "../../../../helpers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from "../../../../components/DialogGeneradorDeDirecciones";
import { consultar_clase_tercero, consultar_clase_tercero_persona, consultar_datos_persona,  } from "../../../seguridad/request/Request";
import { use_register_persona_n } from '../../hooks/registerPersonaNaturalHook';
import type { Dayjs } from 'dayjs';
import { DatosVinculacion } from '../DataVinculación';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreenNatural: React.FC<PropsUpdate> = ({
    numero_documento,
    id_persona,
    tipo_documento,
    tipo_persona,
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    errors,
    isValid: is_valid,
    watch,
    getValues,
}: PropsUpdate) => {
    const {
        is_saving,
        // is_exists,
        loading,
        paises_options,
        departamentos_opt,
        dpto_notifiacion_opt,
        dpts_residencia_opt,
        ciudad_notificacion_opt,
        ciudades_opt,
        ciudades_residencia_opt,
        genero_opt,
        estado_civil_opt,
        municipio_residencia,
        pais_nacimiento,
        genero,
        estado_civil,
        departamento_expedicion,
        ciudad_expedicion,
        pais_residencia,
        departamento_residencia,
        dpto_notifiacion,
        ciudad_notificacion,
        direccion_notificaciones,
        departamento_laboral,
        municipio_laboral,
        dpto_laboral_opt,
        departamento_laboral_opt,
        is_modal_active,
        direccion,
        direccion_laboral,
        set_value_direction,
        on_change,
        open_modal,
    } = use_register_persona_n({ watch, setValue: set_value, getValues });

    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    const [type_direction, set_type_direction] = useState('');
    const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
    const [clase_tercero, set_clase_tercero] = useState<ClaseTercero[]>([]);
    const [clase_tercero_persona, set_clase_tercero_persona] = useState<ClaseTercero[]>([]);
    const [is_data, set_is_data] = useState(false);
    // watchers
    const misma_direccion = watch('misma_direccion') ?? false;
    const acepta_notificacion_email = watch('acepta_notificacion_email') ?? false;
    const acepta_notificacion_sms = watch('acepta_notificacion_sms') ?? false;

    const handle_change_autocomplete = (
        event: React.SyntheticEvent<Element, Event>,
        value: ClaseTercero[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<ClaseTercero>
    ): void => {
        set_value('datos_clasificacion_persona', value.map(e => e.value));
    };

    // establece la fecha de nacimiento
    const on_change_birt_day = (value: Dayjs | null): void => {
        const date = dayjs(value).format('YYYY-MM-DD');
        set_value('fecha_nacimiento', date);
        set_fecha_nacimiento(value);
    };
    const get_datos_persona = async (): Promise<void> => {
        set_is_data(false)
        try {
            const response = await consultar_datos_persona(id_persona);
            // datos basicos
            set_datos_persona(response);
            set_value('primer_nombre', response.primer_nombre)
            set_value('segundo_nombre', response.segundo_apellido)
            set_value('primer_apellido', response.primer_apellido)
            set_value('segundo_apellido', response.segundo_apellido)
            set_value('fecha_nacimiento', response.fecha_nacimiento)
            set_value('pais_nacimiento', response.pais_nacimiento)
            set_value('sexo', response.sexo)
            set_value('estado_civil', response.estado_civil)
            set_value('departamento_expedicion', response.cod_departamento_expedicion)
            set_value('cod_municipio_expedicion_id', response.cod_municipio_expedicion_id)
            // Datos de residencia
            set_value('pais_residencia', response.pais_residencia)
            set_value('departamento_residencia', response.cod_departamento_residencia)
            set_value('municipio_residencia', response.municipio_residencia)
            set_value('direccion_residencia', response.direccion_residencia)
            set_value('direccion_residencia_ref', response.direccion_residencia_ref)
            // Datos de notificacion
            set_value('dpto_notifiacion', response.cod_departamento_notificacion)
            set_value('ciudad_notificacion', response.cod_municipio_notificacion_nal)
            set_value('direccion_notificaciones', response.direccion_notificaciones)
            set_value('complemento_direccion', response.direccion_notificacion_referencia)
            set_value('email', response.email)
            set_value('telefono_celular', response.telefono_celular)
            // Datos adicionales 
            set_value('nombre_comercial', response.nombre_comercial)
            set_value('telefono_fijo_residencial', response.telefono_fijo_residencial)
            set_value('departamento_laboral', response.cod_departamento_laboral)
            set_value('municipio_laboral', response.cod_municipio_laboral_nal)
            set_value('direccion_laboral', response.direccion_laboral)
            // autorización de notificaciones
            set_value('acepta_notificacion_sms', response.acepta_notificacion_sms)
            set_value('acepta_notificacion_email', response.acepta_notificacion_email)
            set_is_data(true)
        } catch (err) {
            control_error(err);
        }
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

    useEffect(() => {
        void get_datos_persona();
        void get_datos_clase_tercero();
        void get_datos_clase_tercero_persona();
    }, [datos_persona])

    // const on_submit_create_natural = handle_submit(async (data) => {
    //     try {
    //         data.ubicacion_georeferenciada = ''
    //         data.numero_documento = numero_documento
    //         data.tipo_documento = tipo_documento
    //         data.tipo_persona = tipo_persona
    //         await crear_persona_natural(data as CrearPersonNaturalAdmin);
    //         control_success('la persona se creó correctamente');
    //     } catch (error) {
    //         control_error(error);
    //     }
    // });
    const tipo_persona_opt = [
        {
            value: 'N',
            label: 'Natural'
        },
        {
            value: 'J',
            label: 'Juridica',
        },
    ];
    const tipos_doc = [
        {
            value: 'CC',
            label: 'Cédula de ciudadanía'
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
            label: 'NUIP'
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
    return (
        <>
            {is_data ? (
                <>
                    <form
                    // onSubmit={(e) => {
                    //     void on_submit_create_natural(e)
                    // }}
                    >
                        {/* datos de identificación */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="DATOS DE IDENTIFICACIÓN" />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Tipo de Persona"
                                        select
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        required
                                        autoFocus
                                        defaultValue={tipo_persona}
                                        disabled
                                    >
                                        {tipo_persona_opt.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        id="tipo_doc_natural"
                                        label="Tipo de Documento"
                                        select
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        required
                                        autoFocus
                                        defaultValue={tipo_documento}
                                        disabled
                                    >
                                        {tipos_doc.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Número Identificación"
                                        id="documento_natural"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        required
                                        defaultValue={numero_documento}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </>
                        {/* Datos personales */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="DATOS PERSONALES" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Primer nombre *"
                                        error={errors.primer_nombre?.type === 'required'}
                                        helperText={
                                            errors.primer_nombre?.type === 'required'
                                                ? 'Este campo es obligatorio'
                                                : ''
                                        }
                                        {...register('primer_nombre', { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Segundo nombre"
                                        {...register('segundo_nombre')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Primer apellido *"
                                        error={errors.primer_apellido?.type === 'required'}
                                        helperText={
                                            errors.primer_apellido?.type === 'required'
                                                ? 'Este campo es obligatorio'
                                                : ''
                                        }
                                        {...register('primer_apellido', {
                                            required: true,
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Segundo apellido"
                                        {...register('segundo_apellido')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha de nacimiento *"
                                            value={fecha_nacimiento}
                                            onChange={on_change_birt_day}
                                            renderInput={(params) => (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    {...params}
                                                    {...register('fecha_nacimiento', {
                                                        required: true,
                                                    })}
                                                    error={errors.fecha_nacimiento?.type === 'required'}
                                                    helperText={
                                                        errors.fecha_nacimiento?.type === 'required'
                                                            ? 'Este campo es obligatorio'
                                                            : ''
                                                    }
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="País de nacimiento *"
                                        name="pais_nacimiento"
                                        value={pais_nacimiento}
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
                                        label="Género *"
                                        name="sexo"
                                        value={genero}
                                        options={genero_opt}
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
                                        label="Estado civil *"
                                        name="estado_civil"
                                        value={estado_civil}
                                        options={estado_civil_opt}
                                        loading={loading}
                                        disabled={false}
                                        required={true}
                                        errors={errors}
                                        register={register}
                                    />
                                </Grid>
                                {/* Lugar de expedición del documento */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Lugar de expedición del documento
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="Departamento *"
                                        name="departamento_expedicion"
                                        value={departamento_expedicion}
                                        options={departamentos_opt}
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
                                        label="Ciudad *"
                                        name="cod_municipio_expedicion_id"
                                        value={ciudad_expedicion}
                                        options={ciudades_opt}
                                        loading={loading}
                                        disabled={false}
                                        required={true}
                                        errors={errors}
                                        register={register}
                                    />
                                </Grid>
                            </Grid>
                        </>
                        {/* Datos de residencia */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="DATOS DE RESIDENCIA" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="País de residencia *"
                                        name="pais_residencia"
                                        value={pais_residencia}
                                        options={paises_options}
                                        loading={loading}
                                        required={true}
                                        errors={errors}
                                        register={register}
                                    />
                                </Grid>
                                {pais_residencia === 'CO' && (
                                    <>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CustomSelect
                                                onChange={on_change}
                                                label="Departamento *"
                                                name="departamento_residencia"
                                                value={departamento_residencia}
                                                options={dpts_residencia_opt}
                                                loading={loading}
                                                required={true}
                                                errors={errors}
                                                register={register}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CustomSelect
                                                onChange={on_change}
                                                label="Ciudad *"
                                                name="municipio_residencia"
                                                value={municipio_residencia}
                                                options={ciudades_residencia_opt}
                                                loading={loading}
                                                disabled={departamento_residencia === '' ?? true}
                                                required={true}
                                                errors={errors}
                                                register={register}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                size="small"
                                                label="Direccion *"
                                                disabled
                                                fullWidth
                                                error={errors.direccion_residencia?.type === 'required'}
                                                helperText={
                                                    errors.direccion_residencia?.type === 'required'
                                                        ? 'Este campo es obligatorio'
                                                        : ''
                                                }
                                                {...register('direccion_residencia', {
                                                    required: true,
                                                })}
                                                value={direccion}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    open_modal(true);
                                                    set_type_direction('residencia');
                                                }}
                                            >
                                                Generar dirección
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="textarea"
                                                rows="3"
                                                label="Complemento dirección"
                                                {...register('direccion_residencia_ref')}
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </>
                        {/* Datos de notificación */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="DATOS DE NOTIFICACIÓN" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        label="¿Desea usar la dirección de residencia como dirección de notificación?"
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={misma_direccion}
                                                {...register('misma_direccion')}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="País de notificación *"
                                        name="pais_notificacion"
                                        value={'CO'}
                                        options={paises_options}
                                        loading={loading}
                                        disabled={true}
                                        required={false}
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
                                        label="Ciudad *"
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
                                        label="Direccion *"
                                        disabled
                                        fullWidth
                                        value={direccion_notificaciones}
                                        error={errors.direccion_notificaciones?.type === 'required'}
                                        helperText={
                                            errors.direccion_notificaciones?.type === 'required'
                                                ? 'Este campo es obligatorio'
                                                : ''
                                        }
                                        {...register('direccion_notificaciones', {
                                            required: true,
                                        })}
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="textarea"
                                        rows="3"
                                        label="Complemento dirección"
                                        {...register('complemento_direccion')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="E-mail *"
                                        error={errors.email?.type === 'required'}
                                        type="email"
                                        helperText={
                                            errors.email?.type === 'required'
                                                ? 'Este campo es obligatorio'
                                                : ''
                                        }
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Celular"
                                        onCopy={(e: any) => e.preventDefault()}
                                        error={errors.telefono_celular?.type === 'required'}
                                        type="text"
                                        helperText={
                                            errors.telefono_celular?.type === 'required'
                                                ? 'Este campo es obligatorio'
                                                : ''
                                        }
                                        {...register('telefono_celular')}
                                    />
                                </Grid>
                            </Grid>
                        </>
                        {/* Datos adicionales (opcionales) */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="DATOS ADICIONALES (opcionales)" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Nombre comercial"
                                        {...register('nombre_comercial')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Teléfono fijo personal"
                                        {...register('telefono_fijo_residencial')}
                                    />
                                </Grid>
                                {/* Dirección laboral */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Dirección laboral nacional
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="País"
                                        name="pais_laboral"
                                        value={'CO'}
                                        options={paises_options}
                                        loading={loading}
                                        required={false}
                                        disabled={true}
                                        errors={errors}
                                        register={register}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="Departamento *"
                                        name="departamento_laboral"
                                        value={departamento_laboral}
                                        options={dpto_laboral_opt}
                                        loading={loading}
                                        required={false}
                                        errors={errors}
                                        register={register}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomSelect
                                        onChange={on_change}
                                        label="Ciudad *"
                                        name="cod_municipio_laboral_nal"
                                        value={municipio_laboral}
                                        options={departamento_laboral_opt}
                                        loading={loading}
                                        disabled={departamento_laboral === '' ?? true}
                                        required={false}
                                        errors={errors}
                                        register={register}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        size="small"
                                        label="Direccion *"
                                        disabled
                                        fullWidth
                                        {...register('direccion_laboral', {
                                            required: true,
                                        })}
                                        value={direccion_laboral}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            open_modal(true);
                                            set_type_direction('laboral');
                                        }}
                                    >
                                        Generar dirección
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="textarea"
                                        rows="3"
                                        label="Complemento dirección"
                                        {...register('direccion_laboral_ref')}
                                    />
                                </Grid>
                            </Grid>
                        </>
                        {/* Autorización de notificación y tratamiento de datos */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="AUTORIZACIÓN DE NOTIFICACIÓN Y TRATAMIENTO DE DATOS" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        label="¿Autoriza notificaciones judiciales por correo electrónico?"
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={acepta_notificacion_email}
                                                {...register('acepta_notificacion_email')}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        label="¿Autoriza notificaciones informativas a través de mensajes de texto?"
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={acepta_notificacion_sms}
                                                {...register('acepta_notificacion_sms')}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </>
                        {/* Datos de clasificación Cormacarena */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <Grid item xs={12}>
                                    <Title title="DATOS DE CLASIFICACIÓN" />
                                </Grid>
                                < Grid item xs={12}>
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
                                                        />
                                                    )}
                                                    {...register('datos_clasificacion_persona')}
                                                    onChange={handle_change_autocomplete}
                                                />
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </>
                        {/* Datos de vinculación */}
                        <>
                            <Grid container spacing={2} mt={0.1}>
                                <DatosVinculacion
                                    id_persona={id_persona}
                                />
                                {/* BOTONES */}
                                <Grid item spacing={2} justifyContent="end" container>
                                    <Grid item>
                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            color="success"
                                            loading={is_saving}
                                            disabled={is_saving}
                                        >
                                            Actualizar
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    </form >
                    <DialogGeneradorDeDirecciones
                        open={is_modal_active}
                        openDialog={open_modal}
                        onChange={set_value_direction}
                        type={type_direction}
                    />
                </>
            ) : (
                <div>Cragando Resultados....</div>
            )}
        </>
    );
};