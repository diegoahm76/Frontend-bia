
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../../../hooks';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { InformacionExpediente } from './InformacionExpediente';
import { SeleccionPersona } from './SeleccionPersona';
import { ConcesionesPermisosVigentes } from './ConcesionesPermisosVigentes';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { obtener_usuario_logueado } from '../../aperturaExpedientes/thunks/aperturaExpedientes';
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    expediente: any;
}

const class_css = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const ConcederAccesoExpediente: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [concesion, set_concesion] = useState<any>(null);
    const [usuario, set_usuario] = useState<any>(null);
    const [editar_concesion, set_editar_concesion] = useState<any>(null);
    const [guardar, set_guardar] = useState<boolean>(false);

    useEffect(() => {
        obtener_usuario_logueado_fc();
    }, []);

    useEffect(() => {
        if (guardar) {
            set_guardar(false);
        }
    }, [guardar]);

    const obtener_usuario_logueado_fc: () => void = () => {
        dispatch(obtener_usuario_logueado()).then((response: any) => {
            set_usuario(response);
        })
    }
    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_Agno',
            headerName: 'AÑO',
            sortable: true,
            width: 250,
        },
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'CONSECUTIVO',
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

    }

    const mostrar_busqueda_expediente: any = async () => {

    }

    return (
        <>
            <Dialog fullWidth maxWidth="lg"
                open={props.is_modal_active}
                onClose={() => { props.set_is_modal_active(false); }} >
                <DialogTitle>{'Conceder acceso a expedientes'}</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        sx={class_css}
                    >
                        <InformacionExpediente expediente={props.expediente}></InformacionExpediente>
                    </Grid>
                    <Grid
                        container
                        sx={class_css}
                    >
                        <SeleccionPersona expediente={props.expediente} set_concesion={set_concesion} editar_concesion={editar_concesion}></SeleccionPersona>
                    </Grid>
                    <Grid
                        container
                        sx={class_css}
                    >
                        <ConcesionesPermisosVigentes expediente={props.expediente} concesion={concesion} accion_guardar={guardar} set_editar_concesion={set_editar_concesion} set_is_modal_active={props.set_is_modal_active}></ConcesionesPermisosVigentes>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='success'
                        variant='contained'
                        startIcon={<SaveIcon />}
                        onClick={ () => { set_guardar(true); }}>Guardar</Button>
                    <Button
                        color='error'
                        variant='contained'
                        startIcon={<ClearIcon />}
                        onClick={() => { props.set_is_modal_active(false); }}>Salir</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// eslint-disable-next-line no-restricted-syntax
export default ConcederAccesoExpediente;