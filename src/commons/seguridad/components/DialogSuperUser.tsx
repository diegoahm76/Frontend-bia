// /* eslint-disable @typescript-eslint/naming-convention */
// import type React from 'react';
// import { useState } from 'react';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from '@mui/material';
// import { getPersonNameById,changeSuperUser } from '../request/authRequest'; // Importamos la función

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (newSuperUser: { idType: string; idNumber: string; name: string }) => void;
// }

// export const DialogSuperUser =(props: Props): JSX.Element =>  {
//   const { isOpen, onClose, onSubmit } = props;
//   const [idType, setIdType] = useState('');
//   const [idNumber, setIdNumber] = useState('');
//   const [name, setName] = useState('');

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     event.preventDefault();

//     if ((idType === "") || (idNumber === "") || (name === "") || idType.trim() === '' || idNumber.trim() === '' || name.trim() === '') {
//       alert('Por favor complete todos los campos');
//       return;
//     }


//     if (Number.isNaN(Number(idNumber))) {
//       alert('El número de identificación debe ser un valor numérico');
//       return;
//     }

//     const personName: string | null = await getPersonNameById(idType, idNumber);

//     if (personName == null) {
//       alert('No se encontró una persona con el número de identificación ingresado');
//       return;
//     }

//     const success: boolean = await changeSuperUser(idType, idNumber);

//     if (success) {
//       onSubmit({ idType, idNumber, name });
//       alert('El superusuario se ha cambiado satisfactoriamente');
//       handleClose();
//     } else {
//       alert('Hubo un error al cambiar el superusuario');
//     }
//   };

//   const handleIdNumberChange =  async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
//     const newIdNumber = event.target.value;
//     setIdNumber(newIdNumber);

//     if (newIdNumber !== undefined && Boolean(newIdNumber))  {
//       const personName = getPersonNameById(idType, newIdNumber);
//       setName(await personName);
//     } else {
//       setName('');
//     }
//   };

//   const handleClose = ():void => {
//     setIdType('');
//     setIdNumber('');
//     setName('');
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onClose={handleClose}>
//       <DialogTitle>Cambiar superusuario</DialogTitle>
//       <Box
//         component="form"
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: '400px',
//           margin: '20px auto',
//         }}
//         // eslint-disable-next-line @typescript-eslint/no-misused-promises
//         onSubmit={handleSubmit}
//       >
//         <FormControl required>
//           <InputLabel id="id-type-label">Tipo de documento</InputLabel>
//           <Select
//             labelId="id-type-label"
//             id="id-type"
//             value={idType}
//             label="Tipo de documento"
//             onChange={(event) => { setIdType(event.target.value ); }}
//           >
//             <MenuItem value="CC">Cédula de ciudadanía</MenuItem>
//             <MenuItem value="CE">Cédula de extranjería</MenuItem>
//             <MenuItem value="TI">Tarjeta de identidad</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           required
//           id="id-number"
//           label="Número de identificación"
//           value={idNumber}
//           // eslint-disable-next-line @typescript-eslint/no-misused-promises
//           onChange={handleIdNumberChange}
//           type="number"
//           inputProps={{ min: 0 }}
//         />
//         <TextField id="name" label="Nombre" value={name} disabled />
//         <Button variant="contained" type="submit" sx={{ mt: 3 }}>
//           Cambiar Superusuario
//         </Button>
//       </Box>
//     </Dialog>
//   );
// }
