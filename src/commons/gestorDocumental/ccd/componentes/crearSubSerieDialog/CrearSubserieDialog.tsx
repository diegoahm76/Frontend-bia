/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import {
 /* create_series_service, */
  // , get_series_service
} from '../../store/thunks/seriesThunks';
import {
  create_subseries_service,
  //, get_subseries_service
} from '../../store/thunks/subseriesThunks';
import { get_serie_ccd_current } from '../../store/slices/seriesSlice';
import { get_subseries_ccd_current } from '../../store/slices/subseriesSlice';
import type { IFormValues, IProps } from './types/types';
import { initial_state } from './utils/constant';
import  EditIcon  from '@mui/icons-material/Edit';
import  DeleteIcon  from '@mui/icons-material/Delete';
const CrearSubSerieCcdDialog = ({
  is_modal_active,
  set_is_modal_active,
  title,
}: IProps) => {

 /* const { series_ccd, serie_ccd_current } = useAppSelector(
    (state) => state.series
  ); */
  const { subseries_ccd, subseries_ccd_current } = useAppSelector(
    (state) => state.subseries
  );
  const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const [title_button, set_title_button] = useState('Agregar');

  // // Dispatch instance
  const dispatch: any = useAppDispatch();

  const {
    register,
    handleSubmit: handle_submit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: initial_state,
  });
  const data = watch();
  console.log(data);
  // useEffect para cargar los datos de la serie seleccionada
/*  useEffect(() => {
    if (serie_ccd_current !== null) {
      reset({
        codigo: serie_ccd_current.codigo,
        nombre: serie_ccd_current.nombre,
        id_subserie_doc: null,
        id_serie_doc: serie_ccd_current.id_serie_doc,
      });
      set_title_button('Actualizar');
    } else {
      reset(initial_state);
      set_title_button('Agregar');
    }
  }, [serie_ccd_current]); */

  // useEffect para cargar los datos de la subSerie seleccionada 
  useEffect(() => {
    if (subseries_ccd_current !== null) {
      reset({
        codigo: subseries_ccd_current.codigo,
        nombre: subseries_ccd_current.nombre,
        id_subserie_doc: subseries_ccd_current.id_subserie_doc,
        id_serie_doc: null,
      });
      set_title_button('Actualizar');
    } else {
      reset(initial_state);
      set_title_button('Agregar');
    }
    return () => {
      dispatch(get_serie_ccd_current(null));
    };
  }, [subseries_ccd_current]);

  // useEffect para limpiar el store de la serie & la subserie seleccionada
  useEffect(() => {
    return () => {
      // dispatch(get_serie_ccd_current(null));
      dispatch(get_subseries_ccd_current(null));
      clean();
    };
  }, [is_modal_active]);

  // Función para limpiar el formulario
  const clean = (): void => {
    reset(initial_state);
    set_title_button('Agregar');
  };

  // Crear Catalogso de seriess --
/*  const create_series = (): void => {
    alert('hola');
    console.log('heeeloooo create series')
    let new_item: any[] = [];
    if (title_button === 'Agregar') {
      new_item = [
        ...series_ccd,
        {
          id_serie_doc: data.id_serie_doc,
          nombre: data.nombre,
          codigo: data.codigo,
          id_ccd: ccd_current?.id_ccd,
        },
      ];
    } else {
      new_item = series_ccd.map((item: any) => {
        return item.id_serie_doc === data.id_serie_doc
          ? { ...item, nombre: data.nombre, codigo: Number(data.codigo) }
          : item;
      });
    }
    void dispatch(create_series_service(new_item, clean));
  }; */
  // Crear subseries
  const create_subseries = (): void => {
    let new_item: any[] = [];
    if (title_button === 'Agregar') {
      new_item = [
        ...subseries_ccd,
        {
          id_subserie_doc: data.id_subserie_doc,
          nombre: data.nombre,
          codigo: data.codigo,
          id_ccd: ccd_current?.id_ccd,
        },
      ];
    } else {
      new_item = subseries_ccd.map((item: any) => {
        return item.id_subserie_doc === data.id_subserie_doc
          ? { ...item, nombre: data.nombre, codigo: data.codigo }
          : item;
      });
    }
    void dispatch(create_subseries_service(new_item, clean));
  };

   // Función para eliminar subseries
   const delete_subseries = (id_subserie_doc: number | null): void => {
    const new_subseries = subseries_ccd.filter(
      (subseries: any) => subseries.id_subserie_doc !== id_subserie_doc
    );
    void dispatch(create_subseries_service(new_subseries, () => ({})));
  };

  // Función para eliminar series
 /* const delete_series = (id_serie_doc: number): void => {
    const new_series = series_ccd.filter(
      (serie: any) => serie.id_serie_doc !== id_serie_doc
    );
    void dispatch(create_series_service(new_series, () => ({})));
  }; */

  const handleOnClick = (title: string, params: any) => {
    const action =
      title === 'Crear Catalogo de series'
        ? get_serie_ccd_current(params.data)
        : get_subseries_ccd_current(params.data);

    dispatch(action);
  };

  const handleDelete = (title: string, params: any) => {
    delete_subseries(params.data.id_subserie_doc);
    /* if (title === 'Crear Catalogo de series') {
      delete_series(params.data.id_serie_doc);
    } else {
    } */
  };

  //  Función para enviar los datos del formulario
  const on_submit: SubmitHandler<IFormValues> = (t) => {
   /* window.alert(JSON.stringify(t));
    switch (title) {
      case 'Crear Catalogo de series':
        create_series();
        break;
      case 'Crear catalogo de subseries': */
        create_subseries();
      /*  break;
      default:
        break;
    } */
  };


  const columns: GridColDef[] = [
    {
      headerName: 'Codigo',
      field: 'codigo',
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: 'Nombre',
      field: 'nombre',
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => handleOnClick('Crear Catalogo de series', params)}
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
          <IconButton
            onClick={() => handleDelete('Crear Catalogo de series', params)}
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
              <DeleteIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];





  return (
    <Dialog
      maxWidth="md"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <Box component="form"
        onSubmit={() => {
          void handle_submit(on_submit);
          console.log(errors)
        }}
      >
        <DialogTitle>
          {title} ff
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
            onSubmit={ () => {
              void handle_submit(on_submit);
              console.log(errors)
            }}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  fullWidth
                  {...register('nombre', { required: true })}
                  size="small"
                  label="Nombre"
                  variant="outlined"
                />
                {errors.nombre !== null && <p>{errors.nombre?.message}</p>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  fullWidth
                  {...register('codigo', { required: true })}
                  size="small"
                  label="Código"
                  variant="outlined"
                />
                {errors.codigo !== null && <p>{errors.codigo?.message}</p>}

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  sx={{ mt: '0' }}
                >
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    {title_button}
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      clean();
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
                  rows={/* title === 'Crear Catalogo de series' ? series_ccd :  */subseries_ccd}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id_ccd}
                />
              </Grid>
            </Grid>
          </Box>
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
              onClick={() => {
                set_is_modal_active(false);
              }}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearSubSerieCcdDialog;
