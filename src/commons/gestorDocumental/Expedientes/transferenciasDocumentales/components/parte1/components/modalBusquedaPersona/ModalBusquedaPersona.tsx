/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

//! libraries or frameworks
import { useContext, type FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  Grid,
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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

/*import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';*/
import Select from 'react-select';
import { useAppDispatch } from '../../../../../../../../hooks';
import { AvatarStyles } from '../../../../../../ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../components';

/*import { getPersonaByFilter } from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';
import {
  get_list_busqueda_avanzada_personas,
  set_asignacion_lideres_current
} from '../../../../toolkit/LideresSlices/LideresSlice';*/

export const BusquedaPersonas = ({
  controlHistorialTransferencias,
  resetHistorialTransferencias,
  watchHistorialTransferenciasExe,
}: {
  controlHistorialTransferencias: any;
  resetHistorialTransferencias: any;
  watchHistorialTransferenciasExe: any;
}): JSX.Element => {
  /*  USAR LA FUNCION DE LA BUSQUEDA AVANZADA DE LA PERSONA */
  /* export const search_avanzada = async ({
    tipo_documento,
    numero_documento,
    primer_nombre,
    primer_apellido,
    razon_social,
    nombre_comercial
  }: BusquedaAvanzada): Promise<AxiosResponse<ResponseServer<InfoPersona[]>>> => {
    return await api.get<ResponseServer<InfoPersona[]>>(
      `personas/get-personas-filters/?tipo_documento=${tipo_documento??''}&numero_documento=${numero_documento??''}&primer_nombre=${
        primer_nombre ?? ''
      }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
        razon_social ?? ''
      }&nombre_comercial=${nombre_comercial ?? ''}`
    );
  };
  */

  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//
  /*  const {
    control_buscar_asignaciones_lideres_por_unidad,
    reset_buscar_asignaciones_lideres_por_unidad,
    watch_asignaciones_lider_by_unidad_value
  } = useLideresXUnidadOrganizacional();*/

  //* -------- use selector declaration -------- *//
  /*  const {
    organigrama_lideres_current,
    unidad_current,
    busqueda_avanzada_personas_list,
    asignacion_lideres_current
  } = useAppSelector((state) => state.lideres_slice);
*/
  // ? useContext declaration
  /*  const {
    modalBusquedaPersona,
    closeModalBusquedaPersona,
    loadingButton,
    setLoadingButton
  } = useContext(ModalContextLideres);
*/
  const resetFunction = (): void => {
    console.log('Im the reset function');
  };

  const closeModal = (): any => {
    /*  closeModalBusquedaPersona();
    dispatch(get_list_busqueda_avanzada_personas([]));*/
    resetFunction();
    //  console.log('')('Im the close function');
  };

  //* -------- columns declaration -------- *//
  const columnsBusquedaPersona: GridColDef[] = [
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              // dispatch(set_asignacion_lideres_current(params.row));

              closeModal();
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <HowToRegIcon
                titleAccess="Seleccionar Persona"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
    // ...columnsModalBusAvanLider,
  ];

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={true} onClose={closeModal}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            /* void getPersonaByFilter(
              watch_asignaciones_lider_by_unidad_value?.tipo_documento,
              watch_asignaciones_lider_by_unidad_value?.numero_documento,
              watch_asignaciones_lider_by_unidad_value?.primer_nombre,
              watch_asignaciones_lider_by_unidad_value?.segundo_nombre,
              watch_asignaciones_lider_by_unidad_value?.primer_apellido,
              watch_asignaciones_lider_by_unidad_value?.segundo_apellido,
              watch_asignaciones_lider_by_unidad_value
                ?.id_unidad_organizacional_actual?.value
                ? unidad_current?.value ||
                    asignacion_lideres_current?.id_unidad_organizacional
                : '',
              setLoadingButton,
              resetFunction
            ).then((data: any) => {
              dispatch(get_list_busqueda_avanzada_personas(data));
            });*/
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda avanzada de personas" />
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
                  name="tipo_documento"
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
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
                  control={controlHistorialTransferencias}
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
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
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
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
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
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
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
                  control={controlHistorialTransferencias}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
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
              rows={[] ?? []}
              columns={[] ?? []}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(_row) => uuidv4()}
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
                onClick={() => {
                  resetFunction();
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR BÚSQUEDA
              </Button>
              <Button
                variant="contained"
                color="error"
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
