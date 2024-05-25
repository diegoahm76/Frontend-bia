/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
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
import { useContext, type FC } from 'react';
import { Controller } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';

import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

import { use_tca } from '../../../../hooks/use_tca';
import { v4 as uuidv4 } from 'uuid';
import { ModalContextTCA } from '../../../../context/ModalContextTca';
import {
  get_catalogo_TCA_service,
  get_catalogo_TRD_service,
  get_searched_tcas_service
} from '../../../../toolkit/TCAResources/thunks/TcaServicesThunks';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import {
  set_catalog_TCA_action,
  set_catalog_trd_action,
  set_current_tca_action,
  set_get_tcas_action
} from '../../../../toolkit/TCAResources/slice/TcaSlice';

//* icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import { columnsBusquedaTca } from './columns/BusquedaTcaColums';
import { LoadingButton } from '@mui/lab';
import { Title } from '../../../../../../../components';
import { download_xls } from '../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../documentos-descargar/PDF_descargar';

export const BusquedaTCAModal: FC<any> = (): JSX.Element => {
  // ? useDispatch
  const dispatch = useAppDispatch();

  // ? states
  const { tcas } = useAppSelector((state) => state.tca_slice);

  // ? use_tca
  const {
    control_search_tca,
    watch_search_tca_value,
    reset_search_tca

    // ? establishe the formState
  } = use_tca();

  // ? manage modal

  const {
    closeModalBusquedaTca,
    modalBusquedaTca,
    loadingButton,
    setLoadingButton
  } = useContext(ModalContextTCA);

  const { nombre, version } = watch_search_tca_value;

  const searchTCAS = (): void => {
    void dispatch(get_searched_tcas_service(nombre, version, setLoadingButton));
  };

  const cleanSearchTCAS = (): void => {
    reset_search_tca({
      nombre: '',
      version: ''
    });
    dispatch(set_get_tcas_action([]));
  };

  const closeModal = (): void => {
    closeModalBusquedaTca();
    cleanSearchTCAS();
  };

  const columns = [
    ...columnsBusquedaTca,
    {
      field: 'fecha_terminado',
      headerName: 'Fecha de terminado',
      width: 200,
      renderCell: (params: any) =>
        params.row.fecha_terminado ? (
          <Chip
            label={params.value ? new Date(params.value).toLocaleString() : ''}
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip label="No se ha terminado" color="warning" variant="outlined" />
        )
    },
    {
      field: 'actual',
      headerName: 'Actual',
      width: 80,
      renderCell: (params: any) =>
        params.row.actual ? (
          <Chip label="SI" color="primary" variant="outlined" />
        ) : (
          <Chip label="NO" color="error" variant="outlined" />
        )
    },
    {
      field: 'fecha_puesta_produccion',
      headerName: 'Fecha de puesta en producción',
      width: 200,
      renderCell: (params: any) =>
        params.row.fecha_puesta_produccion ? (
          <Chip
            label={params.value ? new Date(params.value).toLocaleString() : ''}
            color="info"
            variant="outlined"
          />
        ) : (
          <Chip
            label="No se ha puesto en producción"
            color="warning"
            variant="outlined"
          />
        )
    },
    {
      field: 'fecha_retiro_produccion',
      headerName: 'Fecha de retiro de producción',
      width: 200,
      renderCell: (params: any) =>
        params.row.fecha_retiro_produccion ? (
          <Chip
            label={params.value ? new Date(params.value).toLocaleString() : ''}
            color="info"
            variant="outlined"
          />
        ) : (
          <Chip
            label="No se ha retirado de producción"
            color="warning"
            variant="outlined"
          />
        )
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 70,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              //  console.log('')('params.row', params.row);
              dispatch(set_current_tca_action(params.row));
              closeModal();
              void get_catalogo_TRD_service(params.row.id_trd)
                .then((res) => {
                  //  console.log('')(res);
                  dispatch(set_catalog_trd_action(res));
                })
                .then(() => {
                  void get_catalogo_TCA_service(params.row.id_tca).then(
                    (res) => {
                      //  console.log('')(res);
                      dispatch(set_catalog_TCA_action(res));
                    }
                  );
                })
                .catch((err) => {
                  //  console.log('')(err);
                  dispatch(set_catalog_TCA_action([]));
                });
              // reset_searched_trd_modal();
              // //  console.log('')(params.row);
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
                titleAccess="Ver TCA"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalBusquedaTca}
        onClose={closeModal}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            searchTCAS();
          }}
        >
          <DialogTitle>
            <Title title="Consultar los TCA que coincidan con el criterio de búsqueda" />
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
                  control={control_search_tca}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Nombre del TCA"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // //  console.log('')(e.target.value);
                      }}
                      error={!!error}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="version"
                  control={control_search_tca}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Versión del TCA"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // //  console.log('')(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <LoadingButton
                  loading={loadingButton}
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </LoadingButton>
              </Grid>
            </Grid>
            <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

              {download_xls({ nurseries: tcas, columns })}
              {download_pdf({ nurseries: tcas, columns, title: 'TCA que coincidan ' })}

            </ButtonGroup>
            <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={tcas /*  trds  */}
              columns={columns /* columns_trd_busqueda */}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => uuidv4()}
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
                onClick={cleanSearchTCAS}
                startIcon={<CleanIcon />}
              >
                LIMPIAR BÚSQUEDA
              </Button>
              <Button
                color="error"
                variant="contained"
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
