
// import React, { useEffect } from 'react';
// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
// import { Controller, useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import { textChoiseAdapter } from '../../../adapters/textChoices.adapter';
// import Subtitle from '../../../components/Subtitle';
// import clienteAxios from '../../../config/clienteAxios';
// import { formatISO } from 'date-fns';
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { IList } from '../../../Interfaces/auth';
// import moment from 'moment';

// // eslint-disable-next-line @typescript-eslint/naming-convention
// const desbloqueoModel = {
//   nombre_de_usuario: '',
//   tipo_documento: '',
//   numero_documento: '',
//   //telefono: "",
//   telefono_celular: '',
//   email: '',
//   fecha_nacimiento: '',
//   //fecha_input: "",
//   redirect_url: '',
// };

// //const telefono=""
// const desbloqueo_usuario_screen: React.FC = () => {{
//   const [modelo, setModelo] = useState(desbloqueoModel);
//   const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState<IList[]>([]);
//   const [formValues, setFormValues] = useState<{
//     fechaNacimiento: Date | number;
//   }>();
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();

//   const telefono = '';
//   const indicativo = '57';

//   const [selected_date, set_selected_date] = useState(null);
//   const [dateString, setDateString] = useState('');

//   const handleDateChange = (date: React.SetStateAction<null>) => {
//     set_selected_date(date);
//   };

//   const formattedDate = selected_date
//     ? moment(selected_date).format('YYYY-MM-DD')
//     : '';

//   // function handleDateChange(date) {
//   //   setSelectedDate(date);
//   //   const dateString = date.toLocaleDateString("es-ES", {
//   //       day: "2-digit",
//   //       month: "2-digit",
//   //       year: "numeric"
//   //   });
//   //   setDateString(dateString);

//   // }

//   const onSubmit = async () => {
//     const data = { ...modelo };

//     data.fecha_nacimiento = dateString;

//     modelo.fecha_nacimiento = data.fecha_nacimiento;
//     modelo.redirect_url =
//       process.env.NODE_ENV === 'production'
//         ? 'https://macareniafrontdevelop.netlify.app/#/actualizar-contrasena-bloqueo'
//         : 'https://macareniafrontmain.netlify.app/#/actualizar-contrasena-bloqueo';
//     data.telefono_celular = `${indicativo}${data.telefono_celular}`;

//     modelo.telefono_celular = data.telefono_celular;
//     desbloqueoModel.telefono_celular = modelo.telefono_celular;
//     // modelo.telefono=""
//     desbloqueoModel.email = modelo.email;
//     desbloqueoModel.fecha_nacimiento = formattedDate;
//     desbloqueoModel.nombre_de_usuario = modelo.nombre_de_usuario;
//     desbloqueoModel.numero_documento = modelo.numero_documento;
//     desbloqueoModel.redirect_url = modelo.redirect_url;
//     desbloqueoModel.tipo_documento = modelo.tipo_documento;
//     console.log(desbloqueoModel);
//     await clienteAxios
//       .post('users/unblock/', desbloqueoModel)
//       .then((res) => {
//         Swal.fire({
//           position: 'center',
//           icon: 'info',
//           title: 'Datos correctos, revisa tu correo electronico',
//           confirmButtonText: 'Aceptar',
//           confirmButtonColor: '#3085d6',
//         });
//       })
//       .catch((err) => {
//         Swal.fire({
//           position: 'center',
//           icon: 'warning',
//           title: 'Datos invalidos',
//           confirmButtonText: 'Aceptar',
//           confirmButtonColor: '#3085d6',
//         });
//       });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     await clienteAxios.get('choices/tipo-documento/').then((res: { data: { value: any; }; }) => {
//       const documentosFormat = textChoiseAdapter(res.data.value);
//       setTipoDocumentoOptions(documentosFormat);
//     });
//   };
//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setModelo({ ...modelo, [name]: value });
//   };
//   const handleChangeMulti = (e: { value: string; }) => {
//     const data = { ...modelo };
//     // data.tipo_documento.label = e.label;
//     data.tipo_documento = e.value;
//     setModelo(data);
//   };
//   // const selectDatePicker = (e) => {
//   //   const formatData = { ...modelo };
//   //   const data = formatISO(new Date(e), {
//   //     representation: "date",
//   //   });
//   //  // const selectedDateString=selectedDate.toLocaleDateString("es-ES")
//   //   formatData.fecha_nacimiento = data;
//   //   console.log(formatData.fecha_nacimiento);
//   //   formatData.fecha_nacimiento = e;
//   //   console.log(formatData.fecha_nacimiento);
//   //   setModelo(formatData);
//   // };

