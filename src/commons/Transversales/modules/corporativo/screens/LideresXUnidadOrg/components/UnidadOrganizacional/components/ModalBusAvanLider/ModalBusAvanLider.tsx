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
  TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { type GridColDef, DataGrid } from '@mui/x-data-grid';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';
import Select from 'react-select';

import { columnsModalBusAvanLider } from './columns/columsBusAvanLider';
import { useAppSelector } from '../../../../../../../../../../hooks';
import { getPersonaByFilter } from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';

export const BusqueAsignacionesLiderModal: FC = (): JSX.Element => {
  // * dispatch to use in the component * //
  // const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//
  const {
    control_buscar_asignaciones_lideres_por_unidad,
    reset_buscar_asignaciones_lideres_por_unidad,
    watch_asignaciones_lider_by_unidad_value,
    watch_seleccionar_lideres
  } = useLideresXUnidadOrganizacional();

  //* -------- use selector declaration -------- *//
  const { organigrama_lideres_current } = useAppSelector(
    (state) => state.lideres_slice
  );

  // ? useContext declaration
  const {
    modalBusquedaPersona,
    closeModalBusquedaPersona,
    loadingButton,
    setLoadingButton
  } = useContext(ModalContextLideres);

  const resetFunction = (): void => {
    console.log('cleaning fields of the form');
    reset_buscar_asignaciones_lideres_por_unidad({
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      id_unidad_organizacional_actual: {
        value: null,
        label: 'Seleccionar'
      }
    });
  };

  const closeModal = (): any => {
    closeModalBusquedaPersona();
    /* 
    dispatch(get_list_busqueda_avanzada_personas([]));
    resetFunction(); */
    console.log('Im the close function');
  };

  //* -------- columns declaration -------- *//
  const columns_busqueda_avanzada_persona: GridColDef[] = [
    {
      headerName: 'Acción',
      field: 'accion',
      width: 80,
      renderCell: (params: any) => (
        <>
          <IconButton
            onClick={() => {
              console.log(params.row);
              //* REVISAR LO DEL ID ORGANIGRAMA

              // ! ACTUALIZA EL ORGANIGRAMA
              //  dispatch(set_organigrama_lideres_current(params.row));

              // ! ACTUALIZA LA ASIGNACION DE LIDER
              // dispatch(set_asignacion_lideres_current(params.row));

              // ! ACTUALIZA LA LISTA DE UNIDADES ORGANIZACIONALES
              /* void get_asignaciones_lideres_by_id_organigrama_service(52).then(
                (data: any) => {
                  dispatch(get_list_asignaciones_lideres(data));
                }
              ); */

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

              // closeModal();
            }}
          >
            <Avatar sx={AvatarStyles} variant="rounded">
              <HowToRegIcon
                titleAccess="Ver Organigrama"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      )
    },
    ...columnsModalBusAvanLider
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalBusquedaPersona}
        onClose={closeModal}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log('buscando personas para asignar como líderes');
            void getPersonaByFilter(
              watch_asignaciones_lider_by_unidad_value?.tipo_documento,
              watch_asignaciones_lider_by_unidad_value?.numero_documento,
              watch_asignaciones_lider_by_unidad_value?.primer_nombre,
              watch_asignaciones_lider_by_unidad_value?.segundo_nombre,
              watch_asignaciones_lider_by_unidad_value?.primer_apellido,
              watch_asignaciones_lider_by_unidad_value?.segundo_apellido,
              //* revisar esto, ya que se está enviando el valor seleccionado y no el objeto completo o el id de la unidad organizacional correspondiente
              watch_seleccionar_lideres?.value,
              setLoadingButton,
              resetFunction
            ); /* .then((data: any) => {
              dispatch(get_list_busqueda_avanzada_personas(data));
            }); */
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
                  name="tipo_documento"
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
                  control={control_buscar_asignaciones_lideres_por_unidad}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
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
              {organigrama_lideres_current?.actual ? (
                <Grid item xs={12} sm={3} zIndex={5}>
                  <Controller
                    name="id_unidad_organizacional_actual"
                    control={control_buscar_asignaciones_lideres_por_unidad}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <div>
                        <Select
                          /* isDisabled={
                            asignacion_lideres_current?.observaciones_asignacion
                          } */
                          value={value}
                          onChange={(selectedOption) => {
                            /* void get_catalogo_TRD_service(
                            selectedOption.value
                          ).then((res) => {
                            console.log(res);
                            dispatch(set_catalog_trd_action(res));
                          }); */
                            console.log(selectedOption);
                            onChange(selectedOption);
                          }}
                          options={[
                            {
                              value: null,
                              label: 'Seleccionar'
                            },
                            {
                              value: true,
                              label: 'SI'
                            },
                            {
                              value: false,
                              label: 'NO'
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
                            Unidad Organizacional Actual
                          </small>
                        </label>
                      </div>
                    )}
                  />
                </Grid>
              ) : null}

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
              rows={[]}
              columns={columns_busqueda_avanzada_persona}
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
