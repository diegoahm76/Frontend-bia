import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { AxiosError } from 'axios';
import {
  Box,
  Grid,
  TextField,
  Stack,
  Button,
  Input,
  InputLabel,
  type SelectChangeEvent,
  Autocomplete,
  type AutocompleteChangeReason,
  type AutocompleteChangeDetails,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
// import dayjs, { type Dayjs } from 'dayjs';
import { CustomSelect } from '../../../components/CustomSelect';
import { Title } from '../../../components/Title';
import type {
  keys_object,
  DataAadminUser,
  SeguridadSlice,
  IList2,
} from '../interfaces';
// import {
//   crear_user_admin_user,
//   update_user_admin_user,
// } from '../request/seguridadRequest';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { control_error } from '../../../helpers/controlError';
// import { control_success } from '../../../helpers/controlSuccess';
import { DialogHistorialCambiosEstadoUser } from '../components/DialogHistorialCambiosEstadoUser';
import type { ResponseServer } from '../../../interfaces/globalModels';

interface Props {
  tipo_documento: string;
  tipo_persona: string;
  // onRender: (render: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUserPersonaJuridica: React.FC<Props> = ({
  tipo_documento,
  tipo_persona,
}: // onRender,
Props) => {
  const [data_disponible, set_data_disponible] = useState<boolean>(false);

  const { action_admin_users, data_person_search, user_info } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
  const [
    historial_cambios_estado_is_active,
    set_historial_cambios_estado_is_active,
  ] = useState<boolean>(false);
  const {
    data_register,
    loading,
    tipo_usuario,
    tipo_usuario_opt,
    activo,
    activo_opt,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    set_activo,
    set_bloqueado,
    set_roles,
    set_data_register,
    // set_tipo_persona,
    set_tipo_usuario,
    set_tipo_documento,
  } = use_admin_users();

  const {
    register: register_admin_user,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataAadminUser>();

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    switch (e.target.name) {
      case 'tipo_usuario':
        set_tipo_usuario(e.target.value);
        break;
      case 'activo':
        set_activo(e.target.value);
        break;
      case 'bloqueado':
        set_bloqueado(e.target.value);
        break;
    }
    set_value_form(e.target.name, e.target.value);
  };

  const handle_change_autocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    value: IList2[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IList2>
  ): void => {
    set_value('roles', value);
    set_data_register({
      ...data_register,
      roles: value,
    });
    set_roles(value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handle_submit(async () => {
    try {
      if (action_admin_users === 'CREATE') {
        // const data_send = {
        //   nombre_de_usuario: data_register.nombre_de_usuario,
        //   persona: user_info.persona,
        //   tipo_usuario: data_register.tipo_usuario,
        //   roles: data_register.roles,
        //   redirect_url: '',
        //   profile_img: data_register.imagen_usuario,
        // };
        // console.log('Onsubmit', data_register);
        // // Hacemos el registro de la persona JURIDICA
        // const { data } = await crear_user_admin_user(data_send);
        // control_success(data.detail);
      } else if (action_admin_users === 'EDIT') {
        // const data_send = {
        //   is_active: data_register.activo,
        //   is_blocked: data_register.bloqueado,
        //   tipo_usuario: data_register.tipo_usuario,
        //   roles: data_register.roles,
        //   profile_img: data_register.imagen_usuario,
        //   justificacion_activacion: data_register.activo_justificacion_cambio,
        //   justificacion_bloqueo: data_register.bloqueado_justificacion_cambio,
        // };
        // console.log('Onsubmit EDIT', data_register);
        // // Actualización de usuario Persona Natural
        // const { data } = await update_user_admin_user(
        //   user_info.id_usuario,
        //   data_send
        // );
        // control_success(data.detail);
      }
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as ResponseServer<any>;
      control_error(resp.detail);
    }
  });

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    if (watch('tipo_usuario') !== undefined) {
      set_tipo_usuario(watch('tipo_usuario'));
    }
  }, [watch('tipo_usuario')]);

  // Paso de datos a formulario para creacion de usuario persona juridica
  useEffect(() => {
    set_data_disponible(false);
    set_data_register({
      ...data_register,
      razon_social: user_info.razon_social,
      nombre_comercial: user_info.nombre_comercial,
    });
    set_data_disponible(true);
    // onRender(true);
  }, [data_person_search]);

  // Paso de datos a formulario para edición de usuario persona juridica
  useEffect(() => {
    set_data_disponible(false);
    set_data_register({
      ...data_register,
      razon_social: user_info.razon_social,
      nombre_comercial: user_info.nombre_comercial,
      nombre_de_usuario: user_info.nombre_de_usuario,
      tipo_usuario: user_info.tipo_usuario,
      roles: user_info.roles,
      activo: user_info.is_active,
      activo_fecha_ultimo_cambio: user_info.fecha_ultimo_cambio_activacion,
      activo_justificacion_cambio:
        user_info.justificacion_ultimo_cambio_activacion,
      bloqueado: user_info.is_blocked,
      bloqueado_fecha_ultimo_cambio: user_info.fecha_ultimo_cambio_bloqueo,
      bloqueado_justificacion_cambio:
        user_info.justificacion_ultimo_cambio_bloqueo,
      fecha_creacion: user_info.created_at,
      fecha_activación_inicial: user_info.activated_at,
      creado_desde_portal: user_info.creado_por_portal,
      persona_que_creo: user_info.id_usuario_creador,
    });
    set_value('primer_nombre', user_info.primer_nombre);
    set_value('segundo_nombre', user_info.segundo_nombre);
    set_value('primer_apellido', user_info.primer_apellido);
    set_value('segundo_apellido', user_info.segundo_apellido);
    set_value('nombre_de_usuario', user_info.nombre_de_usuario);
    set_value('tipo_usuario', user_info.tipo_usuario);
    set_value('roles', user_info.roles);
    set_value('activo', user_info.is_active);
    set_value(
      'activo_fecha_ultimo_cambio',
      user_info.fecha_ultimo_cambio_activacion
    );
    set_value(
      'activo_justificacion_cambio',
      user_info.justificacion_ultimo_cambio_activacion
    );
    set_value('bloqueado', user_info.is_blocked);
    set_value(
      'bloqueado_fecha_ultimo_cambio',
      user_info.fecha_ultimo_cambio_bloqueo
    );
    set_value(
      'bloqueado_justificacion_cambio',
      user_info.justificacion_ultimo_cambio_bloqueo
    );
    set_value('fecha_creacion', user_info.created_at);
    set_value('fecha_activación_inicial', user_info.activated_at);
    set_value('creado_desde_portal', user_info.creado_por_portal);
    set_value('persona_que_creo', user_info.id_usuario_creador);
    set_data_disponible(true);
    // onRender(true);
  }, [user_info]);

  useEffect(() => {
    console.log(data_disponible);
  }, [data_disponible]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  return (
    <>
      {data_disponible && (
        <>
          <form
            onSubmit={(e) => {
              void on_submit(e);
            }}
          >
            <Grid container spacing={2} sx={{ mt: '5px' }}>
              <Box sx={{ ml: '16px', width: '100%' }}>
                <Title title="Datos personales J" />
              </Box>{' '}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  label="Razon social *"
                  error={errors.razon_social?.type === 'required'}
                  value={data_register.razon_social}
                  helperText={
                    errors.razon_social?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register_admin_user('razon_social', { required: true })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  label="Nombre comercial"
                  value={data_register.nombre_comercial}
                  {...register_admin_user('nombre_comercial')}
                  onChange={handle_change}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: '20px' }}>
              <Box sx={{ ml: '16px', width: '100%' }}>
                <Title title="Datos de acceso" />
              </Box>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Nombre de usuario"
                  fullWidth
                  value={data_register.nombre_de_usuario}
                  error={errors.nombre_de_usuario?.type === 'required'}
                  helperText={
                    errors.nombre_de_usuario?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register_admin_user('nombre_de_usuario')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <InputLabel htmlFor="imagen_usuario">
                  Subir imagen de usuario
                </InputLabel>
                <Input
                  id="imagen_usuario"
                  type="file"
                  required
                  autoFocus
                  {...register_admin_user('imagen_usuario')}
                  error={Boolean(errors.imagen_usuario)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: '20px' }}>
              <Box sx={{ ml: '16px', width: '100%' }}>
                <Title title="Tipo de usuario y roles" />
              </Box>
              <Grid item xs={12} sm={6} md={3}>
                <CustomSelect
                  onChange={on_change}
                  label="Tipo de usuario"
                  name="tipo_usuario"
                  value={tipo_usuario}
                  options={tipo_usuario_opt}
                  loading={loading}
                  disabled={false}
                  required={true}
                  errors={errors}
                  register={register_admin_user}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={9}>
                {roles_opt.length > 0 && (
                  <Autocomplete
                    multiple
                    fullWidth
                    options={roles_opt}
                    getOptionLabel={(option) => option?.label}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    value={roles}
                    renderInput={(params) => (
                      <TextField
                        key={params.id}
                        {...params}
                        label="Selección de roles"
                        placeholder="Roles asignados"
                      />
                    )}
                    {...register_admin_user('roles')}
                    onChange={handle_change_autocomplete}
                  />
                )}
              </Grid>
            </Grid>

            {action_admin_users === 'EDIT' && (
              <>
                <Grid container spacing={2} sx={{ mt: '20px' }}>
                  <Box sx={{ ml: '16px', width: '100%' }}>
                    <Title title="Estado" />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          spacing={2}
                          sx={{ mt: '20px' }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<HistoryIcon />}
                            onClick={() => {
                              set_historial_cambios_estado_is_active(true);
                            }}
                          >
                            HISTORIAL DE ESTADO
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid item xs={12} sm={6} md={3}>
                    <CustomSelect
                      onChange={on_change}
                      label="Activo"
                      name="activo"
                      value={activo}
                      options={activo_opt}
                      loading={loading}
                      disabled={false}
                      required={true}
                      errors={errors}
                      register={register_admin_user}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      label="Fecha ultimo cambio"
                      value={data_register.activo_fecha_ultimo_cambio}
                      {...register_admin_user('activo_fecha_ultimo_cambio')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      label="Justificación del cambio"
                      multiline
                      value={data_register.activo_justificacion_cambio}
                      {...register_admin_user('activo_justificacion_cambio')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CustomSelect
                      onChange={on_change}
                      label="Bloqueado"
                      name="bloqueado"
                      value={bloqueado}
                      options={bloqueado_opt}
                      loading={loading}
                      disabled={false}
                      required={true}
                      errors={errors}
                      register={register_admin_user}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      label="Fecha ultimo cambio"
                      value={data_register.bloqueado_fecha_ultimo_cambio}
                      {...register_admin_user('bloqueado_fecha_ultimo_cambio')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      label="Justificación del cambio"
                      multiline
                      value={data_register.bloqueado_justificacion_cambio}
                      {...register_admin_user('bloqueado_justificacion_cambio')}
                      onChange={handle_change}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: '20px' }}>
                  <Box sx={{ ml: '16px', width: '100%' }}>
                    <Title title="Otros datos" />
                  </Box>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Fecha de creación"
                      error={errors.fecha_creacion?.type === 'required'}
                      helperText={
                        errors.fecha_creacion?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      {...register_admin_user('fecha_creacion')}
                      onChange={handle_change}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Fecha de activación inicial"
                      error={
                        errors.fecha_activación_inicial?.type === 'required'
                      }
                      helperText={
                        errors.fecha_activación_inicial?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      {...register_admin_user('fecha_activación_inicial')}
                      onChange={handle_change}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Creado desde portal"
                      error={errors.creado_desde_portal?.type === 'required'}
                      helperText={
                        errors.creado_desde_portal?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      {...register_admin_user('creado_desde_portal')}
                      onChange={handle_change}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Persona que creo el usario"
                      error={errors.persona_que_creo?.type === 'required'}
                      helperText={
                        errors.persona_que_creo?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      {...register_admin_user('persona_que_creo')}
                      onChange={handle_change}
                      disabled
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                {action_admin_users === 'EDIT'
                  ? 'EDITAR'
                  : action_admin_users === 'CREATE' && 'CREAR'}
              </Button>
            </Stack>
          </form>
          <DialogHistorialCambiosEstadoUser
            is_modal_active={historial_cambios_estado_is_active}
            set_is_modal_active={set_historial_cambios_estado_is_active}
            id_usuario={user_info.id_usuario}
          />
        </>
      )}
    </>
  );
};
