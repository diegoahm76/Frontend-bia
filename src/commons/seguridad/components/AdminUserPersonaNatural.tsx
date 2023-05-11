import { useEffect } from 'react';
import { type AxiosError } from 'axios';
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
  Avatar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import { Title } from '../../../components/Title';
import { DialogHistorialCambiosEstadoUser } from '../components/DialogHistorialCambiosEstadoUser';
import type { keys_object, IList2 } from '../interfaces';
import {
  crear_user_admin_user,
  update_user_admin_user,
} from '../request/seguridadRequest';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { control_success } from '../../../helpers/controlSuccess';
import { CustomSelect } from '../../../components/CustomSelect';
import { type ToastContent, toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
interface Props {
  has_user: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUserPersonaNatural: React.FC<Props> = ({
  has_user,
}: Props) => {
  const {
    // Form
    register_admin_user,
    handle_submit_admin_user,
    set_value_admin_user,
    errors_admin_users,
    watch_admin_user,
    //
    action_admin_users,
    selected_image,
    set_selected_image,
    file_image,
    set_file_image,
    check_user_is_active,
    set_check_user_is_active,
    check_user_is_blocked,
    set_check_user_is_blocked,
    data_person_search,
    user_info,
    data_disponible,
    historial_cambios_estado_is_active,
    set_historial_cambios_estado_is_active,
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
    set_tipo_usuario,
    set_data_register,
    set_tipo_documento,
    set_roles,
  } = use_admin_users();

  useEffect(() => {
    if (watch_admin_user('tipo_documento') !== undefined) {
      set_tipo_documento(watch_admin_user('tipo_documento'));
    }
  }, [watch_admin_user('tipo_documento')]);

  useEffect(() => {
    if (watch_admin_user('tipo_usuario') !== undefined) {
      set_tipo_usuario(watch_admin_user('tipo_usuario'));
    }
  }, [watch_admin_user('tipo_usuario')]);

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    value = name === 'nombre_de_usuario' ? value.replace(/\s/g, '') : value;
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value_admin_user(name as keys_object, value);
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
        set_check_user_is_active(false);
        break;
      case 'bloqueado':
        set_bloqueado(e.target.value);
        set_check_user_is_blocked(false);
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
      console.log(data_user);
      console.log(data_register);
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
      const resp = temp_error.response?.data as any;
      control_error(resp.detail);
    }
  });

  const handle_image_select = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files?.[0] != null) {
      // Obtener el archivo seleccionado
      const file = event.target.files[0];
      set_file_image(file);

      // Crear un objeto FileReader
      const reader = new FileReader();
      // // Definir la función que se ejecuta cuando se completa la lectura del archivo
      reader.onload = (upload) => {
        // Obtener los datos de la imagen
        console.log(upload?.target?.result);
        if (upload?.target != null) {
          set_selected_image(upload.target.result);
        }
      };
      // Leer el contenido del archivo como una URL de datos
      reader.readAsDataURL(file);
    } else {
      set_selected_image('');
    }
  };

  useEffect(() => {
    console.log(selected_image);
  }, [selected_image]);

  // const handleFormSubmit = (data) => {
  //   // Agregar la imagen seleccionada a los datos del formulario
  //   data.imagen_usuario = selectedImage;

  //   // Enviar los datos del formulario a través de una solicitud POST
  //   // ...
  // };

  useEffect(() => {
    console.log(data_disponible);
  }, [data_disponible]);

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
                <Title title="Datos personales N" />
              </Box>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  disabled
                  fullWidth
                  size="small"
                  label="Primer nombre *"
                  // error={errors_admin_users.primer_nombre?.type === 'required'}
                  value={data_register.primer_nombre}
                  // helperText={
                  //   errors.primer_nombre?.type === 'required'
                  //     ? 'Este campo es obligatorio'
                  //     : ''
                  // }
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
                  // error={errors_admin_users.primer_apellido?.type === 'required'}
                  // helperText={
                  //   errors.primer_apellido?.type === 'required'
                  //     ? 'Este campo es obligatorio'
                  //     : ''
                  // }
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
                  disabled={action_admin_users === 'EDIT' && true}
                  size="small"
                  label="Nombre de usuario"
                  fullWidth
                  value={user_info.nombre_de_usuario}
                  error={
                    errors_admin_users.nombre_de_usuario?.type === 'required'
                  }
                  helperText={
                    errors_admin_users.nombre_de_usuario?.type === 'required'
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
                  autoFocus
                  // value={user_info.profile_img}
                  {...register_admin_user('imagen_usuario')}
                  error={Boolean(errors_admin_users.imagen_usuario)}
                  inputProps={{ accept: 'image/*' }}
                  onChange={handle_image_select}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                {selected_image != null && (
                  <Avatar
                    variant="rounded"
                    sx={{ width: '200px', height: '200px' }}
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    src={selected_image.toString()}
                    alt="Imagen seleccionada"
                  />
                )}
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
                      value={user_info.fecha_ultimo_cambio_activacion}
                      {...register_admin_user('activo_fecha_ultimo_cambio')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      disabled={check_user_is_active}
                      fullWidth
                      size="small"
                      label="Justificación del cambio"
                      multiline
                      value={user_info.justificacion_ultimo_cambio_activacion}
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
                      value={user_info.fecha_ultimo_cambio_bloqueo}
                      {...register_admin_user('bloqueado_fecha_ultimo_cambio')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      disabled={check_user_is_blocked}
                      fullWidth
                      size="small"
                      label="Justificación del cambio"
                      multiline
                      value={user_info.justificacion_ultimo_cambio_bloqueo}
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
