 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import React from "react";
// import { Controller, useForm } from "react-hook-form";
// import Modal from "react-modal";
// import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
// import { useEffect, useState } from "react";
// import clienteEstacionesNew from "../config/ClienteEstacionesPostgresql";
// import {
//   obtenerTodosUsuarios,
//   crearUsuario,
// } from "../store/slices/usuarioEstaciones/indexUsuarioEstaciones";
// import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, InputLabel, MenuItem, TextField } from "@mui/material";

// Modal.setAppElement("#root");

// const defaultValues = {

//   cod_tipo_documento_id: "",
//   numero_documento_id: "",
//   primer_nombre: "",
//   segundo_nombre: "",
//   primer_apellido: "",
//   segundo_apellido: "",
//   entidad: "",
//   cargo: "",
//   email_notificacion: "",
//   nro_celular_notificacion: "",
//   observacion: "",

// };

// const NuevoUsuarioModal = ({ isModalActive, setIsModalActive }) => {
//   const dispatch = useAppDispatch();
//   //(state) => state.login.userinfo.id_de_usario
//   const [estacionesOptions, setEstacionesOptions] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const getEstaciones = async () => {
//       const { data: dataGetEstaciones } = await clienteEstacionesNew.get(
//         'api/estaciones/consultar-estaciones/'
//       );
//       const estacionesMaped = dataGetEstaciones.data.map((estacion) => ({
//         label: estacion.nombre_estacion,
//         value: estacion.id_estacion,
//       }));
//       setEstacionesOptions(estacionesMaped);
//       //console.log(estacionesMaped)
//     };
//     getEstaciones();
//   }, []);

//   const onSumbitEstacion = async (data) => {
//     const nuevoUsuario = {
//       cod_tipo_documento_id: data.cod_tipo_documento_id,
//       numero_documento_id: data.numero_documento_id,
//       primer_nombre: data.primer_nombre,
//       segundo_nombre: data.segundo_nombre,
//       primer_apellido: data.primer_apellido,
//       segundo_apellido: data.segundo_apellido,
//       entidad: data.entidad,
//       cargo: data.cargo,
//       email_notificacion: data.email_notificacion,
//       nro_celular_notificacion: data.nro_celular_notificacion,
//       observacion: data.observacion,
//       id_estacion: data.estacion.value,

//     };
//     crearUsuario(dispatch, nuevoUsuario);
//     setIsModalActive(!isModalActive);
//     reset(defaultValues);
//   };
//   const tiposdoc = [
//     {
//       value: 'CC',
//       label: 'Cédula de ciudadanía'
//     },
//     {
//       value: 'CE',
//       label: 'Cédula extranjería',
//     },
//     {
//       value: 'TI',
//       label: 'Tarjeta de identidad',
//     },
//     {
//       value: 'RC',
//       label: 'Registro civil',
//     },
//     {
//       value: 'NU',
//       label: 'NUIP'
//     },
//     {
//       value: 'PA',
//       label: 'Pasaporte',
//     },
//     {
//       value: 'PE',
//       label: 'Permiso especial de permanencia',
//     },
//     {
//       value: 'NT',
//       label: 'NIT',
//     },
//   ];

//   return (
//     <Dialog
//       open={isModalActive}
//       onClose={() => {
//         setIsModalActive(false);
//         reset(defaultValues);
//       }}
//     >
//       <DialogTitle>Nuevo usuario</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit(onSumbitEstacion)}>
//           <Grid container spacing={3}>
//           <Grid item xs={12}>
//               <TextField
//                 label="Tipo de Identificación"
//                 select
//                 fullWidth
//                 {...register("cod_tipo_documento_id", { required: true })}
//                 error={Boolean(errors.cod_tipo_documento_id)}
//                 helperText={errors.cod_tipo_documento_id ? "Este campo es obligatorio" : ""}
//               >
//                 {tiposdoc.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Número Identificación"
//                 type="number"
//                 fullWidth
//                 {...register("numero_documento_id", { required: true })}
//                 error={Boolean(errors.numero_documento_id)}
//                 helperText={errors.numero_documento_id ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Primer Nombre"
//                 fullWidth
//                 {...register("primer_nombre", { required: true })}
//                 error={Boolean(errors.primer_nombre)}
//                 helperText={errors.primer_nombre ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Segundo Nombre"
//                 fullWidth
//                 {...register("segundo_nombre", { required: true })}
//                 error={Boolean(errors.segundo_nombre)}
//                 helperText={errors.segundo_nombre ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Primer Apellido"
//                 fullWidth
//                 {...register("primer_apellido", { required: true })}
//                 error={Boolean(errors.primer_apellido)}
//                 helperText={errors.primer_apellido ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Segundo Apellido"
//                 fullWidth
//                 {...register("segundo_apellido", { required: true })}
//                 error={Boolean(errors.segundo_apellido)}
//                 helperText={errors.segundo_apellido ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Entidad a la cual pertenece"
//                 fullWidth
//                 placeholder="Entidad a la cual pertenece"
//                 {...register("entidad", { required: true })}
//                 error={Boolean(errors.entidad)}
//                 helperText={errors.entidad ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Cargo"
//                 fullWidth
//                 {...register("cargo", { required: true })}
//                 error={Boolean(errors.cargo)}
//                 helperText={errors.cargo ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Correo Electronico"
//                 type="email"
//                 fullWidth
//                 {...register("email_notificacion", { required: true })}
//                 error={Boolean(errors.email_notificacion)}
//                 helperText={errors.email_notificacion ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Número Celular"
//                 type="number"
//                 fullWidth
//                 {...register("nro_celular_notificacion", { required: true })}
//                 error={Boolean(errors.nro_celular_notificacion)}
//                 helperText={
//                   errors.nro_celular_notificacion ? "Este campo es obligatorio" : ""
//                 }
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Observación"
//                 multiline
//                 fullWidth
//                 {...register("observacion", { required: true })}
//                 error={Boolean(errors.observacion)}
//                 helperText={errors.observacion ? "Este campo es obligatorio" : ""}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <InputLabel>Estación</InputLabel>
//               <Controller
//                 name="estacion"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     options={estacionesOptions}
//                     placeholder="Seleccionar"
//                   />
//                 )}
//               />
//               {errors.estacion && (
//                 <FormHelperText error>Este campo es obligatorio</FormHelperText>
//               )}
//             </Grid>
//           </Grid>
//           <DialogActions>
//             <Button
//               variant="text"
//               color="primary"
//               onClick={() => {
//                 setIsModalActive(false);
//                 reset(defaultValues);
//               }}
//             >
//               Cancelar
//             </Button>
//             <Button variant="contained" color="primary" type="submit">
//               Guardar
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>

//   );
// };
// export default NuevoUsuarioModal;
