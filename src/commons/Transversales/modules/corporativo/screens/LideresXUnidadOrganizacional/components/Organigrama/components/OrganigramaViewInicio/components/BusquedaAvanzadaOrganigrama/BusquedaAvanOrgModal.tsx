/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

//! libraries or frameworks
import { type FC } from 'react';
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
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { AvatarStyles } from '../../../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../../../components';

import { useLideresXUnidadOrganizacional } from './../../../../../../hook/useLideresXUnidadOrganizacional';
import { columsBusquedaAvanzada } from './columns/columnsBusqueda';

export const BusquedaAvanOrgModal: FC = (): JSX.Element => {
  const {
    control_organigrama_lideres_por_unidad
    // reset_organigrama_lideres_por_unidad,
    // watch_organigrama_lideres_por_unidad_value
  } = useLideresXUnidadOrganizacional();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns_busqueda_avazada_organigrama_lideres: GridColDef[] = [
    ...columsBusquedaAvanzada,
    {
      headerName: 'Fecha Terminado',
      field: 'fecha_terminado',
      minWidth: 180,
      maxWidth: 220,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`Terminado ${new Date(
              params.row.fecha_terminado
            ).toLocaleString()}`}
            color="success"
            variant="outlined"
          />
        ) as JSX.Element;
      }
    },

    {
      headerName: 'Fecha Puesta en Producción',
      field: 'fecha_puesta_produccion',
      minWidth: 180,
      maxWidth: 230,
      renderCell: (params: any) => {
        return params.row.fecha_puesta_produccion
          ? ((
              <Chip
                size="small"
                label={`Terminado ${new Date(
                  params.row.fecha_puesta_produccion
                ).toLocaleString()}`}
                color="success"
                variant="outlined"
              />
            ) as JSX.Element)
          : ((
              <Chip
                size="small"
                label={`No está en Producción`}
                color="error"
                variant="outlined"
              />
            ) as JSX.Element);
      }
    },

    {
      headerName: 'Fecha Retiro de producción',
      field: 'fecha_retiro_produccion',
      minWidth: 180,
      maxWidth: 220,
      renderCell: (params: any) => {
        return params.row.fecha_retiro_produccion
          ? ((
              <Chip
                size="small"
                label={`Terminado ${new Date(
                  params.row.fecha_retiro_produccion
                ).toLocaleString()}`}
                color="success"
                variant="outlined"
              />
            ) as JSX.Element)
          : ((
              <Chip
                size="small"
                label={`No retirado de Producción`}
                color="error"
                variant="outlined"
              />
            ) as JSX.Element);
      }
    },
    {
      headerName: 'Actual',
      field: 'actual',
      minWidth: 50,
      maxWidth: 70,
      renderCell: (params: { row: { actual: any } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.actual !== false
          ? ((
              <Chip size="small" label="Si" color="info" variant="outlined" />
            ) as JSX.Element)
          : ((
              <Chip
                size="small"
                label="No"
                color="warning"
                variant="outlined"
              />
            ) as JSX.Element);
      }
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              /*  dispatch(get_trd_current(params.row));
              closeModalModalSearchTRD();
              dispatch(get_trds([]));
              const ccd_current = {
                id_ccd: params?.row?.id_ccd,
                id_organigrama: params?.row?.id_organigrama
              };
              dispatch(
                getServiceSeriesSubseriesXUnidadOrganizacional(ccd_current)
              ).then((res: any) => {
                dispatch(get_catalogo_trd(params.row.id_trd));
              }); */
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
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
    console.log('closeModal');
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={true} onClose={closeModal}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('onsubmit');
            // console.log(form_data_searched_trd_modal);
            /*  dispatch(
              get_searched_trd(
                form_data_searched_trd_modal.nombre,
                form_data_searched_trd_modal.version,
                setCreateTRDLoadingButton
              )
            ); */
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda avanzada de Organigramas" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Nombre del Organigrama"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="version"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Versión del Organigrama"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="actual"
                  control={control_organigrama_lideres_por_unidad}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          /* void get_catalogo_TRD_service(
                            selectedOption.value
                          ).then((res) => {
                            console.log(res);
                            dispatch(set_catalog_trd_action(res));
                          }); */
                          onChange(selectedOption);
                        }}
                        options={[
                          {
                            label: 'SI',
                            value: true
                          },
                          {
                            label: 'NO',
                            value: false
                          }
                        ]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          ACTUAL
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <LoadingButton
                  loading={false}
                  variant="outlined"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </LoadingButton>
              </Grid>
            </Grid>
            <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={[]}
              columns={columns_busqueda_avazada_organigrama_lideres}
              pageSize={5}
              rowsPerPageOptions={[7]}
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
                variant="contained"
                color="success"
                onClick={() => {
                  console.log('cerrando');
                  // reset_searched_trd_modal();
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
