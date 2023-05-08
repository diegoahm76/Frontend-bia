/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    useEffect,
    useState
} from "react";
import type { ClaseTercero, DataPersonas, DatosVinculacionCormacarena, InfoPersona } from "../../../interfaces/globalModels";
import {
    Button, Divider, Grid, MenuItem, Stack, TextField, Typography,
    type SelectChangeEvent,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormHelperText,
    Autocomplete,
} from "@mui/material";
import { Title } from "../../../components/Title";
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from "../../../helpers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { CustomSelect } from '../../../components/CustomSelect';
import { use_register } from '../../auth/hooks/registerHooks';
import { type FieldErrors, useForm } from "react-hook-form";
import type { keys_object, DataRegistePortal } from "../../auth/interfaces";
import { DialogGeneradorDeDirecciones } from "../../../components/DialogGeneradorDeDirecciones";
import { consultar_clase_tercero, consultar_clase_tercero_persona, consultar_datos_persona, consultar_vinculacion_persona } from "../../seguridad/request/Request";

interface PropsElement {
    errors: FieldErrors<DataRegistePortal>;
}
interface PropsStep {
    label: string;
    component: (props: PropsElement) => JSX.Element;
}
interface Props {
    data_all: InfoPersona;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreenNatural: React.FC<Props> = ({
    data_all,
}: Props) => {

    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    const [persona, set_persona] = useState<InfoPersona>();
    const [clase_tercero, set_clase_tercero] = useState<ClaseTercero[]>([]);
    const [clase_tercero_persona, set_clase_tercero_persona] = useState<ClaseTercero[]>([]);
    const [datos_vinculacion, set_datos_vinculacion] = useState<DatosVinculacionCormacarena>();
    const [is_modal_active, open_modal] = useState(false);
    const [ver_datos_adicionales, set_ver_datos_adicionales] = useState(false);
    const [button_datos_adicionales, set_button_datos_adicionales] = useState(true);
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
        error_phone,
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
        // set_departamento_expedicion,
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

    const on_result = (): void => {
        if (data_all !== null || data_all !== undefined || data_all !== "") {
            set_persona(data_all);
            console.log(data_all.tipo_persona)
            console.log("Datos persona", data_all)
        }
        console.log("Datos persona no encontrados")
    };
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
            console.log("Datos clase tercero", response)
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
            set_clase_tercero_persona(response)
            console.log("Datos clase tercero persona", response)
        } catch (err) {
            control_error(err);
        }
    };
    // trae los datos de la persona
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
            set_departamento(response?.cod_departamento_expedicion)

            // dirección residencia
            set_pais_residencia(response?.pais_residencia)
            set_ciudad_residencia(response?.municipio_residencia)
            set_direccion(response?.direccion_residencia)


            // dirección notificación
            set_direccion_notificacion(response?.direccion_notificaciones)
            set_data_register({
                ...data_register,
                email: response?.email,
                telefono_celular: response?.telefono_celular,
                complemeto_direccion: response?.direccion_notificacion_referencia,
                // Autorización
                acepta_notificacion_email: response?.acepta_notificacion_email,
                acepta_notificacion_sms: response?.acepta_notificacion_sms,
                acepta_tratamiento_datos: response?.acepta_tratamiento_datos,
            });
            set_dpto_notifiacion(response?.cod_departamento_notificacion)
            set_ciudad_notificacion(response?.cod_municipio_notificacion_nal)

            // Datos adicionales
        } catch (err) {
            control_error(err);
        }
    };
    // trae los datos de vinculacion de una persona
    const get_datos_vinculación = async (): Promise<void> => {
        try {
            const id_persona: number | undefined = persona?.id_persona;
            const response = await consultar_vinculacion_persona(id_persona);
            console.log("Datos vinculacion cormacarena", response)
            set_datos_vinculacion(response)
        } catch (err) {
            control_error(err);
        }
    };
    useEffect(() => {
        if (persona?.numero_documento !== undefined) {
            if (persona?.tipo_persona === "N") {
                void get_datos_persona();
                void get_datos_clase_tercero();
                void get_datos_clase_tercero_persona();
                void get_datos_vinculación();
            }
        }
    }, [persona?.numero_documento !== undefined])

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
            <Grid item xs={12} spacing={2}>
                {(persona?.tipo_persona === "N") && (
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    <>
                        {(datos_persona != null) && (
                            <Grid container spacing={2}>
                                {/* datos de identificación */}
                                <>
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
                                </>
                                {/* datos personales */}
                                <>
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
                                                        helperText={
                                                            errors.fecha_nacimiento?.type === 'required'
                                                                ? 'Este campo es obligatorio'
                                                                    : ''
                                                        }
                                                        {...register('fecha_nacimiento', {
                                                            required: true,
                                                        })}
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
                                </>
                                {/* datos de residencia */}
                                <>
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
                                </>
                                {/* datos de notificación */}
                                <>
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
                                                type="number"
                                                size="small"
                                                label="Celular"
                                                onCopy={(e: any) => e.preventDefault()}
                                                value={data_register.telefono_celular}
                                                error={errors.email?.type === 'required'}
                                                helperText={
                                                    errors.email?.type === 'required'
                                                        ? 'Este campo es obligatorio'
                                                            : ''}
                                                {...register('telefono_celular')}
                                                onChange={handle_change}
                                            />
                                        </Grid>
                                    </>
                                </>
                                {/* Autorización de datos */}
                                <>
                                    <Grid item xs={12}>
                                        <Title title="AUTORIZACIÓN DE NOTIFICACIÓN Y TRATAMIENTO DE DATOS" />
                                    </Grid>
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
                                        <FormControl
                                            required
                                            error={errors.acepta_tratamiento_datos?.type === 'required'}
                                            component="fieldset"
                                            variant="standard"
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        disabled
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
                                                    required
                                                    autoFocus
                                                    defaultValue={datos_persona?.nombre_comercial}
                                                    helperText={
                                                        errors.nombre_comercial?.type === 'required'
                                                            ? 'Este campo es obligatorio'
                                                                : ''
                                                    }
                                                    {...register('nombre_comercial', {
                                                        required: true,
                                                    })}
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
                                                    helperText={
                                                        errors.telefono_fijo_residencial?.type === 'required'
                                                            ? 'Este campo es obligatorio'
                                                                : ''
                                                    }
                                                    {...register('telefono_fijo_residencial', {
                                                        required: true,
                                                    })}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    disabled={is_exists}
                                                    fullWidth
                                                    size="small"
                                                    label="E-mail laboral / personal"
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
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    disabled={is_exists}
                                                    fullWidth
                                                    type="number"
                                                    size="small"
                                                    label="Telefono laboral"
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
                                                    value={data_register.complemeto_direccion}
                                                    {...register('complemeto_direccion')}
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
                                        <Title title="DATOS DE CLASIFICACIÓN CORMACARENA" />
                                    </Grid>
                                    < Grid item xs={12}>
                                        {(clase_tercero.length > 0) && (
                                            <>
                                                <Grid item xs={12}>
                                                    <Autocomplete
                                                        multiple
                                                        fullWidth
                                                        id="Datos-Clasificación-cormacarena"
                                                        size="medium"
                                                        options={clase_tercero}
                                                        getOptionLabel={(option) => option?.label}
                                                        defaultValue={clase_tercero_persona}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Datos clasificación Cormacarena"
                                                                placeholder="Clasificacion Cormacarena"
                                                                // helperText={
                                                                //     errors.datos_clasificacion_persona?.type === 'required'
                                                                //         ? 'Este campo es obligatorio'
                                                                //             : ''
                                                                // }
                                                                // {...register('datos_clasificacion_persona', {
                                                                //     required: true,
                                                                // })}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </>
                                {/* Datos de vinculación a cormacarena */}
                                <>
                                    <Grid item xs={12}>
                                        <Title title="DATOS DE VINCULACIÓN ACTUAL A CORMACARENA" />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Cargo Actual"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            disabled
                                            defaultValue={datos_vinculacion?.cargo_actual}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Fecha de inicio"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            disabled
                                            defaultValue={datos_vinculacion?.fecha_inicio_cargo_actual}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Fecha a finalizar"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            disabled
                                            autoFocus
                                            defaultValue={datos_vinculacion?.fecha_a_finalizar_cargo_actual}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Observaciones de la vinculación"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            disabled
                                            multiline
                                            defaultValue={datos_vinculacion?.observaciones_vinculacion_cargo_actual}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Cargo del organigrama actual"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            disabled
                                            multiline
                                            defaultValue={datos_vinculacion?.unidad_organizacional_actual}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Es unidad del organigrama actual"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            disabled
                                            multiline
                                            defaultValue={datos_vinculacion?.es_unidad_organizacional_actual}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Fecha de asignación"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            disabled
                                            multiline
                                            defaultValue={datos_vinculacion?.fecha_asignacion_unidad}
                                        />
                                    </Grid>
                                </>
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
            </Grid>
            <DialogGeneradorDeDirecciones
                open={is_modal_active}
                openDialog={open_modal}
                onChange={set_value_direction}
                type={type_direction}
            />
        </>
    );
};