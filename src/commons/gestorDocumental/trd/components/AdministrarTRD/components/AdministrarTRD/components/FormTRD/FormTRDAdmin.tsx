/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  // Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { useContext } from 'react';
import { ModalContextTRD } from '../../../../../../context/ModalsContextTrd';
import { Controller } from 'react-hook-form';
import { use_trd } from '../../../../../../hooks/use_trd';
import Select from 'react-select';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

import { DownloadButton } from '../../../../../../../../../utils/DownloadButton/DownLoadButton';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../../../../../../hooks';
import { ItemSeleccionado } from './components/ItemSeleccionado/ItemSeleccionado';
import { TipologiasAsociadasATRD } from './components/TipologiasAsociadasATRD/TipologiasAsociadasATRD';
import { EstablecerTipologias } from './components/EstablecerTipologias/EstablecerTipologias';
import SyncIcon from '@mui/icons-material/Sync';
import { create_item_catalogo_trd } from '../../../../../../toolkit/TRDResources/thunks/TRDResourcesThunks';

const options_dispocision_final = [
  { value: 'C', label: 'Conservación Total' },
  { value: 'E', label: 'Eliminación' },
  { value: 'S', label: 'Selección' }
];

export const FormTRDAdmin = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* define show or no show component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { closeModalAdministracionTRD } = useContext(ModalContextTRD);

  // * state from trd_slice
  const {
    trd_current,
    selected_item_from_catalogo_trd,
    nuevasTipologias,
    // tipologias_asociadas_a_trd
  } = useAppSelector((state) => state.trd_slice);

  const {
    control_administrar_trd,
    form_data_administrar_trd,
    // handleSubmit: handleSubmitBusquedaTipologiasDocumentales,
    // formState: { errors },
    reset_administrar_trd,
    // watch_administrar_trd
  } = use_trd();

  return (
    <>
      <ItemSeleccionado />

      <Grid xs={12}>
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            const elementsToSendCreate = {
              id_ccd: trd_current.id_ccd,
              id_organigrama: trd_current.id_organigrama,
              id_trd: trd_current.id_trd,
              id_cat_serie_und:
                selected_item_from_catalogo_trd.id_cat_serie_und,
              cod_disposicion_final:
                form_data_administrar_trd.cod_disposicion_final.value,
              digitalizacion_dis_final:
                form_data_administrar_trd.digitalizacion_dis_final,
              tiempo_retencion_ag:
                form_data_administrar_trd.tiempo_retencion_ag,
              tiempo_retencion_ac:
                form_data_administrar_trd.tiempo_retencion_ac,
              descripcion_procedimiento:
                form_data_administrar_trd.descripcion_procedimiento,
            };
            /* tipologias:
                nuevasTipologias.length > 0
                  ? nuevasTipologias.map((el: any) => {
                      return {
                        id_tipologia_documental: el.id_tipologia_documental,
                        activo: el.activo
                      };
                    })
                  : tipologias_asociadas_a_trd.map((el: any) => {
                      return {
                        id_tipologia_documental: el.id_tipologia_documental,
                        activo: el.activo
                      };
                    }) */
           // console.log('elementsToSendCreate', elementsToSendCreate);
            dispatch(create_item_catalogo_trd(elementsToSendCreate, nuevasTipologias)).then(
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
              }
            );
          }}
          sx={{ width: '100%' }}
        >
          <Title title="Agregrar Características" />

          <Grid
            container
            spacing={2}
            sx={{
              marginTop: '1.5rem'
            }}
          >
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                zIndex: 2
              }}
            >
              <Controller
                name="cod_disposicion_final"
                control={control_administrar_trd}
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
                        // handleSelectedOption(value, onChange);
                      }}
                      // isDisabled={!control_format_documental_type._formValues.item.value}
                      options={options_dispocision_final}
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

            <Grid item xs={12} sm={3}>
              <Controller
                name="digitalizacion_dis_final"
                control={control_administrar_trd}
                defaultValue=""
                // rules={{ required: false }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          // name="checkedB"
                          color="primary"
                        />
                      }
                      label={
                        value ? (
                          <Typography variant="body2">
                            <strong>digitalización - SI</strong>
                            <Tooltip
                              title="digitalización - SI"
                              placement="right"
                            >
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'green'
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            <strong>digitalización - NO</strong>
                            <Tooltip
                              title="digitalización - NO"
                              placement="right"
                            >
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'orange'
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        )
                      }
                    />
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Controller
                name="tiempo_retencion_ag"
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
                    // disabled={ccd_current?.actual}
                    size="small"
                    label="Tiempo de retención AG"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={error != null ? 'campo obligatorio' : 'años'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="tiempo_retencion_ac"
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
                    // disabled={ccd_current?.actual}
                    size="small"
                    label="Tiempo de retención AC"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={error != null ? 'campo obligatorio' : 'años'}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="descripcion_procedimiento"
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
                    //  disabled={ccd_current?.actual}
                    size="small"
                    label="Descripción del procedimiento"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar una descripción del procedimiento'
                        : 'Procedimiento'
                    }
                  />
                )}
              />
            </Grid>
            {/* new spaces */}

            {/* justificación del cambio, solo aparece para trd actual */}
            {/* SOLO TRD ACTUAL */}
            {trd_current.actual ? (
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
                        /* sx={{
                        color: series_ccd.length > 0 || ccd_current?.fecha_terminado ? 'red' : 'blue'
                      }} */

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
                      />
                    )}
                  />
                </Grid>
                {/* justificación del cambio, solo aparece para trd actual */}
                {/* ruta archivo soporte de cambio, solo aparece en trd actual */}
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
                            // marginTop: '.15rem',
                            width: '100%'
                            // height: '56px'
                          }}
                          startIcon={<CloudUploadIcon />}
                        >
                          {value === '' || value === null
                            ? 'Subir archivo justificación cambio'
                            : 'Archivo subido justificación cambio'}
                          <input
                            style={{ display: 'none' }}
                            type="file"
                            // disabled={control_administrar_trd?.actual}
                            onChange={(e) => {
                              // console.log('valueeee', value);
                              const files = (e.target as HTMLInputElement)
                                .files;
                              if (files && files.length > 0) {
                                onChange(files[0]);
                                // console.log(files[0]);
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
                {/* boton descarga justifacion del cambio en trd actual */}
                <Grid item xs={12} sm={2}>
                  <DownloadButton
                    fileName="ruta_archivo_cambio"
                    condition={
                      true
                      // control_administrar_trd._formValues.ruta_archivo_cambio
                    }
                    fileUrl={trd_current?.ruta_archivo_cambio}
                  />
                </Grid>
                {/* boton descarga justifacion del cambio en trd actual - fin */}
                {/* ruta archivo soporte de cambio, solo aparece en trd actual - fin */}
              </>
            ) : null}

            {/* tipologias asociadas a trd inicio */}

            <TipologiasAsociadasATRD />

            {/* tipologias asociadas a trd fin */}
          </Grid>
          <Stack direction="row" spacing={2} sx={{ marginTop: '.15rem' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={
                selected_item_from_catalogo_trd.nombre_unidad ? (
                  <SyncIcon />
                ) : (
                  <SaveIcon />
                )
              }
              // disabled={ccd_current?.actual}
            >
              {selected_item_from_catalogo_trd.nombre_unidad
                ? 'Actualizar'
                : 'Guardar'}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              // disabled={ccd_current?.actual}
              onClick={() => {
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
                closeModalAdministracionTRD();
              }}
            >
              SALIR Y CANCELAR
            </Button>
          </Stack>
        </Box>
      </Grid>

      {/* establecer tipologias */}
      {/* poner modal de manejo para establecer tipologias a un TRD */}
      <EstablecerTipologias />
      {/* end new spaces */}
    </>
  );
};
