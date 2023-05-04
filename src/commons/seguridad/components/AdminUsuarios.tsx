import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Button,
  type SelectChangeEvent,
  TextField,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { use_admin_users } from '../hooks/AdminUserHooks';
import type {
  DataAadminUser,
  keys_object,
  SeguridadSlice,
} from '../interfaces';
import DialogBusquedaAvanzadaUsuario from './DialogBusquedaAvanzadaUsuario';
import DialogBusquedaAvanzadaPersona from './DialogBusquedaAvanzadaPersona';
import { CustomSelect } from '../../../components';
import { AdminUserPersonaJuridica } from './AdminUserPersonaJuridica';
import { AdminUserPersonaNatural } from './AdminUserPersonaNatural';
import { useDispatch, useSelector } from 'react-redux';
import { get_data_user } from '../store/thunks';
import DialogUserXPerson from './DialogUserXPerson';
// import { set_action_admin_users } from '../store/seguridadSlice';

export function AdminUsuarios(): JSX.Element {
  const dispatch = useDispatch();
  const { data_user_search, data_person_search } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
  const [users_x_person_is_active, set_users_x_person_is_active] =
    useState<boolean>(false);
  const [
    busqueda_avanzada_person_is_active,
    set_busqueda_avanzada_person_is_active,
  ] = useState<boolean>(false);
  const [
    busqueda_avanzada_user_is_active,
    set_busqueda_avanzada_user_is_active,
  ] = useState<boolean>(false);

  const {
    register: register_search_ini,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataAadminUser>();
  const {
    data_register,
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
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    set_value_form('tipo_persona', tipo_persona);
  }, [tipo_persona]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  useEffect(() => {
    // dispatch(set_action_admin_users('CREATE'));
    if (tipo_persona === 'J') {
      set_value('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
    }
  }, [tipo_persona]);

  useEffect(() => {
    set_tipo_persona(data_person_search.tipo_persona);
    if (data_person_search.usuarios.length === 1) {
      dispatch(get_data_user(data_person_search.usuarios[0].id_usuario));
    } else if (data_person_search.usuarios.length === 2) {
      // Disparar modal con los 2 usuarios disponibles
      set_users_x_person_is_active(true);
    }
    // set_tipo_documento(data_person_search.tipo_documento);
    // set_numero_documento(data_person_search.numero_documento);
  }, [data_person_search]);

  useEffect(() => {
    set_tipo_persona(data_user_search.tipo_persona);
    // set_tipo_documento(user_info.tipo_documento);
    // set_numero_documento(user_info.numero_documento);
  }, [data_user_search]);

  // Busca data de usuario despues de seleccionarlo en el modal cuando persona tiene mas de un usuario
  const search_data_user_selected = (id_user: number): void => {
    dispatch(get_data_user(id_user));
    set_users_x_person_is_active(false);
  };

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

  return (
    <>
      <Grid container spacing={2} sx={{ mt: '5px', mb: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => {
              set_busqueda_avanzada_person_is_active(true);
            }}
          >
            BUSQUEDA POR PERSONA
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => {
              set_busqueda_avanzada_user_is_active(true);
            }}
          >
            BUSQUEDA POR USUARIO
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: '20px' }}>
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
            register={register_search_ini}
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
            register={register_search_ini}
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
              {...register_search_ini('numero_documento', {
                required: true,
              })}
              onChange={handle_change}
            />
          )}
        </Grid>
      </Grid>
      {tipo_persona === 'N' && <AdminUserPersonaNatural has_user={has_user} />}
      {tipo_persona === 'J' && (
        <AdminUserPersonaJuridica
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
        />
      )}
      <DialogBusquedaAvanzadaPersona
        is_modal_active={busqueda_avanzada_person_is_active}
        set_is_modal_active={set_busqueda_avanzada_person_is_active}
      />
      <DialogBusquedaAvanzadaUsuario
        is_modal_active={busqueda_avanzada_user_is_active}
        set_is_modal_active={set_busqueda_avanzada_user_is_active}
      />
      <DialogUserXPerson
        is_modal_active={users_x_person_is_active}
        set_is_modal_active={set_users_x_person_is_active}
        users_x_person={data_person_search.usuarios}
        OnIdUser={search_data_user_selected}
      />
    </>
  );
}
