import { useState, type FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'Nro Sucursal', width: 150, flex: 1 },
    { field: 'principal', headerName: 'Principal', width: 120, flex: 1 },
    { field: 'nombre', headerName: 'nombre', width: 120, flex: 1 },

]; 
const rows = [
    { id: 1, principal: 'Sí',nombre: 'miguel' },
     // Agrega más filas según sea necesario
]; 
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SucursalEntidad: FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [nuevaSucursal, setNuevaSucursal] = useState('');
    const [nombrenuebo, setnombrenuebo] = useState('');

    const [data_rows, set_data_rows] = useState(rows);


    const agregar_sucursal = (): void => {
        const nueva_sucursal_obj = {
        id: data_rows.length + 1,
        principal: nuevaSucursal,
        nombre:nombrenuebo,
        };
    
        const nuevas_filas = [...data_rows, nueva_sucursal_obj];
        set_data_rows(nuevas_filas);
        setNuevaSucursal('');
        setnombrenuebo('');
    };
    
    return (
        <> 
            <>
            <TextField value={nuevaSucursal} onChange={(event) => { setNuevaSucursal(event.target.value) }}>principal</TextField>
            <TextField value={nombrenuebo} onChange={(event) => { setnombrenuebo(event.target.value) }}>principal</TextField>

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={data_rows} columns={columns} />
            
            </div> 
            <Button onClick={agregar_sucursal}>agregar</Button>
        </>
        </>
    );
}