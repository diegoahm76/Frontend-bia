/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
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
import CleanIcon from '@mui/icons-material/CleaningServices';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SearchCcdModal = ({
  is_modal_active,
  set_is_modal_active,
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

  const {
    control: control_search_ccd,
    formState: { errors },
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
      width: 300,
      renderCell: (params: { row: { fecha_terminado: null } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.fecha_terminado !== null ? (
          <Chip
            size="small"
            label={
              params.row.fecha_terminado
                ? `Terminado ${new Date(
                    params.row.fecha_terminado
                  ).toLocaleString()} `
                : ''
            }
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
      width: 80,
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
          {!params?.row?.usado || params?.row?.actual ? (
            <IconButton
              onClick={() => {
                // //  console.log('')('params para ver ccd en el icono del ojito', params);
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
                  titleAccess="Ver CCD"
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                // //  console.log('')('params para ver ccd en el icono del ojito', params);
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
                // //  console.log('')('params para ver ccd en el icono del ojito', params);
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
                <DoNotTouchIcon
                  titleAccess="Solo se puede observar este CCD porque ya está siendo usado"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          )}
        </>
      )
    }
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
        dispatch(get_ccds([]));
        reset_search_ccd({ nombre_ccd: '', version: '' });
      }}
    >
      <DialogTitle>
        <Title title="Consultar los CCD's que coincidan con el criterio de búsqueda" />
      </DialogTitle>
      {/*    <Divider /> */}
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <form
            style={{
              marginTop: '20px',
              marginBottom: '20px'
            }}
            onSubmit={(e: any) => {
              // //  console.log('')('onSubmit');
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
                // //  console.log('')(data);
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
                      type="number"
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
                    variant="contained"
                    type="submit"
                    startIcon={<SearchIcon />}
                  >
                    BUSCAR CCD
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <ButtonGroup
          style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
        >
          {download_xls({ nurseries: ccds, columns: columns_ccds })}
          {download_pdf({ nurseries: ccds, columns: columns_ccds, title: 'Consulta de CCD' })}
        </ButtonGroup> 
        <DataGrid
          density="compact"
          autoHeight
          rows={ccds}
          columns={columns_ccds}
          pageSize={10}
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
            color="primary"
            onClick={() => {
              reset_search_ccd({ nombre_ccd: '', version: '' });
            }}
            startIcon={<CleanIcon />}
          >
            LIMPIAR CAMPOS
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              set_is_modal_active(false);
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
