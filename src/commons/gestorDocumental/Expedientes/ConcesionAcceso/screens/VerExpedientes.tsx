import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material"
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { useAppDispatch } from "../../../../../hooks";
import { ver_expedientes } from "../thunks/ConcesionAcceso";
import dayjs from "dayjs";
import { buscar_expediente_id } from "../../aperturaExpedientes/thunks/aperturaExpedientes";
// import { obtener_documentos_expediente } from "../../ConsultaExpedientesDocumentales/thunks/ConsultaExpedientes";

interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    set_expediente: any,
    set_documento: any
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
    const [seleccion_expediente, set_seleccion_expediente] = useState<any>(null);
    const [expedientes, set_expedientes] = useState<any>([]);

    useEffect(() => {
        ver_expedientes_fc();
    }, []);

    const ver_expedientes_fc: () => void = () => {
        dispatch(ver_expedientes()).then((response: any) => {
            if(response.success){
                set_expedientes(response.data);
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

    const seleccion_expediente_grid = (seleccion_expediente: any): void => {
        set_seleccion_expediente(expedientes.find((e: any) => e.id_concesion_acc === seleccion_expediente[0]));
    }

    // const boton_seleccionar: any = () => {
    //     if(seleccion_expediente !== null){
    //         dispatch(buscar_expediente_id(seleccion_expediente.id_expediente)).then((response: any) => {
    //             if(response.success){
    //                 response.data !== null ? props.set_expediente(response.data) : props.set_expediente(null);
    //                 dispatch(obtener_documentos_expediente(response.data.id_expediente_documental, '', '', '')).then(((response: any) => {
    //                     response.data !== null ? props.set_documento(response.data) : props.set_documento(null);
    //                     props.set_is_modal_active(false);
    //                 }));
    //                 props.set_is_modal_active(false);
    //             }
    //         });
    //     }
    // }

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
                        getRowId={(row) => row.id_concesion_acc} 
                        onSelectionModelChange={seleccion_expediente_grid}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    variant='contained'
                  //  onClick={boton_seleccionar}
                    >Seleccionar
                    </Button>
                <Button
                    color='inherit'
                    variant='contained'
                    onClick={() => { props.set_is_modal_active(false); }}>Salir</Button>
            </DialogActions>
        </Dialog>
    )
}


