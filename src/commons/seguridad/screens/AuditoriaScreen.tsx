import { useEffect, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  // TextFieldProps,
} from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import Select, { type SingleValue } from 'react-select';
// import DatePicker from 'react-datepicker';
// import DatePicker1 from '@mui/x-date-pickers/DatePicker';

import Swal from 'sweetalert2';
// Components
import { api } from '../../../api/axios';
import { Title } from '../../../components/Title';
import {
  adapter_modules_choices,
  adapter_subsistemas_choices,
} from '../../auth/adapters/auditorias.adapters';
import { text_choise_adapter } from '../../auth/adapters/textChoices.adapter';
import { set_dates_format_revere } from '../adapters/set_date.adapters';
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
  rango_inicial_fecha: string | Date;
  rango_final_fecha: string | Date;
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
  const [subsistemas_options, set_subsistemas_options] = useState<any>([]);
  const [tipo_documento_options, set_tipo_documento_options] = useState<any>(
    []
  );
  const [modulos_options, set_modulos_options] = useState<any>([]);

  // inicializar valores del formulario
  const form_values: IFormValues = {
    rango_inicial_fecha: new Date(),
    rango_final_fecha: new Date(),
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
    watch,
    setValue: set_value,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: form_values });

  const data_screen: any = watch();

  const on_submit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    const new_date_ini = set_dates_format_revere(
      data.rango_inicial_fecha.toLocaleString()
    );
    const new_date_fin = set_dates_format_revere(
      data.rango_final_fecha.toLocaleString()
    );

    void query_auditorias(data, new_date_ini, new_date_fin);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const query_auditorias = async (
    { tipo_documento, numero_documento, subsistema, modulo }: IFormValues,
    new_date_ini: string,
    new_date_fin: string
  ) => {
    try {
      const { data } = await api.get(
        `auditorias/get-by-query-params/?rango-inicial-fecha=${new_date_ini}&rango-final-fecha=${new_date_fin}&tipo-documento=${tipo_documento.value}&numero-documento=${numero_documento}&modulo=${modulo.value}&subsistema=${subsistema.value}`
      );
      set_auditorias(data.detail);
      void Swal.fire('Correcto', 'Proceso Exitoso', 'success');
    } catch (error: any) {
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
              <Grid item xs={12} sm={3}>
                {/* <DatePicker1
                  label="Fecha de nacimiento"
                  // value={fecha_nacimiento}
                  // onChange={(newValue) => {
                  //   set_fecha_nacimiento(newValue);
                  // }}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => (
                    <TextField
                      fullWidth
                      size="small"
                      {...params}
                      {...register('rango_inicial_fecha', {
                        required: true,
                      })}
                      // onChange={handle_change}
                      // error={errors.fecha_nacimiento?.type === 'required'}
                      // helperText={
                      //   errors.fecha_nacimiento?.type === 'required'
                      //     ? 'Este campo es obligatorio'
                      //     : ''
                      // }
                    />
                  )}
                /> */}
                <label htmlFor="exampleFormControlInput1">
                  Fecha de inicio: <span className="text-danger">*</span>
                </label>
                {/* <Controller
                  name="rango_inicial_fecha"
                  control={control}
                  render={({ field }) => (
                    // <DatePicker
                    //   {...field}
                    //   locale="es"
                    //   showYearDropdown
                    //   peekNextMonth
                    //   showMonthDropdown
                    //   dropdownMode="select"
                    //   scrollableYearDropdown
                    //   autoComplete="off"
                    //   selected={data_screen?.rango_inicial_fecha}
                    //   className="form-control border border-terciary rounded-pill px-3"
                    //   maxDate={new Date()}
                    //   dateFormat="yyyy-MM-dd"
                    // />
                  )}
                /> */}
                {data_screen.rango_inicial_fecha >
                data_screen.rango_actual_fecha ? (
                  <small className="text-center text-danger">
                    No puede ser mayor que la fecha actual
                  </small>
                ) : (
                  ''
                )}
                {errors.rango_inicial_fecha != null && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
                {errors.rango_inicial_fecha != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                {errors.rango_inicial_fecha?.type === 'fechaCorrecta' && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      No puede ser mayor que la fecha actual
                    </small>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <label htmlFor="exampleFormControlInput1">
                  Fecha fin: <span className="text-danger">*</span>
                </label>
                {/* <Controller
                  name="rango_final_fecha"
                  control={control}
                  render={({ field }) => (
                    // <DatePicker
                    //   {...field}
                    //   locale="es"
                    //   showYearDropdown
                    //   peekNextMonth
                    //   showMonthDropdown
                    //   dropdownMode="select"
                    //   scrollableYearDropdown
                    //   autoComplete="off"
                    //   selected={data_screen.rango_final_fecha}
                    //   className="form-control border border-terciary rounded-pill px-3"
                    //   maxDate={new Date()}
                    //   dateFormat="yyyy-MM-dd"
                    // />
                  )}
                /> */}
                {data_screen.rango_inicial_fecha >
                data_screen.rango_final_fecha ? (
                  <small className="text-center text-danger">
                    Seleccione una fecha posterior a fecha inicio
                  </small>
                ) : (
                  ''
                )}
                {errors.rango_final_fecha != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
                {errors.rango_final_fecha?.type === 'fechaPosterior' && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Seleccione una fecha igual o posterior a fecha inicio
                    </small>
                  </div>
                )}
                {errors.rango_final_fecha?.type === 'fechaLimite' && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      No puede haber más de 8 días
                    </small>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <label className="form-label">Subsistema:</label>
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
                <label className="form-label">Tipo documento:</label>
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
                <label className="form-label">Madulo:</label>
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
              <Stack
                direction="row"
                spacing={2}
                sx={{ mr: '15px', mb: '10px', mt: '10px' }}
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
            </Grid>
            <DataGrid
              density="compact"
              autoHeight
              pagination={true}
              columns={columns}
              rows={auditorias}
              pageSize={10}
              rowsPerPageOptions={[10]}
            ></DataGrid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default AuditoriaScreen;
