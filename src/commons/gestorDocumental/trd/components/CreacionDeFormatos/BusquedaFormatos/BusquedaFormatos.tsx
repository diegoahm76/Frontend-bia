/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Controller, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Avatar,
  Chip,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { AvatarStyles } from '../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { ModalContextTRD } from '../../../context/ModalsContextTrd';

// * react select
import Select from 'react-select';
import { use_trd } from '../../../hooks/use_trd';
import {
  create_formato_by_tipo_medio_service,
  delete_formato_by_tipo_medio_service,
  edit_formato_by_tipo_medio_service,
  get_formatos_by_tipo_medio_by_format_and_name
} from '../../../toolkit/TRDResources/thunks/TRDResourcesThunks';
import { columsTRD } from './utils/colums';
import { options_search_trd } from './utils/options';
import InfoIcon from '@mui/icons-material/Info';
import { LoadingButton } from '@mui/lab';
import { Title } from '../../../../../../components';

export const AdmnistrarFormatos = (): JSX.Element => {
  //! I create a new variable called dispatch of type any
  const dispatch = useAppDispatch();

  const { data_format_documental_type } = useAppSelector(
    (state: any) => state.trd_slice
  );

  const {
    //* necesary to use the form
    control_format_documental_type,
    data_format_documental_type_watch_form,
    reset_format_documental_type, //* basic reset form to manage edit data
    reset_all_format_documental_type_modal,

    // ? state button to manage create or update documental type format
    set_title_button,
    title_button
  } = use_trd();

  //! context for the modal interacion
  const {
    modalCreacionFormatoTipo,
    closeModalCreacionFormatoTipo,

    createTRDLoadingButton,
    setCreateTRDLoadingButton
  } = useContext(ModalContextTRD);

  // ? function that allow us to create a format documental type
  const onSubmitCreateFormate = async () => {
    const {
      'cod-tipo-medio': { 'cod-tipo-medio': cod_tipo_medio_doc },
      nombre
    } = data_format_documental_type_watch_form;
    console.log('cod_tipo_medio_doc', cod_tipo_medio_doc);

    try {
      await dispatch(
        create_formato_by_tipo_medio_service({
          cod_tipo_medio_doc,
          nombre
        })
      );

      await dispatch(
        get_formatos_by_tipo_medio_by_format_and_name(
          setCreateTRDLoadingButton,
          '',
          cod_tipo_medio_doc
        )
      );
      // reset_all_format_documental_type_modal();
      // set_title_button('Actualizar');
    } catch (err) {
      console.log(err);
    }
  };

  // ? function that allow us to update a format documental type
  const onSubmitUpdateFormate = async () => {
    const {
      'cod-tipo-medio': { 'cod-tipo-medio': cod_tipo_medio_doc },
      nombre,
      activo,
      id_formato_tipo_medio
    } = data_format_documental_type_watch_form;

    try {
      await dispatch(
        edit_formato_by_tipo_medio_service({
          cod_tipo_medio_doc,
          nombre,
          activo,
          id_formato_tipo_medio
        })
      );

      await dispatch(
        get_formatos_by_tipo_medio_by_format_and_name(
          setCreateTRDLoadingButton,
          '',
          cod_tipo_medio_doc
        )
      );
      // reset_all_format_documental_type_modal();
    } catch (err) {
      console.log(err);
    }
  };
  // ?  function that allow us to delete a format documental type
  const deleteFormat = async ({
    row: { id_formato_tipo_medio, cod_tipo_medio_doc }
  }: any) => {
    try {
      await dispatch(
        delete_formato_by_tipo_medio_service(id_formato_tipo_medio)
      );
      await dispatch(
        get_formatos_by_tipo_medio_by_format_and_name(
          setCreateTRDLoadingButton,
          '',
          cod_tipo_medio_doc
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  //! this code allow us to create the colums in the grid that will be displayed in the modal
  const columns_creacion_formatos: GridColDef[] = [
    ...columsTRD,
    {
      headerName: 'Usado',
      field: 'item_ya_usado',
      minWidth: 100,
      maxWidth: 115,
      flex: 1,
      renderCell: (params: any) =>
        params.row.item_ya_usado === true ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        )
    },
    {
      headerName: 'Registro precargado',
      field: 'registro_precargado',
      minWidth: 130,
      maxWidth: 135,
      flex: 1,
      renderCell: (params: any) =>
        params.row.registro_precargado ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        )
    },
    {
      headerName: 'Activo',
      field: 'activo',
      minWidth: 80,
      maxWidth: 95,
      flex: 1,
      renderCell: (params: any) =>
        params.row.activo ? (
          <Chip label="Si" color="error" variant="outlined" />
        ) : (
          <Chip label="No" color="info" variant="outlined" />
        )
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 150,
      maxWidth: 170,
      flex: 1,
      renderCell: (params: any) =>
        params.row.registro_precargado ||
        params.row.item_ya_usado !== false ? null : (
          <>
            <IconButton
              onClick={() => {
                reset_format_documental_type({
                  nombre: params.row.nombre,
                  'cod-tipo-medio': {
                    label: params.row.tipo_medio_doc,
                    value: 0,
                    'cod-tipo-medio': params.row.cod_tipo_medio_doc
                  },
                  activo: params.row.activo,
                  id_formato_tipo_medio: params.row.id_formato_tipo_medio
                });
                set_title_button('Actualizar');
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <EditIcon
                  titleAccess="Editar formato tipo de medio"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={() => {
                void deleteFormat(params);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  titleAccess="Eliminar formato tipo de medio"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        )
    }
  ];

  return (
    <Dialog
      maxWidth="md"
      open={modalCreacionFormatoTipo}
      onClose={closeModalCreacionFormatoTipo}
    >
      <DialogTitle>
        <Title title=" Módulo creación de Formatos para cada tipo de medio documental" />
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            title_button === 'Actualizar'
              ? void onSubmitUpdateFormate()
              : void onSubmitCreateFormate();
          }}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="cod-tipo-medio"
                control={control_format_documental_type}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <div>
                    <Select
                      value={value}
                      onChange={(selectedOption) => {
                        // console.log(selectedOption);
                        onChange(selectedOption);
                      }}
                      // isDisabled={!control_format_documental_type._formValues.item.value}
                      options={options_search_trd}
                      placeholder="Seleccionar"
                    />
                    <label>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem',
                          marginTop: '0.25rem',
                          marginLeft: '0.25rem'
                        }}
                      >
                        Formato de tipo de medio documental
                        {/* {trd_current != null
                            ? `CCD seleccionado`
                            : `CDD's no usados en otro TRD`} */}
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre"
                control={control_format_documental_type}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    // margin="dense"
                    fullWidth
                    // name="version"
                    label="Nombre tipo de formato"
                    inputProps={{ maxLength: 20 }}
                    helperText={
                      'Ingrese nombre'
                      /*  trd_current != null
                          ? 'Actualice la versión'
                          : 'Ingrese versión' */
                    }
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      onChange(e.target.value);
                      // console.log(e.target.value);
                    }}
                  />
                )}
              />
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  ml: '-25rem'
                }}
              >
                {title_button === 'Actualizar' ? (
                  <Controller
                    name="activo"
                    control={control_format_documental_type}
                    defaultValue=""
                    // rules={{ required: false }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <FormControl fullWidth>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value}
                              onChange={(e) => {
                                onChange(e.target.checked);
                              }}
                              // name="checkedB"
                              color="primary"
                            />
                          }
                          label={
                            value ? (
                              <Typography variant="body2">
                                Activo
                                <Tooltip
                                  title="Formato tipo de medio activo"
                                  placement="right"
                                >
                                  <InfoIcon
                                    sx={{
                                      width: '1.2rem',
                                      height: '1.2rem',
                                      ml: '0.5rem',
                                      color: 'green'
                                    }}
                                  />
                                </Tooltip>
                              </Typography>
                            ) : (
                              <Typography variant="body2">
                                Inactivo
                                <Tooltip
                                  title="Formato tipo de medio inactivo"
                                  placement="right"
                                >
                                  <InfoIcon
                                    sx={{
                                      width: '1.2rem',
                                      height: '1.2rem',
                                      ml: '0.5rem',
                                      color: 'orange'
                                    }}
                                  />
                                </Tooltip>
                              </Typography>
                            )
                          }
                        />
                      </FormControl>
                    )}
                  />
                ) : null}
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mt: '0' }}
              >
                <LoadingButton
                  loading={createTRDLoadingButton}
                  color="primary"
                  variant="outlined"
                  startIcon={<SearchIcon />}
                  disabled={
                    control_format_documental_type._formValues['cod-tipo-medio']
                      .value === null
                  }
                  title={'Buscar datos de los formatos relacionados'}
                  onClick={() => {
                    void dispatch(
                      get_formatos_by_tipo_medio_by_format_and_name(
                        setCreateTRDLoadingButton,
                        data_format_documental_type_watch_form.nombre,
                        data_format_documental_type_watch_form[
                          'cod-tipo-medio'
                        ]['cod-tipo-medio']
                      )
                    );
                  }}
                >
                  BUSCAR
                </LoadingButton>

                <Button
                  // loading={createTRDLoadingButton}
                  type="submit"
                  color="primary"
                  variant="contained"
                  startIcon={
                    title_button === 'Actualizar' ? <SyncIcon /> : <SaveIcon />
                  }
                >
                  {title_button}
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    reset_all_format_documental_type_modal();
                  }}
                >
                  LIMPIAR
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={data_format_documental_type}
                columns={columns_creacion_formatos}
                pageSize={5}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_formato_tipo_medio}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="outlined"
            onClick={closeModalCreacionFormatoTipo}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
