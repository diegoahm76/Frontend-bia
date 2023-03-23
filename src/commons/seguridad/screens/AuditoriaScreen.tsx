import React, { useEffect, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Grid, Box, Typography, Stack, Button, TextField } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import Select, { type SingleValue } from 'react-select';
import { type Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Swal from 'sweetalert2';
// Components
import { api } from '../../../api/axios';
import { Title } from '../../../components/Title';
import {
  adapter_modules_choices,
  adapter_subsistemas_choices,
} from '../../auth/adapters/auditorias.adapters';
import { text_choise_adapter } from '../../auth/adapters/textChoices.adapter';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    headerName: 'Usuario',
    field: 'nombre_completo',
    minWidth: 200,
  },
  {
    headerName: 'Tipo documento',
    field: 'cod_tipo_documento',
    minWidth: 150,
  },
  {
    headerName: 'Documento',
    field: 'numero_documento',
    minWidth: 150,
  },
  {
    headerName: 'Módulo',
    field: 'nombre_modulo',
    minWidth: 150,
  },
  {
    headerName: 'Subsistema',
    field: 'subsistema',
    minWidth: 120,
  },
  {
    headerName: 'Descripción',
    field: 'descripcion',
    minWidth: 400,
  },
  {
    headerName: 'Valores actualizados',
    field: 'valores_actualizados',
    minWidth: 300,
  },
  {
    headerName: 'Fecha acción',
    field: 'fecha_accion',
    minWidth: 150,
  },
];

interface IFormValues {
  rango_inicial_fecha: Dayjs | string | null;
  rango_final_fecha: Dayjs | string | null;
  rango_actual_fecha: string | Date;
  numero_documento: string;
  tipo_documento: IList;
  subsistema: IList;
  modulo: IList;
  page: string;
}

export interface IList {
  label: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuditoriaScreen = (): JSX.Element => {
  const [rango_inicial_fecha, set_rango_inicial_fecha] = React.useState<
    Dayjs | string | null
  >(null);

  const [rango_final_fecha, set_rango_final_fecha] = React.useState<
    Dayjs | string | null
  >(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const notification_error = async (message = 'Algo pasó, intente de nuevo') =>
    await Swal.mixin({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).fire();

  const [auditorias, set_auditorias] = useState([]);
  const [subsistemas_options, set_subsistemas_options] = useState<IList[]>([]);
  const [tipo_documento_options, set_tipo_documento_options] = useState<
    IList[]
  >([]);
  const [modulos_options, set_modulos_options] = useState<IList[]>([]);

  // inicializar valores del formulario
  const form_values: IFormValues = {
    rango_inicial_fecha,
    rango_final_fecha,
    rango_actual_fecha: new Date(),
    numero_documento: '',
    tipo_documento: {
      label: '',
      value: '',
    },
    subsistema: {
      label: '',
      value: '',
    },
    modulo: {
      label: '',
      value: '',
    },
    page: '1',
  };

  const {
    register,
    handleSubmit: handle_submit,
    control,
    setValue: set_value,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: form_values });

  // const data_screen: any = watch();

  const on_submit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    void query_auditorias(data, rango_inicial_fecha, rango_inicial_fecha);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const query_auditorias = async (
    { tipo_documento, numero_documento, subsistema, modulo }: IFormValues,
    new_date_ini: Dayjs | string | null,
    new_date_fin: Dayjs | string | null
  ) => {
    try {
      console.log({
        form_values,
      });

      const { data } = await api.get(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `auditorias/get-by-query-params/?rango-inicial-fecha=${new_date_ini}&rango-final-fecha=${new_date_fin}&tipo-documento=${tipo_documento.value}&numero-documento=${numero_documento}&modulo=${modulo.value}&subsistema=${subsistema.value}`
      );
      console.log(data);
      set_auditorias(data.detail);
      void Swal.fire('Correcto', 'Proceso Exitoso', 'success');
    } catch (error: any) {
      console.log(error);
      void notification_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const get_info = async () => {
      try {
        const { data: data_subsistemas } = await api('choices/subsistemas/');
        const { data: data_modulos } = await api('permisos/modulos/get-list/');
        const { data: tipo_documentos_no_format } = await api.get(
          'choices/tipo-documento/'
        );

        const subsistemas_adapted =
          adapter_subsistemas_choices(data_subsistemas);
        const modulos_adapted = adapter_modules_choices(data_modulos);
        const documentos_format = text_choise_adapter(
          tipo_documentos_no_format
        );

        set_subsistemas_options(subsistemas_adapted);
        set_modulos_options(modulos_adapted);
        set_tipo_documento_options(documentos_format);
      } catch (err) {
        console.log(err);
      }
    };
    void get_info();
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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: '10px' }}>
          Auditoria
        </Typography>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Title title="INFORMACIÓN GENERAL" />
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit(on_submit)}
            sx={{ mt: '20px' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography> Busqueda por fecha:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography> Busqueda por Subsistema/Módulo:</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Seleccione una fecha inicial"
                    value={rango_inicial_fecha}
                    onChange={handle_date_ini_change}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Seleccione una fecha final"
                    value={rango_final_fecha}
                    onChange={handle_date_fin_change}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

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
                {errors.modulo !== null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography> Busqueda por documento:</Typography>
              </Grid>
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
                    />
                  )}
                />
                {errors.subsistema != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  label="Número de documento"
                  type="number"
                  size="small"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={errors.numero_documento?.type === 'required'}
                  helperText={
                    errors.numero_documento?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('numero_documento', { required: false })}
                />
              </Grid>
            </Grid>
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
                  reset(form_values);
                }}
              >
                LIMPIAR
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                BUSCAR
              </Button>
            </Stack>

            <DataGrid
              density="compact"
              autoHeight
              pagination={true}
              columns={columns}
              rows={auditorias}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id_auditoria}
            ></DataGrid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default AuditoriaScreen;
