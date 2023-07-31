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
  Stack
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
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { ModalContextTCA } from '../../../../context/ModalContextTca';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { use_tca } from '../../../../hooks/use_tca';
import { Title } from '../../../../../../../components';
import { choicesTipoClasificacion } from '../../../../screens/utils/choices/tipoClasificacion';
import {
  set_catalog_TCA_action,
  set_catalog_trd_action,
  set_selected_item_from_catalogo_action
} from '../../../../toolkit/TCAResources/slice/TcaSlice';
import {
  create_item_catalogo_tca_service,
  get_catalogo_TCA_service,
  get_catalogo_TRD_service
} from '../../../../toolkit/TCAResources/thunks/TcaServicesThunks';
import { LoadingButton } from '@mui/lab';

export const FormularioAdministracionTCA: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* define show or no show component

  // eslint-disable-next-line no-empty-pattern
  const {
    // modalAdministracionTca,
    // openModalAdministracionTca,
    closeModalAdministracionTca,
    loadingButton,
    setLoadingButton
  } = useContext(ModalContextTCA);
  // * state from tca_slice
  const { tca_current, selected_item_from_catalogo } = useAppSelector(
    (state: any) => state.tca_slice
  );

  const {
    control_administrar_tca,
    reset_administrar_tca,
    // handleSubmit_administrar_tca,
    // formState_administrar_tca,
    watch_administrar_tca_value
  } = use_tca();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateCatalogoTRD = async (id: number) => {
    const res = await get_catalogo_TRD_service(id);
    return dispatch(set_catalog_trd_action(res));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateCatalogoTCA = async (id: number) => {
    const res = await get_catalogo_TCA_service(id);
    return dispatch(set_catalog_TCA_action(res));
  };

  const resetAdministrarTCA = (): void => {
    reset_administrar_tca({
      id_cat_serie_und_ccd_trd: '',
      cod_clas_expediente: {
        value: '',
        label: ''
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmitCreate = async (
    data1: string | number,
    data2: string | number
  ) => {
    const bodyToSend = {
      id_tca: tca_current?.id_tca,
      id_cat_serie_und_ccd_trd: data1,
      cod_clas_expediente: data2
    };
    void create_item_catalogo_tca_service(bodyToSend, setLoadingButton)
      .then(async () => await updateCatalogoTRD(tca_current?.id_trd))
      .then(async () => await updateCatalogoTCA(tca_current?.id_tca))
      .then(() => {
        closeModalAdministracionTca();
        resetAdministrarTCA();
      });
  };

  // ? use effect acceso datos desde button edit para editar administrar tca
  useEffect(() => {
    const comparacion =
      selected_item_from_catalogo?.cod_clas_expediente === 'P'
        ? 'Público'
        : selected_item_from_catalogo?.cod_clas_expediente === 'R'
        ? 'Reservado'
        : selected_item_from_catalogo?.cod_clas_expediente === 'C'
        ? 'Controlado'
        : '';

    reset_administrar_tca({
      cod_clas_expediente: {
        value: selected_item_from_catalogo?.cod_clas_expediente,
        label: comparacion
      },
      id_cat_serie_und_ccd_trd: selected_item_from_catalogo?.id_cat_serie_und_ccd_trd
    });
  }, [selected_item_from_catalogo]);

  /*  const edit_item_onSubmit_trd_catalogo = (): any => {
    const formData = new FormData();
    formData.append(
      'cod_disposicion_final',
      form_data_administrar_trd.cod_disposicion_final.value
    );
    formData.append(
      'digitalizacion_dis_final',
      form_data_administrar_trd.digitalizacion_dis_final
    );



    if (form_data_administrar_trd.justificacion_cambio) {
      formData.append(
        'justificacion_cambio',
        form_data_administrar_trd.justificacion_cambio
      );
    }

    if (form_data_administrar_trd.ruta_archivo_cambio) {
      formData.append(
        'ruta_archivo_cambio',
        form_data_administrar_trd.ruta_archivo_cambio
      );
    }

    dispatch(
      update_item_catalogo_trd(
        formData,
        selected_item_from_catalogo?.id_catserie_unidadorg,
        trd_current
      )
    ).then((res: any) => {
      closeModalAdministracionTRD();
      reset_administrar_trd({
        cod_disposicion_final: '',
        descripcion_procedimiento: '',
        justificacion_cambio: '',
        ruta_archivo_cambio: ''
      });
      setButtonSpecialEditionActualTRD(false);
    });
  }; */

  return (
    <>
      <Grid xs={12}>
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            void (selected_item_from_catalogo?.cod_clas_expediente
              ? console.log('editando bro')
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
              marginTop: '1rem'
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                zIndex: 2
              }}
            >
              <Controller
                name="cod_clas_expediente"
                control={control_administrar_tca}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <div>
                    <Select
                      value={value}
                      onChange={(selectedOption) => {
                        onChange(selectedOption);
                        console.log(selectedOption);
                        // handleSelectedOption(value, onChange);
                      }}
                      options={choicesTipoClasificacion}
                      placeholder="Seleccionar"
                    />
                    <label>
                      <small
                        style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          fontWeight: 'thin',
                          fontSize: '0.75rem'
                        }}
                      >
                        Dispocisión final
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>

            {/* new spaces */}

            {/* justificación del cambio, solo aparece para trd actual */}
            {/* justificación del cambio, solo aparece para trd actual */}
            {/* ruta archivo soporte de cambio, solo aparece en trd actual */}
            {/* SOLO TRD ACTUAL */}

            {/*  {trd_current.actual && buttonSpecialEditionActualTRD ? (
              <>
                <Grid item xs={12} sm={12}>
                    <Controller
                    name="justificacion_cambio"
                    control={control_administrar_trd}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        // margin="dense"
                        fullWidth
                        size="small"
                        label="Justificación del cambio"
                        disabled={false}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar una justificación del cambio'
                            : 'Cambio'
                        }
                        inputProps={{ maxLength: 250 }}
                      />
                    )}
                  /> 
                </Grid>

                <Grid item xs={12} sm={5}>
                   <Controller
                    name="ruta_archivo_cambio"
                    control={control_administrar_trd}
                    defaultValue=""
                    rules={{ required: false }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
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
                            width: '100%'
                          }}
                          startIcon={<CloudUploadIcon />}
                        >
                          {value === '' || value === null
                            ? 'Subir archivo justificación cambio'
                            : 'Archivo subido justificación cambio'}
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            onChange={(e) => {
                              const files = (e.target as HTMLInputElement)
                                .files;
                              if (files && files.length > 0) {
                                onChange(files[0]);
                              }
                            }}
                          />
                        </Button>
                        <label htmlFor="">
                          <small
                            style={{
                              color: 'rgba(0, 0, 0, 0.6)',
                              fontWeight: 'thin',
                              fontSize: '0.75rem'
                            }}
                          >
                            {control_administrar_trd._formValues
                              .ruta_archivo_cambio
                              ? control_administrar_trd._formValues
                                  .ruta_archivo_cambio.name ??
                                control_administrar_trd._formValues.ruta_soporte.replace(
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
            ) : null} */}
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
              color="primary"
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
                console.log('cancelando...');
                reset_administrar_tca({
                  id_cat_serie_und_ccd_trd: '',
                  cod_clas_expediente: {
                    value: '',
                    label: ''
                  }
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
                  // disabled={ccd_current?.actual}
                  onClick={() => {
                    console.log('viendo historial de cambios');
                    // dispatch(get_historical_trd(trd_current.id_trd));
                    // openModalHistorialCambios();
                  }}
                >
                  VER HISTORIAL DE CAMBIOS
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AutoFixHighIcon />}
                  onClick={() => {
                    /* buttonSpecialEditionActualTRD
                      ? setButtonSpecialEditionActualTRD(false)
                      : setButtonSpecialEditionActualTRD(true); */
                    console.log('Edicion especial');
                  }}
                >
                  {/* {buttonSpecialEditionActualTRD
                    ? 'CANCELAR EDICIÓN ESPECIAL'
                    : 'EDICIÓN ESPECIAL'} */}
                  EDICIÓN ESPECIAL
                </Button>
              </>
            ) : null}
          </Stack>
        </Box>
      </Grid>

      {/* Modal historial de cambios TRD ACTUAL */}
      {/* <HistorialDeCambios /> */}
      {/* Modal historial de cambios TRD ACTUAL */}
    </>
  );
};
