/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  // TextField,
} from '@mui/material';
import { useContext /* , useEffect */ } from 'react';
import { Controller } from 'react-hook-form';

import Select from 'react-select';
// import InfoIcon from '@mui/icons-material/Info';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import SyncIcon from '@mui/icons-material/Sync';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { ModalContextTCA } from '../../../../context/ModalContextTca';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { use_tca } from '../../../../hooks/use_tca';
import { Title } from '../../../../../../../components';
import { choicesTipoClasificacion } from '../../../../screens/utils/choices/tipoClasificacion';
import {
  set_catalog_TCA_action,
  set_catalog_trd_action,
  set_mixed_tipologias,
  set_selected_item_from_catalogo_action,
} from '../../../../toolkit/TCAResources/slice/TcaSlice';
import {
  create_item_catalogo_tca_service,
  get_catalogo_TCA_service,
  get_catalogo_TRD_service,
  update_item_catalogo_tca_service,
} from '../../../../toolkit/TCAResources/thunks/TcaServicesThunks';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { HistorialCambiosTCA } from '../../components/HistorialCambiosTCAActual/HistorialCambiosTCA';
import { FILEWEIGHT } from '../../../../../../../fileWeight/fileWeight';
import SecurityIcon from '@mui/icons-material/Security';
import { ModalReservarTipologias } from './../../components/ReservarTipologias/ModalReservarTipologias';
import { useFiles } from '../../../../../../../hooks/useFiles/useFiles';

