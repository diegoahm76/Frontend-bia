import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  TextField,
  // MenuItem,
  Stack,
  Button,
  Input,
  InputLabel,
  type SelectChangeEvent,
  Autocomplete,
  type AutocompleteChangeReason,
  type AutocompleteChangeDetails,
  // type SelectChangeEvent,
  // Autocomplete,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
// import { CustomSelect } from '../../../components/CustomSelect';
import { Title } from '../../../components/Title';
import { DialogHistorialCambiosEstadoUser } from '../components/DialogHistorialCambiosEstadoUser';
import type {
  keys_object,
  DataAadminUser,
  SeguridadSlice,
  RolUser,
  // Users,
} from '../interfaces';
import {
  crear_user_admin_user,
  update_user_admin_user,
} from '../request/seguridadRequest';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { control_error } from '../../../helpers/controlError';
import { control_success } from '../../../helpers/controlSuccess';
// import FormSelectController from '../../../components/partials/form/FormSelectController';
import { CustomSelect } from '../../../components/CustomSelect';

interface Props {
  has_user: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUserPersonaNatural: React.FC<Props> = ({
  has_user,
}: Props) => {
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
    // roles_opt,
    set_activo,
    set_bloqueado,
    set_tipo_usuario,
    set_data_register,
    set_tipo_documento,
  } = use_admin_users();

  const {
    // control,
    register: register_admin_user,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataAadminUser>();

  // Paso de datos a formulario para creacion de usuario persona natural
  useEffect(() => {
    set_data_register({
      ...data_register,
      primer_nombre: data_person_search.primer_nombre,
      segundo_nombre: data_person_search.segundo_nombre,
      primer_apellido: data_person_search.primer_apellido,
      segundo_apellido: data_person_search.segundo_apellido,
    });
    set_data_disponible(true);
  }, [data_person_search]);

  // Paso de datos a formulario para edición de usuario persona natural
  useEffect(() => {
    console.log('reset admin user');
    set_data_register({
      tipo_persona: '',
      tipo_documento: '',
      numero_documento: '',
      razon_social: '',
      nombre_comercial: '',
      primer_apellido: '',
      primer_nombre: '',
      segundo_apellido: '',
      segundo_nombre: '',
      nombre_de_usuario: '',
      imagen_usuario: '',
      tipo_usuario: '',
      roles: [],
      activo: false,
      activo_fecha_ultimo_cambio: '',
      activo_justificacion_cambio: '',
      bloqueado: false,
      bloqueado_fecha_ultimo_cambio: '',
      bloqueado_justificacion_cambio: '',
      fecha_creacion: '',
      fecha_activación_inicial: '',
      creado_desde_portal: false,
      persona_que_creo: 0,
    });
    set_data_register({
      ...data_register,
      primer_nombre: user_info.primer_nombre,
      segundo_nombre: user_info.segundo_nombre,
      primer_apellido: user_info.primer_apellido,
      segundo_apellido: user_info.segundo_apellido,
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
    set_activo(data_register.activo.toString());
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
  }, [user_info]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  useEffect(() => {
    if (watch('tipo_usuario') !== undefined) {
      set_tipo_usuario(watch('tipo_usuario'));
    }
  }, [watch('tipo_usuario')]);

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    // value = name === 'nombre_de_usuario' ? value.replace(/\s/g, '') : value;
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value(name as keys_object, value);
    console.log(data_register);
  };

  const on_change = (e: SelectChangeEvent<string>): void => {
    console.log(e.target.name, e.target.value);
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
    value: RolUser[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<RolUser>
  ): void => {
    console.log(event);
    console.log(value);
    console.log(reason);
    console.log(details);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.name, e.target.value);
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handle_submit(async (fata) => {
    try {
      console.log(fata);
      console.log(data_register);
      if (action_admin_users === 'CREATE') {
        const data_send = {
          nombre_de_usuario: data_register.nombre_de_usuario,
          persona: user_info.persona,
          tipo_usuario: data_register.tipo_usuario,
          roles: data_register.roles,
          redirect_url: '',
          profile_img: data_register.imagen_usuario,
        };
        console.log('Onsubmit CREATE', data_send);
        // Creación de usuario Persona Natural
        const { data } = await crear_user_admin_user(data_send);
        control_success(data.detail);
      } else if (action_admin_users === 'EDIT') {
        const data_send = {
          is_active: data_register.activo,
          is_blocked: data_register.bloqueado,
          tipo_usuario: data_register.tipo_usuario,
          roles: data_register.roles,
          profile_img: data_register.imagen_usuario,
          justificacion_activacion: data_register.activo_justificacion_cambio,
          justificacion_bloqueo: data_register.bloqueado_justificacion_cambio,
        };
        console.log('Onsubmit EDIT', data_register);
        // Actualización de usuario Persona Natural
        const { data } = await update_user_admin_user(
          user_info.id_usuario,
          data_send
        );
        control_success(data.detail);
      }
    } catch (error) {
      console.log(error);
      control_error(error);
    }
  });

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
                <Title title="Datos personales N" />
              </Box>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  label="Primer nombre *"
                  error={errors.primer_nombre?.type === 'required'}
                  value={data_register.primer_nombre}
                  helperText={
                    errors.primer_nombre?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register_admin_user('primer_nombre', { required: true })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  label="Segundo nombre"
                  value={data_register.segundo_nombre}
                  {...register_admin_user('segundo_nombre')}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  label="Primer apellido *"
                  value={data_register.primer_apellido}
                  error={errors.primer_apellido?.type === 'required'}
                  helperText={
                    errors.primer_apellido?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register_admin_user('primer_apellido', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  value={data_register.segundo_apellido}
                  label="Segundo apellido"
                  {...register_admin_user('segundo_apellido')}
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
                  // disabled={is_exists}
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
                  onChange={handle_change}
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
                <Autocomplete
                  multiple
                  fullWidth
                  options={roles}
                  getOptionLabel={(option) => option.nombre_rol}
                  defaultValue={[roles[13]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selección de roles"
                      placeholder="Roles asignados"
                    />
                  )}
                  {...register_admin_user('roles')}
                  onChange={handle_change_autocomplete}
                />
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
                variant="contained"
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
