import { Box, Button, Grid } from "@mui/material";
import { Title } from "../../../../../../components/Title";
import { DataGrid} from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaSucursales: React.FC = () => {
    const roles= [
        { field: "apple", headerName: "Apple", width: 150 },
        { field: "banana", headerName: "Banana", width: 150 },
        { field: "orange", headerName: "Orange", width: 150 },
        { field: "red", headerName: "Red", width: 150 },
        { field: "green", headerName: "Green", width: 150 },
    ];

    const rows = [
        { id: 1, apple: "Apple 1", banana: "Banana 1", orange: "Orange 1", red: "Banana 1", green: "Orange 1" },
        { id: 2, apple: "Apple 2", banana: "Banana 2", orange: "Orange 2", red: "Banana 1", green: "Orange 1" },
        { id: 3, apple: "Apple 3", banana: "Banana 3", orange: "Orange 3", red: "Banana 1", green: "Orange 1" }, { id: 1, apple: "Apple 1", banana: "Banana 1", orange: "Orange 1", red: "Banana 1", green: "Orange 1" },
        { id: 4, apple: "Apple 2", banana: "Banana 2", orange: "Orange 2", red: "Banana 1", green: "Orange 1" },
        { id: 5, apple: "Apple 3", banana: "Banana 3", orange: "Orange 3", red: "Banana 1", green: "Orange 1" },
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
                <Title title="Tabla sucursales" />
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
             <Button style={{margin:8}} color="primary" variant="contained">Ir a sucursales</Button>
        </Grid>
    );
};