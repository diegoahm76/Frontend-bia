/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

//! libraries or frameworks
import { /* useContext */ type FC } from 'react';
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

export const BusquedaAsignacionesLideresModal: FC = (): JSX.Element => {
  // * dispatch to use in the component * //
  // const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//
  const { control_buscar_asignaciones_lideres_por_unidad } =
    useLideresXUnidadOrganizacional();
  // const { organigramas_list } = useAppSelector((state) => state.lideres_slice);

  // ? useContext declaration
  /* const {
    modalBusquedaAvanzadaOrganigrama,
    openModalBusquedaAvanzadaOrganigrama,
    closeModalBusquedaAvanzadaOrganigrama,
    loadingButton,
    setLoadingButton
  } = useContext(ModalContextLideres); */

  /* const resetFunction = (): void => {
    console.log('resetFunction');
    reset_organigrama_lideres_por_unidad({
      nombre: '',
      version: '',
      actual: false
    });
  }; */

  const closeModal = (): any => {
    // closeModalBusquedaAvanzadaOrganigrama();
    // dispatch(get_list_busqueda_organigramas([]));
    // resetFunction();
    console.log('Im the close function');
  };

  /* const onSubmitSearchOrganigramas = async ({
    nombre,
    version,
    actual
  }: any): Promise<any> => {
    try {
      const dataToSearch = {
        nombre,
        version,
        actual: actual.value,
        setLoadingButton
      };
      const dataSearch = await get_organigramas_list_lideres_screen_service(
        dataToSearch
      );
      dispatch(get_list_busqueda_organigramas(dataSearch));
      // * console.log(dataSearch);
    } catch (error) {
      console.log(error);
    }
  }; */
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
              /* dispatch(set_organigrama_lideres_current(params.row));
              void get_asignaciones_lideres_by_id_organigrama_service(
                params.row.id_organigrama
              ).then((data: any) => {
                dispatch(get_list_asignaciones_lideres(data));
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
      <Dialog fullWidth maxWidth="md" open={true} onClose={closeModal}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              'buscando asiganciones de lideres de las unidades organizacionales'
            );
            /* void onSubmitSearchOrganigramas(
              watch_organigrama_lideres_por_unidad_value
            ); */
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
                  // resetFunction();
                  console.log('cerrando');
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
