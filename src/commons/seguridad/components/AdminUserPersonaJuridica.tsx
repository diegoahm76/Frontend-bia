import { useEffect } from 'react';
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
import type { keys_object, UserCreate, IList2 } from '../interfaces';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { control_error } from '../../../helpers/controlError';
import { DialogHistorialCambiosEstadoUser } from '../components/DialogHistorialCambiosEstadoUser';
import { LoadingButton } from '@mui/lab';
import { control_success } from '../../../helpers';
import {
  crear_user_admin_user,
  update_user_admin_user,
} from '../request/seguridadRequest';

interface Props {
  tipo_documento: string;
  tipo_persona: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUserPersonaJuridica: React.FC<Props> = ({
  tipo_documento,
  tipo_persona,
}: Props) => {
  const {
    // Form
    register_admin_user,
    handle_submit_admin_user,
    set_value_admin_user,
    errors_admin_users,
    watch_admin_user,
    // Use Selector
    data_person_search,
    data_disponible,
    action_admin_users,
    user_info,
    historial_cambios_estado_is_active,
    set_historial_cambios_estado_is_active,
    data_register,
    file_image,
    loading,
    tipo_usuario,
    tipo_usuario_opt,
    activo,
    activo_opt,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    loading_create_or_update,
    set_loading_create_or_update,
    set_activo,
    set_bloqueado,
    set_roles,
    set_data_register,
    // set_tipo_persona,
    set_tipo_usuario,
    set_tipo_documento,
  } = use_admin_users();

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value_admin_user(name as keys_object, value);
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
    set_value_admin_user('roles', value);
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

  const on_submit = handle_submit_admin_user(async (data_user) => {
    try {
      set_loading_create_or_update(true);
      if (action_admin_users === 'CREATE') {
        const data_create_user = new FormData();
        data_create_user.append(
          'nombre_de_usuario',
          data_user.nombre_de_usuario
        );
        data_create_user.append(
          'persona',
          data_person_search.id_persona.toString()
        );
        data_create_user.append('tipo_usuario', data_user.tipo_usuario);
        for (let i = 0; i < roles.length; i++) {
          data_create_user.append('roles', `${roles[i].value}`);
        }
        data_create_user.append(
          'redirect_url',
          'http://localhost:3000/#/app/seguridad/administracion_usuarios'
        );
        console.log(file_image);
        data_create_user.append('profile_img', file_image ?? '');

        // for (const [key, value] of data_create_user.entries()) {
        //   // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        //   console.log(key + ': ' + value);
        // }

        // // Creación de usuario Persona Natural
        const { data } = await crear_user_admin_user(data_create_user);

        control_success(data.detail);
      } else if (action_admin_users === 'EDIT') {
        const data_update_user = new FormData();
        data_update_user.append('is_active', data_register.activo.toString());
        data_update_user.append(
          'is_blocked',
          data_register.bloqueado.toString()
        );
        data_update_user.append('tipo_usuario', data_register.tipo_usuario);
        for (let i = 0; i < roles.length; i++) {
          data_update_user.append('roles', `${roles[i].value}`);
        }
        data_update_user.append('profile_img', data_register.imagen_usuario);
        data_update_user.append(
          'justificacion_activacion',
          data_register.activo_justificacion_cambio ?? ''
        );
        data_update_user.append(
          'justificacion_bloqueo',
          data_register.bloqueado_justificacion_cambio ?? ''
        );

        // Actualización de usuario Persona Natural
        const { data } = await update_user_admin_user(
          user_info.id_usuario,
          data_update_user
        );
        console.log(data);
        control_success(data.detail);
      }
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as UserCreate;
      control_error(resp.detail);
    } finally {
      set_loading_create_or_update(false);
    }
  });

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    if (watch_admin_user('tipo_usuario') !== undefined) {
      set_tipo_usuario(watch_admin_user('tipo_usuario'));
    }
  }, [watch_admin_user('tipo_usuario')]);

  useEffect(() => {
    console.log(data_disponible);
  }, [data_disponible]);

  useEffect(() => {
    if (watch_admin_user('tipo_documento') !== undefined) {
      set_tipo_documento(watch_admin_user('tipo_documento'));
    }
  }, [watch_admin_user('tipo_documento')]);

  return (
    <>
      {Boolean(data_disponible) && (
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
                  error={errors_admin_users.razon_social?.type === 'required'}
                  value={data_register.razon_social}
                  helperText={
                    errors_admin_users.razon_social?.type === 'required'
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
                  error={
                    errors_admin_users.nombre_de_usuario?.type === 'required'
                  }
                  helperText={
                    errors_admin_users.nombre_de_usuario?.type === 'required'
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
                  error={Boolean(errors_admin_users.imagen_usuario)}
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
                  errors={errors_admin_users}
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
                      errors={errors_admin_users}
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
                      errors={errors_admin_users}
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
                      error={
                        errors_admin_users.fecha_creacion?.type === 'required'
                      }
                      helperText={
                        errors_admin_users.fecha_creacion?.type === 'required'
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
                        errors_admin_users.fecha_activación_inicial?.type ===
                        'required'
                      }
                      helperText={
                        errors_admin_users.fecha_activación_inicial?.type ===
                        'required'
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
                      error={
                        errors_admin_users.creado_desde_portal?.type ===
                        'required'
                      }
                      helperText={
                        errors_admin_users.creado_desde_portal?.type ===
                        'required'
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
                      label="Persona que creo el usuario"
                      error={
                        errors_admin_users.persona_que_creo?.type === 'required'
                      }
                      helperText={
                        errors_admin_users.persona_que_creo?.type === 'required'
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
              <LoadingButton
                loading={loading_create_or_update}
                type="submit"
                color="primary"
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                {action_admin_users === 'EDIT'
                  ? 'EDITAR'
                  : action_admin_users === 'CREATE' && 'CREAR'}
              </LoadingButton>
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
