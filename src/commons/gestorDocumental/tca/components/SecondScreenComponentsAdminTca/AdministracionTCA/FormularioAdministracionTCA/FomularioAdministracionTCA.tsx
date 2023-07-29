/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
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
import { set_selected_item_from_catalogo_action } from '../../../../toolkit/TCAResources/slice/TcaSlice';

export const FormularioAdministracionTCA: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* define show or no show component

  // eslint-disable-next-line no-empty-pattern
  const {
    // modalAdministracionTca,
    // openModalAdministracionTca,
    closeModalAdministracionTca
  } = useContext(ModalContextTCA);
  // * state from tca_slice
  const { tca_current, selected_item_from_catalogo } = useAppSelector(
    (state: any) => state.tca_slice
  );

  const {
    control_administrar_tca,
    reset_administrar_tca
    // handleSubmit_administrar_tca,
    // formState_administrar_tca,
    // watch_administrar_tca_value,
  } = use_tca();

  // ? use effect acceso datos desde button edit para editar administrar trd
  /*  useEffect(() => {
    console.log(
      'selected_item_from_catalogo_trd',
      selected_item_from_catalogo_trd
    );
    reset_administrar_trd({
      cod_disposicion_final: {
        value: selected_item_from_catalogo_trd?.cod_disposicion_final,
        label: selected_item_from_catalogo_trd?.cod_disposicion_final
      },
      digitalizacion_dis_final:
        selected_item_from_catalogo_trd?.digitalizacion_dis_final,
      tiempo_retencion_ag: selected_item_from_catalogo_trd?.tiempo_retencion_ag,
      tiempo_retencion_ac: selected_item_from_catalogo_trd?.tiempo_retencion_ac,
      descripcion_procedimiento:
        selected_item_from_catalogo_trd?.descripcion_procedimiento,
      justificacion_cambio:
        selected_item_from_catalogo_trd?.justificacion_cambio
    });
  }, [selected_item_from_catalogo_trd]); */

  /*  const create_item_onSubmit_trd_catalogo = (): any => {
    const tipologias =
      nuevasTipologias.length > 0
        ? nuevasTipologias.map((el: any) => {
            return el.id_tipologia_documental;
          })
        : tipologias_asociadas_a_trd.map((el: any) => {
            return el.id_tipologia_documental;
          }) ?? [];

    const elementsToSendCreate = {
      id_ccd: trd_current.id_ccd,
      id_organigrama: trd_current.id_organigrama,
      id_trd: trd_current.id_trd,
      id_cat_serie_und: selected_item_from_catalogo_trd?.id_cat_serie_und,
      cod_disposicion_final:
        form_data_administrar_trd.cod_disposicion_final.value,
      digitalizacion_dis_final:
        form_data_administrar_trd.digitalizacion_dis_final,
      tiempo_retencion_ag: form_data_administrar_trd.tiempo_retencion_ag,
      tiempo_retencion_ac: form_data_administrar_trd.tiempo_retencion_ac,
      descripcion_procedimiento:
        form_data_administrar_trd.descripcion_procedimiento
    };
    dispatch(create_item_catalogo_trd(elementsToSendCreate, tipologias)).then(
      (res: any) => {
        closeModalAdministracionTRD();
        reset_administrar_trd({
          cod_disposicion_final: '',
          digitalizacion_dis_final: true,
          tiempo_retencion_ag: '',
          tiempo_retencion_ac: '',
          descripcion_procedimiento: '',
          justificacion_cambio: '',
          tipologias: [],
          ruta_archivo_cambio: ''
        });
        dispatch(add_tipologia_documental_to_trd([]));
        setButtonSpecialEditionActualTRD(false);
      }
    );
  }; */

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
    formData.append(
      'tiempo_retencion_ag',
      form_data_administrar_trd.tiempo_retencion_ag
    );
    formData.append(
      'tiempo_retencion_ac',
      form_data_administrar_trd.tiempo_retencion_ac
    );
    formData.append(
      'descripcion_procedimiento',
      form_data_administrar_trd.descripcion_procedimiento
    );

    if (nuevasTipologias.length > 0) {
      const o = nuevasTipologias.map((el: any) => {
        return {
          id_tipologia_documental: el.id_tipologia_documental,
          activo: el.activo
        };
      });
      formData.append('tipologias', JSON.stringify(o));
    } else {
      const t = tipologias_asociadas_a_trd.map((el: any) => {
        return {
          id_tipologia_documental: el.id_tipologia_documental,
          activo: el.activo
        };
      });
      formData.append('tipologias', JSON.stringify(t));
    }

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
        selected_item_from_catalogo_trd?.id_catserie_unidadorg,
        trd_current
      )
    ).then((res: any) => {
      closeModalAdministracionTRD();
      reset_administrar_trd({
        cod_disposicion_final: '',
        digitalizacion_dis_final: true,
        tiempo_retencion_ag: '',
        tiempo_retencion_ac: '',
        descripcion_procedimiento: '',
        justificacion_cambio: '',
        tipologias: [],
        ruta_archivo_cambio: ''
      });
      dispatch(add_tipologia_documental_to_trd([]));
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
            console.log('submit siuuuu');
            /* selected_item_from_catalogo_trd?.cod_clas_expediente
              ? edit_item_onSubmit_trd_catalogo()
              : create_item_onSubmit_trd_catalogo(); */
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
                      // isDisabled={!control_format_documental_type._formValues.item.value}
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
                        {/* {trd_current != null
                            ? `CCD seleccionado`
                            : `CDD's no usados en otro TRD`} */}
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
            <Button
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
              // disabled={ccd_current?.actual}
            >
              {selected_item_from_catalogo?.cod_clas_expediente
                ? 'Actualizar'
                : 'Guardar'}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              // disabled={ccd_current?.actual}
              onClick={() => {
                console.log('cancelando...');
                reset_administrar_tca({
                  id_cat_serie_und_ccd_trd: '',
                  cod_clas_expediente: ''
                });
                closeModalAdministracionTca();
                dispatch(set_selected_item_from_catalogo_action(null));
              }}
            >
              SALIR Y CANCELAR
            </Button>

            {!tca_current.actual &&
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
