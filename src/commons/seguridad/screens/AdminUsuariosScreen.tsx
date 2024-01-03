/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Card,
  Button,
  type SelectChangeEvent,
  TextField,
  Skeleton,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { use_admin_users } from '../hooks/AdminUserHooks';
import type {
  DataAadminUser,
  keys_object,
  SeguridadSlice
} from '../interfaces';
import DialogBusquedaAvanzadaUsuario from '../components/DialogBusquedaAvanzadaUsuario';
import DialogBusquedaAvanzadaPersona from '../components/DialogBusquedaAvanzadaPersona';
import { Title, CustomSelect } from '../../../components';
// import { AdminUserPersonaJuridica } from '../components/AdminUserPersonaJuridica';
import { AdminUsers } from '../components/AdminUsers';
import { useDispatch, useSelector } from 'react-redux';
import { get_data_user } from '../store/thunks';
import DialogUserXPerson from '../components/DialogUserXPerson';
import {
  initial_state_user_info,
  set_action_admin_users,
  set_data_person_search,
  set_user_info
} from '../store/seguridadSlice';
import { get_person_user_or_users_by_document } from '../request/seguridadRequest';
import { control_error } from '../../../helpers';

const initial_state_data_register: DataAadminUser = {
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
  imagen_usuario: new File([], ''),
  tipo_usuario: '',
  roles: [
    {
      value: 0,
      label: ''
    }
  ],
  activo: false,
  activo_fecha_ultimo_cambio: '',
  activo_justificacion_cambio: '',
  bloqueado: false,
  bloqueado_fecha_ultimo_cambio: '',
  bloqueado_justificacion_cambio: '',
  fecha_creacion: '',
  fecha_activación_inicial: '',
  creado_desde_portal: false,
  persona_que_creo: '',
  sucursal_defecto: {
    value: 0,
    label: ''
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdminUsuariosScreen: React.FC = () => {


  const dispatch = useDispatch();
  const { data_user_search, data_person_search } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );

  const [
    busqueda_avanzada_person_is_active,
    set_busqueda_avanzada_person_is_active
  ] = useState<boolean>(false);
  const [
    busqueda_avanzada_user_is_active,
    set_busqueda_avanzada_user_is_active
  ] = useState<boolean>(false);
  const {
    handleSubmit: handle_submit_ini,
    register: register_search_ini,
    setValue: set_value_ini,
    formState: { errors },
    watch
    // reset: reset_form
  } = useForm<DataAadminUser>({
    defaultValues: {
      tipo_persona: '',
      tipo_documento: '',
      numero_documento: ''
    }
  });

  // const dataForm = watch();

  const {
    users_x_person_is_active,
    data_register,
    loading,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    numero_documento,
    set_users_x_person_is_active,
    set_data_register,
    set_tipo_documento,
    set_tipo_persona,
    set_data_disponible,
    set_loading_inputs,
    set_numero_documento,
    reset_admin_user,
    clean_user_info,
    set_selected_image,
  } = use_admin_users();
  // const numero_documento = watch('numero_documento');
  useEffect(() => {
    clean_user_info();
    set_value_form('tipo_persona', '');
    set_value_form('tipo_documento', '');
    set_value_form('numero_documento', '');
    set_value_form('razon_social', '');
    set_value_form('nombre_comercial', '');
    set_value_form('primer_apellido', '');
    set_value_form('primer_nombre', '');
    set_value_form('segundo_apellido', '');
    set_value_form('segundo_nombre', '');
    set_value_form('nombre_de_usuario', '');
    set_value_form('imagen_usuario', '');
    set_value_form('tipo_usuario', '');
    set_value_form('activo', '');
    set_value_form('activo_fecha_ultimo_cambio', '');
    set_value_form('activo_justificacion_cambio', '');
    set_value_form('bloqueado', '');
    set_value_form('bloqueado_fecha_ultimo_cambio', '');
    set_value_form('bloqueado_justificacion_cambio', '');
    set_value_form('fecha_creacion', '');
    set_value_form('fecha_activación_inicial', '');
    set_value_form('creado_desde_portal', '');
    set_value_form('persona_que_creo', '');
  }, []);

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      set_numero_documento(numero_documento);
      set_value_ini('numero_documento', numero_documento);
      //  console.log('')('numero_documento', numero_documento);
    }
  }, [numero_documento]);

  useEffect(() => {
    set_tipo_persona(data_user_search.tipo_persona);
  }, [data_user_search]);

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
    if (tipo_persona === 'J') {
      set_value_ini('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
    }
  }, [tipo_persona]);

  // Busca data de usuario despues de seleccionarlo en el modal cuando persona tiene mas de un usuario
  const search_data_user_selected = (id_user: number): void => {
    dispatch(set_user_info(initial_state_user_info));
    dispatch(get_data_user(id_user));
    set_users_x_person_is_active(false);
  };

  // Limpia datos del formulario y permite mostrar la informacion de persona Natural o Juridica
  const handle_user_person_create_active = (): void => {
    set_data_register(initial_state_data_register);
    dispatch(set_user_info(initial_state_user_info));
    reset_admin_user();
    set_data_disponible(false);
    set_loading_inputs(true);
  };

  // Limpia datos del formulario y permite mostrar la informacion de persona Natural o Juridica
  const handle_user_edit_active = (): void => {
    dispatch(set_user_info(initial_state_user_info));
    set_data_register(initial_state_data_register);
    reset_admin_user();
    set_data_disponible(false);
    set_loading_inputs(true);
  };

  // Establece los valores del formulario INICIAL
  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value
    });
    set_value_ini(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //  console.log('')(e.target.value);
    set_value_form(e.target.name, e.target.value);
  };

  // Realiza buqueda por persona para editar o crear dependiendo si tiene usuario o no
  const on_submit_search_ini_persona = async (
    data_search_ini: any
  ): Promise<void> => {
    const { data: data_person_search } =
      await get_person_user_or_users_by_document(
        data_search_ini.tipo_documento,
        data_search_ini.numero_documento
      );
    if ('data' in data_person_search) {
      dispatch(set_data_person_search(data_person_search.data));
      if (data_person_search.data?.tiene_usuario ?? false) {
        dispatch(set_action_admin_users('EDIT'));
        if (data_person_search.data?.usuarios.length === 1) {
          dispatch(
            get_data_user(data_person_search.data?.usuarios[0]?.id_usuario)
          );
        } else if (data_person_search.data?.usuarios.length === 2) {
          // Disparar modal con los 2 usuarios disponibles
          set_users_x_person_is_active(true);
        }
      } else {
        dispatch(set_action_admin_users('CREATE'));
      }
    } else {
      control_error('No se encotraron resultados para esta persona');
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card variant="outlined" sx={{ borderRadius: 5, padding: '20px' }}>
          <Title title="Administrar usuarios" />
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
          
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit_ini(on_submit_search_ini_persona)}
          >
            <Grid container spacing={2} sx={{ mb: '20px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <CustomSelect
                  onChange={on_change}
                  label="Tipo de persona *"
                  name="tipo_persona"
                  value={tipo_persona}
                  options={tipo_persona_opt}
                  disabled={false}
                  required={true}
                  errors={errors}
                  register={register_search_ini}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomSelect
                  onChange={on_change}
                  label="Tipo de documento *"
                  name="tipo_documento"
                  value={tipo_documento}
                  options={tipo_documento_opt}
                  disabled={
                    (tipo_persona === '' || tipo_persona === 'J') ?? true
                  }
                  required={true}
                  errors={errors}
                  register={register_search_ini}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={45} />
                ) : (
                  <TextField
                    focused
                    fullWidth
                    label="Número de documento *"
                    type="number"
                    size="small"
                    // value={numero_documento}
                    disabled={tipo_persona === '' ?? true}
                    // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    error={errors.numero_documento?.type === 'required'}
                    helperText={
                      errors.numero_documento?.type === 'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                    {...register_search_ini('numero_documento', {
                      required: true
                    })}
                    onChange={handle_change}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  startIcon={<SearchIcon />}
                >
                  BUSCAR PERSONA
                </Button>
              </Grid>
            </Grid>
          </Box>
          <AdminUsers />
          <DialogBusquedaAvanzadaPersona
            is_modal_active={busqueda_avanzada_person_is_active}
            set_is_modal_active={set_busqueda_avanzada_person_is_active}
            user_person_create_active={handle_user_person_create_active}
            user_edit_active={handle_user_edit_active}
          />
          <DialogBusquedaAvanzadaUsuario
            is_modal_active={busqueda_avanzada_user_is_active}
            set_is_modal_active={set_busqueda_avanzada_user_is_active}
          />
          <DialogUserXPerson
            key={data_person_search.id_persona}
            is_modal_active={users_x_person_is_active}
            set_is_modal_active={set_users_x_person_is_active}
            users_x_person={data_person_search.usuarios}
            OnIdUser={search_data_user_selected}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
