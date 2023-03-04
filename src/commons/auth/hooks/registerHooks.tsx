import { useState } from 'react';
import { api } from '../../../api/axios';
import { text_choise_adapter } from '../adapters/textChoices.adapter';
import { control_error } from '../../../helpers/controlError';
import {
  // type IAuth,
  // type IDatosNotificacion,
  // type IFormValues,
  type IList,
} from '../interfaces/authModels';

// const default_values = {
//   tipo_persona: '',
//   tipo_documento: '',
//   numero_documento: '',
//   razon_social: '',
//   dv: '',
//   primer_nombre: '',
//   segundo_nombre: '',
//   primer_apellido: '',
//   segundo_apellido: '',
//   fechaInput: '',
//   fecha_nacimiento: '',
//   ubicacion_georeferenciada: 'mi casita',
//   pais_residencia: '',
//   municipio: '',
//   pais_nacimiento: '',
//   sexo: '',
//   email: '',
//   cEmail: '',
//   cod_pais_nacionalidad_empresa: '',
//   telefono_celular: '',
//   cCelular: '',
//   celular: '',
//   nombre_comercial: '',
//   acepta_notificacion_sms: true,
//   acepta_notificacion_email: true,
//   acepta_tratamiento_datos: true,
//   direccionNotificacion: '',
//   municipioNotificacion: '',
// };

