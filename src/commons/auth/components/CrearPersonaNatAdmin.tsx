import { useState } from 'react';
import {
    FormControl,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Typography,
    Button,
    Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomSelect } from '../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import dayjs, { type Dayjs } from 'dayjs';
import type { CrearPersonNaturalAdmin, PropsRegister } from '../../../interfaces/globalModels';
import { use_register_persona_n } from '../hooks/registerPersonaNaturalHook';
import { Title } from '../../../components/Title';
import { control_error, control_success } from '../../../helpers';
import { crear_persona_natural } from '../../seguridad/request/Request';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPersonaNatAdmin: React.FC<PropsRegister> = ({
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    errors,
    isValid: is_valid,
    watch,
    getValues,
}: PropsRegister) => {
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
        error_email,
        error_phone,
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

    const [type_direction, set_type_direction] = useState('');
    const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
    // watchers
    const misma_direccion = watch('misma_direccion') ?? false;
    const acepta_notificacion_email = watch('acepta_notificacion_email') ?? false;
    const acepta_notificacion_sms = watch('acepta_notificacion_sms') ?? false;
    const acepta_tratamiento_datos = watch('acepta_tratamiento_datos') ?? false;

    // establece la fecha de nacimiento
    const on_change_birt_day = (value: Dayjs | null): void => {
        const date = dayjs(value).format('YYYY-MM-DD');
        set_value('fecha_nacimiento', date);
        set_fecha_nacimiento(value);
    };
    const on_submit_create_natural = handle_submit(async (data) => {
        try {
            data.ubicacion_georeferenciada = ''
            await crear_persona_natural(data as CrearPersonNaturalAdmin);
            control_success('la persona se creó correctamente');
        } catch (error) {
            control_error(error);
        }
    });
    return (
        <>
            <form
            onSubmit={(e) => {
                void on_submit_create_natural(e)
              }}
            >
                {/* Datos personales */}
                <>
                    <Grid container spacing={2} mt={0.1}>
                        <Grid item xs={12}>
                            <Title title="DATOS BÁSICOS" />
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
                                error={errors.email?.type === 'required' || error_email}
                                type="email"
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Confirme su e-mail *"
                                error={
                                    errors.confirmar_email?.type === 'required' || error_email
                                }
                                type="email"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" fontWeight="bold">
                                NOTA: Se recomienda el registro de un número celular, este
                                se usará como medio de recuperación de la cuenta, en caso de
                                que olvide sus datos de acceso.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Celular"
                                onCopy={(e: any) => e.preventDefault()}
                                error={error_phone}
                                helperText={
                                    error_phone ? 'Los número de celular no son iguales' : ''
                                }
                                {...register('telefono_celular')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Confirme su celular"
                                onCopy={(e: any) => e.preventDefault()}
                                error={error_phone}
                                helperText={
                                    error_phone ? 'Los número de celular no son iguales' : ''
                                }
                                {...register('confirmar_celular')}
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
                                            checked={acepta_tratamiento_datos}
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
                                    Guardar
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
    );
};
