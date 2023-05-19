import { useEffect, useState } from 'react';
import {
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Autocomplete,
    type AutocompleteChangeReason,
    type AutocompleteChangeDetails,
    MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CustomSelect } from '../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import type { ClaseTercero, ClaseTerceroPersona, DataPersonas, PropsUpdate } from '../../../interfaces/globalModels';
import { use_register_persona_j } from '../hooks/registerPersonaJuridicaHook';
import { Title } from '../../../components/Title';
import { control_error } from '../../../helpers';
import { consultar_clase_tercero, consultar_clase_tercero_persona, consultar_datos_persona } from '../../seguridad/request/Request';
import { DatosRepresentanteLegal } from './DatosRepresentanteLegal/DataRepresentanteLegal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreenJuridica: React.FC<PropsUpdate> = ({
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
        loading,
        paises_options,
        dpto_notifiacion_opt,
        ciudad_notificacion_opt,
        naturaleza_empresa_opt,
        nacionalidad_empresa,
        naturaleza_empresa,
        dpto_notifiacion,
        ciudad_notificacion,
        direccion_notificaciones,
        is_modal_active,
        set_value_direction,
        on_change,
        open_modal,
    } = use_register_persona_j({ watch, setValue: set_value, getValues });

    const [type_direction, set_type_direction] = useState('');
    const [clase_tercero, set_clase_tercero] = useState<ClaseTercero[]>([]);
    const [clase_tercero_persona, set_clase_tercero_persona] = useState<ClaseTercero[]>([]);
    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    // watchers
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
    const get_datos_persona = async (): Promise<void> => {
        try {
            const response = await consultar_datos_persona(id_persona);
            set_datos_persona(response);

            if (response?.representante_legal !== undefined) {
                // if (response?.representante_legal !== 0) {
                //     void get_datos_representante_legal(id)
                // }
            } else {
                control_error("Esta persona no tiene un representante legal")
            }
            // Datos emresariales
            set_value('digito_verificacion', response.digito_verificacion)
            set_value('razon_social', response.razon_social)
            set_value('nombre_comercial', response.nombre_comercial)
            set_value('naturaleza_empresa', response.cod_naturaleza_empresa)
            set_value('nacionalidad_empresa', response.cod_pais_nacionalidad_empresa)
            // Datos de notificacion
            set_value('dpto_notifiacion', response.cod_departamento_notificacion)
            set_value('ciudad_notificacion', response.cod_municipio_notificacion_nal)
            set_value('direccion_notificaciones', response.direccion_notificaciones)
            set_value('complemento_direccion', response.direccion_notificacion_referencia)
            set_value('email', response.email)
            set_value('telefono_celular', response.telefono_celular)
            // Datos adicionales
            set_value('telefono_empresa', response.telefono_empresa)
            set_value('telefono_empresa_2', response.telefono_celular_empresa)
            set_value('email_empresarial', response.email_empresarial)
            // autorización de notificaciones
            set_value('acepta_notificacion_sms', response.acepta_notificacion_sms)
            set_value('acepta_notificacion_email', response.acepta_notificacion_email)

        } catch (err) {
            control_error(err);
        }
    };

    useEffect(() => {
        void get_datos_persona();
        void get_datos_clase_tercero();
        void get_datos_clase_tercero_persona();
    }, [])

    // const on_submit_create_natural = handle_submit(async (data) => {
    //     try {
    //         data.ubicacion_georeferenciada = ''
    //         data.numero_documento = numero_documento
    //         data.tipo_documento = tipo_documento
    //         data.tipo_persona = tipo_persona
    //         await crear_persona_juridica(data as CrearPersonJuridicaAdmin);
    //         control_success('la persona se creó correctamente');
    //     } catch (error) {
    //         control_error(error);
    //     }
    // });
    const tipo_persona_opc = [
        {
            value: 'N',
            label: 'Natural',
        },
        {
            value: 'J',
            label: 'Juridica',
        },
    ];
    const tipos_doc_comercial = [
        {
            value: 'NT',
            label: 'NIT',
        },
    ];
    return (
        <>
            <form
            // onSubmit={(e) => {
            //     void on_submit_create_natural(e)
            // }}
            >
                <>
                    {/* datos de identificación */}
                    <>
                        <Grid container spacing={2} mt={0.1}>
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
                                    defaultValue={tipo_persona}
                                    disabled
                                >
                                    {tipo_persona_opc.map((option) => (
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
                                    defaultValue={tipo_documento}
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
                                    defaultValue={numero_documento}
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
                                    defaultValue={datos_persona?.digito_verificacion}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </>
                    {/* Datos empresariales */}
                    <>
                        <Grid container spacing={2} mt={0.1}>
                            <Grid item xs={12}>
                                <Title title="DATOS EMPRESARIALES" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Dígito de verificación *"
                                    type="number"
                                    error={errors.digito_verificacion?.type === 'required'}
                                    helperText={
                                        errors.digito_verificacion?.type === 'required'
                                            ? 'Este campo es obligatorio'
                                            : ''
                                    }
                                    {...register('digito_verificacion', { required: true })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Razón social *"
                                    error={errors.razon_social?.type === 'required'}
                                    helperText={
                                        errors.razon_social?.type === 'required'
                                            ? 'Este campo es obligatorio'
                                            : ''
                                    }
                                    {...register('razon_social', { required: true })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Nombre comercial *"
                                    error={errors.nombre_comercial?.type === 'required'}
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
                            <Grid item xs={12} sm={6} md={4}>
                                <CustomSelect
                                    onChange={on_change}
                                    label="Naturaleza empresa *"
                                    name="cod_naturaleza_empresa"
                                    value={naturaleza_empresa}
                                    options={naturaleza_empresa_opt}
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
                                    label="Nacionalidad empresa *"
                                    name="cod_pais_nacionalidad_empresa"
                                    value={nacionalidad_empresa}
                                    options={paises_options}
                                    loading={loading}
                                    disabled={false}
                                    required={true}
                                    errors={errors}
                                    register={register}
                                />
                            </Grid>
                        </Grid>
                    </>
                    {/* Datos de notificación */}
                    <>
                        <Grid container spacing={2} mt={0.1}>
                            <Grid item xs={12}>
                                <Title title="DATOS DE NOTIFICACIÓN NACIONAL" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CustomSelect
                                    onChange={on_change}
                                    label="País *"
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
                    {/* Datos del representante legal */}
                    <>
                        <DatosRepresentanteLegal
                        id_persona = {datos_persona?.representante_legal} />
                    </>
                    {/* Datos adicionales (opcionales) */}
                    <>
                        <Grid container spacing={2} mt={0.1}>
                            <Grid item xs={12}>
                                <Title title="DATOS ADICIONALES (OPCIONALES)" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Teléfono fijo de la empresa"
                                    {...register('telefono_empresa')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Teléfono móvil complementario"
                                    {...register('telefono_empresa_2')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Correo electrónico complementario"
                                    {...register('email_empresarial')}
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
            </form>
            <DialogGeneradorDeDirecciones
                open={is_modal_active}
                openDialog={open_modal}
                onChange={set_value_direction}
                type={type_direction}
            />
        </>
    );
};