export const use_register = (): any => {
  const [loading, set_loading] = useState<boolean>(false);
  // const [is_open_generator, set_is_open_generator] = useState<boolean>(false);
  // const [yes_or_no, set_yes_or_no] = useState<boolean>(false);
  // const [complete_address, set_complete_address] = useState<string>('');
  // const [id_representante, set_id_representante] = useState<string>('');
  // const [errors, set_errors] = useState<IAuth>(defaultErrors);
  // const [datos_notificacion, set_datos_notificacion] =
  //   useState<IDatosNotificacion>({ departamento: '' });
  // const [municipio_notificacion_filtered, set_municipio_notificacion_filtered] =
  //   useState<IList[]>([]);
  const [tipo_documento_options, set_tipo_documento_options] = useState<
    IList[]
  >([]);
  const [paises_options, set_paises_options] = useState<IList[]>([]);
  const [departamentos_options, set_departamentos_options] = useState<IList[]>(
    []
  );
  const [municipios_options, set_municipios_options] = useState<IList[]>([]);
  const [tipo_persona_options, set_tipo_persona_options] = useState<IList[]>(
    []
  );
  // const [form_values, set_form_values] = useState<IFormValues>({
  //   fechaNacimiento: '',
  //   tipo_persona: { label: 'Natural', value: 'N' },
  //   digito_verificacion: '',
  //   municipioNotificacion: '',
  // });

  // Modelo de creacion
  // const [create_persona_model, set_create_persona_model] =
  //   useState(default_values);
  // const navigate = useNavigate();

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
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
      control_error(err);
    } finally {
      set_loading(false);
    }
  };
  // const {
  //   watch,
  //   handleSubmit,
  //   reset,
  //   formState: { errors: errorsForm },
  // } = useForm<IDefaultValues>({ default_values });

  // const submitForm: SubmitHandler<IDefaultValues> = async (
  //   data: IDefaultValues
  // ) => {
  //   //* Validación duplicidad de emails y celular
  //   if (
  //     create_persona_model.email !== create_persona_model.cEmail ||
  //     create_persona_model.celular !== create_persona_model.cCelular
  //   ) {
  //     const dataResponse = {
  //       ...defaultErrors,
  //     };

  //     if (create_persona_model.email !== create_persona_model.cEmail) {
  //       dataResponse.confirmacionEmail = true;
  //     }

  //     if (create_persona_model.celular !== create_persona_model.cCelular) {
  //       dataResponse.confirmacionCelular = true;
  //     }

  //     set_errors({ ...errors, ...dataResponse });
  //     setTimeout(() => {
  //       set_errors({ ...errors, ...defaultErrors });
  //     }, 2000);

  //     return;
  //   }

  //   const persona: IPerson = {
  //     tipo_persona: '',
  //     tipo_documento: '',
  //     numero_documento: '',
  //     digito_verificacion: '',
  //     nombre_comercial: '',
  //     primer_nombre: '',
  //     segundo_nombre: '',
  //     primer_apellido: '',
  //     segundo_apellido: '',
  //     fecha_nacimiento: '',
  //     email: '',
  //     telefono_celular: '',
  //     ubicacion_georeferenciada: '',
  //     razon_social: '',
  //     telefono_celular_empresa: '',
  //     direccion_notificaciones: '',
  //     representante_legal: '',
  //     cod_municipio_notificacion_nal: '',
  //   };

  //   set_loading(true);
  //   if (create_persona_model.tipo_persona === 'N') {
  //     try {
  //       await api.post(
  //         'personas/persona-natural/create/',
  //         create_persona_model
  //       );
  //       Swal.fire({
  //         title: 'Registrado como persona natural',
  //         text: '¿Desea registrarse como usuario?',
  //         icon: 'success',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3BA9E0',
  //         cancelButtonColor: '#6c757d',
  //         confirmButtonText: 'Si',
  //         cancelButtonText: 'No',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate('/registeruser');
  //         } else {
  //           resetValues();
  //         }
  //       });
  //       //* Manejo de errores por datos repetidos en la DB (email y numero documento)
  //     } catch (err: any) {
  //       console.log(err);
  //       set_loading(false);
  //       Swal.fire({
  //         title: 'Este documento y correo ya estan relacionados',
  //         text: err.response?.data.detail,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3BA9E0',
  //         cancelButtonColor: '#6c757d',
  //         confirmButtonText: 'Si',
  //         cancelButtonText: 'No',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate('/registeruser');
  //         }
  //       });
  //     }
  //     set_loading(false);
  //   } else {
  //     try {
  //       const { data: dataRepresentante } = await api.get(
  //         `personas/get-personas-naturales-by-document/${data.tipoDocumento.value}/${data.numero_documento}/`
  //       );
  //       set_id_representante(dataRepresentante?.data?.id_persona);
  //     } catch (error) {
  //       console.log(error);
  //       Swal.fire({
  //         title:
  //           'No existe un representante legal registrado con el documento ingresado',
  //         text: '¿Quiere crear una persona natural?',
  //         icon: 'info',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3BA9E0',
  //         cancelButtonColor: '#6c757d',
  //         confirmButtonText: 'Si',
  //         cancelButtonText: 'No',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           handleChangeTypePerson({ label: 'Natural', value: 'N' });
  //           set_form_values({
  //             ...form_values,
  //             tipo_persona: { label: 'Natural', value: 'N' },
  //           });
  //         }
  //       });
  //       set_loading(false);
  //       return error as AxiosError;
  //     }

  //     try {
  //       await api.post('personas/persona-juridica/create/', persona);
  //       Swal.fire({
  //         title: 'Registrado como persona juridica',
  //         text: '¿Desea registrarse como usuario?',
  //         icon: 'success',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3BA9E0',
  //         cancelButtonColor: '#6c757d',
  //         confirmButtonText: 'Si',
  //         cancelButtonText: 'No',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate('/registeruser');
  //         } else {
  //           resetValues();
  //         }
  //       });
  //     } catch (err: any) {
  //       if (err.response.data.email && err.response.data.numero_documento) {
  //         Swal.fire({
  //           title: 'Este documento y correo ya estan relacionados',
  //           text: '¿Desea registrarse como usuario?',
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3BA9E0',
  //           cancelButtonColor: '#6c757d',
  //           confirmButtonText: 'Si',
  //           cancelButtonText: 'No',
  //         }).then((result: any) => {
  //           if (result.isConfirmed) {
  //             navigate('/registeruser');
  //           }
  //         });
  //       } else if (err.response?.data?.non_field_errors) {
  //         Swal.fire({
  //           title: 'Este documento ya esta relacionado',
  //           text: '¿Desea registrarse como usuario?',
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3BA9E0',
  //           cancelButtonColor: '#6c757d',
  //           confirmButtonText: 'Si',
  //           cancelButtonText: 'No',
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             navigate('/registeruser');
  //           }
  //         });
  //       } else if (err.response?.data?.numero_documento) {
  //         Swal.fire({
  //           title: 'Este documento ya existe',
  //           text: '¿Desea registrarse como usuario?',
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3BA9E0',
  //           cancelButtonColor: '#6c757d',
  //           confirmButtonText: 'Si',
  //           cancelButtonText: 'No',
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             navigate('/registeruser');
  //           }
  //         });
  //       } else if (err.response?.data?.email) {
  //         Swal.fire({
  //           title: 'Este correo electronico ya existe',
  //           text: 'Verifica tus datos',
  //           icon: 'info',
  //           confirmButtonColor: '#3BA9E0',
  //           cancelButtonColor: '#6c757d',
  //           confirmButtonText: 'Aceptar',
  //         });
  //       } else {
  //         console.log(err);
  //       }
  //       return err as AxiosError;
  //     }
  //     set_loading(false);
  //   }
  // };

  // const resetValues = () => {
  //   reset(default_values);
  //   set_complete_address('');
  // };

  // const handleyes_or_no = (e) => {
  //   if (e.target.checked) {
  //     set_yes_or_no(true);
  //   } else {
  //     set_yes_or_no(false);
  //   }
  // };

  // const handleMaxOneDigit = (e) => {
  //   if (e.target.value.length > 1) {
  //     e.target.value = e.target.value[0];
  //     set_form_values({
  //       ...form_values,
  //       digito_verificacion: e.target.value[0],
  //     });
  //   } else {
  //     set_form_values({
  //       ...form_values,
  //       digito_verificacion: e.target.value,
  //     });
  //   }
  // };

  // const getIndexColombia = () => {
  //   let indexColombia: string | number | null = null;
  //   paises_options.forEach((pais, index) => {
  //     if (pais.value === 'CO') {
  //       indexColombia = index;
  //     }
  //   });
  //   return indexColombia;
  // };

  // const handleChangePaisNotificacion = (e) => {
  //   const objectSend: IObjectSend = {
  //     paisNotificacion: getIndexBySelectOptions(e.value, paises_options),
  //     municipioNotificacion: '',
  //   };
  //   if (e.value !== 'CO' || !e.value) {
  //     objectSend.municipioNotificacion = null;
  //     reset({
  //       ...watch(),
  //       municipioNotificacion: null,
  //     });
  //     set_datos_notificacion({ ...datos_notificacion, departamento: '' });
  //   }
  //   set_form_values({
  //     ...form_values,
  //     ...objectSend,
  //   });
  // };

  // const getIndexBySelectOptions = (valueSelect, selectOptions) => {
  //   let indexValue = null;
  //   selectOptions.filter((selectOption, index) => {
  //     if (selectOption.value === valueSelect) {
  //       indexValue = index;
  //       return true;
  //     }
  //     return false;
  //   });
  //   return indexValue;
  // };

  // useEffect(() => {
  //   if (datos_notificacion.departamento === '') {
  //     set_municipio_notificacion_filtered([]);
  //     set_form_values({ ...form_values, municipioNotificacion: '' });
  //   } else {
  //     const municipioIndicadores =
  //       datos_notificacion.departamento?.value?.slice(0, 2);
  //     const municipiosCoincidentes = municipios_options.filter((municipio) => {
  //       const indicator = municipio.value.slice(0, 2);
  //       return municipioIndicadores === indicator;
  //     });
  //     set_municipio_notificacion_filtered(municipiosCoincidentes);
  //     set_form_values({ ...form_values, municipioNotificacion: 0 });
  //   }
  // }, [datos_notificacion.departamento]);

  // // Cambio inputs
  // const handleChange = (e) => {
  //   if (e.label) {
  //     const data = { ...create_persona_model };
  //     data.tipo_documento = e.value;
  //     set_create_persona_model(data);
  //   } else {
  //     const { name, value } = e.target;
  //     set_create_persona_model({ ...create_persona_model, [name]: value });
  //   }
  // };

  // const selectDatePicker = (e) => {
  //   const formatData = { ...create_persona_model };
  //   const data = formatISO(new Date(e), {
  //     representation: 'date',
  //   });
  //   formatData.fecha_nacimiento = data;
  //   formatData.fechaInput = e;
  //   set_create_persona_model(formatData);
  // };

  // const handleChangePhone = (e) => {
  //   const formatData = { ...create_persona_model };
  //   formatData.telefono_celular = '57' + e.target.value;
  //   formatData.celular = e.target.value;
  //   set_create_persona_model(formatData);
  // };

  return {
    paises_options,
    departamentos_options,
    municipios_options,
    tipo_documento_options,
    tipo_persona_options,
    loading,
    get_selects_options,
  };
};
