/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

//! libraries or frameworks
import { useContext, type FC, useEffect, useState } from 'react';
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

import { AvatarStyles } from '../../../../../../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/constant';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';
import Select from 'react-select';

import { columnsModalBusAvanLider } from './columns/columsBusAvanLider';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { getPersonaByFilter } from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';
import {
  get_list_busqueda_avanzada_personas,
  set_asignacion_lideres_current,
} from '../../../../toolkit/LideresSlices/LideresSlice';
import { getTipoDocumento } from '../SeleccionLider/services/getTipoDocumento.service';
import { ISeleccionLideresProps } from '../SeleccionLider/types/seleccionLideres.types';
import { RenderDataGrid } from '../../../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';

export const BusqueAsignacionesLiderModal = ({
  control_seleccionar_lideres,
  reset_seleccionar_lideres,
  watch_seleccionar_lideres_value,
}: {
  control_seleccionar_lideres: any;
  reset_seleccionar_lideres: any;
  watch_seleccionar_lideres_value: any;
}): JSX.Element => {
  // * dispatch to use in the component * //
  const dispatch = useAppDispatch();

  //* -------- hook declaration -------- *//

  //* -------- use selector declaration -------- *//
  const {
    organigrama_lideres_current,
    unidad_current,
    busqueda_avanzada_personas_list,
    asignacion_lideres_current,
  } = useAppSelector((state) => state.lideres_slice);

  // ? ------- use states declarations -------
  const [tiposDocumentos, setTiposDocumentos] = useState<
    ISeleccionLideresProps[]
  >([]);

  useEffect(() => {
    void getTipoDocumento()
      .then((res) => {
        const filterDocumentos = res?.filter(
          (item: ISeleccionLideresProps) => item.value !== 'NT'
        );
        setTiposDocumentos(filterDocumentos);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
  }, []);

  // ? useContext declaration
  const {
    modalBusquedaPersona,
    closeModalBusquedaPersona,
    loadingButton,
    setLoadingButton,
  } = useContext(ModalContextLideres);

  const resetFunction = (): void => {
    reset_seleccionar_lideres({
      ...watch_seleccionar_lideres_value,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      id_unidad_organizacional_actual: {
        value: null,
        label: 'Seleccionar',
      },
    });
  };

  const closeModal = (): any => {
    closeModalBusquedaPersona();
    dispatch(get_list_busqueda_avanzada_personas([]));
    resetFunction();
    //  console.log('')('Im the close function');
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
              //  console.log('')(params.row);
              //* REVISAR LO DEL ID ORGANIGRAMA

              // ! ACTUALIZA EL ORGANIGRAMA
              //  dispatch(set_organigrama_lideres_current(params.row));

              // ! ACTUALIZA LA ASIGNACION DE LIDER
              console.log(params.row);
              dispatch(
                set_asignacion_lideres_current({
                  ...asignacion_lideres_current,
                  ...params.row,
                })
              );

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
                      //  console.log('')(res);
                      dispatch(get_list_asignaciones_lideres(res));
                    });
              */

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
    ...columnsModalBusAvanLider,
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={modalBusquedaPersona}
        onClose={closeModal}
        sx={{
          minHeight: '600px'
        }}
      >
        <Box
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            const {
              tipo_documento,
              numero_documento,
              primer_nombre,
              segundo_nombre,
              primer_apellido,
              segundo_apellido,
              id_unidad_organizacional_actual,
            } = watch_seleccionar_lideres_value || {};
            //watch_asignaciones_lider_by_unidad_value
            try {
              const unidad = id_unidad_organizacional_actual?.value
                ? unidad_current?.value ||
                  asignacion_lideres_current?.id_unidad_organizacional
                : '';

              const data = await getPersonaByFilter(
                tipo_documento?.value || '',
                numero_documento || '',
                primer_nombre || '',
                segundo_nombre || '',
                primer_apellido || '',
                segundo_apellido || '',
                unidad || '',
                setLoadingButton || '',
                () => {}
                // resetFunction ()=>ñ
              );

              dispatch(get_list_busqueda_avanzada_personas(data));
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }}
        >
          <DialogTitle>
            <Title title="Búsqueda avanzada de personas para líderes unidades organizacionales" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 5,
                }}
              >
                <Controller
                  name="tipo_documento"
                  control={control_seleccionar_lideres}
                  defaultValue=""
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <div>
                    <Select
                      //inputRef={ref}
                      options={tiposDocumentos} // options should be an array of objects with 'value' and
                      value={value} // set selected value
                      onChange={onChange} // update value when option is selected
                      isSearchable
                      placeholder="Tipo de documento"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: error ? 'red' : provided.borderColor,
                        }),
                      }}
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
                      Tipo de documento
                    </small>
                  </label>
                </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="numero_documento"
                  control={control_seleccionar_lideres}
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
                  control={control_seleccionar_lideres}
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
                  control={control_seleccionar_lideres}
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
                  control={control_seleccionar_lideres}
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
                  control={control_seleccionar_lideres}
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
              {organigrama_lideres_current?.actual ? (
                <Grid item xs={12} sm={3} zIndex={5}>
                  <Controller
                    name="id_unidad_organizacional_actual"
                    control={control_seleccionar_lideres}
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
                              value: null,
                              label: 'Seleccionar',
                            },
                            {
                              value: true,
                              label: 'SI',
                            },
                            {
                              value: false,
                              label: 'NO',
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
                rows={busqueda_avanzada_personas_list ?? []}
                columns={columns_busqueda_avanzada_persona ?? []}
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
