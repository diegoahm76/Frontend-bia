/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Divider, Grid, Stack, TextField } from '@mui/material';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../../../components';
import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';
import Select from 'react-select';
import CleanIcon from '@mui/icons-material/CleaningServices';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../../hooks';
import { getTipoDocumento } from './services/getTipoDocumento.service';
import type { ISeleccionLideresProps } from './types/seleccionLideres.types';
import {
  createLiderUnidadOrganizacional,
  getAsignacionesLideresByIdOrganigrama,
  getPersonaByTipoDocumentoAndNumeroDocumento,
  updateLiderUnidadOrganizacional
} from '../../../../toolkit/LideresThunks/UnidadOrganizacionalThunks';
import { get_unidades_organizacionales_by_id_organigrama_service } from '../../../../toolkit/LideresThunks/OrganigramaLideresThunks';
import SaveIcon from '@mui/icons-material/Save';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';
import { LoadingButton } from '@mui/lab';
import SyncIcon from '@mui/icons-material/Sync';
import {
  get_list_asignaciones_lideres,
  set_asignacion_lideres_current,
  set_unidad_current
} from '../../../../toolkit/LideresSlices/LideresSlice';
import { BusqueAsignacionesLiderModal } from '../ModalBusAvanLider/ModalBusAvanLider';
export const SeleccionLider = (): JSX.Element => {
  //* dispatch declarations
  const dispatch = useAppDispatch();

  //* ----- form control declarations -------
  const {
    control_seleccionar_lideres,
    reset_seleccionar_lideres,
    watch_seleccionar_lideres_value
  } = useLideresXUnidadOrganizacional();

  //* states redux selectors
  const { organigrama_lideres_current, asignacion_lideres_current } =
    useAppSelector((state) => state.lideres_slice);

  //* context declararion
  const { loadingButton, setLoadingButton, openModalBusquedaPersona } =
    useContext(ModalContextLideres);

  // ? ------- use states declarations -------
  const [tiposDocumentos, setTiposDocumentos] = useState<
    ISeleccionLideresProps[]
  >([]);

  // ? use state to set the currentDate
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));

  // ? ------- use states declarations for unitys -------

  const [unidadesOrganizacionales, setUnidadesOrganizacionales] = useState<
    any[]
  >([
    {
      label: '',
      value: ''
    }
  ]);

  // ? ------- use effect declarations -------
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

  // ? useEffect to update the current date each day

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(dayjs().format('YYYY-MM-DD'));
    }, dayjs().endOf('day').diff(dayjs(), 'millisecond'));

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // ? useEffect to get unidades organizacionales organigrama
  useEffect(() => {
    if (!organigrama_lideres_current?.id_organigrama) return;
    void get_unidades_organizacionales_by_id_organigrama_service(
      organigrama_lideres_current?.id_organigrama
    ).then((res: any) => {
      setUnidadesOrganizacionales(
        res?.map((el: any) => ({
          el,
          label: el?.nombre,
          value: el?.id_unidad_organizacional
        }))
      );
    });
  }, [organigrama_lideres_current]);

  // ? useEffect asingaciones lideres current
  useEffect(() => {
    if (!organigrama_lideres_current?.id_organigrama) return;
    reset_seleccionar_lideres({
      tipo_documento: {
        label: asignacion_lideres_current?.tipo_documento,
        value: asignacion_lideres_current?.tipo_documento
      },
      numero_documento: asignacion_lideres_current?.numero_documento,
      nombre_persona: asignacion_lideres_current?.nombre_completo,
      id_persona: asignacion_lideres_current?.id_persona,
      id_unidad_organizacional: {
        label: asignacion_lideres_current?.nombre_unidad_org,
        value: asignacion_lideres_current?.id_unidad_organizacional
      },
      observaciones_asignacion:
        asignacion_lideres_current?.observaciones_asignacion
    });
  }, [asignacion_lideres_current]);

  // * functions

  const cleanElementComponent = (): void => {
    dispatch(set_asignacion_lideres_current({}));
    reset_seleccionar_lideres({
      tipo_documento: {
        label: '',
        value: ''
      },
      numero_documento: '',
      nombre_persona: '',
      id_persona: '',
      id_unidad_organizacional: {
        label: '',
        value: ''
      },
      observaciones_asignacion: ''
    });
  };

  //* onSubmit busqueda persona
  const BusquedaPersona = (): void => {
    void getPersonaByTipoDocumentoAndNumeroDocumento(
      watch_seleccionar_lideres_value.tipo_documento.value,
      watch_seleccionar_lideres_value.numero_documento
    ).then((res) => {
      reset_seleccionar_lideres({
        tipo_documento: {
          label: res?.tipo_documento,
          value: res?.tipo_documento
        },
        numero_documento: res?.numero_documento,
        nombre_persona: res?.nombre_completo,
        id_persona: res?.id_persona,
        id_unidad_organizacional:
          watch_seleccionar_lideres_value?.id_unidad_organizacional,
        observaciones_asignacion:
          watch_seleccionar_lideres_value?.observaciones_asignacion
      });
    });
  };

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Líder - Unidad Organizacional" />
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              const data = {
                id_persona: watch_seleccionar_lideres_value?.id_persona,
                id_unidad_organizacional:
                  watch_seleccionar_lideres_value?.id_unidad_organizacional
                    ?.value,
                observaciones_asignacion:
                  watch_seleccionar_lideres_value?.observaciones_asignacion
              };

              const updateDataFunction = {
                id_lider_unidad_org:
                  asignacion_lideres_current?.id_lider_unidad_org,
                id_persona: watch_seleccionar_lideres_value?.id_persona,
                observaciones_asignacion:
                  watch_seleccionar_lideres_value?.observaciones_asignacion
              };

              asignacion_lideres_current?.id_lider_unidad_org
                ? void updateLiderUnidadOrganizacional(
                    updateDataFunction,
                    setLoadingButton,
                    cleanElementComponent
                  ).then(() => {
                    void getAsignacionesLideresByIdOrganigrama(
                      organigrama_lideres_current?.id_organigrama
                    ).then((res: any) => {
                      //  console.log('')(res);
                      dispatch(get_list_asignaciones_lideres(res));
                    });
                  })
                : void createLiderUnidadOrganizacional(
                    data,
                    setLoadingButton,
                    cleanElementComponent
                  ).then(() => {
                    void getAsignacionesLideresByIdOrganigrama(
                      organigrama_lideres_current?.id_organigrama
                    ).then((res: any) => {
                      //  console.log('')(res);
                      dispatch(get_list_asignaciones_lideres(res));
                    });
                  });
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2} sx={{ mb: '20px', zIndex: 9999 }}>
              <Grid item xs={12} sm={5} zIndex={3}>
                <Controller
                  name="id_unidad_organizacional"
                  control={control_seleccionar_lideres}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: {  }
                  }) => (
                    <div>
                      <Select
                        isDisabled={
                          asignacion_lideres_current?.observaciones_asignacion
                        }
                        value={value}
                        onChange={(selectedOption) => {
                          /* void get_catalogo_TRD_service(
                            selectedOption.value
                          ).then((res) => {
                            //  console.log('')(res);
                            dispatch(set_catalog_trd_action(res));
                          }); */
                          dispatch(set_unidad_current(selectedOption));
                          //  console.log('')(selectedOption);
                          onChange(selectedOption);
                        }}
                        options={unidadesOrganizacionales ?? []}
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
                          Unidad Organizacional
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              {/* <Divider /> */}
            </Grid>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="tipo_documento"
                  control={control_seleccionar_lideres}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          /*  void get_catalogo_TRD_service(
                            selectedOption.value
                          ).then((res) => {
                            //  console.log('')(res);
                            dispatch(set_catalog_trd_action(res));
                          });
*/
                          onChange(selectedOption);
                        }}
                        isDisabled={
                          false
                          /* solo cuando el organigrama que estoy usando esté fuera de producción */
                        }
                        options={tiposDocumentos}
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
                          Tipo de documento
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="numero_documento"
                  control={control_seleccionar_lideres}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: {  }
                  }) => (
                    <TextField
                      fullWidth
                      label="Número de documento"
                      size="small"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      InputLabelProps={{ shrink: true }}
                      // disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  name="nombre_persona"
                  control={control_seleccionar_lideres}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: {  }
                  }) => (
                    <TextField
                      fullWidth
                      label="Nombre de la persona"
                      size="small"
                      multiline
                      rows={1}
                      maxRows={2}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px', alignItems: 'center' }}
            >
              <Button
                color="primary"
                // type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  BusquedaPersona();
                }}
              >
                BUSCAR
              </Button>

              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={cleanElementComponent}
              >
                LIMPIAR CAMPOS
              </Button>

              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={openModalBusquedaPersona}
              >
                BÚSQUEDA AVANZADA LÍDER
              </Button>
            </Stack>

            <Divider />
            <Grid container spacing={2} sx={{ mt: '20px' }}>
              <Grid item xs={12} sm={1.8}>
                <TextField
                  fullWidth
                  label="Fecha asignación"
                  size="small"
                  variant="outlined"
                  value={currentDate}
                  InputLabelProps={{ shrink: true }}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={10.2}>
                <Controller
                  name="observaciones_asignacion"
                  control={control_seleccionar_lideres}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { }
                  }) => (
                    <TextField
                      fullWidth
                      label="Observaciones de la asignación"
                      size="small"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      InputLabelProps={{ shrink: true }}
                      disabled={
                        organigrama_lideres_current?.fecha_retiro_produccion
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: '15px' }}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                spacing={2}
                sx={{
                  mb: '20px',
                  mt: '20px',
                  alignItems: 'center',
                  ml: '20px'
                }}
              >
                <LoadingButton
                  loading={loadingButton}
                  color="success"
                  type="submit"
                  variant="contained"
                  disabled={
                    organigrama_lideres_current?.fecha_retiro_produccion
                  }
                  startIcon={
                    asignacion_lideres_current?.observaciones_asignacion ? (
                      <SyncIcon />
                    ) : (
                      <SaveIcon />
                    )
                  }
                >
                  {asignacion_lideres_current?.observaciones_asignacion
                    ? 'ACTUALIZAR LÍDER'
                    : 'GUARDAR LÍDER'}
                </LoadingButton>
              </Stack>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/* modal búsqueda avanzada de lideres */}
      <BusqueAsignacionesLiderModal
         control_seleccionar_lideres={control_seleccionar_lideres}
         reset_seleccionar_lideres={reset_seleccionar_lideres}
         watch_seleccionar_lideres_value={watch_seleccionar_lideres_value}
      />
      {/* modal búsqueda avanzada de lideres */}
    </>
  );
};
