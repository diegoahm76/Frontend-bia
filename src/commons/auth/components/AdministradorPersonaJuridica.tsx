/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import type {
  DataPersonas,
  InfoPersona,
} from '../../../interfaces/globalModels';
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Title } from '../../../components/Title';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from '../../../helpers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { CustomSelect } from '../../../components/CustomSelect';
import { use_register } from '../../auth/hooks/registerHooks';
import { type FieldErrors, useForm } from 'react-hook-form';
import type { keys_object, DataRegistePortal } from '../../auth/interfaces';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { consultar_datos_persona } from '../../seguridad/request/Request';

interface PropsElement {
  errors: FieldErrors<DataRegistePortal>;
}
interface PropsStep {
  label: string;
  component: (props: PropsElement) => JSX.Element;
}
interface Props {
  data_all: InfoPersona;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreenJuridica: React.FC<Props> = ({
  data_all,
}: Props) => {
  const [datos_persona, set_datos_persona] = useState<DataPersonas>();
  const [datos_represnetante, set_datos_represnetante] =
    useState<DataPersonas>();
  const [persona, set_persona] = useState<InfoPersona>();
  const [is_modal_active, open_modal] = useState(false);
  const [ver_datos_adicionales, set_ver_datos_adicionales] = useState(false);
  const [button_datos_adicionales, set_button_datos_adicionales] =
    useState(true);
  const [type_direction, set_type_direction] = useState('');
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Date | null>(
    new Date()
  );
  const [direccion, set_direccion] = useState('');
  const [direccion_notificacion, set_direccion_notificacion] = useState('');

  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors, isValid: is_valid },
    watch,
  } = useForm<DataRegistePortal>();
  const {
    data_register,
    error_email,
    error_password,
    error_phone,
    is_exists,
    is_saving,
    paises_options,
    is_search,
    loading,
    message_error_password,
    show_password,
    nacionalidad_emp,
    tipo_documento_opt,
    tipo_documento_rep,
    naturaleza_emp,
    naturaleza_emp_opt,
    dpto_notifiacion_opt,
    dpto_notifiacion,
    ciudad_notificacion_opt,
    ciudad_notificacion,
    message_no_person,
    nombre_representante,
    fecha_rep_legal,
    documento_rep,
    set_documento_rep,
    set_nacionalidad_emp,
    set_naturaleza_emp,
    set_fecha_rep_legal,
    validate_exits_representante,
    set_ciudad_notificacion,
    set_dpto_notifiacion,
    handle_click_show_password,
    set_ciudad_expedicion,
    set_ciudad_residencia,
    set_data_register,
    set_departamento,
    set_dpto_residencia,
    set_error_email,
    set_error_error_phone,
    set_error_password,
    set_estado_civil,
    set_genero,
    set_is_saving,
    set_message_error_password,
    set_pais_nacimiento,
    set_pais_residencia,
    set_tipo_persona,
    set_tipo_documento_rep,
    set_message_no_person,
  } = use_register();

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    value = name === 'nombre_de_usuario' ? value.replace(/\s/g, '') : value;
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value(name as keys_object, value);
  };
  const set_value_direction = (value: string, type: string): void => {
    // direccion_laboral
    // direccion_notificaciones
    // direccion_residencia_ref
    // direccion_residencia
    switch (type_direction) {
      case 'residencia':
        set_direccion(value);
        set_value_form('direccion_residencia', value);

        break;
      case 'notificacion':
        set_direccion_notificacion(value);
        set_value_form('direccion_notificaciones', value);

        break;
    }
    open_modal(false);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };
  const on_change_checkbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_data_register({
      ...data_register,
      [e.target.name]: e.target.checked,
    });
    set_value(e.target.name as keys_object, e.target.checked);
  };
  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_fecha_nacimiento_change = (date: Date | null) => {
    set_fecha_nacimiento(date);
  };

  const on_result = (): void => {
    if (data_all !== null || data_all !== undefined || data_all !== '') {
      set_persona(data_all);
      console.log(data_all.tipo_persona);
      console.log('Datos persona', data_all);
    }
    console.log('Datos persona no encontrados');
  };
  useEffect(() => {
    on_result();
  }, []);

  const cancelar = (): void => {
    set_persona(undefined);
  };
  // trae datos de la persona juridica
  const get_datos_persona = async (): Promise<void> => {
    try {
      const id_persona: number | undefined = persona?.id_persona;
      const response = await consultar_datos_persona(id_persona);
      console.log('Datos completos', response);
      set_datos_persona(response);
      // datos basicos
      set_nacionalidad_emp(response?.cod_pais_nacionalidad_empresa);

      // dirección notificación
      // set_pais_notificacion(response?.pais)
      set_dpto_notifiacion(response?.cod_departamento_notificacion);
      set_ciudad_notificacion(response?.cod_municipio_notificacion_nal);
      set_direccion_notificacion(response?.direccion_notificaciones);
      set_data_register({
        ...data_register,
        email: response?.email,
        telefono_celular: response?.telefono_celular,
        complemeto_direccion: response?.direccion_notificacion_referencia,
      });
      set_direccion_notificacion(response?.direccion_notificaciones);
      set_dpto_notifiacion(response?.cod_departamento_notificacion);
      set_ciudad_notificacion(response?.cod_municipio_notificacion_nal);

      // Datos adicionales

      // trae los datos del presentante legal
      if (
        response?.representante_legal !== undefined ||
        response?.representante_legal !== null
      ) {
        const id: number | undefined = response?.representante_legal;
        void get_datos_representante_legal(id);
      } else {
        control_error('Esta persona no tiene un representante legal');
      }
    } catch (err) {
      control_error(err);
    }
  };
  // trae datos del representante legal
  const get_datos_representante_legal = async (
    id: number | undefined
  ): Promise<void> => {
    try {
      const id_persona: number | undefined = id;
      const response = await consultar_datos_persona(id_persona);
      console.log('Datos completos representante legal', response);
      set_datos_represnetante(response);

      // Datos adicionales
    } catch (err) {
      control_error(err);
    }
  };
  // trer datos de la persona
  useEffect(() => {
    if (persona?.numero_documento !== undefined) {
      if (persona?.tipo_persona === 'J') {
        void get_datos_persona();
      }
    }
  }, [persona?.numero_documento !== undefined]);

  const tipos_doc = [
    {
      value: 'CC',
      label: 'Cédula de ciudadanía',
    },
    {
      value: 'CE',
      label: 'Cédula extranjería',
    },
    {
      value: 'TI',
      label: 'Tarjeta de identidad',
    },
    {
      value: 'RC',
      label: 'Registro civil',
    },
    {
      value: 'NU',
      label: 'NUIP',
    },
    {
      value: 'PA',
      label: 'Pasaporte',
    },
    {
      value: 'PE',
      label: 'Permiso especial de permanencia',
    },
  ];
  const tipos_doc_comercial = [
    {
      value: 'NT',
      label: 'NIT',
    },
  ];
  const tipo_persona = [
    {
      value: 'N',
      label: 'Natural',
    },
    {
      value: 'J',
      label: 'Juridica',
    },
  ];
  const tipo_empresa = [
    {
      value: 'PU',
      label: 'Pública',
    },
    {
      value: 'PR',
      label: 'Privada',
    },
    {
      value: 'MI',
      label: 'Mixta',
    },
  ];

  useEffect(() => {
    if (watch('cod_pais_nacionalidad_empresa') !== undefined) {
      set_nacionalidad_emp(watch('cod_pais_nacionalidad_empresa'));
    }
  }, [watch('cod_pais_nacionalidad_empresa')]);
  useEffect(() => {
    if (watch('departamento_expedicion') !== undefined) {
      set_departamento(watch('departamento_expedicion'));
    }
  }, [watch('departamento_expedicion')]);

  useEffect(() => {
    if (watch('cod_municipio_expedicion_id') !== undefined) {
      set_ciudad_expedicion(watch('cod_municipio_expedicion_id'));
    }
  }, [watch('cod_municipio_expedicion_id')]);

  // Datos de residencia
  useEffect(() => {
    if (watch('pais_residencia') !== undefined) {
      set_pais_residencia(watch('pais_residencia'));
    }
  }, [watch('pais_residencia')]);

  useEffect(() => {
    if (watch('departamento_residencia') !== undefined) {
      set_dpto_residencia(watch('departamento_residencia'));
    }
  }, [watch('departamento_residencia')]);

  useEffect(() => {
    if (watch('municipio_residencia') !== undefined) {
      set_ciudad_residencia(watch('municipio_residencia'));
    }
  }, [watch('municipio_residencia')]);

  // Datos de notificación

  useEffect(() => {
    if (watch('dpto_notifiacion') !== undefined) {
      set_dpto_notifiacion(watch('dpto_notifiacion'));
    }
  }, [watch('dpto_notifiacion')]);

  useEffect(() => {
    if (watch('cod_municipio_notificacion_nal') !== undefined) {
      set_ciudad_notificacion(watch('cod_municipio_notificacion_nal'));
    }
  }, [watch('cod_municipio_notificacion_nal')]);

  useEffect(() => {
    if (watch('pais_nacimiento') !== undefined) {
      set_pais_nacimiento(watch('pais_nacimiento'));
    }
  }, [watch('pais_nacimiento')]);

  useEffect(() => {
    if (watch('sexo') !== undefined) {
      set_genero(watch('sexo'));
    }
  }, [watch('sexo')]);

  useEffect(() => {
    if (watch('estado_civil') !== undefined) {
      set_estado_civil(watch('estado_civil') as string);
    }
  }, [watch('estado_civil')]);

  return (
    <>
      <Grid item xs={12} spacing={2}>
        {datos_persona?.representante_legal !== undefined && (
          <>
            {persona?.tipo_persona === 'J' && (
              <>
                {datos_persona != null && (
                  <Grid container spacing={2}>
                    <>
                      <Grid item xs={12}>
                        <Title title="DATOS DE IDENTIFICACIÓN" />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          id="tipo_doc_comercial"
                          label="Tipo de Persona"
                          select
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          defaultValue={persona?.tipo_persona}
                          disabled
                        >
                          {tipo_persona.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Tipo de Documento"
                          select
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          disabled
                          defaultValue={persona?.tipo_documento}
                        >
                          {tipos_doc_comercial.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Número Identificación"
                          id="documento_juridico"
                          type="number"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          defaultValue={persona?.numero_documento}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Digito de verificación:"
                          type="number"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          defaultValue={persona?.digito_verificacion}
                          disabled
                        />
                      </Grid>
                    </>
                    <>
                      <Grid item xs={12}>
                        <Title title="DATOS EMPRESARIALES" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Razón social"
                          type="text"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          defaultValue={datos_persona?.razon_social}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Nombre comercial"
                          type="text"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          defaultValue={datos_persona?.nombre_comercial}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Naturaleza de la empresa"
                          select
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          defaultValue={persona?.cod_naturaleza_empresa}
                          disabled
                        >
                          {tipo_empresa.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomSelect
                          onChange={on_change}
                          label="Nacionalidad empresa *"
                          name="cod_pais_nacionalidad_empresa"
                          value={nacionalidad_emp}
                          options={paises_options}
                          loading={loading}
                          disabled={false}
                          required={true}
                          errors={errors}
                          register={register}
                        />
                      </Grid>
                    </>
                    <>
                      <Grid item xs={12}>
                        <Title title="DATOS DE NOTIFICACIÓN" />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Datos de notificación nacional
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <CustomSelect
                          onChange={on_change}
                          label="País de notificación"
                          name="pais_notificacion"
                          value={'CO'}
                          options={paises_options}
                          loading={loading}
                          disabled={false}
                          required={true}
                          errors={errors}
                          register={register}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <CustomSelect
                          onChange={on_change}
                          label="Departamento *"
                          name="dpto_notifiacion"
                          value={dpto_notifiacion}
                          options={dpto_notifiacion_opt}
                          loading={loading}
                          required={true}
                          errors={errors}
                          register={register}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <CustomSelect
                          onChange={on_change}
                          label="Ciudad"
                          name="cod_municipio_notificacion_nal"
                          value={ciudad_notificacion}
                          options={ciudad_notificacion_opt}
                          loading={loading}
                          disabled={dpto_notifiacion === '' ?? true}
                          required={true}
                          errors={errors}
                          register={register}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Dirección"
                          disabled
                          error={
                            errors.direccion_notificaciones?.type === 'required'
                          }
                          helperText={
                            errors.direccion_notificaciones?.type === 'required'
                              ? 'Este campo es obligatorio'
                              : ''
                          }
                          {...register('direccion_notificaciones', {
                            required: true,
                          })}
                          value={direccion_notificacion}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            open_modal(true);
                            set_type_direction('notificacion');
                          }}
                        >
                          Generar dirección
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          disabled={is_exists}
                          fullWidth
                          size="small"
                          label="Complemento dirección  (casa/apartamento/finca)"
                          value={data_register.complemeto_direccion}
                          {...register('complemeto_direccion')}
                          onChange={handle_change}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          disabled={is_exists}
                          fullWidth
                          size="small"
                          label="E-mail"
                          error={
                            errors.email?.type === 'required' || error_email
                          }
                          type="email"
                          value={data_register.email}
                          helperText={
                            errors.email?.type === 'required'
                              ? 'Este campo es obligatorio'
                              : error_email
                              ? 'Los emails no coinciden'
                              : ''
                          }
                          {...register('email', {
                            required: true,
                          })}
                          onChange={handle_change}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          disabled={is_exists}
                          fullWidth
                          size="small"
                          label="Celular"
                          onCopy={(e: any) => e.preventDefault()}
                          value={data_register.telefono_celular}
                          error={error_phone}
                          helperText={
                            error_phone
                              ? 'Los número de celular no son iguales'
                              : ''
                          }
                          {...register('telefono_celular')}
                          onChange={handle_change}
                        />
                      </Grid>
                    </>
                    <>
                      <Grid item xs={12}>
                        <Title title="DATOS DEL REPRESENTANTE LEGAL" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Tipo de Documento"
                          id="tipo-doc-representante"
                          select
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          autoFocus
                          disabled
                          defaultValue={datos_represnetante?.tipo_documento}
                        >
                          {tipos_doc.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Número Identificación"
                          id="documento_representante"
                          type="number"
                          fullWidth
                          size="small"
                          margin="dense"
                          required
                          defaultValue={datos_represnetante?.tipo_documento}
                          disabled
                        />
                      </Grid>
                    </>
                    <Grid item xs={12}>
                      <Stack
                        justifyContent="flex-end"
                        sx={{ m: '10px 0 20px 0' }}
                        direction="row"
                        spacing={2}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => {
                            cancelar();
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          id="actualiza-juridica"
                          type="submit"
                          variant="contained"
                          color="primary"
                          // startIcon={
                          //     loading_juridica
                          //         ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                          //         : ""
                          // }
                          aria-label="Actualizar"
                          // disabled={loading_juridica}
                          size="large"
                        >
                          Actualizar
                        </Button>
                        {/* <Button
                                            variant="outlined"
                                            startIcon={<RemoveRedEyeIcon />}
                                            onClick={() => {
                                                set_datos_historico(persona)
                                                handle_open_historico();
                                            }}>Historico
                                        </Button> */}
                      </Stack>
                    </Grid>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Grid>
      <DialogGeneradorDeDirecciones
        open={is_modal_active}
        openDialog={open_modal}
        onChange={set_value_direction}
        type={type_direction}
      />
    </>
  );
};
