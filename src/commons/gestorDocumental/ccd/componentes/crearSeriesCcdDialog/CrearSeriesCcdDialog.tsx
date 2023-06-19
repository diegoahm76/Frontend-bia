/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
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
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import {
  delete_series_service,
  create_series_service,
  update_series_data
} from '../../store/thunks/seriesThunks';
import { get_serie_ccd_current } from '../../store/slices/seriesSlice';
import type { IFormValues, IProps } from './types/types';
import { initial_state } from './utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { notification_error } from '../../utils/success_errors';

const CrearSeriesCcdDialog = ({
  is_modal_active,
  set_is_modal_active,
  title
}: IProps) => {
  const { series_ccd, serie_ccd_current } = useAppSelector(
    (state) => state.series
  );

  const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const [title_button, set_title_button] = useState('Agregar');

  //! I create a new variable called dispatch of type any
  const dispatch: any = useAppDispatch();
  const {
    register,
    reset,
    watch,
    formState: { errors, isValid, isDirty, touchedFields }
  } = useForm<IFormValues>({
    defaultValues: initial_state
  });
  //! const data allow us to watch the values of the form
  const data = watch();
  /* console.log(
    '🚀 ~ file: CrearSeriesCcdDialog.tsx ~ line 86 ~ CrearSeriesCcdDialog ~ data crear serie ccd',
    data
  ); */
  // useEffect para cargar los datos de la serie seleccionada
  useEffect(() => {
    if (serie_ccd_current !== null) {
      reset({
        codigo: serie_ccd_current.codigo,
        nombre: serie_ccd_current.nombre,
        id_subserie_doc: null,
        id_serie_doc: serie_ccd_current.id_serie_doc
      });
      set_title_button('Actualizar');
    } else {
      reset(initial_state);
      set_title_button('Agregar');
    }
  }, [serie_ccd_current]);

  //! useEffect to clean the current serie
  useEffect(() => {
    return () => {
      dispatch(get_serie_ccd_current(null));
      // clean();
    };
  }, [is_modal_active]);

  //! function to clean the form
  const clean = (): void => {
    reset(initial_state);
    set_title_button('Agregar');
  };

  //! create or edit series, it depends on the title_button and the parameters
const manage_series = (): void => {
    const updatedSeries = {
      ...data,
      nombre: data.nombre,
    }

    const newSeries =
      title_button === 'Agregar' ? {
        nombre: data.nombre,
        codigo: Number(data.codigo),
        id_ccd: ccd_current?.id_ccd,
      } : updatedSeries;

    if (title_button === 'Agregar') {
      void dispatch(create_series_service(newSeries, clean));
    } else {
      void dispatch(update_series_data(updatedSeries, ccd_current, clean));
    }

    //! create series is ok
    /* return void dispatch(create_series_service({
      nombre: data.nombre,
      codigo: data.codigo,
      id_ccd: ccd_current?.id_ccd
    }, clean)); */
    //! close function create series is ok
  };

  const handleOnClick = (params: any) => {

    console.log(params.row);

    const updatedSeries = series_ccd.map((item: any) => {
      if (item.id_serie_doc === params.row.id_serie_doc) {
        return {
          ...item,
          nombre: data.nombre,
          // codigo: Number(data.codigo),
        };
      }
      return item;
    });
    // console.log(updatedSeries);

    dispatch(get_serie_ccd_current(params.row));
  };

  const handleDeleteSeries = async (params: any) => {
    console.log(params);
    console.log(series_ccd);

    const new_series = series_ccd.filter(
      (serie: any) => serie.id_serie_doc !== params.row.id_serie_doc
    );
      console.log(new_series);
    if (params?.row?.tiene_subseries) {
      set_is_modal_active(false);
      await notification_error(
        'No se puede eliminar una serie con subseries asociadas, debe eliminarse primero las subseries asociadas'
      );
    } else {
      void dispatch(delete_series_service(new_series, params, () => ({})));
    }
  };

  const handleOnClose = () => {
    set_is_modal_active(false);
    dispatch(get_serie_ccd_current(null));
  };


  const columns: GridColDef[] = [
    {
      headerName: 'Codigo',
      field: 'codigo',
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: 'Nombre',
      field: 'nombre',
      minWidth: 150,
      maxWidth: 200
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton onClick={() => handleOnClick(params)}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid'
              }}
              variant="rounded"
            >
              <EditIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton onClick={() => void handleDeleteSeries(params)}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid'
              }}
              variant="rounded"
            >
              <DeleteIcon
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
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={() => {
            set_is_modal_active(false);
          }}
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
            e.preventDefault();
           manage_series(/* data.id_serie_doc */);
           console.log('hello from series');
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
                value={data.nombre}
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
                disabled={title_button === 'Actualizar'}
                style={{
                  visibility: title_button === 'Actualizar' ? 'hidden' : 'visible'
                }}
                variant="outlined"
                value={data.codigo}
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
                rows={
                  series_ccd
                }
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_serie_doc}
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
            onClick={() => {
              set_is_modal_active(false);
            }}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearSeriesCcdDialog;
