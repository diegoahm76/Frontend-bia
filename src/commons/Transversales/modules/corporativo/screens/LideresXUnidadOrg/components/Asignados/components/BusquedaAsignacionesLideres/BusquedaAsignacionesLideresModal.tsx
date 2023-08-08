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
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { columnsBusquedaAsignacion } from './columnsBusquedaAsignacion/columnsBusquedaAsignacion';
import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';
import { getAsignacionesLideresByFilter } from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../../hooks';
import {
  get_list_asignaciones_lideres,
  // get_list_asignaciones_lideres,
  get_list_busqueda_avanzada_personas,
  set_asignacion_lideres_current,
  set_organigrama_lideres_current
} from '../../../../toolkit/LideresSlices/LideresSlice';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';
import { get_asignaciones_lideres_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';
// import { get_asignaciones_lideres_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';
// import { get_asignaciones_lideres_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';

export const BusquedaAsignacionesLideresModal: FC = (): JSX.Element => {
  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//
  const {
    control_buscar_asignaciones_lideres_por_unidad,
    reset_buscar_asignaciones_lideres_por_unidad,
    watch_asignaciones_lider_by_unidad_value
  } = useLideresXUnidadOrganizacional();

  //* -------- use selector declaration -------- *//
  const { busqueda_avanzada_personas_list } = useAppSelector(
    (state) => state.lideres_slice
  );

  // ? useContext declaration
  const {
    modalBusquedaAvanzadaLideres,
    // openModalBusquedaAvanzadaLideres,

    closeModalBusquedaAvanzadaLideres,
    loadingButton,
    setLoadingButton
  } = useContext(ModalContextLideres);

  const resetFunction = (): void => {
    console.log('resetFunction');
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
      segundo_apellido: ''
    });
  };

  const closeModal = (): any => {
    closeModalBusquedaAvanzadaLideres();
    dispatch(get_list_busqueda_avanzada_personas([]));
    resetFunction();
    console.log('Im the close function');
  };

  //* -------- columns declaration -------- *//
  const columns_busqueda_asignaciones_de_lider: GridColDef[] = [
    {
      headerName: 'Acción',
      field: 'accion',
      width: 65,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              console.log(params.row);
              //* REVISAR LO DEL ID ORGANIGRAMA

              // ! ACTUALIZA EL ORGANIGRAMA
              dispatch(set_organigrama_lideres_current(params.row));

              // ! ACTUALIZA LA ASIGNACION DE LIDER
              dispatch(set_asignacion_lideres_current(params.row));

              // ! ACTUALIZA LA LISTA DE UNIDADES ORGANIZACIONALES
              void get_asignaciones_lideres_by_id_organigrama_service(
                params.row.id_organigrama
              ).then((data: any) => {
                dispatch(get_list_asignaciones_lideres(data));
              });

              // ! ACTUALIZA LA LISTA DE ASIGNACIONES DE LIDERES
              /*
                
                .then(() => {
                    void getAsignacionesLideresByIdOrganigrama(
                      organigrama_lideres_current?.id_organigrama
                    ).then((res: any) => {
                      console.log(res);
                      dispatch(get_list_asignaciones_lideres(res));
                    });
              */

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
      )
    },
    ...columnsBusquedaAsignacion,
    {
      headerName: 'Fecha Asignación',
      field: 'fecha_asignacion',
      minWidth: 180,
      maxWidth: 220,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={`${new Date(params.row.fecha_asignacion).toLocaleString()}`}
            color="success"
            variant="outlined"
          />
        ) as JSX.Element;
      }
    }
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalBusquedaAvanzadaLideres}
        onClose={closeModal}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              'buscando asiganciones de lideres de las unidades organizacionales'
            );
            void getAsignacionesLideresByFilter(
              watch_asignaciones_lider_by_unidad_value?.nombre_organigrama,
              watch_asignaciones_lider_by_unidad_value?.version_organigrama,
              watch_asignaciones_lider_by_unidad_value?.codigo_unidad_org,
              watch_asignaciones_lider_by_unidad_value?.nombre_unidad_org,
              watch_asignaciones_lider_by_unidad_value?.tipo_documento,
              watch_asignaciones_lider_by_unidad_value?.numero_documento,
              watch_asignaciones_lider_by_unidad_value?.primer_nombre,
              watch_asignaciones_lider_by_unidad_value?.segundo_nombre,
              watch_asignaciones_lider_by_unidad_value?.primer_apellido,
              watch_asignaciones_lider_by_unidad_value?.segundo_apellido,
              setLoadingButton,
              resetFunction
            ).then((data: any) => {
              dispatch(get_list_busqueda_avanzada_personas(data));
            });
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda de asignaciones de líderes Unidades Organizacionales" />
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
                  name="nombre_organigrama"
                  control={control_buscar_asignaciones_lideres_por_unidad}
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
                  name="version_organigrama"
                  control={control_buscar_asignaciones_lideres_por_unidad}
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
              <Grid item xs={12} sm={3}>
                <Controller
                  name="codigo_unidad_org"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                    fieldState: { error }
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
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
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
                    fieldState: { error }
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
                    fieldState: { error }
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
                    fieldState: { error }
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
                    fieldState: { error }
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
              <Grid item xs={12} sm={3}>
                <LoadingButton
                  loading={loadingButton}
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
              rows={busqueda_avanzada_personas_list || []}
              columns={columns_busqueda_asignaciones_de_lider}
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
                  resetFunction();
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