//   return (
//     <div
//       className="page-header align-items-start min-vh-100"
//       style={{
//         backgroundColor: 'rgb(4,47,74)',
//       }}
//     >
//       <div className="container my-auto">
//         <div className="row">
//           <div className="card z-index-0 fadeIn3 fadeInBottom col-lg-6 col-md-8 col-12 mx-auto">
//             <form
//               className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
//               data-animation="FadeIn"
//               onSubmit={handleSubmit(onSubmit)}
//               id="configForm"
//             >
//               <h3 className="text-rigth  fw-light mb-3 mb-2">
//                 Desbloqueo de usuario
//               </h3>
//               <div className="row">
//                 <Subtitle title="Información requerida" mb={2} />
//                 <div className="col-12 ">
//                   <div>
//                     <label className="ms-3 text-terciary">
//                       Nombre de usuario: <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control border  border-terciary rounded-pill px-3"
//                       type="text"
//                       name="nombre_de_usuario"
//                       value={modelo.nombre_de_usuario}
//                       onChange={handleChange}
//                     />
//                     {errors.nombre_de_usuario && (
//                       <div className="col-12">
//                         <small className="text-center text-danger">
//                           Este campo es obligatorio
//                         </small>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">
//                     Tipo de documento: <span className="text-danger">*</span>
//                   </label>
//                   <Select
//                     options={[
//                       { label: 'Cédula de ciudadanía', value: 'CC' },
//                       { label: 'Cédula extranjería', value: 'CE' },
//                       { label: 'Tarjeta de identidad', value: 'TI' },
//                       { label: 'Registro civil', value: 'RC' },
//                       { label: 'NUIP', value: 'NU' },
//                       { label: 'Pasaporte', value: 'PA' },
//                       { label: 'Permiso especial de permanencia', value: 'PE' },
//                       { label: 'NIT', value: 'NI' },
//                     ]}
//                     placeholder="Seleccionar"
//                     name="tipo_documento"
//                     // value={modelo.tipo_documento}
//                     onChange={handleChangeMulti}
//                   />
//                   {errors.tipo_documento && (
//                     <div className="col-12">
//                       <small className="text-center text-danger">
//                         Este campo es obligatorio
//                       </small>
//                     </div>
//                   )}
//                 </div>
//                 <div className="col-12 ">
//                   <div>
//                     <label className="ms-3 mt-2 text-terciary">
//                       Número de documento:{' '}
//                       <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control border-terciary border rounded-pill px-3"
//                       type="number"
//                       name="numero_documento"
//                       value={modelo.numero_documento}
//                       onChange={handleChange}
//                     />
//                     {errors.numero_documento && (
//                       <div className="col-12">
//                         <small className="text-center text-danger">
//                           Este campo es obligatorio
//                         </small>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div>
//                     <label className="ms-3 mt-2 text-terciary">
//                       Número de celular: <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control border-terciary border rounded-pill px-3"
//                       type="number"
//                       name="telefono_celular"
//                       value={modelo.telefono_celular}
//                       onChange={handleChange}
//                     />
//                     {errors.telefono_celular && (
//                       <div className="col-12">
//                         <small className="text-center text-danger">
//                           Este campo es obligatorio
//                         </small>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div>
//                     <label className="ms-3 mt-2 text-terciary">
//                       Correo electrónico: <span className="text-danger">*</span>
//                     </label>
//                     <input
//                       className="form-control border-terciary border rounded-pill px-3"
//                       type="email"
//                       name="email"
//                       value={modelo.email}
//                       onChange={handleChange}
//                     />
//                     {errors.email && (
//                       <div className="col-12">
//                         <small className="text-center text-danger">
//                           Este campo es obligatorio
//                         </small>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div>
//                     <label className="mt-2 ms-3 text-terciary">
//                       Fecha de nacimiento:{' '}
//                       <span className="text-danger">*</span>
//                     </label>
//                     <DatePicker
//                       locale="es"
//                       showYearDropdown
//                       peekNextMonth
//                       showMonthDropdown
//                       scrollableYearDropdown
//                       dropdownMode="select"
//                       autoComplete="off"
//                       dateFormat="yyyy-MM-dd"
//                       selected={selected_date}
//                       onChange={handleDateChange}
//                       className="form-control  border-terciary border rounded-pill px-3 "
//                       placeholderText="dd/mm/aaaa"
//                     />
//                     {errors.fecha_nacimiento && (
//                       <div className="col-12">
//                         <small className="text-center text-danger">
//                           Este campo es obligatorio
//                         </small>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-12 mt-2">
//                   <div className="d-grid gap-2 d-flex justify-content-end">
//                     <button
//                       className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
//                       type="submit"
//                       title="Send"
//                       form="configForm"
//                     >
//                       Desbloquear
//                     </button>
//                     <Link className="text-white" to="/login">
//                       <button
//                         className="btn btn-light text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
//                         type="submit"
//                         title="Send"
//                         form="configForm"
//                       >
//                         Cancelar
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesbloqueoUsuarioScreen;
// //
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
// import { LoadingButton } from '@mui/lab';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DesbloqueodeUsuario: React.FC = () => {
  return (
    <>
      <Grid item>
        <Typography
          textAlign="center"
          variant={'h1'}
          sx={{ mb: '10px' }}
          paragraph
        >
          Desbloqueo de Usuario
        </Typography>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel htmlFor="desbloqueo_usuario">E-mail</InputLabel>
          <OutlinedInput
            required
            id="recuperar_contrasena"
            label="E-mail"
            type="email"
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Grid item justifyContent="center" container>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="success"
            disableElevation
            // loading={}
            // disabled={disable}
            style={{ fontSize: '.9rem' }}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
