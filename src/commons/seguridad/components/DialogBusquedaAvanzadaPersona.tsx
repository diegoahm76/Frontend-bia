import { useDispatch, useSelector } from 'react-redux';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  Grid,
  TextField,
  Dialog,
  // DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Box,
  Divider,
  Avatar,
  type SelectChangeEvent,
  Typography,
  Chip,
  Tooltip,
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
import { get_data_user, get_persons } from '../store/thunks';
import { set_data_person_search } from '../store/seguridadSlice';
import { CustomSelect } from '../../../components/CustomSelect';
import { use_busqueda_avanzada } from '../hooks/BusquedaAvanzadaHooks';
import { Title } from '../../../components';
import { download_xls } from '../../../documentos-descargar/XLS_descargar';
import { use_admin_users } from '../hooks/AdminUserHooks';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  user_person_create_active: () => void;
  user_edit_active: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogBusquedaAvanzada = ({
  is_modal_active,
  set_is_modal_active,
  user_person_create_active,
  user_edit_active,
}: IProps) => {
  const dispatch = useDispatch();
  const { persons } = useSelector((state: SeguridadSlice) => state.seguridad);
  const {
    data_search_person,
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

  const { set_selected_image } = use_admin_users();

  const columns_persons: GridColDef[] = [
    // {
    //   headerName: 'ID persona',
    //   field: 'id_persona',
    // },
    {
      headerName: 'Tipo persona',
      field: 'tipo_persona',
      flex: 1,
      renderCell: (params) => {
        return params.row.tipo_persona === 'N'
          ? 'NATURAL'
          : params.row.tipo_persona === 'J'
          ? 'JURÍDICO'
          : '';
      },
    },

    {
      headerName: 'Nombre completo',
      field: 'nombre_completo',
      width: 250,
      flex: 1,
    },
    {
      headerName: 'Razón social',
      field: 'razon_social',
      width: 150,
      flex: 1,
    },
    {
      headerName: 'Nombre comercial',
      field: 'nombre_comercial',
      width: 150,
      flex: 1,
    },
    {
      headerName: 'Tiene usuario',
      field: 'tiene_usuario',
      flex: 1,
      renderCell: (params) => {
        return params.row.tiene_usuario === true ? (
          <Chip size="small" label="Si" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Tipo documento',
      field: 'tipo_documento',
      flex: 1,
    },
    {
      headerName: 'Numero documento',
      field: 'numero_documento',
      flex: 1,
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      flex: 1,
      renderCell: (params: any) => (
        <>
          {params.row.tiene_usuario === true ? (
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  trigger_user_edit_active(params.row);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Crear">
              <IconButton
                onClick={() => {
                  trigger_user_person_create_active(params.row);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

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

  const trigger_user_person_create_active = (data: any): void => {
    user_person_create_active();
    set_is_modal_active(false);
    dispatch(set_data_person_search(data));
  };

  const trigger_user_edit_active = (data: any): void => {
    user_edit_active();
    set_is_modal_active(false);
    dispatch(set_data_person_search(data));
    dispatch(get_data_user(data?.usuarios[0]?.id_usuario));
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
    set_value_form_search_person(e.target.name, e.target.value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
    >
      <DialogTitle>
        <Grid
          container
          spacing={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
            marginTop: '0px',
            marginLeft: '-5px',
            width: '99%',
          }}
        >
          <Title title="Búsqueda avanzada por persona " />
        </Grid>

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
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          width: '97%',
          marginLeft: '20px',
          marginTop: '20px',
        }}
      >
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handle_submit_search_person(on_submit_search_person)}
          autoComplete="off"
        >
          <Grid container sx={{ mb: '0px' }} spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <CustomSelect
                onChange={on_change}
                label="Tipo de persona *"
                name="tipo_persona"
                value={tipo_persona}
                options={tipo_persona_opt}
                disabled={false}
                required={true}
                errors={errors_search_person}
                register={register_search_person}
              />
              <Typography className="label_selects">Tipo de persona</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <CustomSelect
                onChange={on_change}
                label="Tipo de documento *"
                name="tipo_documento"
                value={tipo_documento}
                options={tipo_documento_opt}
                disabled={(tipo_persona === '' || tipo_persona === 'J') ?? true}
                required={true}
                errors={errors_search_person}
                register={register_search_person}
              />
              <Typography className="label_selects">
                Tipo de documento
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Número de documento"
                helperText="Número de documento"
                size="small"
                fullWidth
                {...register_search_person('numero_documento')}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                {...register_search_person('primer_nombre')}
                label="Primer nombre"
                helperText="Primer nombre"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                {...register_search_person('primer_apellido')}
                label="Primer apellido"
                size="small"
                helperText="Primer apellido"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                fullWidth
              >
                BUSCAR
              </Button>
            </Grid>
          </Grid>
        </Box>

        {
          // eslint-disable-next-line no-nested-ternary
          persons?.length === 0 ? (
            <Grid item xs={12} sx={{ marginY: '4.5rem', display: 'flex', justifyContent: 'center', }}>
              <Typography variant="h6" component="div" gutterBottom>
                Sin resultados / sin búsqueda realizada
              </Typography>
            </Grid>
          ) : (
            <>
              <ButtonGroup>
                {download_xls({ nurseries: persons, columns: columns_persons })}
              </ButtonGroup>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={persons ?? []}
                  columns={columns_persons ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row?.id_persona}
                />
              </Grid>
            </>
          )
        }
      </Grid>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzada;
