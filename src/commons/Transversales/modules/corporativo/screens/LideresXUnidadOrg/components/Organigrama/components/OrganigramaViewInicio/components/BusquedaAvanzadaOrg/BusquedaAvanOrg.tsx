/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

//! libraries or frameworks
import { useContext, type FC } from 'react';
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
  TextField,
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

import { useLideresXUnidadOrganizacional } from '../../../../../../hook/useLideresXUnidadOrg';
import { columsBusquedaAvanzada } from './columns/columnsBusqueda';
import {
  get_asignaciones_lideres_by_id_organigrama_service,
  get_organigramas_list_lideres_screen_service,
} from '../../../../../../toolkit/LideresThunks/OrganigramaLideresThunks';
import {
  get_list_asignaciones_lideres,
  get_list_busqueda_organigramas,
  set_organigrama_lideres_current,
} from '../../../../../../toolkit/LideresSlices/LideresSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../../../hooks';
import { ModalContextLideres } from '../../../../../../context/ModalContextLideres';
import { RenderDataGrid } from '../../../../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { columns } from './../../../../../../../../../../../seguridad/screens/IndicesElectronicos/utils/colums';

export const BusquedaAvanOrgModal: FC = (): JSX.Element => {
  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//
  const {
    control_organigrama_lideres_por_unidad,
    reset_organigrama_lideres_por_unidad,
    watch_organigrama_lideres_por_unidad_value,
  } = useLideresXUnidadOrganizacional();

  const { organigramas_list } = useAppSelector((state) => state.lideres_slice);

  // ? useContext declaration
  const {
    modalBusquedaAvanzadaOrganigrama,
    // openModalBusquedaAvanzadaOrganigrama,
    closeModalBusquedaAvanzadaOrganigrama,
    loadingButton,
    setLoadingButton,
  } = useContext(ModalContextLideres);

  const resetFunction = (): void => {
    //  console.log('')('resetFunction');
    reset_organigrama_lideres_por_unidad({
      nombre: '',
      version: '',
      actual: false,
    });
  };

  const closeModal = (): any => {
    closeModalBusquedaAvanzadaOrganigrama();
    dispatch(get_list_busqueda_organigramas([]));
    resetFunction();
  };

  const onSubmitSearchOrganigramas = async ({
    nombre,
    version,
    actual,
  }: any): Promise<any> => {
    try {
      const dataToSearch = {
        nombre,
        version,
        actual: actual.value,
        setLoadingButton,
      };
      const dataSearch = await get_organigramas_list_lideres_screen_service(
        dataToSearch
      );
      dispatch(get_list_busqueda_organigramas(dataSearch));
      // * //  console.log('')(dataSearch);
    } catch (error) {
      //  console.log('')(error);
    }
  };
  //* -------- columns declaration -------- *//
  const columns_busqueda_avazada_organigrama_lideres: GridColDef[] = [
    ...columsBusquedaAvanzada,
    {
      headerName: 'Fecha Terminado',
      field: 'fecha_terminado',
      minWidth: 260,
      maxWidth: 280,
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
      },
    },

    {
      headerName: 'Fecha Puesta en Producción',
      field: 'fecha_puesta_produccion',
      minWidth: 260,
      maxWidth: 280,
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
      },
    },

    {
      headerName: 'Fecha Retiro de producción',
      field: 'fecha_retiro_produccion',
      minWidth: 260,
      maxWidth: 280,
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
      },
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
      },
    },
    {
      headerName: 'Acción',
      field: 'accion',
      width: 65,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              //  console.log('')(params.row);
              dispatch(set_organigrama_lideres_current(params.row));
              void get_asignaciones_lideres_by_id_organigrama_service(
                params.row.id_organigrama
              ).then((data: any) => {
                dispatch(get_list_asignaciones_lideres(data));
              });

              closeModal();
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <VisibilityIcon
                titleAccess="Ver Organigrama"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={modalBusquedaAvanzadaOrganigrama}
        onClose={closeModal}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmitSearchOrganigramas(
              watch_organigrama_lideres_por_unidad_value
            );
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda avanzada de Organigramas" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
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
                    fieldState: { error },
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
                    fieldState: { error },
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
                  zIndex: 2,
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="actual"
                  control={control_organigrama_lideres_por_unidad}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          onChange(selectedOption);
                        }}
                        options={[
                          {
                            label: 'SI',
                            value: true,
                          },
                          {
                            label: 'NO',
                            value: false,
                          },
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
                            marginLeft: '0.25rem',
                          }}
                        >
                          ACTUAL
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}
                sx={{
                  mb: '1rem'
                }}
              >
                <LoadingButton
                  loading={loadingButton}
                  color="primary"
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                >
                  BUSCAR
                </LoadingButton>
              </Grid>
            </Grid>
            <RenderDataGrid
              title="Resultados de la búsqueda"
              rows={organigramas_list ?? []}
              columns={columns_busqueda_avazada_organigrama_lideres ?? []}
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
                  resetFunction();
                  //  console.log('')('cerrando');
                  // reset_searched_trd_modal();
                }}
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
