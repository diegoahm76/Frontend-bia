
import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../../../hooks';
import { Title } from '../../../../components/Title';





// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoDeposito = () => {

    const { deposito, } = useAppSelector((state) => state.deposito);

    const columns: GridColDef[] = [

        {
            field: 'orden_ubicacion_por_entidad',
            headerName: 'ORDÉN',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'nombre_deposito',
            headerName: 'NOMBRE DEL DEPÓSITO',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'identificacion_por_entidad',
            headerName: 'IDENTIFICACIÓN',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'direccion_deposito',
            headerName: 'DIRECCIÓN',
            width: 250,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
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
                        <Title title="Listado de depósitos de la entidad" />
                        <DataGrid
                            density="compact"
                            autoHeight
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: true }}
                            getRowId={(row) => row.id_deposito}
                            rows={deposito}
                        />

                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoDeposito;



