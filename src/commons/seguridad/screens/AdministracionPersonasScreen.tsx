/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    useEffect,
    useState
} from "react";
import { BuscadorPersona } from "../../../components/BuscadorPersona";
import type { DataPersonas, InfoPersona } from "../../../interfaces/globalModels";
import {
    Button, Divider, Grid, MenuItem, Stack, TextField, Typography,
    type SelectChangeEvent,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { Title } from "../../../components/Title";
import CancelIcon from '@mui/icons-material/Cancel';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from "../../../helpers";
import { consultar_datos_persona } from "../request/Request";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { CustomSelect } from '../../../components/CustomSelect';
import { use_register } from '../../auth/hooks/registerHooks';
import { useForm } from "react-hook-form";
import type { keys_object, DataRegistePortal } from "../../auth/interfaces";
import { DialogGeneradorDeDirecciones } from "../../../components/DialogGeneradorDeDirecciones";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    const [persona, set_persona] = useState<InfoPersona>();
    const [is_modal_active, open_modal] = useState(false);
    const [type_direction, set_type_direction] = useState('');
    const [fecha_nacimiento, set_fecha_nacimiento] = useState<Date | null>(new Date());
    const [direccion, set_direccion] = useState('');
    const [direccion_notificacion, set_direccion_notificacion] = useState('');

    const {
        register,
        handleSubmit: handle_submit,
        setValue: set_value,
        formState: { errors, isValid: is_valid },
        watch,
    } = useForm<DataRegistePortal>();
    const {
        ciudad_expedicion,
        ciudad_residencia,
        ciudades_opt,
        data_register,
        departamento_expedicion,
        departamento_residencia,
        departamentos_opt,
        error_email,
        error_password,
        error_phone,
        estado_civil_opt,
        estado_civil,
        genero_opt,
        genero,
        is_exists,
        is_saving,
        loading,
        message_error_password,
        pais_nacimiento,
        pais_notificacion,
        pais_residencia,
        paises_options,
        show_password,
        dpto_notifiacion_opt,
        dpto_notifiacion,
        ciudad_notificacion_opt,
        ciudad_notificacion,
        dpts_residencia_opt,
        ciudades_residencia_opt,
        set_ciudad_notificacion,
        set_dpto_notifiacion,
        handle_click_show_password,
        set_ciudad_expedicion,
        set_ciudad_residencia,
        set_data_register,
        set_departamento,
        set_dpto_residencia,
        set_error_email,
        set_error_error_phone,
        set_error_password,
        set_estado_civil,
        set_genero,
        set_is_saving,
        set_message_error_password,
        set_pais_nacimiento,
        set_pais_residencia,
        set_tipo_documento,
        set_pais_notificacion,
    } = use_register();

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
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handle_fecha_nacimiento_change = (date: Date | null) => {
        set_fecha_nacimiento(date)
    };

    const on_result = (info_persona: InfoPersona): void => {
        if (info_persona !== null || info_persona !== undefined || info_persona !== "") {
            set_persona(info_persona);
            console.log("Datos persona", info_persona)
        }
        console.log("Datos persona no encontrados")
    };
    const cancelar = (): void => {
        set_persona(undefined);
    };
    const get_datos_persona = async (): Promise<void> => {
        try {
            const id_persona: number | undefined = persona?.id_persona;
            const response = await consultar_datos_persona(id_persona);
            console.log("Datos completos", response)
            // datos basicos
            set_datos_persona(response);
            set_fecha_nacimiento(response?.fecha_nacimiento)
            set_pais_nacimiento(response?.pais_nacimiento)
            set_genero(response?.sexo)
            set_estado_civil(response?.estado_civil)
            // datos expedicion documento 
            set_ciudad_expedicion(response?.cod_municipio_expedicion_id)
            set_pais_residencia(response?.pais_residencia)
            set_ciudad_residencia(response?.municipio_residencia)
            set_direccion(response?.direccion_residencia)

            // notificación
            set_direccion_notificacion(response?.direccion_notificaciones)

            // Autorización
            

        } catch (err) {
            control_error(err);
        }
    };
    useEffect(() => {
        if (persona?.numero_documento !== undefined) {
            void get_datos_persona()
        }
    }, [persona?.numero_documento !== undefined])

    const tipos_doc_comercial = [
        {
            value: 'NT',
            label: 'NIT',
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
    const tipo_persona = [
        {
            value: 'N',
            label: 'Natural'
        },
        {
            value: 'J',
            label: 'Juridica',
        },
    ];
    const tipo_empresa = [
        {
            value: 'PU',
            label: 'Pública'
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
        if (watch('departamento_expedicion') !== undefined) {
            set_departamento(watch('departamento_expedicion'));
        }
    }, [watch('departamento_expedicion')]);

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
        if (watch('departamento_residencia') !== undefined) {
            set_dpto_residencia(watch('departamento_residencia'));
        }
    }, [watch('departamento_residencia')]);

    useEffect(() => {
        if (watch('municipio_residencia') !== undefined) {
            set_ciudad_residencia(watch('municipio_residencia'));
        }
    }, [watch('municipio_residencia')]);

    // Datos de notificación
    useEffect(() => {
        if (watch('pais_notificacion') !== undefined) {
            set_pais_notificacion(watch('pais_notificacion'));
        }
    }, [watch('pais_notificacion')]);

    useEffect(() => {
        if (watch('dpto_notifiacion') !== undefined) {
            set_dpto_notifiacion(watch('dpto_notifiacion'));
        }
    }, [watch('dpto_notifiacion')]);

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
            set_estado_civil(watch('estado_civil') as string);
        }
    }, [watch('estado_civil')]);

    return (
        <>
            <Grid
                container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                }}
            >
                <Grid item xs={12} spacing={2}>
                    <Title title="ADMINISTRADOR DE PERSONAS" />
                    <BuscadorPersona onResult={on_result} />
                    {(persona?.tipo_persona === "N") && (
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        <>
                            {(datos_persona != null) && (
                                <Grid container spacing={2}>
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
                                            defaultValue={datos_persona?.tipo_persona}
                                            disabled
                                        >
                                            {tipo_persona.map((option) => (
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
                                            defaultValue={datos_persona?.tipo_documento}
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
                                            defaultValue={datos_persona?.numero_documento}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Title title="DATOS PERSONALES" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Primer Nombre"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.primer_nombre}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Segundo Nombre"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.segundo_nombre}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Primer Apeliido"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.primer_apellido}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Segundo Apeliido"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.segundo_apellido}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                                            <DatePicker
                                                label="Fecha Nacimiento "
                                                inputFormat="YYYY/MM/DD"
                                                openTo="day"
                                                value={fecha_nacimiento}
                                                onChange={handle_fecha_nacimiento_change}
                                                views={['year', 'month', 'day']}
                                                renderInput={(params) => (
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        // defaultValue={datos_persona?.fecha_nacimiento}
                                                        size="small"
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <CustomSelect
                                            onChange={on_change}
                                            label="País de nacimiento "
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
                                    <Grid item xs={12} sm={3}>
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
                                    <Grid item xs={12} sm={3}>
                                        <CustomSelect
                                            onChange={on_change}
                                            label="Estado civil "
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
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" fontWeight="bold">Lugar expedición del documento</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CustomSelect
                                            onChange={on_change}
                                            label="Departamento "
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
                                    <Grid item xs={12} sm={6}>
                                        <CustomSelect
                                            onChange={on_change}
                                            label="Ciudad "
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
                                    <Grid item xs={12}>
                                        <Title title="DATOS DE RECIDENCIA" />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <CustomSelect
                                            onChange={on_change}
                                            label="País de residencia"
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
                                            <Grid item xs={12} sm={4}>
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
                                            <Grid item xs={12} sm={4}>
                                                <CustomSelect
                                                    onChange={on_change}
                                                    label="Ciudad *"
                                                    name="municipio_residencia"
                                                    value={ciudad_residencia}
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
                                                    label="Direccion"
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
                                        </>
                                    )}
                                    <Grid item xs={12}>
                                        <Title title="DATOS DE NOTIFICACIÓN" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" fontWeight="bold">Dirección de notificación Nacional</Typography>
                                    </Grid>
                                    <>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <CustomSelect
                                                onChange={on_change}
                                                label="País de notificación"
                                                name="pais_notificacion"
                                                value={pais_notificacion}
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
                                                label="Departamento"
                                                name="dpto_notifiacion"
                                                value={dpto_notifiacion}
                                                options={dpto_notifiacion_opt}
                                                loading={loading}
                                                disabled={pais_notificacion === '' ?? true}
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
                                                value={data_register.complemeto_direccion}
                                                {...register('complemeto_direccion')}
                                                onChange={handle_change}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                disabled={is_exists}
                                                fullWidth
                                                size="small"
                                                label="E-mail"
                                                error={errors.email?.type === 'required' || error_email}
                                                type="email"
                                                value={data_register.email}
                                                helperText={
                                                    errors.email?.type === 'required'
                                                        ? 'Este campo es obligatorio'
                                                        : error_email
                                                            ? 'Los emails no coinciden'
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
                                                label="Confirme su e-mail"
                                                error={errors.confirmar_email?.type === 'required' || error_email}
                                                type="email"
                                                value={data_register.confirmar_email}
                                                helperText={
                                                    errors.confirmar_email?.type === 'required'
                                                        ? 'Este campo es obligatorio'
                                                        : error_email
                                                            ? 'Los emails no coinciden'
                                                            : ''
                                                }
                                                {...register('confirmar_email', {
                                                    required: true,
                                                })}
                                                onChange={handle_change}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                NOTA: Se recomienda el registro de un número celular, este se usará
                                                como medio de recuperación de la cuenta, en caso de que olvide sus
                                                datos de acceso.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                disabled={is_exists}
                                                fullWidth
                                                size="small"
                                                label="Celular"
                                                onCopy={(e: any) => e.preventDefault()}
                                                value={data_register.telefono_celular}
                                                error={error_phone}
                                                helperText={
                                                    error_phone ? 'Los número de celular no son iguales' : ''
                                                }
                                                {...register('telefono_celular')}
                                                onChange={handle_change}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                disabled={is_exists}
                                                fullWidth
                                                size="small"
                                                label="Confirme su celular"
                                                onCopy={(e: any) => e.preventDefault()}
                                                error={error_phone}
                                                helperText={
                                                    error_phone ? 'Los número de celular no son iguales' : ''
                                                }
                                                {...register('confirmar_celular')}
                                                onChange={handle_change}
                                            />
                                        </Grid>
                                    </>
                                    <Grid item xs={12}>
                                        <Title title="AUTORIZACIÓN DE NOTIFICACIÓN Y TRATAMIENTO DE DATOS" />
                                    </Grid>
                                    <>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                label="¿Autoriza notificaciones judiciales por correo electrónico?"
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={data_register.acepta_notificacion_email}
                                                        {...register('acepta_notificacion_email')}
                                                        onChange={on_change_checkbox}
                                                    />
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                label="¿Autoriza notifiaciones informativas a través de mensajes de texto?"
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={data_register.acepta_notificacion_sms}
                                                        {...register('acepta_notificacion_sms')}
                                                        onChange={on_change_checkbox}
                                                    />
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl
                                                required
                                                error={errors.acepta_tratamiento_datos?.type === 'required'}
                                                component="fieldset"
                                                variant="standard"
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            {...register('acepta_tratamiento_datos', {
                                                                required: true,
                                                            })}
                                                            onChange={on_change_checkbox}
                                                            checked={data_register.acepta_tratamiento_datos}
                                                        />
                                                    }
                                                    label="¿Autoriza tratamiento de datos? *"
                                                />
                                                {errors.acepta_tratamiento_datos?.type === 'required' && (
                                                    <FormHelperText>
                                                        Debe autorizar el tratamiento de datos
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </>
                                    <Grid item xs={12}>
                                        <Title title="DATOS ADICIONALES" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Title title="DATOS DE CLASIFICACIÓN CORMACARENA" />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<CancelIcon />}
                                                onClick={() => {
                                                    cancelar();
                                                }}>Cancelar
                                            </Button>
                                            <Button
                                                id="actualiza-natural"
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                // startIcon={
                                                //     loading_natural
                                                //         ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                                //         : ""
                                                // }
                                                aria-label="Actualizar"
                                                // disabled={loading_natural}
                                                size="large"
                                            >
                                                Actualizar</Button>
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
                    {(persona?.tipo_persona === "J") && (
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Title title="DATOS DE IDENTIFICACIÓN" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                                    defaultValue={persona?.razon_social}
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
                                    defaultValue={persona?.nombre_comercial}
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
                            <Grid item xs={12}>
                                <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CancelIcon />}
                                        onClick={() => {
                                            cancelar();
                                        }}>Cancelar
                                    </Button>
                                    <Button
                                        id="actualiza-juridica"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
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
                </Grid>
                <DialogGeneradorDeDirecciones
                    open={is_modal_active}
                    openDialog={open_modal}
                    onChange={set_value_direction}
                    type={type_direction}
                />
            </Grid >
        </>
    );
};