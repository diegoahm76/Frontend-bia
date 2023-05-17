import { type Dispatch, type SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
  Grid,
  Divider,
  Alert,
  Button,
  Skeleton,
  type SelectChangeEvent,
  Typography,
  // Alert,
} from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import type { GridColDef } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
// import { add_organigrams_service } from '../store/thunks/organigramThunks';
import { useAppSelector } from '../../../../hooks';
import { CustomSelect } from '../../../../components';
import { type IList } from '../../../../interfaces/globalModels';
import { get_tipo_documento, get_user_by_id } from '../../../../request';
import { control_error } from '../../../../helpers';
import { type Users } from '../../../seguridad/interfaces';
import { get_nuevo_user_organigrama } from '../store/thunks/organigramThunks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  tipo_documento: string;
  numero_documento: string;
  nombre: string;
}

// const columns: GridColDef[] = [
//   {
//     field: 'tipo_documento',
//     headerName: 'Tipo de documento',
//     width: 50,
//     editable: true,
//   },
//   { field: 'id', headerName: 'Cedula', width: 90 },
//   {
//     field: 'nombre',
//     headerName: 'Nombre',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'acciones',
//     headerName: 'Seleccionar',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 100,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.tipo_documento || ''} ${params.row.nombre || ''}`,
//   },
// ];

// const rows = [{ id: 1033752674, nombre: 'Snow', tipo_documento: 'CC' }];

type keys_object = 'tipo_documento' | 'numero_documento' | 'nombre';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogBusquedaAvanzadaUserOrganigrama = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useDispatch();
  const { userinfo } = useAppSelector((state) => state.auth);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const { organigram_current } = useAppSelector((state) => state.organigram);
  const [loading, set_loading] = useState<boolean>(false);
  const [data_user_actual, set_data_user_actual] = useState<
    Users | undefined
  >();
  const {
    handleSubmit: handle_submit_search_for_delegation,
    watch: watch_search_for_delegation,
    setValue: set_value_search_for_delegation,
    register: register_search_for_delegation,
    formState: { errors: errors_search_for_delegation },
  } = useForm<FormValues>();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = handle_submit_search_for_delegation(
    async (data: FormValues) => {
      console.log(data);
      const response = await dispatch(
        get_nuevo_user_organigrama(data.tipo_documento, data.numero_documento)
      );
      console.log(response);
      handle_close_crear_organigrama();
    }
  );

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    console.log(`${name} : `, value);
    set_value_search_for_delegation(name as keys_object, value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_change = (e: SelectChangeEvent<string>): void => {
    console.log(e.target.name, e.target.value);
    set_value_form(e.target.name, e.target.value);
  };

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    if (watch_search_for_delegation('tipo_documento') !== undefined) {
      set_tipo_documento(watch_search_for_delegation('tipo_documento'));
    }
  }, [watch_search_for_delegation('tipo_documento')]);

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);

      const { data } = await get_user_by_id(userinfo.id_usuario);
      set_data_user_actual(data.data);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_selects_options();
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <DialogTitle>
        Delegación de organigrama
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
        <Box>
          <Box>
            <Typography sx={{ mb: '10px' }}>
              Información de organigrama
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={45} />
                ) : (
                  <TextField
                    fullWidth
                    label="Organigrama"
                    size="small"
                    value={organigram_current.nombre}
                    disabled={true}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Versión"
                  size="small"
                  value={organigram_current.version}
                  disabled={true}
                />
              </Grid>
              <Alert severity="info" sx={{ ml: '15px', mt: '20px' }}>
                Al seleccionar un nuevo encargado para este organigrama
                automaticamente ya no tendrá acceso a los permisos para
                modificar el mismo
              </Alert>
            </Grid>
          </Box>
          <Box sx={{ p: 2, border: '1px dashed grey', mt: '20px' }}>
            <Typography sx={{ mb: '10px' }}>Encargado actual</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <CustomSelect
                  onChange={on_change}
                  label="Tipo de documento *"
                  name="tipo_documento"
                  value={data_user_actual?.tipo_documento}
                  options={tipo_documento_opt}
                  loading={loading}
                  disabled={true}
                  required={false}
                  errors={errors_search_for_delegation}
                  register={register_search_for_delegation}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={45} />
                ) : (
                  <TextField
                    fullWidth
                    label="Número de documento"
                    value={data_user_actual?.numero_documento}
                    size="small"
                    disabled={true}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={45} />
                ) : (
                  <TextField
                    fullWidth
                    label="Nombre de usuario"
                    size="small"
                    value={data_user_actual?.nombre_de_usuario}
                    disabled={true}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            component="form"
            onSubmit={(e) => {
              void on_submit(e);
            }}
            sx={{ p: 2, border: '1px dashed grey', mt: '20px' }}
          >
            <Typography sx={{ mb: '10px' }}>Nuevo encargado</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <CustomSelect
                  onChange={on_change}
                  label="Tipo de documento *"
                  name="tipo_documento"
                  value={tipo_documento}
                  options={tipo_documento_opt}
                  loading={loading}
                  disabled={false}
                  required={false}
                  errors={errors_search_for_delegation}
                  register={register_search_for_delegation}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={45} />
                ) : (
                  <TextField
                    fullWidth
                    label="Número de documento *"
                    type="number"
                    size="small"
                    disabled={false}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                    error={
                      errors_search_for_delegation.numero_documento?.type ===
                      'required'
                    }
                    helperText={
                      errors_search_for_delegation.numero_documento?.type ===
                      'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                    {...register_search_for_delegation('numero_documento', {
                      required: true,
                    })}
                    onChange={handle_change}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Stack>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ height: '100% !important' }}
                    startIcon={<SearchIcon />}
                  ></Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={45} />
                ) : (
                  <TextField
                    fullWidth
                    label="Nombre de usuario"
                    size="small"
                    disabled={true}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                    error={
                      errors_search_for_delegation.numero_documento?.type ===
                      'required'
                    }
                    helperText={
                      errors_search_for_delegation.numero_documento?.type ===
                      'required'
                        ? 'Este campo es obligatorio'
                        : ''
                    }
                    {...register_search_for_delegation('nombre', {
                      required: true,
                    })}
                    onChange={handle_change}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* <DataGrid
            density="compact"
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
          /> */}
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="outlined"
            onClick={handle_close_crear_organigrama}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            GUARDAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzadaUserOrganigrama;
