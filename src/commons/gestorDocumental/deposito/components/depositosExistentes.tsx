
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Title } from '../../../../components/Title';
import { useAppSelector } from '../../../../hooks';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';



interface IProps {

    handle_edit_click: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoDeposito = ({ handle_edit_click }: IProps) => {
    const { deposito, } = useAppSelector((state) => state.deposito);
    const columns: GridColDef[] = [

        {
            field: 'orden_ubicacion_por_entidad',
            headerName: 'ORDÉN',
            width: 100,flex: 1,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'nombre_deposito',
            headerName: 'NOMBRE DEL DEPÓSITO',
            width: 250,flex: 1,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'identificacion_por_entidad',
            headerName: 'IDENTIFICACIÓN',
            width: 250,flex: 1,
            cellClassName: 'truncate-cell'

        },
        {
            field: 'direccion_deposito',
            headerName: 'DIRECCIÓN',
            width: 250,flex: 1,
            cellClassName: 'truncate-cell'

        },


        {
            field: 'ACCIÓN',
            headerName: 'ACCIÓN',
            width: 100,flex: 1,
            renderCell: (params) => (
                <Button
                    onClick={() => handle_edit_click(params.row)}
                    startIcon={<EditIcon />}
                >

                </Button>
            ),
        },


    ];

    // const get_depositos: any = async () => {
    //     //  console.log('')("buscar...");
    //     const nombre_deposito = get_values('nombre_deposito') ?? '';
    //     const identificacion_por_entidad = get_values('identificacion_por_entidad') ?? '';
    //     // eslint-disable-next-line @typescript-eslint/await-thenable
    //     void dispatch(get_depositos(nombre_deposito, identificacion_por_entidad));

    // };



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
                    <Title title="Listado de depósitos de la entidad" />

                    <ButtonGroup
                        style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {download_xls({ nurseries: deposito , columns })}
                        {download_pdf({ nurseries: deposito, columns, title: 'Listado de depósitos' })}
                    </ButtonGroup>

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

        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoDeposito;


