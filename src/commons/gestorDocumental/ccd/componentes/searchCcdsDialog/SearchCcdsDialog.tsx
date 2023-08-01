/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { get_ccds } from '../../store/slices/ccdSlice';
import type { IProps } from './types/types';
import { get_classification_ccds_service } from '../../store/thunks/ccdThunks';
import { ModalContext } from '../../context/ModalContext';
import { columns } from './utils/columns';
import { Title } from '../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import use_ccd from '../../hooks/useCCD';
import { LoadingButton } from '@mui/lab';
import  CleanIcon  from '@mui/icons-material/CleaningServices';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SearchCcdModal = ({
  is_modal_active,
  set_is_modal_active,
  title
}: IProps) => {
  const dispatch = useAppDispatch();
  const {
    openModalBusquedaCreacionCCD,
    loadingButtonBusquedaCCD,
    activateLoadingButtonBusquedaCCD,
    desactivateLoadingButtonBusquedaCCD
  } = useContext(ModalContext);

  const { ccds } = useAppSelector((state) => state.ccd);

  // Hooks
  const { clean_ccd } = use_ccd() as any;

  const {
    control: control_search_ccd,
    handleSubmit,
    formState: { errors },
    watch,
    reset: reset_search_ccd
  } = useForm({
    defaultValues: {
      nombre_ccd: '',
      version: ''
    }
  });

  const columns_ccds: GridColDef[] = [
    ...columns,
    {
      headerName: 'Estado',
      field: 'estado',
      minWidth: 170,
      maxWidth: 250,
      renderCell: (params: { row: { fecha_terminado: null } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.fecha_terminado !== null ? (
          <Chip
            size="small"
            label={`Terminado ${params.row.fecha_terminado}`}
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="En Proceso"
            color="error"
            variant="outlined"
          />
        );
      }
    },
    {
      headerName: 'Actual',
      field: 'is_actual',
      minWidth: 50,
      maxWidth: 60,
      renderCell: (params: { row: { actual: null } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.actual !== false ? (
          <Chip size="small" label="Si" color="info" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="warning" variant="outlined" />
        );
      }
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              // console.log('params para ver ccd en el icono del ojito', params);
              void dispatch(
                get_classification_ccds_service(
                  activateLoadingButtonBusquedaCCD,
                  desactivateLoadingButtonBusquedaCCD,
                  params.row.nombre,
                  params.row.version,
                  params.row.id_ccd
                )
              );
              openModalBusquedaCreacionCCD();
              // dispatch(get_assignments_service(params.row.id_ccd));
              // console.log('params para ver ccd en el icono del ojito', params);
              // dispatch(get_ccd_current(params.row.id_ccd));
              set_is_modal_active(false);
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid'
              }}
              variant="rounded"
            >
              <VisibilityIcon
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
      fullWidth
      maxWidth="sm"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
        dispatch(get_ccds([]));
        reset_search_ccd({ nombre_ccd: '', version: '' });
      }}
    >
      <DialogTitle>
        <Title title="Consultar los CCD's que coincidan con el criterio de búsqueda" />
        {/* <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
              closeModalBusquedaCreacionCCD();
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
      {/*    <Divider /> */}
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <form
            style={{
              marginTop: '20px'
            }}
            onSubmit={(e: any) => {
              // console.log('onSubmit');
              e.preventDefault();
              void dispatch(
                get_classification_ccds_service(
                  activateLoadingButtonBusquedaCCD,
                  desactivateLoadingButtonBusquedaCCD,
                  control_search_ccd._formValues.nombre_ccd,
                  control_search_ccd._formValues.version
                )
              ).then((data: any) => {
                openModalBusquedaCreacionCCD();
                // console.log(data);
                if (
                  data.data.length > 0 &&
                  control_search_ccd._formValues.nombre_ccd !== '' &&
                  control_search_ccd._formValues.version !== ''
                ) {
                  // dispatch(get_ccd_current(data.data[0]));
                  // set_consulta_ccd_is_active(true);
                  // set_title('Consultar CCD');
                  // openModalBusquedaCreacionCCD();
                }
              });
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="nombre_ccd"
                  control={control_search_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      size="small"
                      label="Nombre CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un nombre'
                          : 'Ingrese nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="version"
                  control={control_search_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      size="small"
                      label="Versión CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar una versión'
                          : 'Ingrese versión'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  //  sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                >
                  <LoadingButton
                    loading={loadingButtonBusquedaCCD}
                    color="primary"
                    variant="outlined"
                    type="submit"
                    startIcon={<SearchIcon />}
                    /* onClick={() => {
                          console.log('buscando');
                          
                        }} */
                  >
                    BUSCAR CCD
                  </LoadingButton>
                  
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <DataGrid
          density="compact"
          autoHeight
          rows={ccds}
          columns={columns_ccds}
          pageSize={5}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={(row) => row.id_ccd}
        />
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
              reset_search_ccd({ nombre_ccd: '', version: '' });
            }}
            startIcon={<CleanIcon />}
          >
            LIMPIAR CAMPOS
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              // clean_ccd()
              set_is_modal_active(false);
              // closeModalBusquedaCreacionCCD();
              // dispatch(get_ccd_current(null));
              // dispatch(get_ccds([]))
              dispatch(get_ccds([]));
              reset_search_ccd({ nombre_ccd: '', version: '' });
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
export default SearchCcdModal;
