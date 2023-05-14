import {
  Box,
  Grid,
  TextField,
  Stack,
  Button,
  Input,
  InputLabel,
  Autocomplete,
  Avatar,
  Skeleton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import { CustomSelect } from '../../../components/CustomSelect';
import { Title } from '../../../components/Title';
import { DialogHistorialCambiosEstadoUser } from './DialogHistorialCambiosEstadoUser';
import { use_admin_users } from '../hooks/AdminUserHooks';

interface Props {
  tipo_de_persona: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUsers: React.FC<Props> = ({ tipo_de_persona }: Props) => {
  const {
    on_submit,
    // set_value_form,
    on_change,
    handle_change_autocomplete,
    handle_change,
    handle_image_select,
    // Handle Form
    register_admin_user,
    // handle_submit_admin_user,
    // set_value_admin_user,
    errors_admin_users,
    // watch_admin_user,
    // Gets
    // get_selects_options,
    // UseSelector
    action_admin_users,
    // data_person_search,
    user_info,
    // UseState values
    loading_create_or_update,
    loading_inputs,
    // users_x_person_is_active,
    selected_image,
    // file_image,
    check_user_is_active,
    check_user_is_blocked,
    data_disponible,
    historial_cambios_estado_is_active,
    data_register,
    // has_user,
    // is_exists,
    // is_saving,
    // is_search,
    loading,
    // numero_documento,
    // tipo_documento_opt,
    // tipo_documento,
    // tipo_persona_opt,
    // tipo_persona,
    tipo_usuario_opt,
    tipo_usuario,
    activo,
    activo_opt,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    // UseState Sets
    // set_loading_create_or_update,
    // set_users_x_person_is_active,
    // set_selected_image,
    // set_file_image,
    // set_check_user_is_active,
    // set_check_user_is_blocked,
    // set_data_disponible,
    set_historial_cambios_estado_is_active,
    // set_data_register,
    // set_has_user,
    // set_is_exists,
    // set_is_saving,
    // set_is_search,
    // set_roles,
    // set_numero_documento,
    // set_activo,
    // set_bloqueado,
    // set_tipo_documento,
    // set_tipo_persona,
    // set_tipo_usuario,
  } = use_admin_users();

  return (
    <>
      {data_disponible && (
        <>
          <form
            onSubmit={(e) => {
              void on_submit(e);
            }}
          >
            {(action_admin_users === 'EDIT' ||
              action_admin_users === 'CREATE') && (
              <>
                <Grid container spacing={2} sx={{ mt: '5px' }}>
                  <Box sx={{ ml: '16px', width: '100%' }}>
                    <Title
                      title={`Datos personales persona ${tipo_de_persona}`}
                    />
                  </Box>
                  {tipo_de_persona === 'N' ? (
                    <>
                      <Grid item xs={12} sm={6} md={3}>
                        {loading_inputs ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={45}
                          />
                        ) : (
                          <TextField
                            disabled
                            fullWidth
                            autoFocus
                            size="small"
                            label="Primer nombre"
                            value={data_register.primer_nombre}
                            {...register_admin_user('primer_nombre')}
                            onChange={handle_change}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        {loading_inputs ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={45}
                          />
                        ) : (
                          <TextField
                            disabled
                            fullWidth
                            autoFocus
                            size="small"
                            label="Segundo nombre"
                            value={data_register.segundo_nombre}
                            {...register_admin_user('segundo_nombre')}
                            onChange={handle_change}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        {loading_inputs ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={45}
                          />
                        ) : (
                          <TextField
                            disabled
                            fullWidth
                            autoFocus
                            size="small"
                            label="Primer apellido"
                            value={data_register.primer_apellido}
                            {...register_admin_user('primer_apellido')}
                            onChange={handle_change}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        {loading_inputs ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={45}
                          />
                        ) : (
                          <TextField
                            disabled
                            fullWidth
                            autoFocus
                            size="small"
                            value={data_register.segundo_apellido}
                            label="Segundo apellido"
                            {...register_admin_user('segundo_apellido')}
                            onChange={handle_change}
                          />
                        )}
                      </Grid>
                    </>
                  ) : (
                    tipo_de_persona === 'J' && (
                      <>
                        <Grid item xs={12} sm={6} md={3}>
                          {loading_inputs ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={45}
                            />
                          ) : (
                            <TextField
                              disabled
                              fullWidth
                              autoFocus
                              size="small"
                              label="Razon social"
                              value={data_register.razon_social}
                              {...register_admin_user('razon_social')}
                              onChange={handle_change}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          {loading_inputs ? (
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height={45}
                            />
                          ) : (
                            <TextField
                              disabled
                              fullWidth
                              autoFocus
                              size="small"
                              label="Nombre comercial"
                              value={data_register.nombre_comercial}
                              {...register_admin_user('nombre_comercial')}
                              onChange={handle_change}
                            />
                          )}
                        </Grid>
                      </>
                    )
                  )}
                </Grid>
                <Grid container spacing={2} sx={{ mt: '20px' }}>
                  <Box sx={{ ml: '16px', width: '100%' }}>
                    <Title title="Datos de acceso" />
                  </Box>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      disabled={action_admin_users === 'EDIT' && true}
                      size="small"
                      required={action_admin_users === 'CREATE' && true}
                      label="Nombre de usuario"
                      fullWidth
                      value={data_register.nombre_de_usuario}
                      error={
                        errors_admin_users.nombre_de_usuario?.type ===
                        'required'
                      }
                      helperText={
                        errors_admin_users.nombre_de_usuario?.type ===
                        'required'
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
                      required={action_admin_users === 'CREATE' && true}
                      label={
                        action_admin_users === 'CREATE'
                          ? 'Tipo de usuario *'
                          : 'Tipo de usuario'
                      }
                      name="tipo_usuario"
                      value={tipo_usuario}
                      options={tipo_usuario_opt}
                      loading={loading}
                      disabled={tipo_de_persona === 'J' && true}
                      errors={errors_admin_users}
                      register={register_admin_user}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    {roles_opt.length > 0 && (
                      <Autocomplete
                        disabled={tipo_usuario === 'E' && true}
                        multiple
                        fullWidth
                        options={roles_opt}
                        getOptionLabel={(option) => option?.label}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        value={roles ?? []}
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
              </>
            )}
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
                      value={data_register.persona_que_creo}
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
                variant="contained"
                startIcon={<SaveIcon />}
              >
                {action_admin_users === 'EDIT'
                  ? 'EDITAR'
                  : action_admin_users === 'CREATE' && 'CREAR'}
              </LoadingButton>
            </Stack>
          </form>
        </>
      )}
      <DialogHistorialCambiosEstadoUser
        is_modal_active={historial_cambios_estado_is_active}
        set_is_modal_active={set_historial_cambios_estado_is_active}
        id_usuario={user_info.id_usuario}
      />
    </>
  );
};
