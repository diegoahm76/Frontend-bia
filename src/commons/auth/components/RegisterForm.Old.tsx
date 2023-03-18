/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { type SingleValue } from 'react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import { formatISO } from 'date-fns';
// interfaces
import type {
  IAuth,
  IDatosNotificacion,
  IFormValues,
  IObjectSend,
  IPerson,
} from '../interfaces/index';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { api } from '../../../api/axios';
import { type IList } from '../../../interfaces/globalModels';
import { text_choise_adapter } from '../adapters/textChoices.adapter';
import { type AxiosError } from 'axios';
// import DatePicker from 'react-datepicker';

import CancelIcon from '@mui/icons-material/Cancel';
import SavelIcon from '@mui/icons-material/Save';

const default_values = {
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  razon_social: '',
  dv: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  fechaInput: Date,
  fecha_nacimiento: '',
  ubicacion_georeferenciada: 'mi casita',
  pais_residencia: '',
  municipio: '',
  pais_nacimiento: '',
  sexo: '',
  email: '',
  cEmail: '',
  cod_pais_nacionalidad_empresa: '',
  telefono_celular: '',
  cCelular: '',
  celular: '',
  nombre_comercial: '',
  acepta_notificacion_sms: true,
  acepta_notificacion_email: true,
  acepta_tratamiento_datos: true,
  direccionNotificacion: '',
  municipioNotificacion: '',
  nombreDeUsuario: '',
  password: '',
  password2: '',
};

