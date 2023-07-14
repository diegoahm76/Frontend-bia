import { Box, Grid, Button } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { DataGrid } from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaLineresUnidadesOrganizacionales: React.FC = () => {
    const roles = [
        { field: "nrosucursal", headerName: "Nro Sucursal", width: 150 },
        { field: "banana", headerName: "Descripcion de la Sucursal", width: 150 },
        { field: "orange", headerName: "principal", width: 150 },
        
    ];

    const rows = [
        { id: 1, nrosucursal: "1", descripcionsucursal: "Sucursal del departamento 1", principal: "Principal 1"}, 
        { id: 2, nrosucursal: "2", descripcionsucursal: "Sucursal del departamento 2", principal: "Principal 2"}, 
        { id: 3, nrosucursal: "3", descripcionsucursal: "Sucursal del departamento 3", principal: "Principal 3"}, 
        { id: 4, nrosucursal: "5", descripcionsucursal: "Sucursal del departamento 5", principal: "Principal 2"}, 
        { id: 5, nrosucursal: "3", descripcionsucursal: "Sucursal del departamento 3", principal: "Orange 3"}, 
    ];

    return (
        <Grid container sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
        }}
        >
            <Grid item xs={12}>
                <Title title="Lineres de Unidades Organizacionales" />
                <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={roles}
                        rows={rows}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.id}
                    />
                </Box>
            </Grid>
            <Button style={{ margin: 8 }} color="primary" variant="contained">Ir a lideres de grupo</Button>
        </Grid>
    );
};