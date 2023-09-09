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
  TextField,
  Tooltip
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
// import { get_ccds } from '../../store/slices/ccdSlice';
// import type { IProps } from './types/types';
// import { get_classification_ccds_service } from '../../store/thunks/ccdThunks';

// import { columns } from './utils/columns';
import { Title } from '../../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
// import use_ccd from '../../hooks/useCCD';
import { LoadingButton } from '@mui/lab';
import CleanIcon from '@mui/icons-material/CleaningServices';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { ModalContextPSD } from '../../../context/ModalContextPSD';
import { v4 as uuidv4 } from 'uuid';
import { columnnsSelCCDPSD } from './columns/columnsSelCCDPSD';
import { usePSD } from '../../../hook/usePSD';
//* select icon
import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  get_busqueda_ccds_psd,
  get_unidad_organizacional_ccd_psd
} from '../../../toolkit/thunks/psdThunks';
import {
  set_busqueda_ccds_action,
  set_ccd_current_busqueda_action,
  set_unidades_organizacionales_action
} from '../../../toolkit/slice/PSDSlice';

export const ModalSeleccionCCDPSD = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* context declaration
  const {
    modalSeleccionCCD_PSD,
    handleSeleccionCCD_PSD,
    loadingButtonPSD,
    setLoadingButtonPSD
  } = useContext(ModalContextPSD);

  const { ccdsBusqueda } = useAppSelector((state) => state.PsdSlice);

  // ! Hooks
  const { control_search_ccd_psd, reset_search_ccd_psd } = usePSD();

  const columns_ccds: GridColDef[] = [
    ...columnnsSelCCDPSD,
    {
      headerName: 'Usado',
      field: 'usado',
      width: 80,
      renderCell: (params: any) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.usado ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="info" variant="outlined" />
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
      headerName: 'Fecha terminado',
      field: 'fecha_terminado',
      width: 150,
      renderCell: (params: any) => {
        const date = new Date(params.row.fecha_terminado);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
    },
    {
      headerName: 'Seleccionar',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <Tooltip title="Seleccionar ccd" arrow>
            <IconButton
              onClick={() => {
                // ! se selecciona el ccd para establecerlo como "actual" dentro del funcionamiento de la app
                dispatch(set_ccd_current_busqueda_action(params.row));

                //* se traen las unidades disponibles y se asignan al estado
                void get_unidad_organizacional_ccd_psd(
                  params.row.id_organigrama,
                  setLoadingButtonPSD
                ).then((data: any) => {
                  // ! se asignan las unidades organizacionales al estado
                  dispatch(set_unidades_organizacionales_action(data));
                });

                handleSeleccionCCD_PSD(false);
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
                <ChecklistIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={modalSeleccionCCD_PSD}
      onClose={() => {
        handleSeleccionCCD_PSD(false);
        console.log('cerrando modal');
        dispatch(set_busqueda_ccds_action([]));
        reset_search_ccd_psd({ nombre: '', version: '' });
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
              console.log('onSubmit');
              e.preventDefault();
              void get_busqueda_ccds_psd(
                control_search_ccd_psd._formValues.nombre,
                control_search_ccd_psd._formValues.version,
                setLoadingButtonPSD
              ).then((data: any) => {
                const sortedData = data.slice().sort((a: any, b: any) => {
                  // Si hay un elemento con la propiedad "actual" en true, mostrarlo primero
                  if (a.actual && !b.actual) {
                    return -1;
                  } else if (!a.actual && b.actual) {
                    return 1;
                  }

                  // Si no hay un elemento con la propiedad "actual" en true, ordenar por fecha_terminado
                  const dateA: any = new Date(a.fecha_terminado);
                  const dateB: any = new Date(b.fecha_terminado);
                  return dateA - dateB;
                });
                dispatch(set_busqueda_ccds_action(sortedData));
              });
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="nombre"
                  control={control_search_ccd_psd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
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
                  control={control_search_ccd_psd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      type="text"
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
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading={loadingButtonPSD}
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
          {/* reemplazar los espaciois por las respectivas columnas y filas */}
          {download_xls({ nurseries: ccdsBusqueda, columns: columns_ccds })}
          {download_pdf({
            nurseries: ccdsBusqueda,
            columns: columns_ccds,
            title: 'Selección de CCD persmisos sobre series documentales'
          })}
        </ButtonGroup>
        <DataGrid
          density="compact"
          autoHeight
          rows={ccdsBusqueda ?? []}
          columns={columns_ccds ?? []}
          pageSize={10}
          rowsPerPageOptions={[10]}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={() => uuidv4()}
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
              reset_search_ccd_psd({ nombre: '', version: '' });
            }}
            startIcon={<CleanIcon />}
          >
            LIMPIAR CAMPOS
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              console.log('cerrando modal');
              handleSeleccionCCD_PSD(false);
              /*
              dispatch(get_ccds([]));
              reset_search_ccd_psd({ nombre: '', version: '' }); */
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
