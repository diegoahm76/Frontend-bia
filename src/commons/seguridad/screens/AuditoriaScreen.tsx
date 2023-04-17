import React, { useEffect, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import Select, { type SingleValue } from 'react-select';
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { type Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Components
import { api } from '../../../api/axios';
import { Title } from '../../../components/Title';
import {
  adapter_modules_choices,
  adapter_subsistemas_choices,
} from '../../auth/adapters/auditorias.adapters';
import { text_choise_adapter } from '../../auth/adapters/textChoices.adapter';
import { TablaGeneral } from '../../../components/TablaGeneral';
import { control_error } from '../../../helpers/controlError';

const columns = [
  {
    header: 'Usuario',
    field: 'nombre_completo',
    minWidth: 200,
    visible: true,
  },
  {
    header: 'Tipo documento',
    field: 'cod_tipo_documento',
    minWidth: 150,
    visible: true,
  },
  {
    header: 'Documento',
    field: 'numero_documento',
    minWidth: 150,
    visible: true,
  },
  {
    header: 'Módulo',
    field: 'nombre_modulo',
    minWidth: 150,
    visible: true,
  },
  {
    header: 'Subsistema',
    field: 'subsistema',
    minWidth: 120,
    visible: true,
  },
  {
    header: 'Descripción',
    field: 'descripcion',
    minWidth: 400,
    visible: true,
  },
  {
    header: 'Valores actualizados',
    field: 'valores_actualizados',
    minWidth: 300,
    visible: true,
  },
  {
    header: 'Fecha acción',
    field: 'fecha_accion',
    minWidth: 150,
    visible: true,
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
  const [loading_button, set_loading_button] = React.useState(false);
  const [anchor_el, set_anchor_el] = React.useState<null | HTMLElement>(null);
  const open_menu_filter = Boolean(anchor_el);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_click_menu_filter = (event: React.MouseEvent<HTMLElement>) => {
    set_anchor_el(event.currentTarget);
  };
  const handle_close_menu_filter = (): void => {
    set_anchor_el(null);
  };
  const [checkbox_selection, set_checkbox_selection] = React.useState({
    tipo_documento_filter: false,
    subsistema_modulo_filter: false,
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
      subsistema_modulo_filter: false,
    });
    reset(form_values);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const query_auditorias = async (
    { tipo_documento, numero_documento, subsistema, modulo }: IFormValues,
    new_date_ini: Dayjs | string | null,
    new_date_fin: Dayjs | string | null
  ) => {
    try {
      const { data } = await api.get(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `auditorias/get-by-query-params/?rango-inicial-fecha=${new_date_ini}&rango-final-fecha=${new_date_fin}&tipo-documento=${tipo_documento.value}&numero-documento=${numero_documento}&modulo=${modulo.value}&subsistema=${subsistema.value}`
      );
      console.log(numero_documento);
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
  const handle_change_checkbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_checkbox_selection({
      ...checkbox_selection,
      [event.target.name]: event.target.checked,
    });
    if (!tipo_documento_filter) {
      set_value('numero_documento', '');
      set_value('tipo_documento', { label: '', value: '' });
      set_nombre_usuario_auditoria(null);
      void query_auditorias(
        form_values,
        rango_inicial_fecha,
        rango_final_fecha
      );
    } else if (!subsistema_modulo_filter) {
      void query_auditorias(
        form_values,
        rango_inicial_fecha,
        rango_final_fecha
      );
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
        console.log(data_subsistemas);
        console.log(data_modulos);

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
          Auditoría
        </Typography>

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
                  <Typography className="label_selects">
                    Fecha inicial{' '}
                  </Typography>
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
                  <Typography className="label_selects">
                    Fecha final{' '}
                  </Typography>
                </LocalizationProvider>
              </Grid>
              {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                rango_inicial_fecha && rango_final_fecha && (
                  <Grid item sm={1}>
                    <IconButton
                      onClick={handle_click_menu_filter}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={
                        open_menu_filter ? 'account-menu' : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={open_menu_filter ? 'true' : undefined}
                    >
                      <FilterListIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchor_el}
                      id="account-menu"
                      open={open_menu_filter}
                      onClose={handle_close_menu_filter}
                      onClick={handle_close_menu_filter}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handle_close_menu_filter}>
                        <FormControl
                          sx={{ m: 3 }}
                          component="fieldset"
                          variant="standard"
                        >
                          <FormLabel component="legend">Buscar por:</FormLabel>

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={tipo_documento_filter}
                                onChange={handle_change_checkbox}
                                name="tipo_documento_filter"
                              />
                            }
                            label="Tipo de documento"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={subsistema_modulo_filter}
                                onChange={handle_change_checkbox}
                                name="subsistema_modulo_filter"
                              />
                            }
                            label="Subsistema/Módulo"
                          />
                        </FormControl>
                      </MenuItem>
                    </Menu>
                  </Grid>
                )
              }
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

// eslint-disable-next-line no-restricted-syntax
export default AuditoriaScreen;
