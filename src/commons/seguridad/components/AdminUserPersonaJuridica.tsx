import { useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Stack,
  Button,
  MenuItem,
  Input,
  InputLabel,
  type SelectChangeEvent,
} from '@mui/material';

import { use_admin_users } from '../hooks/AdminUserHooks';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../helpers/controlError';
// import { control_success } from '../../recursoHidrico/requets/Request';
import SaveIcon from '@mui/icons-material/Save';
// import dayjs, { type Dayjs } from 'dayjs';
import type {
  keys_object,
  DataAadminUser,
  UserCreate,
  SeguridadSlice,
} from '../interfaces';
import type { AxiosError } from 'axios';
// import { crear_persona_juridica_and_user } from '../../auth/request/authRequest';
import { CustomSelect } from '../../../components/CustomSelect';
import { Title } from '../../../components/Title';
import { useSelector } from 'react-redux';

interface PropsStep {
  label: string;
  component: JSX.Element;
}

interface Props {
  numero_documento: string;
  tipo_documento: string;
  tipo_persona: string;
  has_user: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUserPersonaJuridica: React.FC<Props> = ({
  numero_documento,
  tipo_documento,
  tipo_persona,
  has_user,
}: Props) => {
  const {
    action_admin_users,
    data_person_search,
    data_user_search,
    user_info,
  } = useSelector((state: SeguridadSlice) => state.seguridad);
  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    reset,
    watch,
  } = useForm<DataAadminUser>();
  const {
    data_register,
    is_exists,
    loading,
    tipo_usuario,
    tipo_usuario_opt,
    activo,
    activo_opt,
    set_data_register,
    set_tipo_persona,
    set_tipo_usuario,
    set_tipo_documento,
  } = use_admin_users();

  useEffect(() => {
    if (watch('tipo_persona') !== undefined) {
      set_tipo_persona(watch('tipo_persona'));
    }
  }, [watch('tipo_persona')]);

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    set_value_form('tipo_persona', tipo_persona);
  }, [tipo_persona]);

  useEffect(() => {
    if (watch('tipo_usuario') !== undefined) {
      set_tipo_usuario(watch('tipo_usuario'));
    }
  }, [watch('tipo_usuario')]);

  useEffect(() => {
    reset();
    console.log(action_admin_users);
    if (action_admin_users === 'CREATE') {
      console.log('Creación de usuario - persona juridica');
      console.log(data_person_search);
      set_data_register({
        ...data_register,
        razon_social: user_info.razon_social,
        nombre_comercial: user_info.nombre_comercial,
      });
    } else if (action_admin_users === 'EDIT') {
      console.log(data_user_search);
      console.log('Edicion de usuario - persona juridica');
      // Traer datos de usuario completos
      set_data_register({
        ...data_register,
        razon_social: user_info.razon_social,
        nombre_comercial: user_info.nombre_comercial,
        nombre_de_usuario: user_info.nombre_de_usuario,
        tipo_usuario: user_info.tipo_usuario,
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
    }
  }, [action_admin_users]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);
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
    set_value_form(e.target.name, e.target.value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handle_submit(async (data) => {
    try {
      console.log('Onsubmit', data);
      console.log(data_register);
      // Hacemos el registro de la persona JURIDICA
      // await crear_persona_juridica_and_user({
      //   ...data,
      //   numero_documento,
      //   representante_legal: data_register.representante_legal,
      // });

      // control_success('Registro exitoso');
      window.location.href = '#/app/auth/login';
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as UserCreate;
      control_error(resp.detail);
    }
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosPersonales = (
    <>
      <Box sx={{ ml: '16px', width: '100%' }}>
        <Title title="Datos personales J" />
      </Box>{' '}
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          disabled={is_exists}
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
          {...register('razon_social', { required: true })}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          disabled={is_exists}
          fullWidth
          size="small"
          label="Nombre comercial"
          value={data_register.nombre_comercial}
          {...register('nombre_comercial')}
          onChange={handle_change}
        />
      </Grid>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosAcceso = (
    <>
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
          {...register('nombre_de_usuario')}
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
          {...register('imagen_usuario')}
          error={Boolean(errors.imagen_usuario)}
        />
      </Grid>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const TypesUserAndRoles = (
    <>
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
          register={register}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3}>
        <CustomSelect
          onChange={on_change}
          label="Roles"
          name="roles"
          value={roles}
          options={roles_opt}
          loading={loading}
          // disabled={pais_notificacion === '' ?? true}
          required={true}
          errors={errors}
          register={register}
        />
      </Grid> */}
      {/* <Grid item xs={12}>
        <Typography variant="caption" fontWeight="bold">
          NOTA: Se recomienda el registro de un número celular, este se usará
          como medio de recuperación de la cuenta, en caso de que olvide sus
          datos de acceso.
        </Typography>
      </Grid> */}
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Estatus = (
    <>
      {action_admin_users === 'EDIT' && (
        <>
          <Box sx={{ ml: '16px', width: '100%' }}>
            <Title title="Estado" />
          </Box>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Activo"
              select
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              defaultValue={activo}
            >
              {activo_opt.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              disabled
              fullWidth
              size="small"
              label="Fecha ultimo cambio"
              value={data_register.activo_fecha_ultimo_cambio}
              {...register('activo_fecha_ultimo_cambio')}
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
              {...register('activo_justificacion_cambio')}
              onChange={handle_change}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Bloqueado"
              select
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              defaultValue={activo}
            >
              {activo_opt.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              disabled
              fullWidth
              size="small"
              label="Fecha ultimo cambio"
              value={data_register.bloqueado_fecha_ultimo_cambio}
              {...register('bloqueado_fecha_ultimo_cambio')}
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
              {...register('bloqueado_justificacion_cambio')}
              onChange={handle_change}
            />
          </Grid>
        </>
      )}
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const OtherDates = (
    <>
      {action_admin_users === 'EDIT' && (
        <>
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
              {...register('fecha_creacion')}
              onChange={handle_change}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Fecha de activación inicial"
              error={errors.fecha_activación_inicial?.type === 'required'}
              helperText={
                errors.fecha_activación_inicial?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('fecha_activación_inicial')}
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
              {...register('creado_desde_portal')}
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
              {...register('persona_que_creo')}
              onChange={handle_change}
              disabled
            />
          </Grid>
        </>
      )}
    </>
  );

  const steps: PropsStep[] = [
    {
      label: 'Datos básicos',
      component: DatosPersonales,
    },
    {
      label: 'Datos de acceso',
      component: DatosAcceso,
    },
    {
      label: 'Tipo de usuario y roles',
      component: TypesUserAndRoles,
    },
    {
      label: 'Estado',
      component: Estatus,
    },
    {
      label: 'Otros datos',
      component: OtherDates,
    },
  ];

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit(e);
        }}
      >
        {steps.map((step, index) => (
          <Grid
            key={index}
            container
            spacing={2}
            sx={{ mt: '5px', mb: '20px' }}
          >
            {step.component}
            {/* Alertas */}
            {/* {is_exists && data_register.email === '' && (
                <>
                  <Grid item sx={{ pt: '10px !important' }}>
                    <Alert severity="error">
                      Lo sentimos, debe acercarse a <b>Cormacarena</b> para
                      actualizar sus datos debido a que no tiene un correo
                      electrónico asociado
                    </Alert>
                  </Grid>
                </>
              )} */}
          </Grid>
        ))}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
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
    </>
  );
};
