/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Grid,
  TextField,
  Stack,
  Button,
  Input,
  Autocomplete,
  Skeleton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HistoryIcon from '@mui/icons-material/History';
import { CustomSelect } from '../../../components/CustomSelect';
import { Title } from '../../../components/Title';
import { DialogHistorialCambiosEstadoUser } from './DialogHistorialCambiosEstadoUser';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import { getSucursalesToUser } from '../request/seguridadRequest';
import Select from 'react-select';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUsers: React.FC = () => {
  const {
    errors_admin_users,
    action_admin_users,
    user_info,
    loading_create_or_update,
    loading_inputs,
    selected_image,
    check_user_is_active,
    check_user_is_blocked,
    data_disponible,
    historial_cambios_estado_is_active,
    data_register,
    tipo_persona,
    tipo_usuario_opt,
    tipo_usuario,
    activo,
    activo_opt,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    on_submit,
    on_change,
    handle_change_autocomplete,
    handle_change,
    handle_image_select,
    register_admin_user,
    set_historial_cambios_estado_is_active,
    clean_user_info,
    watch_admin_user,
    listaSucursales,
    setListaSucursales,
    set_value_admin_user,
  } = use_admin_users();

  const watch_exe = watch_admin_user();

  useEffect(() => {
    clean_user_info();
  }, []);

  useEffect(() => {
    // Call the getSucursalesToUser function to fetch the list of sucursales
    void getSucursalesToUser().then((resSucursales: any[]) => {
      // Map over the sucursales array to create a new array of objects with 'value' and 'label' properties
      const sucursualesToUse = resSucursales?.map((sucursal) => {
        return {
          ...sucursal,
          value: sucursal.id_sucursal_empresa,
          label: sucursal.descripcion_sucursal,
        };
      });

      // Update the component state with the new list of sucursales
      setListaSucursales(sucursualesToUse);
    });
  }, [watch_exe.tipo_usuario]);

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
                    <Title title={`Datos personales`} />
                  </Box>
                  {tipo_persona === 'N' ? (
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
                    tipo_persona === 'J' && (
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
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      style={{ height: '40px' }}
                    >
                      <Input
                        type="file"
                        style={{
                          opacity: 0,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                        }}
                        {...register_admin_user('imagen_usuario')}
                        error={Boolean(errors_admin_users.imagen_usuario)}
                        inputProps={{ accept: 'image/*' }}
                        onChange={handle_image_select}
                      />
                      subir imagen de usuario
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={3} md={3}>
                    <img
                      src={user_info?.profile_img}
                      // alt={`Imagen de ${selected_image}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
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
                      required={action_admin_users === 'CREATE' && true}
                      label={
                        action_admin_users === 'CREATE'
                          ? 'Tipo de usuario *'
                          : 'Tipo de usuario'
                      }
                      name="tipo_usuario"
                      value={tipo_usuario}
                      options={tipo_usuario_opt}
                      disabled={
                        tipo_persona === 'J'
                          ? true
                          : tipo_persona === 'N' &&
                            tipo_usuario === 'I' &&
                            action_admin_users === 'EDIT' &&
                            true
                      }
                      errors={errors_admin_users}
                      register={register_admin_user}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={9}
                    sx={{
                      zIndex: 109,
                    }}
                  >
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
                        onChange={handle_change_autocomplete as any}
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
                      value={String(activo)}
                      options={activo_opt}
                      disabled={tipo_usuario === 'E' && true}
                      // required={true}
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
                      required={!check_user_is_active && check_user_is_active}
                      error={
                        !check_user_is_active &&
                        Boolean(errors_admin_users.activo_justificacion_cambio)
                      }
                      helperText={
                        !check_user_is_active &&
                        errors_admin_users.activo_justificacion_cambio?.message
                      }
                      {...register_admin_user(
                        'activo_justificacion_cambio'
                        // { required: 'Este campo es obligatorio',}
                      )}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CustomSelect
                      onChange={on_change}
                      label="Bloqueado"
                      name="bloqueado"
                      value={String(bloqueado)}
                      options={bloqueado_opt}
                      disabled={false}
                      // required={true}
                      errors={errors_admin_users}
                      register={register_admin_user}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      disabled
                      fullWidth
                      size="small"
                      required={check_user_is_blocked}
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
                      required={!check_user_is_blocked && check_user_is_blocked}
                      error={
                        !check_user_is_blocked &&
                        Boolean(
                          errors_admin_users.bloqueado_justificacion_cambio
                        )
                      }
                      helperText={
                        !check_user_is_blocked &&
                        errors_admin_users.bloqueado_justificacion_cambio
                          ?.message
                      }
                      {...register_admin_user(
                        'bloqueado_justificacion_cambio'
                        // { required: 'Este campo es obligatorio' }
                      )}
                      onChange={handle_change}
                    />
                  </Grid>
                </Grid>

                {/* espacio de trabajo */}


                {watch_exe.tipo_usuario === 'I' && (
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      mt: '20px',
                      zIndex: 999,
                    }}
                  >
                    <Box
                      sx={{
                        ml: '16px',
                        width: '100%',
                      }}
                    >
                      <Title title="Asignación de sucursal" />
                    </Box>
                    <Grid item xs={12} sm={12} md={12}>
                      <div
                        style={{
                          padding: '10px',
                          justifyContent: 'center',
                          zIndex: 999,
                        }}
                      >
                        <Select
                          {...register_admin_user('sucursal_defecto')}
                          value={watch_exe.sucursal_defecto}
                          onChange={(selectedOption) => {
                            set_value_admin_user(
                              'sucursal_defecto',
                              selectedOption
                            );
                          }}
                          options={listaSucursales as any}
                          placeholder="Seleccionar"
                          styles={{
                            control: (base) => ({
                              ...base,
                              zIndex: 999,
                            }),
                          }}
                          menuPlacement="top" // Cambiado de "bottom" a "top"
                        />
                        <label>
                          <small
                            style={{
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: 'thin',
                              fontSize: '0.75rem',
                              marginTop: '0.25rem',
                              marginLeft: '0.25rem',
                            }}
                          >
                            Seleccione sucursal a asignar
                          </small>
                        </label>
                      </div>
                    </Grid>
                  </Grid>
                )}

                {/* fin espacio de trabajo */}

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
                startIcon={<EditIcon />}
              >
                {action_admin_users === 'EDIT'
                  ? 'GUARDAR'
                  : action_admin_users === 'CREATE' && 'CREAR'}
              </LoadingButton>
            </Stack>
          </form>
        </>
      )}
      <DialogHistorialCambiosEstadoUser
        is_modal_active={historial_cambios_estado_is_active}
        set_is_modal_active={set_historial_cambios_estado_is_active}
        id_usuario={user_info?.id_usuario ?? 0}
      />
    </>
  );
};
