
import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../../../components/Title';
import { useAppSelector } from '../../../../../../hooks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Mantenimiento_other = () => {

    const { maintenance_other } = useAppSelector((state) => state.cvo);
    const columns_mantenimientos: GridColDef[] = [

        {
            field: 'tipo_descripcion',
            headerName: 'Tipo de mantenimiento',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'fecha',
            headerName: 'Fecha de mantenimiento',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'responsable',
            headerName: 'Responsable',
            width: 250,
            cellClassName: 'truncate-cell'

        },

    ];



    return (
        <>
            <Grid container direction="row" padding={2} borderRadius={2}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    direction="row"
                    marginTop={2}
                >
                    <Box sx={{ width: '100%' }}>
                        <Title title="Mantenimientos" />
                        <DataGrid
                            density="compact"
                            autoHeight
                            columns={columns_mantenimientos}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: true }}
                            getRowId={(row) => row.id_programacion_mantenimiento}
                            rows={maintenance_other}
                        />

                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default Mantenimiento_other;



