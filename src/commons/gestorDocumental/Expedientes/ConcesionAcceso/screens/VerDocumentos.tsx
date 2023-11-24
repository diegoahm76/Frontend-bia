import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material"
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useAppDispatch } from "../../../../../hooks";
import { ver_documentos } from "../thunks/ConcesionAcceso";
import dayjs from "dayjs";

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const VerDocumentos: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [seleccion_documento, set_seleccion_documento] = useState<any>({});
    const [documentos, set_documentos] = useState<any>([]);

    useEffect(() => {
        ver_expedientes_fc();
    }, []);

    const ver_expedientes_fc: () => void = () => {
        dispatch(ver_documentos()).then((response: any) => {
            if(response.success){
                set_documentos(response.data);
            }
        });
    }

    const columns: GridColDef[] = [
        {
            field: 'numero_documento_persona_recibe_acceso',
            headerName: 'IDENTIFICACIÓN',
            sortable: true,
            width: 150,
        },
        {
            field: 'nombre_persona_recibe_acceso',
            headerName: 'NOMBRE',
            sortable: true,
            width: 200,
        },
        {
            field: 'nombre_persona_concede_acceso',
            headerName: 'ACCESO OTORGADO POR',
            width: 200,
        },
        {
            field: 'fecha_acceso_inicia',
            headerName: 'DESDE',
            width: 150,
            valueGetter: (params) => dayjs(params.row.fecha_acceso_inicia).format('DD/MM/YYYY'),
        },
        {
            field: 'fecha_acceso_termina',
            headerName: 'HASTA',
            width: 150,
            valueGetter: (params) => dayjs(params.row.fecha_acceso_termina).format('DD/MM/YYYY'),
        }
    ];

    const boton_seleccionar: any = () => {
        props.set_is_modal_active(false);
    }

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={props.is_modal_active}
            onClose={() => { props.set_is_modal_active(false); }}
        >
            <DialogTitle>{'Seleccionar documento'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rows={documentos}
                        getRowId={(row) => row.id_concesion_acc} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={boton_seleccionar}>Seleccionar</Button>
                <Button
                    color='inherit'
                    variant='contained'
                    onClick={() => { props.set_is_modal_active(false); }}>Salir</Button>
            </DialogActions>
        </Dialog>
    )
}


