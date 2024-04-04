/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import Select, { type SingleValue } from 'react-select';
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  TextField
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';


import { type Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Components
import { api } from '../../../../api/axios';
import { Title } from '../../../../components/Title';

import { control_error } from '../../../../helpers/controlError';
import type { IList } from '../../../../interfaces/globalModels';
import { columns } from './utils/colums';

import { form_values } from './types/types';
import type { IFormValues } from './types/types';
import { get_info } from './services/api.services';
import { TablaGeneral } from '../../../../components/TablaGeneral/TablaGeneral';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuditoriaScreen = (): JSX.Element => {
  const [loading_button, set_loading_button] = React.useState(false);
  

  const [checkbox_selection, set_checkbox_selection] = React.useState({
    tipo_documento_filter: false,
    subsistema_modulo_filter: false
  });
  const { tipo_documento_filter, subsistema_modulo_filter } =
    checkbox_selection;
  const [rango_inicial_fecha, set_rango_inicial_fecha] = React.useState<
    Dayjs | string | null
  >(null);
  const [rango_final_fecha, set_rango_final_fecha] = React.useState<
    Dayjs | string | null
  >(null);
  const [nombre_usuario_auditoria, set_nombre_usuario_auditoria] =
    React.useState<string | null>(null);

  const [auditorias, set_auditorias] = useState([]);
  const [subsistemas_options, set_subsistemas_options] = useState<IList[]>([]);
  const [tipo_documento_options, set_tipo_documento_options] = useState<
    IList[]
  >([]);
  const [modulos_options, set_modulos_options] = useState<IList[]>([]);

  const {
    register,
    handleSubmit: handle_submit,
    control,
    setValue: set_value,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: form_values });

  const on_submit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    set_loading_button(!loading_button);
    void query_auditorias(data, rango_inicial_fecha, rango_final_fecha);
  };

  const reset_data = (): void => {
    set_rango_inicial_fecha(null);
    set_rango_final_fecha(null);
    set_nombre_usuario_auditoria(null);
    set_auditorias([]);
    set_checkbox_selection({
      tipo_documento_filter: false,
      subsistema_modulo_filter: false
    });
    reset(form_values);
  };

  const query_auditorias = async (
    { tipo_documento, numero_documento, subsistema, modulo }: IFormValues,
    new_date_ini: Dayjs | string | null,
    new_date_fin: Dayjs | string | null
  ) : Promise<any>=> {
    try {
      const { data } = await api.get(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `auditorias/get-by-query-params/?rango-inicial-fecha=${new_date_ini}&rango-final-fecha=${new_date_fin}&tipo-documento=${tipo_documento.value}&numero-documento=${numero_documento}&modulo=${modulo.value}&subsistema=${subsistema.value}`
      );
      //  console.log('')(numero_documento);
      if (
        tipo_documento_filter &&
        !subsistema_modulo_filter &&
        numero_documento !== null
      ) {
        set_nombre_usuario_auditoria(
          data.detail
            .map((item: any) => item.nombre_completo)
            .filter(
              (nombre: any, index: any, array: string | any[]) =>
                array.indexOf(nombre) === index
            )
        );
      }
      set_auditorias(data.detail);
      set_loading_button(false);
    } catch (error: any) {
      set_loading_button(false);
      control_error(error.response.data.detail);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  useEffect(() => {
    void get_info(
      set_subsistemas_options,
      set_tipo_documento_options,
      set_modulos_options
    );
  }, []);

  const handle_date_ini_change = (date: Dayjs | string | null): void => {
    set_rango_inicial_fecha(dayjs(date).format('YYYY-MM-DD'));
  };

  const handle_date_fin_change = (date: Dayjs | string | null): void => {
    set_rango_final_fecha(dayjs(date).format('YYYY-MM-DD'));
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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        {/* <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: '10px' }}>
          Auditoría
        </Typography> */}

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Title title="Información General" />
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit(on_submit)}
            sx={{ mt: '20px' }}
          >
            <Grid container spacing={2} sx={{ mb: '0' }}>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Desde la fecha"
                    value={rango_inicial_fecha}
                    onChange={handle_date_ini_change}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={Boolean(
                          rango_inicial_fecha !== null &&
                            rango_final_fecha !== null &&
                            rango_inicial_fecha > rango_final_fecha
                        )}
                        helperText={
                          rango_inicial_fecha !== null &&
                          rango_final_fecha !== null &&
                          rango_inicial_fecha > rango_final_fecha &&
                          'Fecha inicial no puede ser mayor a la fecha final'
                        }
                      />
                    )}
                  />
              
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Hasta la fecha"
                    value={rango_final_fecha}
                    onChange={handle_date_fin_change}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={Boolean(
                          rango_inicial_fecha !== null &&
                            rango_final_fecha !== null &&
                            (rango_final_fecha < rango_inicial_fecha ||
                              rango_final_fecha === rango_inicial_fecha)
                        )}
                        helperText={
                          (rango_inicial_fecha !== null &&
                            rango_final_fecha !== null &&
                            rango_final_fecha < rango_inicial_fecha &&
                            'Fecha final no puede ser menor a la fecha inicial'
                              .length > 0) ||
                          (rango_inicial_fecha !== null &&
                            rango_final_fecha !== null &&
                            rango_final_fecha === rango_inicial_fecha &&
                            'Las fechas no pueden ser iguales')
                        }
                      />
                    )}
                  />
            
                </LocalizationProvider>
              </Grid>

         
              
            </Grid>
            {tipo_documento_filter && (
              <Grid container spacing={2} sx={{ mt: '0' }}>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="tipo_documento"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<IList>) => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          set_value('tipo_documento', option!);
                        }}
                        name="tipo_documento"
                        options={tipo_documento_options}
                        placeholder="Seleccionar"
                        required
                      />
                    )}
                  />
                  <Typography className="label_selects">
                    Tipo de documento{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    label="Número de documento"
                    type="number"
                    size="small"
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    error={errors.numero_documento?.type === 'required'}
                    helperText="Número de documento"
                    {...register('numero_documento', { required: false })}
                  />
                </Grid>
                {nombre_usuario_auditoria !== null && (
                  <Grid item xs={12} sm={3}>
                    <TextField
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      defaultValue={nombre_usuario_auditoria}
                      label="Usuario auditado"
                      size="small"
                      disabled
                      helperText="Nombre de usuario"
                    />
                  </Grid>
                )}
              </Grid>
            )}
            {subsistema_modulo_filter && (
              <Grid container spacing={2} sx={{ mt: '0' }}>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="subsistema"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<IList>) => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          set_value('subsistema', option!);
                        }}
                        options={subsistemas_options}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  <Typography className="label_selects">Subsistema </Typography>
                  {errors.subsistema != null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="modulo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<IList>) => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          set_value('modulo', option!);
                        }}
                        options={modulos_options}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  <Typography className="label_selects">Módulo </Typography>
                </Grid>
              </Grid>
            )}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mb: '20px' }}
            >
              <Button
                type="button"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={() => {
                  reset_data();
                }}
              >
                LIMPIAR
              </Button>
              <LoadingButton
                type="submit"
                loading={loading_button}
                loadingPosition="start"
                startIcon={<SearchIcon />}
                variant="contained"
              >
                {loading_button ? 'BUSCANDO' : 'BUSCAR'}
              </LoadingButton>
            </Stack>
            <TablaGeneral
              showButtonExport
              tittle={'Auditoría'}
              columns={columns}
              rowsData={auditorias}
              staticscroll={false}
              stylescroll={'1560px'}
            />
          </Box>
        </Box>
      </Grid>
    </>
  );
};


