// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';

// import { crear_solicitud_bien_consumo } from '../../store/solicitudBienConsumoThunks';
// import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
// import { type Dispatch, type SetStateAction } from 'react';

// interface IProps {
//     is_modal_active: boolean;
//     set_is_modal_active: Dispatch<SetStateAction<boolean>>;

// }

// // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
// const CrearSolicitudBienConsumoModal = ({
//     is_modal_active,
//     set_is_modal_active,
// }: IProps) => {


//     const handle_close = (): void => {
//         set_is_modal_active(false);
//     }
//     const {
//         register,
//         reset,
//         // eslint-disable-next-line @typescript-eslint/naming-convention
//         handleSubmit,
//         formState: { errors },
//     } = useForm();


//     const on_sumbit_crear_bien_consumo: SubmitHandler<FieldValues> = (data): void => {

//         const nuevo_bien_consumo = {

//             id_item_solicitud_consumible: data.id_item_solicitud_consumible,
//             id_bien: data.id_bien,
//             cantidad: data.cantidad,
//             observaciones: data.observaciones,
//             nro_posicion: data.nro_posicion


//         };
//         void crear_solicitud_bien_consumo(nuevo_bien_consumo);
//         set_is_modal_active(!is_modal_active);

//         reset();
//     };




//     return (
//         <Dialog open={is_modal_active}
//             onClose={handle_close}
//             maxWidth="xs">
//             <Box component="form"
//                 onSubmit={handleSubmit(on_sumbit_crear_bien_consumo)}>
//                 <DialogTitle>Crear Estación</DialogTitle>
//                 <Divider />
//                 <DialogContent sx={{ mb: '0px' }}>
//                     <Grid container spacing={1}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="id_item"
//                                 fullWidth
//                                 size="small"
//                                 margin="dense"
//                                 required
//                                 autoFocus

//                                 error={Boolean(errors.id_item_solicitud_consumible)}
//                                 helperText={
//                                     (errors.id_item_solicitud_consumible?.type === "required") ? "Este campo es obligatorio" :
//                                         (errors.id_item_solicitud_consumible?.type === "pattern") ? "El nombre debe tener de 3 a 30 caracteres y solo letras mayúsculas o minúsculas" : ""
//                                 }
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="id bien"
//                                 select
//                                 fullWidth
//                                 size="small"
//                                 margin="dense"
//                                 required
//                                 autoFocus
//                                 {...register("id_bien", { required: true })}
//                                 error={Boolean(errors.id_bien)}
//                                 helperText={(errors.id_bien != null) ? "Este campo es obligatorio" : ""}
//                             >

//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="cantidad"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 margin="dense"
//                                 required
//                                 autoFocus
//                                 {...register("cantidad", { required: true })}
//                                 error={Boolean(errors.cantidad)}
//                                 helperText={(errors.cantidad != null) ? "Este campo es obligatorio" : ""}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="numero poscion"
//                                 type="number"
//                                 fullWidth
//                                 size="small"
//                                 margin="dense"
//                                 required
//                                 autoFocus
//                                 {...register("numero poscion", { required: true })}
//                                 error={Boolean(errors.nro_posicion)}
//                                 helperText={(errors.nro_posicion != null) ? "Este campo es obligatorio" : ""}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="observaciones"
//                                 select
//                                 type="text"
//                                 fullWidth
//                                 size="small"
//                                 margin="dense"
//                                 required
//                                 autoFocus
//                                 {...register("observaciones", { required: true })}
//                                 error={Boolean(errors.observaciones)}
//                                 helperText={(errors.observaciones != null) ? "Este campo es obligatorio" : ""}
//                             >

//                             </TextField>
//                         </Grid>

//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => {
//                         handle_close();
//                         reset();
//                     }}>Cancelar</Button>
//                     <Button variant="contained" color="primary" onClick={handleSubmit(on_sumbit_crear_bien_consumo)}>Guardar</Button>
//                 </DialogActions>
//             </Box>
//         </Dialog>
//     );

// }

// // eslint-disable-next-line no-restricted-syntax
// export default CrearSolicitudBienConsumoModal;