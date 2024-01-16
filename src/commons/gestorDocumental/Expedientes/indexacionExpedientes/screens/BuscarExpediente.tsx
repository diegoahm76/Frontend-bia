
import {Box,Button,Dialog,DialogContent,Grid,} from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { obtener_expediente_id_serie } from '../thunks/indexacionExpedientes';

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    set_expediente: any;
    serie: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BuscarExpediente: React.FC<IProps> = (props: IProps) => {

    const dispatch = useAppDispatch();
    const [expedientes, set_expedientes] = useState<any>([]);

    useEffect(() => {
        if (props.serie !== "")
            mostrar_busqueda_expediente();
        
    }, [props.serie]);


    const columns: GridColDef[] = [
        
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'CONSECUTIVO',
            sortable: true,
            width: 250,
        },
        {
            field: 'tipo_expediente',
            headerName: 'TIPO EXPEDIENTE',
            sortable: true,
            width: 250,
        },
        {
            field: 'codigo_exp_Agno',
            headerName: 'AÑO',
            sortable: true,
            width: 250,
        },
      
        {
            field: 'titulo_expediente',
            headerName: 'TÍTULO EXPEDIENTE',
            width: 300,
        },
        {
            field: 'acciones',
            headerName: 'ACCIONES',
            width: 200,
            renderCell: (params) => (
                <Button onClick={() => seleccionar_expediente(params.row)} startIcon={<PlaylistAddCheckIcon />} />
            ),

        },
    ];

    const seleccionar_expediente: any = (expediente: any) => {
        if(expediente !== null && expediente !== undefined)
            props.set_expediente(expediente);
        else
            props.set_expediente(null);
        props.set_is_modal_active(false);
    }

    const mostrar_busqueda_expediente: any = async () => {
        dispatch(obtener_expediente_id_serie(props.serie.id_catserie_unidadorg)).then(((response: any) =>{
            (response.data !== null && response.data !== undefined) ? set_expedientes(response.data) : set_expedientes([]);
        }));
    }

    return (
        <>
            <Dialog fullWidth maxWidth="lg"
                open={props.is_modal_active}
                onClose={() => { props.set_is_modal_active(false); }} >
                <DialogContent>
                  {  <Grid
                        container
                        spacing={2}
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26',
                        }}
                    >
                        <Grid container sx={{ mt: '10px'}}>
                            <>
                                {expedientes.length > 0 && (
                                    <Grid item xs={12}>
                                        <Title title="Expedientes encontrados" />
                                    </Grid>
                                )}
                                {expedientes.length > 0 && (
                                    <Grid item xs={12}>
                                        <Box sx={{ width: '100%' }}>
                                            <>
                                                <DataGrid
                                                    density="compact"
                                                    autoHeight
                                                    columns={columns}
                                                    pageSize={10}
                                                    rowsPerPageOptions={[10]}
                                                    rows={expedientes}
                                                    getRowId={(row) => row.id_expediente_documental} />
                                            </>
                                        </Box>
                                    </Grid>
                                )}

                            </>
                            <Grid container justifyContent="flex-end">
                                <Grid item margin={2}>
                                    <Button variant="outlined"
                                        color="error"
                                        onClick={() => { props.set_is_modal_active(false); }}>
                                        Salir
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>}
                </DialogContent>
            </Dialog>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default BuscarExpediente;