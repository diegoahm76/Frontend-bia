import { useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Stack,
  Avatar,
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
import type { keys_object, IList2 } from '../interfaces';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { DialogHistorialCambiosEstadoUser } from '../components/DialogHistorialCambiosEstadoUser';
import { LoadingButton } from '@mui/lab';

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
    on_submit,
    // Form
    register_admin_user,
    set_value_admin_user,
    errors_admin_users,
    watch_admin_user,
    // Use Selector
    data_disponible,
    action_admin_users,
    user_info,
    historial_cambios_estado_is_active,
    set_historial_cambios_estado_is_active,
    data_register,
    selected_image,
    loading,
    tipo_usuario,
    tipo_usuario_opt,
    activo,
    activo_opt,
    check_user_is_active,
    check_user_is_blocked,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    loading_create_or_update,
    set_file_image,
    set_selected_image,
    set_activo,
    set_bloqueado,
    set_roles,
    set_data_register,
    set_tipo_usuario,
    set_tipo_documento,
  } = use_admin_users();

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
                  label="Razon social"
                  value={data_register.razon_social}
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
                  disabled={action_admin_users === 'EDIT' && true}
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
                  // value={data_register.imagen_usuario}
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
                      value={data_register.activo_fecha_ultimo_cambio}
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
                      disabled={check_user_is_blocked}
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
                      disabled
                      fullWidth
                      size="small"
                      label="Fecha de creación"
                      value={data_register.fecha_creacion}
                      {...register_admin_user('fecha_creacion')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      label="Fecha de activación inicial"
                      value={data_register.fecha_activación_inicial}
                      {...register_admin_user('fecha_activación_inicial')}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      value={data_register.creado_desde_portal ? 'Si' : 'No'}
                      label="Creado desde portal"
                      {...register_admin_user('creado_desde_portal')}
                      onChange={handle_change}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      label="Persona que creo el usuario"
                      {...register_admin_user('persona_que_creo')}
                      onChange={handle_change}
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
