import { Box, Button, Stack } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'codigo',
        headerName: 'Codigo',
        width: 150,
        editable: true
    },
    {
        field: 'serial_placa',
        headerName: 'Serial/Placa',
        width: 150,
        editable: true
    },
    {
        field: 'kilometraje',
        headerName: 'Kilometraje',
        width: 150,
        editable: true
    },
    {
        field: 'fecha',
        headerName: 'Fecha',
        width: 500,
        editable: true
    }
];

const rows = [
    { id: 1, codigo: 290320, serial_placa: 'FEU213', kilometraje: '38212km/h', fecha: new Date() },
    { id: 2, codigo: 293213, serial_placa: 'BFD432', kilometraje: '43212km/h', fecha: new Date() },
    { id: 3, codigo: 232320, serial_placa: 'JYT655', kilometraje: '3822km/h',  fecha: new Date() },
    { id: 4, codigo: 329030, serial_placa: 'BTG908', kilometraje: '3212km/h',  fecha: new Date() },
    { id: 5, codigo: 932103, serial_placa: 'KNP343', kilometraje: '54332km/h', fecha: new Date() },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrevisualizacionComponent:React.FC = () => {
  return (
    <>
        <Box sx={{ width: '100%', mt: '20px'}}>
            <DataGrid
                density='compact'
                autoHeight
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[100]}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
        <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ m: '20px 0' }}
        >
            <Button
                color="primary"
                variant="contained"
            >
                Limpiar
            </Button>
            <Button
                color="primary"
                variant="contained"
            >
                Previsualizar
            </Button>
            <Button
                color="success"
                variant="contained"
            >
                Guardar
            </Button>
            <Button
                color="error"
                variant="contained"
            >
                Salir
            </Button>
        </Stack>
    </>
  )
}