export const FormularioAdministracionTCA: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* define show or no show component
  const {
    openModalHistorialCambios,
    closeModalAdministracionTca,
    loadingButton,
    setLoadingButton,
    openModalReservaTipologia,
  } = useContext(ModalContextTCA);
  // * state from tca_slice
  const { tca_current, selected_item_from_catalogo, mixed_tipologias } =
    useAppSelector((state: any) => state.tca_slice);

  const { controlar_tamagno_archivos } = useFiles();

  const {
    control_administrar_tca,
    reset_administrar_tca,
    watch_administrar_tca_value,
  } = use_tca();

  const updateCatalogoTRD = async (id: number) => {
    const res = await get_catalogo_TRD_service(id);
    return dispatch(set_catalog_trd_action(res));
  };

  const updateCatalogoTCA = async (id: number) => {
    const res = await get_catalogo_TCA_service(id);
    return dispatch(set_catalog_TCA_action(res));
  };

  const resetAdministrarTCA = (): void => {
    reset_administrar_tca({
      id_cat_serie_und_ccd_trd: '',
      cod_clas_expediente: {
        value: '',
        label: '',
      },
      justificacion_cambio: '',
      ruta_archivo_cambio: '',
    });
  };

  // ? use effect acceso datos desde button edit para editar administrar tca
  useEffect(() => {
    const comparacion =
      selected_item_from_catalogo?.cod_clas_expediente === 'P'
        ? 'Público - P'
        : selected_item_from_catalogo?.cod_clas_expediente === 'R'
        ? 'Reservado - R'
        : selected_item_from_catalogo?.cod_clas_expediente === 'C'
        ? 'Controlado - C'
        : '';

    reset_administrar_tca({
      cod_clas_expediente: {
        value: selected_item_from_catalogo?.cod_clas_expediente,
        label: comparacion,
      },
      id_cat_serie_und_ccd_trd:
        selected_item_from_catalogo?.id_cat_serie_und_ccd_trd,
      justificacion_cambio: selected_item_from_catalogo?.justificacion_cambio,
    });
  }, [selected_item_from_catalogo]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitCreate = async (
    data1: string | number,
    data2: string | number
  ) => {
    const bodyToSend: any = {
      id_tca: tca_current?.id_tca,
      id_cat_serie_und_ccd_trd: data1,
      cod_clas_expediente: data2,
    };

    void create_item_catalogo_tca_service(
      bodyToSend,
      setLoadingButton,
      mixed_tipologias
    )
      .then(async () => await updateCatalogoTRD(tca_current?.id_trd))
      .then(async () => await updateCatalogoTCA(tca_current?.id_tca))
      .then(() => {
        closeModalAdministracionTca();
        resetAdministrarTCA();
        dispatch(set_mixed_tipologias([]));
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const edit_item_onSubmit_tca_catalogo = (): any => {
    const formData = new FormData();
    const dato: any = watch_administrar_tca_value?.cod_clas_expediente?.value;

    formData.append('cod_clas_expediente', dato);
    if (watch_administrar_tca_value.justificacion_cambio) {
      formData.append(
        'justificacion_cambio',
        watch_administrar_tca_value.justificacion_cambio
      );
    }
    if (watch_administrar_tca_value.ruta_archivo_cambio) {
      formData.append(
        'ruta_archivo_cambio',
        watch_administrar_tca_value.ruta_archivo_cambio
      );
    }

    if (mixed_tipologias.length > 0) {
      formData.append(
        'tipologias_reservadas',
        JSON.stringify(mixed_tipologias)
      );
    }

    void update_item_catalogo_tca_service(
      formData,
      selected_item_from_catalogo?.id_cat_serie_unidad_org_ccd_trd_tca,
      setLoadingButton
    )
      .then(async () => await updateCatalogoTRD(tca_current?.id_trd))
      .then(async () => await updateCatalogoTCA(tca_current?.id_tca))
      .then(() => {
        closeModalAdministracionTca();
        resetAdministrarTCA();
        dispatch(set_mixed_tipologias([]));
      });
  };

  return (
    <>
      <Grid xs={12}>
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            void (selected_item_from_catalogo?.cod_clas_expediente
              ? edit_item_onSubmit_tca_catalogo()
              : onSubmitCreate(
                  selected_item_from_catalogo?.id_catserie_unidadorg,
                  watch_administrar_tca_value?.cod_clas_expediente?.value
                ));
          }}
          sx={{ width: '100%' }}
        >
          <Title title="Agregrar Características" />

          <Grid
            container
            spacing={2}
            sx={{
              marginTop: '1rem',
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                zIndex: 2,
              }}
            >
              <Controller
                name="cod_clas_expediente"
                control={control_administrar_tca}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div>
                    <Select
                      value={value}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                      }}
                      options={choicesTipoClasificacion}
                      placeholder="Seleccionar"
                    />
                    <label>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem',
                        }}
                      >
                        Tipo de clasificación
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>

            {/* módulo nuevo, reserva de tipologías  */}

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                zIndex: 2,
              }}
            >
              <Button
                color="warning"
                variant="outlined"
                startIcon={<SecurityIcon />}
                onClick={openModalReservaTipologia}
              >
                RESERVAR TIPOLOGÍAS
              </Button>
            </Grid>

            {/* módulo nuevo, reserva de tipologías --> */}

            {/* new spaces */}

            {/* justificación del cambio, solo aparece para trd actual */}
            {/* ruta archivo soporte de cambio, solo aparece en trd actual */}
            {/* SOLO TRD ACTUAL */}

            {tca_current.actual &&
            selected_item_from_catalogo?.cod_clas_expediente ? (
              <>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="justificacion_cambio"
                    control={control_administrar_tca}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth
                        size="small"
                        label="Justificación del cambio"
                        disabled={false}
                        variant="outlined"
                        value={value}
                        onChange={(e: any) => {
                          if (e.target.value.length === 1000) {
                            control_warning(
                              'Precaución: El campo justificación del cambio solo permite 1000 caracteres'
                            );
                          }
                          onChange(e.target.value);
                        }}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar una justificación del cambio'
                            : 'Cambio'
                        }
                        inputProps={{ maxLength: 1000 }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <Controller
                    name="ruta_archivo_cambio"
                    control={control_administrar_tca}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Button
                          variant={
                            value === '' || value === null
                              ? 'outlined'
                              : 'contained'
                          }
                          component="label"
                          style={{
                            width: '100%',
                          }}
                          startIcon={<CloudUploadIcon />}
                        >
                          {value === '' || value === null
                            ? 'Subir archivo justificación cambio'
                            : 'Archivo subido justificación cambio'}
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            // accept="application/pdf"
                            onChange={(e) => {
                              const files = (e.target as HTMLInputElement)
                                .files;
                              if (files && files.length > 0) {
                                const file = files[0];
                                controlar_tamagno_archivos(file, onChange);
                              }
                            }}
                          />
                        </Button>
                        <label htmlFor="">
                          <small
                            style={{
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: 'thin',
                              fontSize: '0.75rem',
                            }}
                          >
                            {control_administrar_tca._formValues
                              .ruta_archivo_cambio
                              ? control_administrar_tca._formValues
                                  .ruta_archivo_cambio.name ??
                                control_administrar_tca._formValues.ruta_soporte.replace(
                                  /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                                  ''
                                )
                              : 'Seleccione archivo'}
                          </small>
                        </label>
                      </>
                    )}
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
          <Stack
            justifyContent="flex-end"
            direction="row"
            spacing={2}
            sx={{ marginTop: '1.5rem' }}
          >
            <LoadingButton
              loading={loadingButton}
              variant="contained"
              color="success"
              type="submit"
              startIcon={
                selected_item_from_catalogo?.cod_clas_expediente ? (
                  <SyncIcon />
                ) : (
                  <SaveIcon />
                )
              }
            >
              {selected_item_from_catalogo?.cod_clas_expediente
                ? 'Actualizar'
                : 'Guardar'}
            </LoadingButton>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => {
                reset_administrar_tca({
                  id_cat_serie_und_ccd_trd: '',
                  cod_clas_expediente: {
                    value: '',
                    label: '',
                  },
                });
                closeModalAdministracionTca();
                dispatch(set_selected_item_from_catalogo_action(null));
              }}
            >
              SALIR Y CANCELAR
            </Button>

            {tca_current.actual &&
            selected_item_from_catalogo?.cod_clas_expediente ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<VisibilityIcon />}
                  onClick={() => {
                    //  console.log('')('viendo historial de cambios');
                    openModalHistorialCambios();
                  }}
                >
                  VER HISTORIAL DE CAMBIOS
                </Button>
              </>
            ) : null}
          </Stack>
        </Box>
      </Grid>

      {/* Modal historial de cambios TRD ACTUAL */}
      <HistorialCambiosTCA />
      {/* Modal historial de cambios TRD ACTUAL */}

      {/* Modal reserva de tipologías documentales */}
      <ModalReservarTipologias />
      {/* Modal reserva de tipologías documentales */}
    </>
  );
};
