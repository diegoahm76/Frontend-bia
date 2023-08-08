import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import UpdateIcon from '@mui/icons-material/Update';
import type {
  DataJuridicaUpdate,
  PropsUpdateJ,
  UpdateAutorizaNotificacion,
} from '../../../../interfaces/globalModels';
import {
  editar_persona_juridica_cuenta_propia,
} from '../../request/Request'
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components/Title';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DatosRepresentanteLegal } from '../DatosRepresentanteLegal/DataRepresentanteLegal';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import { DialogAutorizaDatos } from '../../../../components/DialogAutorizaDatos';
import { use_register } from '../../../auth/hooks/registerHook';
import { use_register_persona_j } from '../../../auth/hooks/registerPersonaJuridicaHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosPersonalesJuridica: React.FC<PropsUpdateJ> = ({
  data,
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  isValid: is_valid,
  watch,
  getValues,
}: PropsUpdateJ) => {
  const {
    paises_options,
    dpto_notifiacion_opt,
    ciudad_notificacion_opt,
    naturaleza_empresa_opt,
    dpto_notifiacion,
    direccion_notificaciones,
    is_modal_active,
    nacionalidad_empresa,
    ciudad_notificacion,
    set_nacionalidad_empresa,
    // set_dpto_notifiacion,
    set_value_direction,
    on_change,
    open_modal,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });
  const { tipo_persona_opt } = use_register();

  const [type_direction, set_type_direction] = useState('');
  const [dialog_notificaciones, set_dialog_notificaciones] =
    useState<boolean>(false);

  // watchers
  const tipo_persona = watch('tipo_persona') ?? '';
  const direccion_notificacion_referencia = watch('direccion_notificacion_referencia') ?? '';
  const acepta_notificacion_email =
    watch('acepta_notificacion_email') ?? data?.acepta_notificacion_email ?? false;
  const acepta_notificacion_sms =
    watch('acepta_notificacion_sms') ?? data?.acepta_notificacion_sms ?? false;

  const [is_saving, set_is_saving] = useState<boolean>(false);
  const [id_reoresentante_legal, set_id_reoresentante_legal] = useState(0);

  // abrir modal actualizar Notificaciones
  const handle_open_dialog_notificaciones = (): void => {
    set_dialog_notificaciones(true);
  };

  const respuesta_autorizacion = (data: UpdateAutorizaNotificacion): void => {
    set_value('acepta_notificacion_email', data.acepta_autorizacion_email);
    set_value('acepta_notificacion_sms', data.acepta_autorizacion_sms);
  };
  useEffect(() => {
    if (data !== undefined) {
      set_value('tipo_persona', data.tipo_persona);
      set_nacionalidad_empresa(data.cod_pais_nacionalidad_empresa);
      // set_dpto_notifiacion(data.cod_departamento_notificacion);
      set_value('cod_departamento_notificacion', data.cod_departamento_notificacion);
      set_value('cod_municipio_notificacion_nal', data.cod_municipio_notificacion_nal);
      set_value('direccion_notificaciones', data.direccion_notificaciones);
      set_value('direccion_notificacion_referencia', data.direccion_notificacion_referencia)
    }
  }, [data]);

  const on_submit_update_juridical = handle_submit(async (datos) => {
    try {
      set_is_saving(true);
      datos.ubicacion_georeferenciada = '';
      datos.representante_legal = id_reoresentante_legal;
      await editar_persona_juridica_cuenta_propia(
        datos as DataJuridicaUpdate
      );
      control_success('la persona se actualizó correctamente');
      set_is_saving(false);
    } catch (error: any) {
      control_error(error.response.data.detail);
      set_is_saving(false);
    }
  });

  return (
    <>
      {data !== undefined ? (
        <form
          onSubmit={(e) => {
            void on_submit_update_juridical(e);
          }}
        >
          {/* Datos empresariales */}
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={12}>
              <Title title="DATOS EMPRESARIALES" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Tipo persona"
                name="tipo_persona"
                value={tipo_persona}
                options={tipo_persona_opt}
                disabled={true}
                required={false}
                errors={errors}
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Digito de verificación:"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={data?.digito_verificacion}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Razón social *"
                defaultValue={data?.razon_social}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Nombre comercial *"
                defaultValue={data?.nombre_comercial}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Naturaleza empresa *"
                name="cod_naturaleza_empresa"
                value={data?.cod_naturaleza_empresa}
                options={naturaleza_empresa_opt}
                disabled={true}
                required={false}
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
                disabled={false}
                required={true}
                errors={errors}
                register={register}
              />
            </Grid>
          </Grid>
          {/* Datos de notificación */}
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
                name="cod_departamento_notificacion"
                value={dpto_notifiacion}
                options={dpto_notifiacion_opt}
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
                defaultValue={direccion_notificacion_referencia}
                {...register('direccion_notificacion_referencia')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="E-mail *"
                error={errors.email?.type === 'required'}
                type="email"
                defaultValue={data.email}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Celular"
                defaultValue={data.telefono_celular_empresa}
                error={errors.telefono_celular_empresa?.type === 'required'}
                helperText={
                  errors.telefono_celular_empresa?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
                {...register('telefono_celular_empresa')}
              />
            </Grid>
          </Grid>
          {/* Datos del representante legal */}
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={12}>
              <Title title="DATOS DEL REPRESENTANTE LEGAL" />
            </Grid>
            <Grid item xs={12}>
              <DatosRepresentanteLegal
                id_representante_legal={data?.representante_legal ?? 0}
                id_persona={data?.id_persona}
                fecha_inicio={data.fecha_inicio_cargo_rep_legal}
                errors={errors}
                register={register}
                setValue={set_value}
                getValues={getValues}
                watch={watch}
                set_id_reoresentante_legal={set_id_reoresentante_legal}
              />
            </Grid>
          </Grid>
          {/* Datos adicionales (opcionales) */}
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={12}>
              <Title title="Datos de notificación (OPCIONALES)" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono fijo de la empresa"
                defaultValue={data.telefono_empresa}
                {...register('telefono_empresa')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono móvil complementario"
                defaultValue={data.telefono_empresa_2}
                {...register('telefono_empresa_2')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Correo electrónico complementario"
                defaultValue={data.email_empresarial}
                {...register('email_empresarial')}
              />
            </Grid>
          </Grid>
          {/* Autorización de notificación y tratamiento de datos */}
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={12}>
              <Title title="Autorización de notificación y tratamiento de datos" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="¿Autoriza notificaciones judiciales por correo electrónico?"
                control={
                  <Checkbox
                    size="small"
                    disabled
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
                    disabled
                    checked={acepta_notificacion_sms}
                    {...register('acepta_notificacion_sms')}
                  />
                }
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
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  onClick={() => {
                    handle_open_dialog_notificaciones();
                  }}
                >
                  Actualizar Notificaciones
                </Button>
              </Stack>
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
                  Actualizar
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      ) : (
        <div>Cragando Resultados....</div>
      )}
      <DialogGeneradorDeDirecciones
        open={is_modal_active}
        openDialog={open_modal}
        onChange={set_value_direction}
        type={type_direction}
      />
      <DialogAutorizaDatos
        is_modal_active={dialog_notificaciones}
        set_is_modal_active={set_dialog_notificaciones}
        id_persona={data?.id_persona ?? 0}
        data_autorizacion={{
          acepta_autorizacion_email: data?.acepta_notificacion_email,
          acepta_autorizacion_sms: data?.acepta_notificacion_sms,
        }}
        on_result={respuesta_autorizacion}
      />
    </>
  );
};
