/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

//* libraries or main dependencies
import { useContext } from 'react';
import {
  Avatar,
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
import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

//* hooks
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { usePSD } from '../../../hook/usePSD';

//* components
import { Title } from '../../../../../../components';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { ModalContextPSD } from '../../../context/ModalContextPSD';
import { columnnsSelCCDPSD } from './columns/columnsSelCCDPSD';

//* icons

import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';

//* services (redux (slice and thunks))
import {
  get_busqueda_ccds_psd,
  get_unidad_organizacional_ccd_psd
} from '../../../toolkit/thunks/psdThunks';
import {
  setListaSeriesSubseries,
  set_busqueda_ccds_action,
  set_ccd_current_busqueda_action,
  set_current_unidad_organizacional_action,
  set_unidades_organizacionales_action
} from '../../../toolkit/slice/PSDSlice';

// ! modal seleccion y busqueda de ccd - para inicio del proceso de permisos sobre series documentales
export const ModalSeleccionCCDPSD = (): JSX.Element => {
  //* --- dispatch declaration ----
  const dispatch = useAppDispatch();
  //* ---- context declaration ----
  const {
    modalSeleccionCCD_PSD,
    handleSeleccionCCD_PSD,
    loadingButtonPSD,
    setLoadingButtonPSD
  } = useContext(ModalContextPSD);

  const { ccdsBusqueda } = useAppSelector((state) => state.PsdSlice);

  // ! ---- HOOKS -----
  const { control_search_ccd_psd, reset_search_ccd_psd } = usePSD();

  const columns_ccds: GridColDef[] = [
    ...columnnsSelCCDPSD,
    {
      headerName: 'Usado',
      field: 'usado',
      width: 100,
      renderCell: (params: { row: { usado: boolean } }) => {
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
      width: 100,
      renderCell: (params: { row: { actual: boolean } }) => {
        return params.row.actual ? (
          <Chip size="small" label="Si" color="info" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="warning" variant="outlined" />
        );
      }
    },
    {
      headerName: 'Fecha terminado',
      field: 'fecha_terminado',
      width: 170,
      renderCell: (params: { row: { fecha_terminado: string } }) => {
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
                // ! se limpia la lista de series y subseries
                dispatch(setListaSeriesSubseries([]));
                dispatch(set_current_unidad_organizacional_action(null));
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

                // ! se cierra el modal
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
        dispatch(set_busqueda_ccds_action([]));
        reset_search_ccd_psd({ nombre: '', version: '' });
      }}
    >
      <DialogTitle>
        <Title title="Consultar los CCD's que coincidan con el criterio de búsqueda" />
      </DialogTitle>
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <form
            style={{
              marginTop: '20px',
              marginBottom: '20px'
            }}
            onSubmit={(e: any) => {
              e.preventDefault();
              void get_busqueda_ccds_psd(
                control_search_ccd_psd._formValues.nombre,
                control_search_ccd_psd._formValues.version,
                setLoadingButtonPSD
              ).then((data: any) => {
                const sortedData = data.slice().sort((a: any, b: any) => {
                  return a.actual
                    ? -1
                    : b.actual
                    ? 1
                    : Number(new Date(a.fecha_terminado)) - Number(new Date(b.fecha_terminado));
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
                        error
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
                        error
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
              //  console.log('')('cerrando modal');
              handleSeleccionCCD_PSD(false);
              reset_search_ccd_psd({ nombre: '', version: '' });
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
