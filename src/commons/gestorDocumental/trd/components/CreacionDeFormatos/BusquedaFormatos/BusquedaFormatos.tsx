/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState, useContext } from 'react';
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
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { AvatarStyles } from '../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { ModalContextTRD } from '../../../context/ModalsContextTrd';

// * react select
import Select from 'react-select';
import { use_trd } from '../../../hooks/use_trd';

export const AdmnistrarFormatos = (): JSX.Element => {
  //! I create a new variable called dispatch of type any
  const dispatch: any = useAppDispatch();

  const { data_format_documental_type } = useAppSelector(
    (state: any) => state.trd_slice
  );

  const { control_format_documental_type } = use_trd();

  //! context for the modal interacion
  const { modalCreacionFormatoTipo, closeModalCreacionFormatoTipo } =
    useContext(ModalContextTRD);

  // const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const [title_button, set_title_button] = useState('Guardar');

  /* const {
    register,
    reset,
    watch,
    formState: { errors, isValid, isDirty, touchedFields }
  } = useForm<IFormValues>({
    defaultValues: initial_state
  }); */
  //! const data allow us to watch the values of the form
  // const data = watch();

  //! this use effect is to set the title of the button and the values of the form
  /* useEffect(() => {
    if (serie_ccd_current !== null) {
      reset({
        codigo: serie_ccd_current.codigo,
        nombre: serie_ccd_current.nombre,
        id_subserie_doc: null,
        id_serie_doc: serie_ccd_current.id_serie_doc
      });
      set_title_button('Actualizar');
      console.log('serie_ccd_current.id_serie_doc', serie_ccd_current);
      dispatch(get_subseries_service(serie_ccd_current));
    } else {
      reset(initial_state);
      set_title_button('Guardar');
    }
  }, [serie_ccd_current]); */

  //! useEffect to clean the current serie
  /*  useEffect(() => {
    return () => {
      dispatch(get_serie_ccd_current(null));
      clean();
    };
  }, [is_modal_active]);

  //! function to clean the form
  const clean = (): void => {
    reset(initial_state);
    set_title_button('Guardar');
  }; */

  //! create or edit series, it depends on the title_button and the parameters
  /*  const manage_series = (): void => {
    const updatedSeries = {
      ...data,
      nombre: data.nombre
    };
    const newSeries =
      title_button === 'Guardar'
        ? {
            nombre: data.nombre,
            codigo: Number(data.codigo),
            id_ccd: ccd_current?.id_ccd
          }
        : updatedSeries;
    const action =
      title_button === 'Guardar'
        ? create_series_service(newSeries, clean)
        : update_series_data(updatedSeries, ccd_current, clean);
    void dispatch(action);
  }; */

  // * console.log(params.row);
  /* const handleOnClick_prepareEdit = (params: any) =>
    dispatch(get_serie_ccd_current(params.row)); */
  /*
  const handleDeleteSeries = async (params: any) => {
    const { row } = params;
    if (row?.tiene_subseries) {
      set_is_modal_active(false);
      await notification_error(
        'No se puede eliminar una serie con subseries asociadas, debe eliminarse primero las subseries asociadas'
      );
    } else {
      void dispatch(delete_series_service(params, () => ({})));
    }
  }; */

  /*  const handleAddIndependentSeries = (params: any) => {
    void dispatch(create_indepent_series_service(params.row.id_serie_doc)).then(() => {
      dispatch(
        getCatalogoSeriesYSubseries(ccd_current.id_ccd)
      );
    })
  }; */

  //! this code allow us to create the colums in the grid that will be displayed in the modal
  const columns_creacion_formatos: GridColDef[] = [
    {
      headerName: 'Tipo de medio documental',
      field: 'tipo_medio_doc',
      minWidth: 200,
      maxWidth: 225,
      flex: 1
    },
    {
      headerName: 'Nombre del formato',
      field: 'nombre',
      minWidth: 280,
      maxWidth: 295,
      flex: 1
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 200,
      maxWidth: 235,
      flex: 1,
      renderCell: (params: any) =>
        params.row.registro_precargado ? null : (
          <>
            <IconButton
              onClick={() => {
                console.log('params edit formato', params);
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
                console.log('params delete formato', params);
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
      id="dialog_series_ccd"
      maxWidth="md"
      open={modalCreacionFormatoTipo}
      onClose={closeModalCreacionFormatoTipo}
    >
      <DialogTitle>
        Módulo creación de Formatos para cada tipo de medio documental
        <IconButton
          aria-label="close"
          onClick={closeModalCreacionFormatoTipo}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form
          onSubmit={(e) => {
            console.log('hello from onSubmmit events');
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
                      // name="id_ccd"
                      onChange={(selectedOption) => {
                        console.log(
                          'selectedOption en tipo de formato por medio',
                          selectedOption
                        );
                        /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                        onChange(selectedOption);
                      }}
                      isDisabled={/* trd_current != null */ false}
                      options={[
                        {
                          label: 'Seleccionar',
                          value: null
                        },
                        {
                          label: 'Físico',
                          value: 1
                        },
                        {
                          label: 'Electronico',
                          value: 2
                        }
                        // ...ccd_list
                      ]}
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

              {/* <TextField
                margin="dense"
                fullWidth
                {...register('nombre', { required: true })}
                size="small"
                label="Nombre"
                variant="outlined"
                value={''}
              /> */}
              {/* {errors.nombre !== null && <p>{errors.nombre?.message}</p>} */}
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
                    margin="dense"
                    fullWidth
                    // name="version"
                    label="Nombre tipo de formato"
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
                      console.log(e.target.value);
                    }}
                  />
                )}
              />
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mt: '0' }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<SearchIcon />}
                  onClick={() => {
                    console.log('buscando datos de los formatos relacionados');
                  }}
                >
                  BUSCAR
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  {title_button}
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    console.log('hello from clean button');
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
                rows={[
                  {
                      "id_formato_tipo_medio": 54,
                      "tipo_medio_doc": "Físico",
                      "nombre": "PAPEL",
                      "registro_precargado": true,
                      "activo": true,
                      "item_ya_usado": false,
                      "cod_tipo_medio_doc": "F"
                  },
                  {
                      "id_formato_tipo_medio": 55,
                      "tipo_medio_doc": "Físico",
                      "nombre": "CINTA",
                      "registro_precargado": true,
                      "activo": true,
                      "item_ya_usado": false,
                      "cod_tipo_medio_doc": "F"
                  },
                  {
                      "id_formato_tipo_medio": 56,
                      "tipo_medio_doc": "Físico",
                      "nombre": "ACETATO",
                      "registro_precargado": true,
                      "activo": true,
                      "item_ya_usado": false,
                      "cod_tipo_medio_doc": "F"
                  },
                  {
                      "id_formato_tipo_medio": 57,
                      "tipo_medio_doc": "Físico",
                      "nombre": "CD",
                      "registro_precargado": true,
                      "activo": true,
                      "item_ya_usado": false,
                      "cod_tipo_medio_doc": "F"
                  },
                  {
                      "id_formato_tipo_medio": 58,
                      "tipo_medio_doc": "Físico",
                      "nombre": "Papel",
                      "registro_precargado": false,
                      "activo": true,
                      "item_ya_usado": false,
                      "cod_tipo_medio_doc": "F"
                  }
              ]}
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
