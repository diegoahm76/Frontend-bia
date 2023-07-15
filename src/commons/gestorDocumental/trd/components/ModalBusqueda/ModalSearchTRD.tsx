/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

//! libraries or frameworks
import { type FC, useContext /* useEffect */ } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
//! helpers

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Controller } from 'react-hook-form';

import { use_trd } from '../../hooks/use_trd';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { ModalContextTRD } from '../../context/ModalsContextTrd';
import {
  get_trd_current,
  get_trds
} from '../../toolkit/TRDResources/slice/TRDResourcesSlice';
import {
  getServiceSeriesSubseriesXUnidadOrganizacional,
  get_catalogo_trd,
  get_searched_trd
} from '../../toolkit/TRDResources/thunks/TRDResourcesThunks';
import { columnsModalBusquedaTRD } from './utils/colums';
//! toolkit-redux values

export const ModalSearchTRD: FC = (): JSX.Element => {
  //! dispatch hook from react-redux
  const dispatch: any = useAppDispatch();

  const { trds } = useAppSelector((state: any) => state.trd_slice);

  // ? use_trd hook
  const {
    // ? searched_trd_modal - name and version
    // handle_submit_searched_trd_modal,
    control_searched_trd_modal,
    form_data_searched_trd_modal,
    // watch_searched_trd_modal,
    // reset_searched_trd_modal,
    // errors_searched_trd_modal

    // ? reset functions
    reset_searched_trd_modal
  } = use_trd();

  // ? context destructuring useModalContextTRD
  const { modalSearchTRD, closeModalModalSearchTRD } =
    useContext(ModalContextTRD);

  const columns_trd_busqueda: GridColDef[] = [
    ...columnsModalBusquedaTRD,
    {
      headerName: 'Estado',
      field: 'estado',
      minWidth: 180,
      maxWidth: 220,
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
              dispatch(get_trd_current(params.row));
              closeModalModalSearchTRD();
              dispatch(get_trds([]));
              const ccd_current = {
                id_ccd: params?.row?.id_ccd,
                id_organigrama: params?.row?.id_organigrama
              };
              void dispatch(
                getServiceSeriesSubseriesXUnidadOrganizacional(ccd_current)
              );
              void dispatch(get_catalogo_trd(params.row.id_trd));
              // reset_searched_trd_modal();
              console.log(params.row);
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

  const closeModal = (): any => {
    closeModalModalSearchTRD();
    reset_searched_trd_modal({
      nombre: '',
      version: ''
    });
    dispatch(get_trds([]));
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalSearchTRD}
        onClose={closeModal}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(form_data_searched_trd_modal);
            dispatch(
              get_searched_trd(
                form_data_searched_trd_modal.nombre,
                form_data_searched_trd_modal.version
              )
            );
          }}
        >
          <DialogTitle>
            Consultar los TRD que coincidan con el criterio de búsqueda
            <IconButton
              aria-label="close"
              onClick={closeModal}
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
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="nombre"
                  control={control_searched_trd_modal}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      label="Nombre del TRD"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        console.log(e.target.value);
                      }}
                      error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="version"
                  control={control_searched_trd_modal}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      label="Versión del TRD"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        console.log(e.target.value);
                      }}
                      error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  // sx={{ mt: '15px' }}
                  color="primary"
                >
                  BUSCAR
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={trds}
              columns={columns_trd_busqueda}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_trd}
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
                variant="contained"
                color="success"
                onClick={() => {
                  console.log('cerrando');
                  reset_searched_trd_modal();
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR BÚSQUEDA
              </Button>
              <Button
                variant="outlined"
                onClick={closeModal}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
