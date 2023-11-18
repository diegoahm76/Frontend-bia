import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material"
import { useState, type Dispatch, type SetStateAction } from "react";
import { InfoPersona } from "../../../../../interfaces/globalModels";
import { BusquedaPersona } from "./BusquedaPersona";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useAppDispatch } from "../../../../../hooks";

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
}

const class_icon = {
    width: 24,
    height: 24,
    background: '#fff',
    border: '2px solid',
};

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const VerExpedientes: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [seleccion_expediente, set_seleccion_expediente] = useState<any>({});
    const [expedientes, set_expedientes] = useState<any>([]);

    const columns: GridColDef[] = [
        {
            field: 'codigo_exp_Agno',
            headerName: 'IDENTIFICACIÓN',
            sortable: true,
            width: 150,
        },
        {
            field: 'codigo_exp_consec_por_agno',
            headerName: 'NOMBRE',
            sortable: true,
            width: 200,
        },
        {
            field: 'tipologia',
            headerName: 'ACCESO OTORGADO POR',
            width: 200,
        },
        {
            field: 'desde',
            headerName: 'DESDE',
            width: 150,
        },
        {
            field: 'hasta',
            headerName: 'HASTA',
            width: 150,
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
            <DialogTitle>{'Seleccionar expediente'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <DataGrid
                        density="compact"
                        autoHeight
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rows={expedientes}
                        getRowId={(row) => row.orden_en_expediente} />
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


