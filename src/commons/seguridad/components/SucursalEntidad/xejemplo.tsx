// import { useState, type FC } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, TextField } from '@mui/material';

// const columns = [
//     { field: 'id', headerName: 'Nro Sucursal', width: 150, flex: 1 },
//     { field: 'principal', headerName: 'Principal', width: 120, flex: 1 },
//     { field: 'nombre', headerName: 'nombre', width: 120, flex: 1 },

// ]; 
// const rows = [
//     { id: 1, principal: 'Sí',nombre: 'miguel' },
//      // Agrega más filas según sea necesario
// ]; 
// // eslint-disable-next-line @typescript-eslint/naming-convention
// export const SucursalEntidad: FC = () => {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const [nuevaSucursal, setNuevaSucursal] = useState('');
//     const [nombrenuebo, setnombrenuebo] = useState('');

//     const [data_rows, set_data_rows] = useState(rows);


//     const agregar_sucursal = (): void => {
//         const nueva_sucursal_obj = {
//         id: data_rows.length + 1,
//         principal: nuevaSucursal,
//         nombre:nombrenuebo,
//         };
    
//         const nuevas_filas = [...data_rows, nueva_sucursal_obj];
//         set_data_rows(nuevas_filas);
//         setNuevaSucursal('');
//         setnombrenuebo('');
//     };
    
//     return (
//         <> 
//             <>
//             <TextField value={nuevaSucursal} onChange={(event) => { setNuevaSucursal(event.target.value) }}>principal</TextField>
//             <TextField value={nombrenuebo} onChange={(event) => { setnombrenuebo(event.target.value) }}>principal</TextField>

//             <div style={{ height: 300, width: '100%' }}>
//                 <DataGrid rows={data_rows} columns={columns} />
            
//             </div> 
//             <Button onClick={agregar_sucursal}>agregar</Button>
//         </>
//         </>
//     );
// }

// uso de la url para departamentos 






// import { useEffect, useState, type FC } from 'react';


// interface Departamento {
//     label: string;
//     value: string;
// };

// interface DepartamentoResponse {
//     success: boolean;
//     detail: string;
//     data: Departamento[];
// };
// // eslint-disable-next-line @typescript-eslint/naming-convention
// export const SucursalEntidad: FC = () => {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

//     useEffect(() => {
//         const fetch_data = async (): Promise<any> => {
//             try {
//                 const response = await fetch('https://back-end-bia-beta.up.railway.app/api/listas/departamentos/?pais=CO');
//                 const data: DepartamentoResponse = await response.json();
//                 if (data.success) {
//                     setDepartamentos(data.data);
//                 } else {
//                     console.log(data.detail);
//                 }
//             } catch (error) {
//                 console.log('Error fetching departamentos:', error);
//             }
//         };

//         void fetch_data();
//     }, []);

//     return (
//         <>
//             <select>
//                 {departamentos.map((departamento) => (
//                     <option key={departamento.value} value={departamento.value}>
//                         {departamento.label}
//                     </option>
//                 ))}
//             </select>        </>
//     );
// }





// import { useEffect, useState, type FC } from 'react';


// interface Paises {
//     label: string;
//     value: string;
// };

// interface PaisesResponse {
//     success: boolean;
//     detail: string;
//     data: Paises[];
// };
// // eslint-disable-next-line @typescript-eslint/naming-convention
// export const SucursalEntidad: FC = () => {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const [Paisess, setPaisess] = useState<Paises[]>([]);

//     useEffect(() => {
//         const fetch_data = async (): Promise<any> => {
//             try {
//                 const response = await fetch('https://back-end-bia-beta.up.railway.app/api/listas/paises/');
//                 const data: PaisesResponse = await response.json();
//                 if (data.success) {
//                     setPaisess(data.data);
//                 } else {
//                     console.log(data.detail);
//                 }
//             } catch (error) {
//                 console.log('Error fetching Paisess:', error);
//             }
//         };

//         void fetch_data();
//     }, []);

//     return (
//         <>
//             <select>
//                 {Paisess.map((Paises) => (
//                     <option key={Paises.value} value={Paises.value}>
//                         {Paises.label}
//                     </option>
//                 ))}
//             </select>        </>
//     );
// }



// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Grid, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { useState, type FC, } from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SucursalDireccionesProps } from './utils/interfac';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalDirecciones: FC<SucursalDireccionesProps> = ({ form_values, handleinput_change }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention  
    const [same_address, setsame_address] = useState(false);

    const handle_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setsame_address(event.target.checked);
        // setsame_address(event.target.checked);
        // When the checkbox is checked, update the direccion_notificacion_referencia field
        // with the value of direccion_sucursal_georeferenciada
        if (event.target.checked) {
            handleinput_change({
                target: {
                    name: 'direccion_notificacion_referencia',
                    value: form_values.direccion_sucursal_georeferenciada,
                },

            });
            handleinput_change({
                target: {
                    name: 'direccion_notificacion',
                    value: form_values.direccion,
                },

            });
        }
    };



    return (
        <>

            <>
                <TextField
                    variant="outlined"
                    size="small"
                    label="direccion"
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="direccion"
                    value={form_values.direccion}
                    onChange={handleinput_change}
                />
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion geografica"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_sucursal_georeferenciada"
                        value={form_values.direccion_sucursal_georeferenciada}
                        onChange={handleinput_change}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={same_address}
                                onChange={handle_checkbox}
                            />
                        }
                        label="Misma dirección física"
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="direccion_notificacion_referencia"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        name="direccion_notificacion_referencia"
                        value={same_address ? form_values.direccion_sucursal_georeferenciada : form_values.direccion_notificacion_referencia}
                        onChange={handleinput_change}
                    />
                </Grid>
                <TextField
                    variant="outlined"
                    size="small"
                    label="direccion_notificacion"
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="direccion_notificacion"
                    value={same_address ? form_values.direccion : form_values.direccion_notificacion}
                    onChange={handleinput_change}
                />

            </>

        </>
    );
}

// // eslint-disable-next-line @typescript-eslint/consistent-type-imports
// import { Grid, } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import TextField from '@mui/material/TextField';
// // eslint-disable-next-line @typescript-eslint/consistent-type-imports
// import {    useState, type FC,   } from 'react';
// // eslint-disable-next-line @typescript-eslint/consistent-type-imports
// import { SucursalDireccionesProps } from './utils/interfac';

// // eslint-disable-next-line @typescript-eslint/naming-convention
// export const SucursalDirecciones: FC<SucursalDireccionesProps> = ({ form_values, handleinput_change }) => {
//     // eslint-disable-next-line @typescript-eslint/naming-convention  
//     const [same_address, setsame_address] = useState(false);

//     const handle_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
//         setsame_address(event.target.checked);
//         // When the checkbox is checked, update the direccion_notificacion_referencia field
//         // with the value of direccion_sucursal_georeferenciada
//         if (event.target.checked) {
//             handleinput_change({
//                 target: {
//                     name: 'direccion_notificacion_referencia',
//                     value: form_values.direccion_sucursal_georeferenciada,
//                 },
//             });
//         }
//     };
//     // const [same_address, setsame_address] = useState(false); // Estado para manejar el checkbox
    
//     // const handle_checkbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     //     setsame_address(event.target.checked); // Actualizar el estado cuando cambia el checkbox
//     //   };
      
  
//     return (
//         <>

// <>
//             <Grid item xs={12} sm={4}>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     label="direccion geografica"
//                     fullWidth
//                     required
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     name="direccion_sucursal_georeferenciada"
//                     value={form_values.direccion_sucursal_georeferenciada}
//                     onChange={handleinput_change}
//                 />
//             </Grid>

//             <Grid item xs={12} sm={4}>
//                 <FormControlLabel
//                     control={
//                         <Checkbox
//                             checked={same_address}
//                             onChange={handle_checkbox}
//                         />
//                     }
//                     label="Misma dirección física"
//                 />
//             </Grid>

//             <Grid item xs={12} sm={4}>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     label="direccion_notificacion_referencia"
//                     fullWidth
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     name="direccion_notificacion_referencia"
//                     value={same_address ? form_values.direccion_sucursal_georeferenciada : form_values.direccion_notificacion_referencia}
//                     onChange={handleinput_change}
//                 />
//             </Grid>
//         </>
 
//             <>
//             <Grid item xs={12} sm={4}>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     label="direccion geografica"
//                     fullWidth
//                     required
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     name="direccion_sucursal_georeferenciada"
//                     value={form_values.direccion_sucursal_georeferenciada}
//                     onChange={handleinput_change}
//                 />
//             </Grid>

//             <Grid item xs={12} sm={4}>
//                 <FormControlLabel
//                     control={
//                         <Checkbox
//                             checked={same_address} // Estado del checkbox
//                             onChange={handle_checkbox} // Evento al cambiar el checkbox
//                         />
//                     }
//                     label="Misma dirección física"
//                 />
//             </Grid>

//             <Grid item xs={12} sm={4}>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     label="direccion_notificacion_referencia"
//                     fullWidth
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     name="direccion_notificacion_referencia"
//                     value={same_address ? form_values.direccion_sucursal_georeferenciada : form_values.direccion_notificacion_referencia}
//                     onChange={handleinput_change}
//                 />
//             </Grid>
//         </>

                 
            
//         </>
//     );
// }

