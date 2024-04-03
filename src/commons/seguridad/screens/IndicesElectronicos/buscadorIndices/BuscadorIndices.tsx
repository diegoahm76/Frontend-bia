/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Title } from '../../../../../components/Title';
import { Controller, useForm } from 'react-hook-form';
import { control_error } from '../../../../../helpers';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Select from 'react-select';
import { getExpedientesByFiltro } from '../services/getExpedientes.service';
import { getSeriesByCcd } from '../services/busqueda/getSeriesByCcd.service';
import { getSubseriesBySeriesId } from '../services/busqueda/getSubseriesBySeriesId.service';

export const BuscarExpedienteIndicesElectronicos = (
  props: any
): JSX.Element => {
  const {
    setData,
    setXmlToJsonisTrue,
    setDataIndice,
    dataInicialSelects,
    setdataInicialSelects,
  } = props;

  const [loading, setLoadingButton] = useState<boolean>(false);

  // ! use form declaration
  const {
    control: controlBusquedaExpediente,
    reset: resetBusquedaExpediente,
    watch: watchBusquedaExpediente,
  } = useForm({
    defaultValues: {
      titulo_expediente: '',
      fecha_apertura_expediente: '',
      id_trd_origen: {
        value: '',
        label: '',
      },
      id_serie_origen: {
        value: '',
        label: '',
      },
      id_subserie_origen: {
        value: '',
        label: '',
      },
      fecha_inicio_expediente: '',
      fecha_fin_expediente: '',

      //* revisar este par
      tipoDeExpediente: {
        value: '',
        label: '',
      },
      consecutivo: '',
    },
  });

  const exeWatch = watchBusquedaExpediente();

  const onSubmitElectronicIndex: any = async (): Promise<any> => {
    try {
      const getExpedientes = await getExpedientesByFiltro(
        setLoadingButton,
        exeWatch.id_trd_origen?.label, // nombre trd
        exeWatch.fecha_apertura_expediente, // año de apertura
        exeWatch.id_serie_origen?.label, // nombre serie
        exeWatch.id_subserie_origen?.label, // nombre subserie
        exeWatch.titulo_expediente, // titulo expediente
        exeWatch.fecha_inicio_expediente, // fecha inicio
        exeWatch.fecha_fin_expediente, // fecha final
        exeWatch.consecutivo, // consecutivo
        exeWatch.tipoDeExpediente?.value // tipo de expediente
      );
      setData(getExpedientes);
      console.log('getExpedientes', getExpedientes);
    } catch (error) {
      console.error(error);
      control_error('No se ha encontrado un expediente que coincida');
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Buscar expediente" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              // onSubmit();
            }}
            style={{
              marginTop: '20px',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 2,
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="tipoDeExpediente"
                  control={controlBusquedaExpediente}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          onChange(selectedOption);
                        }}
                        options={
                          [
                            {
                              value: 'simple',
                              label: 'Simple',
                            },
                            {
                              value: 'complejo',
                              label: 'Complejo',
                            },
                          ] ?? []
                        }
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
                          Tipo de expediente
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              {exeWatch?.tipoDeExpediente?.value === 'complejo' && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    mt: '.7rem',
                    mb: '.7rem',
                  }}
                >
                  <Controller
                    name="consecutivo"
                    control={controlBusquedaExpediente}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        fullWidth
                        label="Consecutivo del expediente"
                        size="small"
                        variant="outlined"
                        value={value}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          onChange(e.target.value);
                          e.target.value.length === 50 &&
                            control_warning('máximo 50 caracteres');
                        }}
                        inputProps={{ maxLength: 50 }}
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                <Controller
                  name="titulo_expediente"
                  control={controlBusquedaExpediente}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      fullWidth
                      label="Titulo del expediente"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                <Controller
                  name="fecha_apertura_expediente"
                  control={controlBusquedaExpediente}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      fullWidth
                      label="Año de apertura del expediente"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 50 &&
                          control_warning('máximo 50 caracteres');
                      }}
                      inputProps={{ maxLength: 50 }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                <Controller
                  name="fecha_inicio_expediente"
                  control={controlBusquedaExpediente}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Fecha inicio"
                      type="date"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                <Controller
                  name="fecha_fin_expediente"
                  control={controlBusquedaExpediente}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      label="Fecha final"
                      type="date"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e?.target?.value);
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  zIndex: 2,
                  mt: '.7rem',
                  mb: '.7rem',
                }}
              >
                {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                <Controller
                  name="id_trd_origen"
                  control={controlBusquedaExpediente}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          //* llamar las series
                          void getSeriesByCcd(
                            selectedOption?.value as string
                          ).then((res) => {
                            console.log(res);

                            setdataInicialSelects({
                              ...dataInicialSelects,
                              dataSeries: res?.map((el: any) => {
                                return {
                                  ...el,
                                  value: el?.id_serie_doc,
                                  label: el?.nombre_serie,
                                };
                              }),
                            });
                          });
                          onChange(selectedOption);
                        }}
                        options={
                          dataInicialSelects?.dataTrd?.map((el: any) => {
                            return {
                              ...el,
                              value: el?.id_ccd,
                              label: el?.nombre,
                            };
                          }) ?? []
                        }
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
                          TRD origen
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              {exeWatch?.id_trd_origen?.label && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    zIndex: 2,
                    mt: '.7rem',
                    mb: '.7rem',
                  }}
                >
                  {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                  <Controller
                    name="id_serie_origen"
                    control={controlBusquedaExpediente}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <div>
                        <Select
                          value={value}
                          onChange={(selectedOption) => {
                            void getSubseriesBySeriesId(
                              selectedOption?.value as string
                            ).then((res) => {
                              console.log(res);

                              setdataInicialSelects({
                                ...dataInicialSelects,
                                dataSubseries: res?.map((el: any) => {
                                  return {
                                    ...el,
                                    value: el?.id_subserie_doc,
                                    label: el?.nombre,
                                  };
                                }),
                              });

                              onChange(selectedOption);
                            });
                          }}
                          options={dataInicialSelects?.dataSeries ?? []}
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
                            Serie origen
                          </small>
                        </label>
                      </div>
                    )}
                  />
                </Grid>
              )}

              {exeWatch?.id_trd_origen?.label &&
                exeWatch?.id_serie_origen?.label && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      zIndex: 2,
                      mt: '.7rem',
                      mb: '.7rem',
                    }}
                  >
                    {/* In this selection, I want to select the cdd id to make the post request to create a TRD */}
                    <Controller
                      name="id_subserie_origen"
                      control={controlBusquedaExpediente}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <div>
                          <Select
                            value={value}
                            onChange={(selectedOption) => {
                              onChange(selectedOption);
                            }}
                            options={dataInicialSelects?.dataSubseries ?? []}
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
                              Subserie origen
                            </small>
                          </label>
                        </div>
                      )}
                    />
                  </Grid>
                )}
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '1.5rem', mt: '1.5rem' }}
            >
              <LoadingButton
                loading={loading}
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  onSubmitElectronicIndex();
                }}
              >
                BUSCAR EXPEDIENTE
              </LoadingButton>

              <Button
                color="primary"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={() => {
                  resetBusquedaExpediente({
                    titulo_expediente: '',
                    fecha_apertura_expediente: '',
                    id_trd_origen: {
                      value: '',
                      label: '',
                    },
                    id_serie_origen: {
                      value: '',
                      label: '',
                    },
                    id_subserie_origen: {
                      value: '',
                      label: '',
                    },
                  });
                  setData([]);
                  setDataIndice([]);
                  setXmlToJsonisTrue({});
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
