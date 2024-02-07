/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

//! libraries or frameworks
import { /* useContext */ useContext, type FC } from 'react';
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
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { columnsBusquedaAsignacion } from './columnsBusquedaAsignacion/columnsBusquedaAsignacion';
import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';
import { getAsignacionesLideresByFilter } from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import {
  get_list_asignaciones_lideres,
  // get_list_asignaciones_lideres,
  get_list_busqueda_avanzada_personas,
  set_asignacion_lideres_current,
  set_organigrama_lideres_current,
} from '../../../../toolkit/LideresSlices/LideresSlice';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';
import { get_asignaciones_lideres_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';
import { RenderDataGrid } from '../../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
// import { get_asignaciones_lideres_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';
// import { get_asignaciones_lideres_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';

export const BusquedaAsignacionesLideresModal: FC = (): JSX.Element => {
  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//
  /* const {
    control_buscar_asignaciones_lideres_por_unidad,
    reset_buscar_asignaciones_lideres_por_unidad,
    watch_asignaciones_lider_by_unidad_value
  } = useLideresXUnidadOrganizacional();*/

  const {
    control: control_buscar_asignaciones_lideres_por_unidad,
    reset: reset_buscar_asignaciones_lideres_por_unidad,
    watch: watch_asignaciones_lider_by_unidad,
  } = useForm();

  const watch_asignaciones_lider_by_unidad_value =
    watch_asignaciones_lider_by_unidad();

  //* -------- use selector declaration -------- *//
  const { busqueda_avanzada_personas_list } = useAppSelector(
    (state) => state.lideres_slice
  );

  // ? useContext declaration
  const {
    modalBusquedaAvanzadaLideres,
    closeModalBusquedaAvanzadaLideres,
    loadingButton,
    setLoadingButton,
  } = useContext(ModalContextLideres);

  const resetFunction = (): void => {
    reset_buscar_asignaciones_lideres_por_unidad({
      nombre_organigrama: '',
      version_organigrama: '',
      codigo_unidad_org: '',
      nombre_unidad_org: '',
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
    });
  };

  const closeModal = (): any => {
    closeModalBusquedaAvanzadaLideres();
    dispatch(get_list_busqueda_avanzada_personas([]));
    resetFunction();
  };

  //* -------- columns declaration -------- *//
  const columns_busqueda_asignaciones_de_lider: GridColDef[] = [
    ...columnsBusquedaAsignacion,
    {
      headerName: 'Fecha Asignación',
      field: 'fecha_asignacion',
      minWidth: 350,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`${new Date(params.row.fecha_asignacion).toLocaleString()}`}
            color="success"
            variant="outlined"
          />
        ) as JSX.Element;
      },
    },
    /*
fecha_retiro_produccion_organigrama
:"2023-08-26T20:15:58.378540"
fecha_terminado_organigrama
:"2023-05-29T13:50:56.411681"
  */
    {
      headerName: 'Fecha de puesta en producción de organigrama',
      field: 'fecha_puesta_produccion_organigrama',
      minWidth: 350,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`${new Date(params.row.fecha_asignacion).toLocaleString()}`}
            color="success"
            variant="outlined"
          />
        ) as JSX.Element;
      },
    },
    {
      headerName: 'Fecha terminado organigrama',
      field: 'fecha_terminado_organigrama',
      minWidth: 350,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`${new Date(params.row.fecha_asignacion).toLocaleString()}`}
            color="success"
            variant="outlined"
          />
        ) as JSX.Element;
      },
    },
    {
      headerName: 'Fecha de retiro de producción de organigrama',
      field: 'fecha_retiro_produccion_organigrama',
      minWidth: 350,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`${
              new Date(params.row.fecha_asignacion).toLocaleString() ?? 'N/A'
            }`}
            color="warning"
            variant="outlined"
          />
        ) as JSX.Element;
      },
    },
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={modalBusquedaAvanzadaLideres}
        onClose={closeModal}
        sx={{
          minHeight: '600px',
        }}
      >
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const {
              nombre_organigrama,
              version_organigrama,
              codigo_unidad_org,
              nombre_unidad_org,
              tipo_documento,
              numero_documento,
              primer_nombre,
              segundo_nombre,
              primer_apellido,
              segundo_apellido,
            } = watch_asignaciones_lider_by_unidad_value || {};

            const data = await getAsignacionesLideresByFilter(
              nombre_organigrama,
              version_organigrama,
              codigo_unidad_org,
              nombre_unidad_org,
              tipo_documento,
              numero_documento,
              primer_nombre,
              segundo_nombre,
              primer_apellido,
              segundo_apellido,
              setLoadingButton,
              resetFunction
            );

            dispatch(get_list_busqueda_avanzada_personas(data));
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda de asignaciones de líderes Unidades Organizacionales" />
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
                  name="nombre_organigrama"
                  control={control_buscar_asignaciones_lideres_por_unidad}
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
                  name="version_organigrama"
                  control={control_buscar_asignaciones_lideres_por_unidad}
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
              <Grid item xs={12} sm={3}>
                <Controller
                  name="codigo_unidad_org"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Cód. Unidad organizacional"
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
                  name="nombre_unidad_org"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Nombre Unidad organizacional"
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
                  name="tipo_documento"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Tipo de documento"
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
                  name="numero_documento"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      label="Número de documento"
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
                  name="primer_nombre"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Primer nombre"
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
                  name="segundo_nombre"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Segundo Nombre"
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
                  name="primer_apellido"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Primer apellido"
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
                  name="segundo_apellido"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Segundo apellido"
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
                  mb: '1rem',
                }}
              >
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
            <RenderDataGrid
              title="Resultados de la búsqueda"
              rows={busqueda_avanzada_personas_list || []}
              columns={columns_busqueda_asignaciones_de_lider ?? []}
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
