import {
  useEffect,
  // useState
} from 'react';
import {
  Box,
  Grid,
  TextField,
  Stack,
  Button,
  type SelectChangeEvent,
} from '@mui/material';
import { use_admin_users } from '../hooks/AdminUserHooks';
import { useForm } from 'react-hook-form';
// import { crear_persona_natural_and_user } from '../../auth/request/authRequest';
import SaveIcon from '@mui/icons-material/Save';
import { CustomSelect } from '../../../components/CustomSelect';
import { control_error } from '../../../helpers/controlError';
// import { control_success } from '../../recursoHidrico/requets/Request';
import type {
  keys_object,
  DataAadminUser,
  UserCreate,
  SeguridadSlice,
} from '../interfaces/seguridadModels';
import type { AxiosError } from 'axios';
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
export const AdminUserPersonaNatural: React.FC<Props> = ({
  numero_documento,
  tipo_documento,
  tipo_persona,
  has_user,
}: Props) => {
  const { action_admin_users } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataAadminUser>();
  const {
    data_register,
    is_exists,
    loading,
    tipo_usuario,
    tipo_usuario_opt,
    set_data_register,
    set_tipo_documento,
  } = use_admin_users();
  // const [image, set_image] = useState(null);

  // watchers

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    value = name === 'nombre_de_usuario' ? value.replace(/\s/g, '') : value;
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

  const on_submit = handle_submit(async () => {
    try {
      console.log(data_register);
      // const { data } = await crear_persona_natural_and_user({
      //   ...data_register,
      //   tipo_documento,
      //   tipo_persona,
      //   numero_documento,
      // });
      // control_success(data.detail);

      window.location.href = '#/app/auth/login';
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as UserCreate;
      control_error(resp.detail);
    }
  });

  // const handle_image_upload = (event: any): void => {
  //   const file = event.target.files[0];
  //   if (Boolean(file) && Boolean(file.type.startsWith('image/'))) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       set_image(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosPersonales = (
    <>
      <Box sx={{ ml: '16px', width: '100%' }}>
        <Title title="Datos personales N" />
      </Box>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          disabled={is_exists}
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
          {...register('primer_nombre', { required: true })}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          disabled={is_exists}
          fullWidth
          size="small"
          label="Segundo nombre"
          value={data_register.segundo_nombre}
          {...register('segundo_nombre')}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          disabled={is_exists}
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
          {...register('primer_apellido', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          disabled={is_exists}
          fullWidth
          size="small"
          value={data_register.segundo_apellido}
          label="Segundo apellido"
          {...register('segundo_apellido')}
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
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          size="small"
          label="Nombre de usuario"
          disabled
          fullWidth
          error={errors.nombre_de_usuario?.type === 'required'}
          helperText={
            errors.nombre_de_usuario?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('nombre_de_usuario', {
            required: true,
          })}
          // value={nombre_de_usuario}
        />
      </Grid>
      {/* 
      <Grid item xs={12} sm={6} md={4}>
        <div>
          <input
            accept="image/jpeg, image/png, image/jpg"
            id="profilePicture"
            name="profilePicture"
            type="file"
            ref={register}
            style={{ display: 'none' }}
          />

          <label htmlFor="profilePicture">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
            >
              Upload Profile Picture
            </Button>
          </label>

          {errors.profilePicture && (
            <div role="alert">{errors.profilePicture?.message}</div>
          )}
        </div> 
      </Grid>
      */}
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const TypesUserAndRoles = (
    <>
      <Box sx={{ ml: '16px', width: '100%' }}>
        <Title title="Tipo de usuario y roles" />
      </Box>
      <Grid item xs={12} sm={6} md={4}>
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
      {/* <Grid item xs={12} sm={6} md={4}>
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
          {/*
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={on_change}
              label="Activo"
              name="activo"
              value={dpto_notifiacion}
              options={dpto_notifiacion_opt}
              loading={loading}
              disabled={pais_notificacion === '' ?? true}
              required={true}
              errors={errors}
              register={register}
            /> 
          </Grid>
          */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled={is_exists}
              fullWidth
              size="small"
              label="Fecha ultimo cambio"
              value={data_register.activo_fecha_ultimo_cambio}
              {...register('activo_fecha_ultimo_cambio')}
              onChange={handle_change}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled={is_exists}
              fullWidth
              size="small"
              label="Justificación del cambio"
              multiline
              value={data_register.activo_justificacion_cambio}
              {...register('activo_justificacion_cambio')}
              onChange={handle_change}
            />
          </Grid>
          {/*
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={on_change}
              label="Bloqueado"
              name="bloqueado"
              value={dpto_notifiacion}
              options={dpto_notifiacion_opt}
              loading={loading}
              disabled={pais_notificacion === '' ?? true}
              required={true}
              errors={errors}
              register={register}
            /> 
          </Grid>
          */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled={is_exists}
              fullWidth
              size="small"
              label="Fecha ultimo cambio"
              value={data_register.bloqueado_fecha_ultimo_cambio}
              {...register('bloqueado_fecha_ultimo_cambio')}
              onChange={handle_change}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled={is_exists}
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
              {...register('fecha_creacion', {
                required: true,
              })}
              onChange={handle_change}
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
              {...register('fecha_activación_inicial', {
                required: true,
              })}
              onChange={handle_change}
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
              {...register('creado_desde_portal', {
                required: true,
              })}
              onChange={handle_change}
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
              {...register('persona_que_creo', {
                required: true,
              })}
              onChange={handle_change}
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
          <>
            <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
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
          </>
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
