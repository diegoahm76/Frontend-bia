/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
//* libraries or main dependencies
import { useContext, useState } from 'react';
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
// import { usePSD } from '../../../hook/usePSD';

//* components


//* icons

import ChecklistIcon from '@mui/icons-material/Checklist';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { ModalContextPSD } from '../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { columnnsSelCCDPSD } from '../../../../../../../permisosSeriesDoc/components/parte1/ModalSeleccionCCDPSD/columns/columnsSelCCDPSD';
import { Title } from '../../../../../../../../../components';
import { download_xls } from '../../../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../../../documentos-descargar/PDF_descargar';
import { useAppDispatch } from '../../../../../../../../../hooks';
import { functionGetCcdHomologacionSeries } from '../../../../toolkit/thunks/ccdOrganigrama.service';

//* services (redux (slice and thunks))
/* import {
  get_busqueda_ccds_psd,
  get_unidad_organizacional_ccd_psd
} from '../../../toolkit/thunks/psdThunks';
import {
  setListaSeriesSubseries,
  set_busqueda_ccds_action,
  set_ccd_current_busqueda_action,
  set_current_unidad_organizacional_action,
  set_unidades_organizacionales_action
} from '../../../toolkit/slice/PSDSlice'; */

// ! modal seleccion y busqueda de ccd - para inicio del proceso de permisos sobre series documentales
export const ModalBusquedaCcdOrganigrama = (): JSX.Element => {
  //* --- dispatch declaration ----
  const dispatch = useAppDispatch();
  //* ---- context declaration ----
  const {
    modalSeleccionCCD_PSD,
    handleSeleccionCCD_PSD,
    loadingButtonPSD,
    setLoadingButtonPSD: setLoadingRequest,
  } = useContext(ModalContextPSD);

  // ! use States busqueda de ccds homologaciones
  const [ccdList, setccdList] = useState<any[]>([])


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
                // dispatch(setListaSeriesSubseries([]));
                // dispatch(set_current_unidad_organizacional_action(null));
                // ! se selecciona el ccd para establecerlo como "actual" dentro del funcionamiento de la app
                // dispatch(set_ccd_current_busqueda_action(params.row));

                //* se traen las unidades disponibles y se asignan al estado
               /* void get_unidad_organizacional_ccd_psd(
                  params.row.id_organigrama,
                  setLoadingButtonPSD
                ).then((data: any) => {
                  // ! se asignan las unidades organizacionales al estado
                  dispatch(set_unidades_organizacionales_action(data));
                }); */
                console.log(params.row)
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
        setccdList([]);
        handleSeleccionCCD_PSD(false);
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
              void functionGetCcdHomologacionSeries(setLoadingRequest).then((data: any) => {
                setccdList(data)
              })
            }}
          >
            <Grid container spacing={2}>
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
          {download_xls({ nurseries: ccdList ?? [], columns: columns_ccds })}
          {download_pdf({
            nurseries: ccdList ?? [],
            columns: columns_ccds,
            title: 'Selección de CCD persmisos sobre series documentales'
          })}
        </ButtonGroup>
        <DataGrid
          density="compact"
          autoHeight
          rows={ccdList ?? []}
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
            color="error"
            onClick={() => {
              handleSeleccionCCD_PSD(false);
              setccdList([]);
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
