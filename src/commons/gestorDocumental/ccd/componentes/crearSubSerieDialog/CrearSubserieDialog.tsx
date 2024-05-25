/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  create_sub_series_service,
  delete_sub_series_service,
  update_sub_series_service
} from '../../store/thunks/subseriesThunks';
import { get_serie_ccd_current } from '../../store/slices/seriesSlice';
import { get_subseries_ccd_current } from '../../store/slices/subseriesSlice';
import type { IFormValues, IProps } from './types/types';
import { initial_state } from './utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { getCatalogoSeriesYSubseries } from '../CatalogoSeriesYSubseries/services/CatalogoSeriesYSubseries.service';
import { Title } from '../../../../../components';
const CrearSubSerieCcdDialog = ({
  is_modal_active,
  set_is_modal_active,
  title
}: IProps) => {
  const { series_ccd, serie_ccd_current } = useAppSelector(
    (state: any) => state.series
  );
  const { subseries_ccd, subseries_ccd_current } = useAppSelector(
    (state: any) => state.subseries
  );
  const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const [title_button, set_title_button] = useState('Guardar');

  //! Dispatch instance
  const dispatch: any = useAppDispatch();

  const {
    register,
    handleSubmit: handle_submit,
    reset,
    watch,
    formState: { errors }
  } = useForm<IFormValues>({
    defaultValues: initial_state
  });
  const data = watch();
  // //  console.log('')(data);

  useEffect(() => {
    const { codigo, nombre, id_subserie_doc, id_serie_doc } =
      subseries_ccd_current ?? initial_state;
    reset({
      codigo,
      nombre,
      id_subserie_doc,
      id_serie_doc
    });

    set_title_button(subseries_ccd_current ? 'Actualizar' : 'Guardar');

    return () => {
      dispatch(get_serie_ccd_current(null));
    };
  }, [
    subseries_ccd_current,
    dispatch,
    reset,
    // serie_ccd_current,
    get_serie_ccd_current,
    initial_state,
    set_title_button
  ]);

  //! useEffect to change the title of the modal and clean subseries data
  useEffect(() => {
    return () => {
      dispatch(get_subseries_ccd_current(null));
      reset_form();
    };
  }, [is_modal_active, series_ccd, dispatch]);

  // Función para limpiar el formulario
  const reset_form = (): void => {
    reset(initial_state);
    set_title_button('Guardar');
  };

  // Crear subseries
  const manage_sub_series = (): void => {
    const updatedSeries = {
      ...data,
      nombre: data.nombre
    };
    const newSeries =
      title_button === 'Guardar'
        ? {
            nombre: data.nombre,
            codigo: Number(data.codigo),
            id_serie_doc: serie_ccd_current
          }
        : updatedSeries;
    /* const action =
      title_button === 'Guardar'
        ? create_sub_series_service(newSeries, reset_form)
        : update_sub_series_service(updatedSeries, data, reset_form);
        void dispatch(action); */

    if (title_button === 'Guardar') {
      dispatch(create_sub_series_service(newSeries, reset_form)).then(() => {
        dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
      });
    }
    if (title_button === 'Actualizar') {
      dispatch(update_sub_series_service(updatedSeries, data, reset_form)).then(
        () => {
          dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
        }
      );
    }
  };

  // Función para eliminar subseries
  const delete_subseries = (params: any): any => {
    /* const new_subseries = subseries_ccd.filter(
      (subseries: any) => subseries.id_subserie_doc !== id_subserie_doc
    ); */
    // //  console.log('')(params);
    dispatch(delete_sub_series_service(params, () => ({}))).then(() => {
      dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
    });
  };

  const handleOnClick_prepareEdit = (params: any) => {
    // //  console.log('')(params);
    dispatch(get_subseries_ccd_current(params.row));
  };

  const columns: GridColDef[] = [
    {
      headerName: 'Código subserie',
      field: 'codigo',
      minWidth: 180,
      maxWidth: 225,
      flex: 1
    },
    {
      headerName: 'Nombre subserie',
      field: 'nombre',
      minWidth: 150,
      maxWidth: 200,
      flex: 1
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 200,
      maxWidth: 235,
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton onClick={() => handleOnClick_prepareEdit(params)}>
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
          <IconButton onClick={() => delete_subseries(params)}>
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
                sx={{ color: 'red', width: '18px', height: '18px' }}
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
        <Title title={title} />
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            manage_sub_series();
          }}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                // margin="dense"
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
                fullWidth
                {...register('codigo', { required: true })}
                size="small"
                style={{
                  visibility:
                    title_button === 'Actualizar' ? 'hidden' : 'visible'
                }}
                label="Código"
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
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  {title_button}
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={() => {
                    reset_form();
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
                rows={subseries_ccd}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_subserie_doc}
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
            color="error"
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
export default CrearSubSerieCcdDialog;
