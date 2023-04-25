import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// Componentes de Material UI
import {
  Grid,
  Box,
  Button,
  type SelectChangeEvent,
  Alert,
  Typography,
  LinearProgress,
  TextField,
  Skeleton,
} from '@mui/material';
// Icons de Material UI
import SearchIcon from '@mui/icons-material/Search';
import { use_admin_users } from '../hooks/AdminUserHooks';
import type {
  DataAadminUser,
  keys_object,
  InfoPersonal,
  InfoUsuario,
} from '../interfaces';
import DialogBusquedaAvanzada from './DialogBusquedaAvanzada';
import { CustomSelect } from '../../../components';
import { AdminUserPersonaJuridica } from './AdminUserPersonaJuridica';
import { AdminUserPersonaNatural } from './AdminUserPersonaNatural';

const initial_state_data_user: InfoUsuario = {
  id_usuario: 0,
  nombre_de_usuario: '',
  persona: 0,
  tipo_persona: '',
  numero_documento: '',
  primer_nombre: '',
  primer_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  is_superuser: false,
};

const initial_state_data_person: InfoPersonal = {
  id_persona: 0,
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  tiene_usuario: false,
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdminUsuarios(): JSX.Element {
  const [busqueda_avanzada_is_active, set_busqueda_avanzada_is_active] =
    useState<boolean>(false);
  const [data_person, set_data_person] = useState<InfoPersonal>(
    initial_state_data_person
  );
  const [data_user, set_data_user] = useState<InfoUsuario>(
    initial_state_data_user
  );
  const [buscar_por, set_buscar_por] = useState<string>('U');

  const {
    register,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataAadminUser>();
  const {
    data_register,
    is_search,
    loading,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    has_user,
    set_data_register,
    set_numero_documento,
    set_tipo_documento,
    set_tipo_persona,
  } = use_admin_users();
  const numero_documento = watch('numero_documento');

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      set_numero_documento(numero_documento);
    }
  }, [numero_documento]);

  useEffect(() => {
    if (watch('tipo_persona') !== undefined) {
      set_tipo_persona(watch('tipo_persona'));
    }
  }, [watch('tipo_persona')]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  useEffect(() => {
    console.log('Hola');
    if (tipo_persona === 'J') {
      set_value('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
    }
  }, [tipo_persona]);

  useEffect(() => {
    console.log('Funciona', data_person);
    if ('tipo_persona' in data_person) {
      set_tipo_persona(data_person.tipo_persona);
    }
  }, [data_person]);

  useEffect(() => {
    console.log('Funciona', data_user);
    if ('tipo_persona' in data_user) {
      set_tipo_persona(data_user.tipo_persona);
    }
  }, [data_user]);

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

  const handle_data_emit_search = (new_data: any, buscar_por: string): void => {
    set_buscar_por(buscar_por);
    if (buscar_por === 'U') {
      set_data_user(new_data);
    } else if (buscar_por === 'P') {
      set_data_person(new_data);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Box
          sx={{ width: '100%', typography: 'body1', mt: '20px', mb: '20px' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={() => {
                  set_busqueda_avanzada_is_active(true);
                }}
              >
                BUSQUEDA AVANZADA
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Tipo de persona *"
            name="tipo_persona"
            value={tipo_persona}
            options={tipo_persona_opt}
            loading={loading}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Tipo de documento *"
            name="tipo_documento"
            value={tipo_documento}
            options={tipo_documento_opt}
            loading={loading}
            disabled={(tipo_persona === '' || tipo_persona === 'J') ?? true}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={45} />
          ) : (
            <TextField
              fullWidth
              label="Número de documento *"
              type="number"
              size="small"
              disabled={tipo_persona === '' ?? true}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={errors.numero_documento?.type === 'required'}
              helperText={
                errors.numero_documento?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('numero_documento', {
                required: true,
              })}
              onChange={handle_change}
            />
          )}
        </Grid>
        {/* Muestra loading cuando esta buscando datos de la persona */}
        {is_search && (
          <Grid item xs={12}>
            <Grid container justifyContent="center" textAlign="center">
              <Alert icon={false} severity="info">
                <LinearProgress />
                <Typography>Buscando persona...</Typography>
              </Alert>
            </Grid>
          </Grid>
        )}
        {has_user && (
          <Grid item xs={12}>
            <Grid container justifyContent="center" textAlign="center">
              <Alert icon={false} severity="error">
                <Typography>
                  Lo sentimos, este documento ya tiene un usuario, puede iniciar
                  sesión con su usuario y contraseña, si ha olvidado sus datos
                  de acceso, dirigase al inicio de sesión y haga click en
                  ¿Olvidó su contraseña?
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        )}
      </Grid>
      {tipo_persona === 'N' && (
        <AdminUserPersonaNatural
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          has_user={has_user}
          data={buscar_por === 'U' ? data_user : data_person}
          buscar_por={buscar_por}
        />
      )}
      {tipo_persona === 'J' && (
        <AdminUserPersonaJuridica
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          has_user={has_user}
          data={buscar_por === 'U' ? data_user : data_person}
        />
      )}
      <DialogBusquedaAvanzada
        is_modal_active={busqueda_avanzada_is_active}
        set_is_modal_active={set_busqueda_avanzada_is_active}
        onData={handle_data_emit_search}
      />
    </>
  );
}