const default_errors = {
  confirmacionEmail: false,
  confirmacionCelular: false,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC = () => {
  const [loading, set_loading] = useState<boolean>(false);
  const [is_open_generator, set_is_open_generator] = useState<boolean>(false);
  console.log(is_open_generator);
  const [yes_or_no, set_yes_or_no] = useState<boolean>(false);
  const [is_user, set_is_user] = useState<boolean>(true);
  const [complete_address, set_complete_address] = useState<string>('');
  const [errors, set_errors] = useState<IAuth>(default_errors);
  const [datos_notificacion, set_datos_notificacion] =
    useState<IDatosNotificacion>({ departamento: '' });
  const [municipio_notificacion_filtered, set_municipio_notificacion_filtered] =
    useState<IList[]>([]);
  const [tipo_documento_options, set_tipo_documento_options] = useState<
    IList[]
  >([]);
  const [paises_options, set_paises_options] = useState<IList[]>([]);
  const [departamentos_options, set_departamentos_options] = useState<IList[]>(
    []
  );
  const [municipios_options, set_municipios_options] = useState<IList[]>([]);
  const [tipo_documento_filtrado, set_tipo_documento_filtrado] = useState<any>(
    []
  );
  const [tipo_persona_options, set_tipo_persona_options] = useState<IList[]>(
    []
  );
  const [form_values, set_form_values] = useState<IFormValues>({
    fechaNacimiento: '',
    tipo_persona: { label: 'Natural', value: 'N' },
    digito_verificacion: '',
    municipioNotificacion: '',
  });
  const [error_password, set_error_password] = useState<boolean | null>(null);
  const {
    watch,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    reset,
    formState: { errors: errors_form },
  } = useForm({ defaultValues: default_values });

  // Modelo de creacion
  const [create_persona_model, set_create_persona_model] =
    useState(default_values);
  const navigate = useNavigate();

  const get_selects_options = async (): Promise<void> => {
    try {
      const { data: tipo_persona_no_format } = await api.get(
        'choices/tipo-persona/'
      );
      const { data: tipo_documentos_no_format } = await api.get(
        'choices/tipo-documento/'
      );
      const { data: paises_no_format } = await api.get('choices/paises/');
      const { data: departamentos_no_format } = await api.get(
        'choices/departamentos/'
      );
      const { data: municipios_no_format } = await api.get(
        'choices/municipios/'
      );

      const documentos_format = text_choise_adapter(tipo_documentos_no_format);
      const departamentos_format = text_choise_adapter(departamentos_no_format);
      const paises_format = text_choise_adapter(paises_no_format);
      const municipios_format = text_choise_adapter(municipios_no_format);
      const tipo_persona_format = text_choise_adapter(tipo_persona_no_format);

      set_tipo_documento_options(documentos_format);
      set_departamentos_options(departamentos_format);
      set_paises_options(paises_format);
      set_municipios_options(municipios_format);
      set_tipo_persona_options(tipo_persona_format);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    void get_selects_options();
  }, []);

  useEffect(() => {
    validate_password();
  }, [create_persona_model]);

  const validate_password = (): void => {
    if (create_persona_model.password !== create_persona_model.password2) {
      set_error_password(true);
    } else {
      set_error_password(false);
    }
  };

  const submit_form = async (): Promise<any> => {
    if (create_persona_model.password !== create_persona_model.password2) {
      set_error_password(true);
      return;
    }
    //* Validación duplicidad de emails y celular
    if (
      create_persona_model.email !== create_persona_model.cEmail ||
      create_persona_model.celular !== create_persona_model.cCelular
    ) {
      const data_response = {
        ...default_errors,
      };

      if (create_persona_model.email !== create_persona_model.cEmail) {
        data_response.confirmacionEmail = true;
      }

      if (create_persona_model.celular !== create_persona_model.cCelular) {
        data_response.confirmacionCelular = true;
      }

      set_errors({ ...errors, ...data_response });
      setTimeout(() => {
        set_errors({ ...errors, ...default_errors });
      }, 2000);

      return;
    }

    const persona: IPerson = {
      tipo_persona: '',
      tipo_documento: '',
      numero_documento: '',
      digito_verificacion: '',
      nombre_comercial: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      email: '',
      telefono_celular: '',
      ubicacion_georeferenciada: '',
      razon_social: '',
      telefono_celular_empresa: '',
      direccion_notificaciones: '',
      representante_legal: '',
      cod_municipio_notificacion_nal: '',
      confirmar_celular: '',
      confirmar_email: '',
      require_nombre_comercial: false,
    };

    set_loading(true);
    if (create_persona_model.tipo_persona === 'N') {
      try {
        await api.post(
          'personas/persona-natural/create/',
          create_persona_model
        );
        //* Manejo de errores por datos repetidos en la DB (email y numero documento)
      } catch (err: any) {
        console.log(err);
        set_loading(false);
        void Swal.fire({
          title: 'Este documento y correo ya estan relacionados',
          text: err.response?.data.detail,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3BA9E0',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/registeruser');
          }
        });
      }
    } else {
      try {
        await api.get(
          `personas/get-personas-naturales-by-document/${create_persona_model.tipo_documento}/${create_persona_model.numero_documento}/`
        );
      } catch (error) {
        console.error(error);
        void Swal.fire({
          title:
            'No existe un representante legal registrado con el documento ingresado',
          text: '¿Quiere crear una persona natural?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3BA9E0',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            handle_change_type_person({ label: 'Natural', value: 'N: void' });
            set_form_values({
              ...form_values,
              tipo_persona: { label: 'Natural', value: 'N' },
            });
          }
        });
        set_loading(false);
        return error as AxiosError;
      }

      try {
        await api.post('personas/persona-juridica/create/', persona);
        void Swal.fire({
          title: 'Registrado como persona juridica',
          text: '¿Desea registrarse como usuario?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3BA9E0',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/registeruser');
          } else {
            reset_values();
          }
        });
      } catch (err: any) {
        if (err.response?.data?.email && err.response?.data?.numero_documento) {
          void Swal.fire({
            title: 'Este documento y correo ya estan relacionados',
            text: '¿Desea registrarse como usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3BA9E0',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/registeruser');
            }
          });
        } else if (err.response?.data?.non_field_errors) {
          void Swal.fire({
            title: 'Este documento ya esta relacionado',
            text: '¿Desea registrarse como usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3BA9E0',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/registeruser');
            }
          });
        } else if (err.response?.data?.numero_documento) {
          void Swal.fire({
            title: 'Este documento ya existe',
            text: '¿Desea registrarse como usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3BA9E0',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/registeruser');
            }
          });
        } else if (err.response?.data?.email) {
          void Swal.fire({
            title: 'Este correo electronico ya existe',
            text: 'Verifica tus datos',
            icon: 'info',
            confirmButtonColor: '#3BA9E0',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Aceptar',
          });
        } else {
          console.log(err);
        }
        return err as AxiosError;
      }
    }

    // Creamos el usuario
    try {
      const { data } = await api.get(
        `personas/get-personas-by-document/${create_persona_model.tipo_documento}/${create_persona_model?.numero_documento}`
      );

      console.log(data);

      const user = {
        email: create_persona_model.email,
        nombre_de_usuario: create_persona_model.nombreDeUsuario,
        persona: data.data.id_persona,
        password: create_persona_model.password,
        id_usuario_creador: null,
        tipo_usuario: 'E', // Debería ser por defecto que se creara en E
        redirect_url:
          process.env.NODE_ENV === 'production'
            ? 'https://macareniafrontdevelop.netlify.app/#/login'
            : 'http://localhost:3000/#/login',
      };

      const config2 = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      await api.post('users/register-externo/', user, config2);

      void Swal.fire({
        title: 'Usuario registrado correctamente',
        text: 'Revise su bandeja de correo electronico para confirmar el registro',
        icon: 'success',
        confirmButtonColor: '#3BA9E0',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Continuar',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } catch (err: any) {
      void Swal.fire({
        title: 'Error de registro',
        text: 'Error al registrar usuario',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3BA9E0',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      });
    } finally {
      set_loading(false);
    }
  };

  const reset_values = (): void => {
    reset(default_values);
    set_complete_address('');
  };

  const handle_change_type_person = (e: any): void => {
    const data = { ...create_persona_model };
    data.tipo_persona = e.value;
    set_create_persona_model(data);
    if (e.value === 'J') {
      set_is_user(false);
      set_yes_or_no(true);
    } else {
      set_is_user(true);
      set_yes_or_no(false);
    }
  };

  const handle_yes_or_no = (e: any): void => {
    if (e.target.checked) {
      set_yes_or_no(true);
    } else {
      set_yes_or_no(false);
    }
  };

  useEffect(() => {
    if (is_user) {
      const data_filtered = tipo_documento_options.filter(
        (documento) => documento.value !== 'NU'
      );
      set_tipo_documento_filtrado(data_filtered);
    } else {
      const data_filtered = tipo_documento_options.filter(
        (documento) => documento.value === 'NU'
      );
      set_tipo_documento_filtrado(data_filtered);
    }
  }, [is_user, tipo_documento_options]);

  const handle_max_one_digit = (e: any): void => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value[0];
      set_form_values({
        ...form_values,
        digito_verificacion: e.target.value[0],
      });
    } else {
      set_form_values({
        ...form_values,
        digito_verificacion: e.target.value,
      });
    }
  };

  const get_index_colombia = (): string | number | null => {
    let index_colombia: string | number | null = null;
    paises_options.forEach((pais, index) => {
      if (pais.value === 'CO') {
        index_colombia = index;
      }
    });
    return index_colombia;
  };

  const handle_change_pais_notificacion = (e: any): void => {
    const object_send: IObjectSend = {
      paisNotificacion: get_index_by_select_options(e.value, paises_options),
      municipioNotificacion: '',
    };
    if (e.value !== 'CO' || !e.value) {
      object_send.municipioNotificacion = null;
      reset({
        ...watch(),
        municipioNotificacion: undefined,
      });
      set_datos_notificacion({ ...datos_notificacion, departamento: '' });
    }
    set_form_values({
      ...form_values,
      ...object_send,
    });
  };

  const get_index_by_select_options = (
    valueSelect: string,
    selectOptions: IList[]
  ): string | number | null => {
    let index_value: string | number | null = null;
    selectOptions.filter((selectOption, index) => {
      if (selectOption.value === valueSelect) {
        index_value = index;
        return true;
      }
      return false;
    });
    return index_value;
  };

  useEffect(() => {
    if (datos_notificacion.departamento === '') {
      set_municipio_notificacion_filtered([]);
      set_form_values({ ...form_values, municipioNotificacion: '' });
    } else {
      const municipio_indicadores =
        datos_notificacion.departamento?.value?.slice(0, 2);
      const municipios_coincidentes = municipios_options.filter((municipio) => {
        const indicator = municipio.value.slice(0, 2);
        return municipio_indicadores === indicator;
      });
      set_municipio_notificacion_filtered(municipios_coincidentes);
      set_form_values({ ...form_values, municipioNotificacion: 0 });
    }
  }, [datos_notificacion.departamento]);

  // Cambio inputs
  const handle_change = (e: any): void => {
    if (e.label) {
      const data = { ...create_persona_model };
      data.tipo_documento = e.value;
      set_create_persona_model(data);
    } else {
      const { name, value } = e.target;
      set_create_persona_model({ ...create_persona_model, [name]: value });
    }
  };

  // const select_date_picker = (e: any): void => {
  //   const format_data = { ...create_persona_model };
  //   const data = formatISO(new Date(e), {
  //     representation: 'date',
  //   });
  //   format_data.fecha_nacimiento = data;
  //   console.log(new Date(e))
  //   // format_data.fechaInput = Date(e);
  //   set_create_persona_model(format_data);
  // };

  const handle_change_phone = (e: any): void => {
    const format_data = { ...create_persona_model };
    const value = e.target.value as string;
    format_data.telefono_celular = '57' + value;
    format_data.celular = value;
    set_create_persona_model(format_data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit_form)}>
        <Grid container padding={3} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              Formulario de registro
            </Typography>
            <Typography variant="h6">
              {is_user ? 'Datos personales' : 'Datos de empresa'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className="form-label">
              Tipo de persona: <span className="text-danger">*</span>
            </label>
            <Select
              options={tipo_persona_options}
              placeholder="Seleccionar"
              onChange={handle_change_type_person}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="form-label">
              Tipo de documento: <span className="text-danger">*</span>
            </label>
            <Select
              name="tipo_documento"
              options={tipo_documento_filtrado}
              placeholder="Seleccionar"
              onChange={handle_change}
            />

            {errors_form.tipo_documento != null && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </Grid>
          {is_user && (
            <Grid item xs={12} container justifyContent="center">
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    label="¿Requiere nombre comercial?"
                    control={
                      <Checkbox
                        name="yes_or_no"
                        className="border border-terciary form-check-input mx-2"
                        onClick={handle_yes_or_no}
                        id="flexCheckDefault"
                      />
                    }
                  />
                </FormGroup>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de documento"
              type="number"
              required
              size={'small'}
              name="numero_documento"
              error={errors_form.numero_documento?.type === 'required'}
              helperText={
                errors_form.numero_documento?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              onChange={handle_change}
            />
          </Grid>
          {yes_or_no && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Digito verificación"
                  type="number"
                  required
                  size={'small'}
                  onChange={handle_max_one_digit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre comercial"
                  type="number"
                  required
                  size={'small'}
                  name="nombre_comercial"
                  error={errors_form.nombre_comercial?.type === 'required'}
                  helperText={
                    errors_form.nombre_comercial?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                />
              </Grid>
            </>
          )}
          {!is_user && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Razón social"
                type="number"
                required
                size={'small'}
                name="razon_social"
                error={errors_form.dv?.type === 'required'}
                helperText={
                  errors_form.dv?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
                onChange={handle_change}
              />
            </Grid>
          )}

          {is_user && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primer nombre"
                  type="number"
                  required
                  size={'small'}
                  name="primer_nombre"
                  error={errors_form.primer_nombre?.type === 'required'}
                  helperText={
                    errors_form.primer_nombre?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Segundo nombre"
                  type="number"
                  size={'small'}
                  name="segundo_nombre"
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primer apellido"
                  type="number"
                  required
                  size={'small'}
                  name="primer_apellido"
                  error={errors_form.primer_apellido?.type === 'required'}
                  helperText={
                    errors_form.primer_apellido?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="segundo apellido"
                  type="number"
                  required
                  size={'small'}
                  name="segundo_apellido"
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="exampleFormControlInput1">
                  Fecha de nacimiento: <span className="text-danger">*</span>
                </label>
                {/* <DatePicker
                  locale="es"
                  showYearDropdown
                  peekNextMonth
                  showMonthDropdown
                  scrollableYearDropdown
                  dropdownMode="select"
                  autoComplete="off"
                  dateFormat="dd/MM/yyyy"
                  selected={create_persona_model.fechaInput}
                  onSelect={select_date_picker}
                  className="border border-terciary form-control border rounded-pill px-3"
                  placeholderText="dd/mm/aaaa"
                /> */}

                {errors_form.fecha_nacimiento != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </Grid>
            </>
          )}

          {!is_user && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6">Representante Legal</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  options={tipo_documento_options}
                  required
                  placeholder="Tipo de documento"
                />

                {errors_form.tipo_documento != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de documento"
                  type="number"
                  required
                  size={'small'}
                  name="numero_documento"
                  error={errors_form.numero_documento?.type === 'required'}
                  helperText={
                    errors_form.numero_documento?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                />
              </Grid>
            </>
          )}

          {/* DATOS DE NOTIFICACION */}
          <Grid item xs={12}>
            <Typography variant="h6">Datos de notificación</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              required
              size={'small'}
              type="email"
              name="email"
              onChange={handle_change}
              error={errors_form.email?.type === 'required'}
              helperText={
                errors_form.email?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Confirme su e-mail"
              required
              size={'small'}
              type="email"
              name="cEmail"
              onChange={handle_change}
              error={errors_form.cEmail?.type === 'required'}
              helperText={
                errors_form.cEmail?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Celular"
              required
              size={'small'}
              name="celular"
              onChange={handle_change_phone}
              onCopy={(e: any) => e.preventDefault()}
              error={errors_form.cEmail?.type === 'required'}
              helperText={
                errors_form.cEmail?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Confirme su celular"
              required
              size={'small'}
              name="cCelular"
              onChange={handle_change}
              onCopy={(e: any) => e.preventDefault()}
              error={errors_form.cEmail?.type === 'required'}
              helperText={
                errors_form.cEmail?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
          </Grid>

          {!is_user && (
            <>
              <Grid item xs={12} sm={6}>
                <div className="mt-3 d-flex align-items-end">
                  <div className="col-12">
                    <TextField
                      fullWidth
                      label="Dirección de notificación"
                      value={complete_address}
                      required
                      size={'small'}
                    />
                  </div>
                  <Button
                    type="button"
                    className="btn bg-gradient-primary text-capitalize mb-0 mt-3"
                    onClick={() => {
                      set_is_open_generator(true);
                      console.log(watch());
                    }}
                  >
                    Generar
                  </Button>
                </div>
              </Grid>
              {errors_form.direccionNotificacion != null && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
              <Grid item xs={12} sm={6}>
                <label className="form-label text-terciary">
                  País notificación:
                </label>
                <Select
                  value={paises_options[form_values.paisNotificacion]}
                  options={paises_options}
                  onChange={handle_change_pais_notificacion}
                  placeholder="Seleccionar"
                />
              </Grid>
              {form_values.paisNotificacion === get_index_colombia() ? (
                <Grid item xs={12} sm={6}>
                  <label className="form-label text-terciary">
                    Departamento notificación:{' '}
                  </label>
                  <Select
                    options={departamentos_options}
                    isDisabled={
                      paises_options[form_values.paisNotificacion]?.value !==
                      'CO'
                    }
                    onChange={(e) => {
                      set_datos_notificacion({
                        ...datos_notificacion,
                        departamento: e,
                      });
                    }}
                    value={datos_notificacion.departamento}
                    placeholder="Seleccionar"
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <label className="form-label text-terciary">
                    Departamento notificación:{' '}
                  </label>
                  <Select
                    isDisabled
                    placeholder="Seleccionar"
                    value={'Seleccionar'}
                  />
                </Grid>
              )}
              {form_values.paisNotificacion === get_index_colombia() ? (
                <Grid item xs={12} sm={6}>
                  <label className="form-label">Municipio notificación: </label>
                  <Select
                    isDisabled={
                      paises_options[form_values.paisNotificacion]?.value !==
                      'CO'
                    }
                    value={
                      municipios_options[form_values.municipioNotificacion]
                    }
                    onChange={(e: SingleValue<any>) => {
                      set_form_values({
                        ...form_values,
                        municipioNotificacion: get_index_by_select_options(
                          e.value,
                          municipios_options
                        ),
                      });
                    }}
                    options={municipio_notificacion_filtered}
                    placeholder="Seleccionar"
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <label className="form-label">Municipio notificación: </label>
                  <Select
                    isDisabled
                    placeholder="Seleccionar"
                    value={'Seleccionar'}
                  />
                </Grid>
              )}
            </>
          )}

          {/* DATOS DE NOTIFICACION */}
          <Typography variant="h6">Datos de la cuenta</Typography>

          <Grid item xs={12} sm={6}>
            <div className="mt-3">
              <label className="text-terciary text-terciary ms-2">
                Nombre de usuario: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border border-terciary rounded-pill px-3"
                type="text"
                name="nombreDeUsuario"
                onChange={handle_change}
              />
            </div>
            {errors_form.nombreDeUsuario != null && (
              <small className="text-danger">Este campo es obligatorio</small>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="mt-3">
              <label className="text-terciary text-terciary ms-2">
                Contraseña: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border border-terciary rounded-pill px-3"
                type="password"
                onCopy={(e: any) => e.preventDefault()}
                name="password"
                onChange={handle_change}
                // {...register('password', { required: true })}
              />
            </div>
            {errors_form.password != null && (
              <small className="text-danger">Este campo es obligatorio</small>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="mt-3">
              <label className="text-terciary text-terciary ms-2">
                Confirmar contraseña: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border border-terciary rounded-pill px-3"
                type="password"
                onPaste={(e: any) => e.preventDefault()}
                name="password2"
                onChange={handle_change}
              />
            </div>
            {errors_form.password != null && (
              <small className="text-danger">Este campo es obligatorio</small>
            )}
            {error_password === true && (
              <small className="text-danger">
                Las contraseñas no coinciden
              </small>
            )}
          </Grid>

          <Grid item xs={12}>
            <label className="text-bold mt-3">
              <span className="text-danger">*</span>Al hacer clic en
              Registrarse, aceptas nuestras condiciones, la política de
              privacidad y política de cookies. Es posible que te enviemos
              notificaciones por SMS y/o vía correo electrónico.
            </label>
            <div className="d-flex justify-content-end mt-3">
              <Button
                onClick={() => {
                  navigate('/login');
                }}
                disabled={loading}
                variant="outlined"
                startIcon={<CancelIcon />}
              >
                Cancelar
              </Button>
              <Button
                disabled={loading}
                variant="outlined"
                type="submit"
                startIcon={<SavelIcon />}
              >
                Guardar
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>

      {/* <DirecionResidenciaModal
        isModalActive={is_open_generator}
        setIsModalActive={set_is_open_generator}
        complete_address={complete_address}
        set_complete_address={set_complete_address}
        reset={reset}
        keyReset="direccionNotificacion"
        watch={watch}
      /> */}
    </>
  );
};
