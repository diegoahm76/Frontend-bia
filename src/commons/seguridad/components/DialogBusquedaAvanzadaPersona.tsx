import { useDispatch, useSelector } from 'react-redux';
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Box,
  Divider,
  Avatar,
  type SelectChangeEvent,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type {
  SeguridadSlice,
  FormValuesSearchPerson,
  keys_object_search_person,
} from '../interfaces';
import { get_persons, get_data_user } from '../store/thunks';
import {
  set_action_admin_users,
  set_data_person_search,
} from '../store/seguridadSlice';
import { CustomSelect } from '../../../components/CustomSelect';
import { use_busqueda_avanzada } from '../hooks/BusquedaAvanzadaHooks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogBusquedaAvanzada = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useDispatch();
  const { persons } = useSelector((state: SeguridadSlice) => state.seguridad);
  const [buscando_persons, set_buscando_persons] = useState<boolean>(false);
  const {
    data_search_person,
    loading,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    set_data_search_person,
    set_numero_documento,
    set_tipo_documento,
    set_tipo_persona,
  } = use_busqueda_avanzada();
  const {
    register: register_search_person,
    handleSubmit: handle_submit_search_person,
    setValue: set_value_search_person,
    formState: { errors: errors_search_person },
    watch: watch_search_person,
  } = useForm<FormValuesSearchPerson>();
  const numero_documento = watch_search_person('numero_documento');

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      set_numero_documento(numero_documento);
    }
  }, [numero_documento]);

  useEffect(() => {
    if (watch_search_person('tipo_persona') !== undefined) {
      set_tipo_persona(watch_search_person('tipo_persona'));
    }
  }, [watch_search_person('tipo_persona')]);

  useEffect(() => {
    if (watch_search_person('tipo_documento') !== undefined) {
      set_tipo_documento(watch_search_person('tipo_documento'));
    }
  }, [watch_search_person('tipo_documento')]);

  useEffect(() => {
    if (tipo_persona === 'J') {
      set_value_search_person('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
    }
  }, [tipo_persona]);

  const columns_persons: GridColDef[] = [
    {
      headerName: 'ID persona',
      field: 'id_persona',
    },
    {
      headerName: 'Tipo persona',
      field: 'tipo_persona',
    },
    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
      width: 250,
    },
    {
      headerName: 'Razon social',
      field: 'razon_social',
      width: 200,
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
      width: 250,
    },
    {
      headerName: 'Usuario',
      field: 'tiene_usuario',
    },

    {
      headerName: 'Tipo documento',
      field: 'tipo_documento',
    },
    {
      headerName: 'Numero documento',
      field: 'numero_documento',
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          {params.row.tiene_usuario === true ? (
            <IconButton
              onClick={() => {
                trigger_user_edit_active(params.row);
                set_is_modal_active(false);
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                trigger_user_person_create_active(params.row);
                set_is_modal_active(false);
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <AddIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      ),
    },
  ];

  const trigger_user_person_create_active = (data: any): void => {
    dispatch(set_data_person_search(data));
    dispatch(set_action_admin_users('CREATE'));
  };

  const trigger_user_edit_active = (data: any): void => {
    dispatch(set_data_person_search(data));
    console.log(data.usuarios);
    if (data.usuarios.length === 1) {
      console.log(data.usuarios[0].id_usuario);
      dispatch(get_data_user(data.usuarios[0].id_usuario));
    } else if (data.usuarios.length === 2) {
      console.log('Disparar modal con los 2 usuarios disponibles');
    }
    dispatch(set_action_admin_users('EDIT'));
  };

  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  const on_submit_search_person = (data: FormValuesSearchPerson): void => {
    dispatch(
      get_persons(
        data.tipo_documento,
        data.numero_documento,
        data.primer_nombre,
        data.primer_apellido
      )
    );
    set_buscando_persons(true);
  };

  // Establece los valores del formulario
  const set_value_form_search_person = (name: string, value: string): void => {
    set_data_search_person({
      ...data_search_person,
      [name]: value,
    });
    set_value_search_person(name as keys_object_search_person, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    // console.log(e);
    set_value_form_search_person(e.target.name, e.target.value);
  };

  return (
    <Dialog
      maxWidth="sm"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
    >
      <DialogTitle>
        Busqueda avanzada por Persona
        <IconButton
          aria-label="close"
          onClick={() => {
            set_is_modal_active(false);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handle_submit_search_person(on_submit_search_person)}
          autoComplete="off"
        >
          <Grid container sx={{ mb: '0px' }} spacing={2}>
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
                errors={errors_search_person}
                register={register_search_person}
              />
              <Typography className="label_selects">Tipo de persona</Typography>
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
                errors={errors_search_person}
                register={register_search_person}
              />
              <Typography className="label_selects">
                Tipo de documento
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Número de documento"
                helperText="Número de documento"
                size="small"
                fullWidth
                {...register_search_person('numero_documento')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register_search_person('primer_nombre')}
                label="Primer nombre"
                helperText="Primer nombre"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                {...register_search_person('primer_apellido')}
                label="Primer apellido"
                size="small"
                helperText="Primer apellido"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<SearchIcon />}
                fullWidth
              >
                BUSCAR
              </Button>
            </Grid>
          </Grid>
        </Box>
        {buscando_persons && (
          <Grid item xs={12}>
            <DataGrid
              density="compact"
              autoHeight
              rows={persons}
              columns={columns_persons}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id_persona}
            />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzada;
