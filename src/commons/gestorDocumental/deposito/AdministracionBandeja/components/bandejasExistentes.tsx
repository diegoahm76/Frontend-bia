import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Title } from '../../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_bandejas } from '../../store/thunks/deposito';


interface IProps {
    bandejas: any;
    get_values: any;
    handle_edit_click: any;
}



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoBandejas = ({ get_values, bandejas, handle_edit_click }: IProps) => {
    const { bandeja } = useAppSelector((state) => state.deposito);
    //    const dispatch = useAppDispatch();
    const dispatch = useAppDispatch();
    const columns: GridColDef[] = [

        {
            field: 'orden_ubicacion_por_estante',
            headerName: 'Órden',
            width: 100,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'identificacion_por_estante',
            headerName: 'Indetificación',
            width: 250,
            cellClassName: 'truncate-cell'

        },



        {
            field: 'ACCIÓN',
            headerName: 'ACCIÓN',
            width: 100,
            renderCell: (params) => (
                <Button
                    onClick={() => handle_edit_click(params.row)}
                    startIcon={<EditIcon />}
                >

                </Button>
            ),
        },


    ];

    void dispatch(get_bandejas())




    return (
        <>
            <Grid container
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px',
                    boxShadow: '0px 3px 6px #042F4A26'
                }}>

                <Box sx={{ width: '100%' }}>
                    <Title title="Listado de bandejas por estante" />



                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        experimentalFeatures={{ newEditingApi: true }}
                        getRowId={(row) => row.id_bandeja_estante}
                        rows={bandeja}
                    />

                </Box>
            </Grid>

        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoBandejas;


