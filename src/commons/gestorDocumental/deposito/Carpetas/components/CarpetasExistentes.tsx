/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Title } from '../../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { get_carpeta_id } from '../../store/thunks/deposito';
import { useEffect } from 'react';


interface IProps {


    handle_edit_click: any;
}

const ListadoCarpetas = ({
    handle_edit_click }: IProps) => {
    const { carpetas, cajas } = useAppSelector((state) => state.deposito);
    const dispatch = useAppDispatch();
    const columns: GridColDef[] = [

        {
            field: 'orden_ubicacion_por_estante',
            headerName: 'ÓRDEN',
            width: 300,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'identificacion_por_estante',
            headerName: 'IDENTIFICACIÒN',
            width: 300,
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

    useEffect(() => {
        if (cajas?.id_caja !== null && cajas?.id_caja !== undefined) {
            void dispatch(get_carpeta_id(cajas?.id_caja))
        }
    }, [cajas])







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
                        rows={carpetas}
                    />

                </Box>
            </Grid>

        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoCarpetas;

