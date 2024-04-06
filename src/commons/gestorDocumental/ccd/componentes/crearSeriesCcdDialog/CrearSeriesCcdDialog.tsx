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
  Avatar,
  ButtonGroup
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import {
  delete_series_service,
  create_series_service,
  update_series_data,
  create_indepent_series_service
} from '../../store/thunks/seriesThunks';
import { get_serie_ccd_current } from '../../store/slices/seriesSlice';
import type { IFormValues, IProps } from './types/types';
import { AvatarStyles, initial_state } from './utils/constant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { notification_error } from '../crearSeriesCcdDialog/utils/success_errors';
import { get_subseries_ccd_current } from '../../store/slices/subseriesSlice';
import { get_subseries_service } from '../../store/thunks/subseriesThunks';
import use_ccd from '../../hooks/useCCD';
import { getCatalogoSeriesYSubseries } from '../CatalogoSeriesYSubseries/services/CatalogoSeriesYSubseries.service';
import { Title } from '../../../../../components';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

const CrearSeriesCcdDialog = ({
  is_modal_active,
  set_is_modal_active,
  title
}: IProps) => {
  const { series_ccd, serie_ccd_current } = useAppSelector(
    (state) => state.series
  );

  const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const [title_button, set_title_button] = useState('Guardar');

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

  //! this use effect is to set the title of the button and the values of the form
  useEffect(() => {
    if (serie_ccd_current !== null) {
      reset({
        codigo: serie_ccd_current.codigo,
        nombre: serie_ccd_current.nombre,
        id_subserie_doc: null,
        id_serie_doc: serie_ccd_current.id_serie_doc
      });
      set_title_button('Actualizar');
      // //  console.log('')('serie_ccd_current.id_serie_doc', serie_ccd_current);
      dispatch(get_subseries_service(serie_ccd_current));
    } else {
      reset(initial_state);
      set_title_button('Guardar');
    }
  }, [serie_ccd_current]);

  //! useEffect to clean the current serie
  useEffect(() => {
    return () => {
      dispatch(get_serie_ccd_current(null));
      clean();
    };
  }, [is_modal_active]);

  //! function to clean the form
  const clean = (): void => {
    reset(initial_state);
    set_title_button('Guardar');
  };

  //! create or edit series, it depends on the title_button and the parameters
  const manage_series = (): void => {
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
  };

  // * //  console.log('')(params.row);
  const handleOnClick_prepareEdit = (params: any) =>
    dispatch(get_serie_ccd_current(params.row));

  const handleDeleteSeries = async (params: any) => {
    const { row } = params;
    //! this function allow me to identify the series that i want to delete, however is unnecessary in this case, therefore i comment it
    /* const newSeries = series_ccd.filter(
      (serie: any) => serie.id_serie_doc !== row.id_serie_doc
    );
    */
    if (row?.tiene_subseries) {
      set_is_modal_active(false);
      await notification_error(
        'No se puede eliminar una serie con subseries asociadas, debe eliminarse primero las subseries asociadas'
      );
    } else {
      void dispatch(delete_series_service(params, () => ({})));
    }
  };

  const handleAddIndependentSeries = (params: any) => {
    // ? //  console.log('')(params.row);
    void dispatch(create_indepent_series_service(params.row.id_serie_doc)).then(
      () => {
        dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
      }
    );
  };

  const columns: GridColDef[] = [
    {
      headerName: 'Código serie',
      field: 'codigo',
      minWidth: 180,
      maxWidth: 225,
      flex: 1
    },
    {
      headerName: 'Nombre serie',
      field: 'nombre',
      minWidth: 180,
      maxWidth: 225,
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
          <IconButton
            sx={{
              visibility: ccd_current?.actual ? ' hidden ' : ''
            }}
            onClick={() => handleOnClick_prepareEdit(params)}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <EditIcon
                titleAccess="Editar serie"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            sx={{
              visibility: ccd_current?.actual ? ' hidden ' : ''
            }}
            onClick={() => void handleDeleteSeries(params)}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <DeleteIcon
                titleAccess="Eliminar serie"
                sx={{ color: 'red', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton onClick={() => void handleAddIndependentSeries(params)}>
            <Avatar sx={AvatarStyles} variant="rounded">
              <AddIcon
                titleAccess="Agregar serie independiente"
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
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <DialogTitle>
        <Title title={title} />
        {/*  <IconButton
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
        </IconButton> */}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manage_series();
          }}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                visibility: ccd_current?.actual ? ' hidden ' : ''
              }}
            >
              <TextField
                // margin="dense"
                fullWidth
                {...register('nombre', { required: true })}
                inputProps={{
                  maxLength: 150
                }}
                size="small"
                label="Nombre"
                variant="outlined"
                value={data.nombre}
              />
              {errors.nombre !== null && <p>{errors.nombre?.message}</p>}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: ccd_current?.actual ? ' none ' : ''
              }}
            >
              <TextField
                fullWidth
                {...register('codigo', { required: true })}
                size="small"
                label="Código"
                disabled={title_button === 'Actualizar'}
                style={{
                  visibility:
                    title_button === 'Actualizar' ? 'hidden' : 'visible'
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
                    clean();
                  }}
                >
                  LIMPIAR
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: series_ccd, columns })}
                {download_pdf({ nurseries: series_ccd, columns, title: title_button })}
              </ButtonGroup> 
              <DataGrid
                density="compact"
                autoHeight
                rows={series_ccd}
                columns={columns}
                pageSize={10}
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
            color="error"
            variant="contained"
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
